const socket = io('http://localhost:3000');

// Main views
const startScreen = document.getElementById('start-screen');
const lobbyOptions = document.getElementById('lobby-options');
const gameScreen = document.getElementById('game-screen');

// Other important stuff
const switchButton = document.getElementById('switchButton');
const createRoom = document.getElementById('create-room');
const joinRoom = document.getElementById('join-room');
const gameCode = document.getElementById('game-code');
const codeDisplay = document.getElementById('code-display');
const connectedUsers = document.getElementById('connected-users');

// Lobby options
const hintsAmount = document.getElementById('hints-amount');
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

// Timer and points
const timeDisplay = document.getElementById('time-display');
const pointsDisplay = document.getElementById('points-display');

// Hints
const hintsBtn = document.getElementById('hints-btn');
const hintsDisplay = document.getElementById('hints-display');

// Change map btn
const changeMapBtn = document.getElementById('change-btn');

let clientRoom;
let gameObj;
let actualMap;

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
socket.on('changeMap', changeMap);

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
    startGameBtn.disabled = true;
    const options = {
        hintsAmount: hintsAmount.value,
        timeLimit: timeLimit.value, 
        mapSize: mapSize.value, 
        mapNumber: mapNumber.value,
        roomCode: clientRoom
    };
    timer(options.timeLimit * 60, timeDisplay);
    socket.emit('startGame', options);
});

changeMapBtn.addEventListener('click', () => {
    console.log(actualMap);
    socket.emit('changeMap', {gameCode: clientRoom, actualMap: actualMap});
});

function init() {
    startScreen.style.display = "none";
    lobbyOptions.style.display = "flex";
}

function handleUserConnected(players) {
    init();
    for (let i = 1; i <= players.length; i++) {
        // Display users
        rows[i - 1].style.display = "flex";
        users[i - 1].innerText = players[i - 1];
    }
}

function handleUnknownRoom() {
    alert("Room doesn't exist!")
}

function handleHostGameStart(firstMap) {
    console.log("Game has started!")
    startScreen.style.display = "none";
    lobbyOptions.style.display = "none";
    gameScreen.style.display = "flex";

    hintsDisplay.innerText = `Hints remaining: ${hintsAmount.value}`;

    gameObj = new Game(firstMap, 5, 5);
    gameObj.initialize();
    actualMap = JSON.parse(JSON.stringify(firstMap));
}

function handlefullRoom() {
    alert("Room is full!");
}

function changeMap(nextMap) {
    console.log(nextMap);
    gameObj.clear();
    gameObj = new Game(nextMap, 5, 5);
    gameObj.initialize();
    // gameObj.gameMap = map
}

function timer(time, display) {
    let timer = time;
    let minutes;
    let seconds;

    setInterval(() => {
        seconds = parseInt(timer % 60);
        minutes = parseInt(timer / 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + ":" + seconds;

        if(--timer < 0) {
            timer = time;
        }
    }, 1000);
}
