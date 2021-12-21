const express = require('express')
const { makeid } = require('./Utility')
const app = express()
const port = 3000
const server = app.listen(port)
const io = require('socket.io')(server)
const { performance, PerformanceObserver } = require('perf_hooks');
const Generator = require('./generator/Generator');

//Hello World line taken from the express website
app.use(express.static('client'));

var rooms = {};

//The 'connection' is a reserved event name in socket.io
//For whenever a connection is established between the server and a client
io.on('connection', (socket) => {
  //When the client sends a message via the 'clientToClient' event
  //The server forwards it to all the other clients that are connected
  socket.on('buttonPressed', clientRoom => {
      io.to(clientRoom).emit('switchFromServer');
  })
    
  socket.on('createRoom', () => {
    let roomCode = makeid(5);
    // Emit roomCode to client side
    socket.emit('displayGameCode', roomCode)
    
    // Join to the room that was just created
    socket.join(roomCode);

    const clients = io.sockets.adapter.rooms.get(roomCode);
    console.log(clients);
    socket.emit('serverMsg', roomCode)

    // Create room object
    rooms[roomCode] = {
      time: 5,
      maps: [],
      players: [],
    };

    rooms[roomCode].players.push(socket.id);

    console.log(rooms);

    // Show connected players
    io.to(roomCode).emit('userConnected', rooms[roomCode].players);
  });

  socket.on('joinRoom', (gameCode) => {
    // Check if game code exists
    const clients = io.sockets.adapter.rooms.get(gameCode);
    
    // Room with given game code doesn't exist
    if (!clients) {
      socket.emit('unknownRoom');
      return;
    }
    
    let numberOfClients;
    numberOfClients = clients.size;

    // Room is full
    if(numberOfClients > 1) {
      socket.emit('fullRoom');
      return;
    }

    // Join to given game code
    socket.join(gameCode);

    //! Debug
    console.log(numberOfClients, clients);
    

    socket.emit('serverMsg', gameCode);
    // Change scene
    socket.emit('init');
    
    rooms[gameCode].players.push(socket.id);

    console.log(rooms);

    io.to(gameCode).emit('userConnected', rooms[gameCode].players);

  });

  socket.on('startGame', (options) => {
    start = performance.now();

    let generator = new Generator();
    let genMaps = generator.generateMap(
      parseInt(options.mapSize),
      5, 
      parseInt(options.mapNumber)
    );

    end = performance.now();
    time = `${(end - start) / 1000} seconds`;
    console.log(`It took ${time}`);

    // Sent to clients 
    io.to(options.roomCode).emit('testMessage', genMaps);
    io.to(options.roomCode).emit('hostGameStart')
  });

  socket.on('disconnect', () => {
    console.log("disconnected");
  });
});