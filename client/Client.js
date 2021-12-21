const socket = io('http://localhost:3000');

//Grabbing the button element by the ID
const startScreen = document.getElementById('start-screen');
const lobbyOptions = document.getElementById('lobby-options');
const gameScreen = document.getElementById('game-screen');

const switchButton = document.getElementById('switchButton');
const createRoom = document.getElementById('create-room');
const joinRoom = document.getElementById('join-room');
const gameCode = document.getElementById('game-code');
const codeDisplay = document.getElementById('code-display');
const connectedUsers = document.getElementById('connected-users');

// Lobby options
const timeLimit = document.getElementById('time-limit');
const mapSize = document.getElementById('map-size');
const mapNumber = document.getElementById('map-number');
const startGameBtn = document.getElementById('start-game');

// Users
const rowTwo = document.getElementById('row-two');
const rowThree = document.getElementById('row-three');
const userOne = document.getElementById('user-one');
const userTwo = document.getElementById('user-two');
const rows = [rowTwo, rowThree];
const users = [userOne, userTwo];


let clientRoom;

// Connecting client to and server room
socket.on('serverMsg', (data) => {
    console.log(data);
    clientRoom = data;
})

//Client sends a message at the moment it got connected with the server
socket.on('switchFromServer', () => {
    if(document.body.style.background === 'darkgray') {
        document.body.style.background = '#121212'
    } else {
        document.body.style.background = 'darkgray'
    }
});

// Test message
socket.on('testMessage', (maps) => {
    console.log(maps);
});

// Display game code after creating the room
socket.on('displayGameCode', (data) => {
    codeDisplay.innerText = data;
});

socket.on('unknownRoom', handleUnknownRoom);
socket.on('fullRoom', handlefullRoom);
socket.on('userConnected', handleUserConnected);
socket.on('init', init);
socket.on('hostGameStart', handleHostGameStart);


//Event listener on the button element: sends a message to the server when clicked
switchButton.addEventListener('click', () => {
    socket.emit('buttonPressed', clientRoom)
});

createRoom.addEventListener('click', () => {
    socket.emit('createRoom')
});

joinRoom.addEventListener('click', () => {
    socket.emit('joinRoom', gameCode.value)
});

startGameBtn.addEventListener('click', () => {
    const options = {
        timeLimit: timeLimit.value, 
        mapSize: mapSize.value, 
        mapNumber: mapNumber.value,
        roomCode: clientRoom
    };
    socket.emit('startGame', options);
});

function init() {
    startScreen.style.display = "none";
    lobbyOptions.style.display = "flex";
}

function handleUserConnected(players) {
    init();
    // console.log(players.length);
    for (let i = 1; i <= players.length; i++) {
        // console.log(rows);
        rows[i - 1].style.display = "flex";
        users[i - 1].innerText = players[i - 1];
    }

}

function handleUnknownRoom() {
    alert("Room doesn't exist!")
}

function handleHostGameStart() {
    alert("Game has started!")
    startScreen.style.display = "none";
    lobbyOptions.style.display = "none";
    gameScreen.style.display = "flex";
}

function handlefullRoom() {
    alert("Room is full!");
}
