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
const colorAmount = document.getElementById('color-amount');
const canTouch = document.getElementById('can-touch');

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
let startMap;
let currentMap;

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

// Handling server responses
socket.on('unknownRoom', handleUnknownRoom);
socket.on('fullRoom', handlefullRoom);
socket.on('notEnoughPlayers', notEnoughPlayers);

socket.on('userConnected', handleUserConnected);
socket.on('init', init);

socket.on('hostGameStart', handleHostGameStart);
socket.on('changeMap', changeMap);
socket.on('displayHint', displayHint);
socket.on('displayPoints', displayPoints)
socket.on('startTimer', startTimer);

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
    console.log(canTouch.checked);
    startGameBtn.disabled = true;
    const options = {
        hintsAmount: hintsAmount.value,
        timeLimit: timeLimit.value, 
        mapSize: mapSize.value, 
        mapNumber: mapNumber.value,
        canTouch: canTouch.checked,
        colorAmount: colorAmount.value,
        roomCode: clientRoom
    };
    socket.emit('startGame', options);
});

// TODO: Start map is not needed to sent by user (remove later)
changeMapBtn.addEventListener('click', () => {
    console.log(startMap);
    socket.emit('changeMap', {gameCode: clientRoom, startMap: startMap, currentMap: currentMap, solvedColors: gameObj.solvedColors});
});

hintsBtn.addEventListener('click', () => {
    socket.emit('getHint', {startMap: startMap, currentMap: currentMap, solvedColors: gameObj.solvedColors});
});

function startTimer(timeLimit) {
    timer(timeLimit * 60, timeDisplay);
}

function displayHint(hint) {
    Draw.drawAfterGlow(hint.color, hint.map, gameObj.context, gameObj.tileW, gameObj.tileH);
}

function displayPoints(points) {
    pointsDisplay.innerText = `${points} points`;
}

function notEnoughPlayers() {
    startGameBtn.disabled = false;
    alert('Not enough players to start game!');
}

function init() {
    startScreen.style.display = "none";
    lobbyOptions.style.display = "flex";
}

function handleUserConnected(players) {
    init();
    for (let i = 1; i <= players.length; i++) {
        // Display users
        rows[i - 1].style.display = "flex";
        users[i - 1].innerText = players[i - 1].id;
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

    // Setting the canvas and drawing the map
    gameObj = new Game();
    gameObj.initialize(firstMap, 5, 5);
    // Copying current game map
    startMap = JSON.parse(JSON.stringify(firstMap));
    currentMap = firstMap;
}

function handlefullRoom() {
    alert("Room is full!");
}

function changeMap(nextMap) {
    gameObj.clear();
    gameObj.initialize(nextMap, 5, 5);
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