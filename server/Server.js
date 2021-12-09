const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { performance, PerformanceObserver } = require('perf_hooks');

// Solver
const Solver = require('./solver/Solver');
const Global = require('./solver/Global');
const Generator = require('./generator/Generator');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
// app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static('client'));

// Run when client connects
io.on('connection', socket => {
  console.log('Client connected');

  //! ########### Tests ###########
  let gameMap = [            
    ['0', '0', '0', '0', 'R', '0', '0', '0'],
    ['0', '0', '0', '0', 'C', '0', 'G', 'Y'],
    ['0', '0', '0', '0', 'G', 'Y', '0', 'C'],
    ['0', '0', '0', 'O', 'B', '0', '0', '0'],
    ['0', '0', '0', '0', 'O', '0', '0', '0'],
    ['0', '0', '0', '0', 'B', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', 'R', '0', '0', '0', '0', '0', '0']
  ];
  
  Global.usedNodes = 0;
  Global.createdNodes = 0;

  let start = performance.now();

  let solve = new Solver(gameMap);
  let result = solve.init()
  socket.emit('message', result); 

  let end = performance.now();
  let time = `${(end - start) / 1000} seconds`;
  console.log("######### SOLVING TEST #########");
  console.log(`${result} - It took ${time}`);
  console.log(`Created ${Global.createdNodes}, Used ${Global.usedNodes}`);

  //! ########### Tests ###########

  // Emit message to client that connects
  socket.emit('message', 'Connected to server');

  // Broadcast message to everyone except client that connected
  socket.broadcast.emit('message', `Client ${socket.id} connected`);

  // Runs when client disconnects
  socket.on('disconnect', () => {
  // Emit message to all connected clients
    io.emit('message',`Client ${socket.id} disconnected`);
  });

  // Listen for button event (when clicked)
  socket.on('solve', data => {
    //! ########### Tests ###########
    console.log("CLICKED");
    start = performance.now();

    let generator = new Generator();
    let genMaps = generator.generateMap(5, 5, 4);

    end = performance.now();
    time = `${(end - start) / 1000} seconds`;
    console.log("######### MAP GENERATION #########");
    console.log(`It took ${time}`);
    socket.emit('message', genMaps); 
   //! ########### Tests ###########
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
