const socket = io('http://localhost:3000');

// Main views
const startScreen = document.getElementById('start-screen');
const lobbyOptions = document.getElementById('lobby-options');
const gameScreen = document.getElementById('game-screen');

// Other important stuff
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
socket.on('testMessage', (test) => {
    console.log(test.map);
    console.log(test.solvedColors);
});

// Display game code after creating the room
socket.on('displayGameCode', (data) => {
    codeDisplay.innerText = data;
});

// Handling server responses
socket.on('displayAlert', displayAlert);

socket.on('userConnected', handleUserConnected);
socket.on('init', init);

socket.on('hostGameStart', handleHostGameStart);
socket.on('changeMap', changeMap);
socket.on('displayHint', displayHint);
socket.on('displayHintAmount', displayHintAmount);
socket.on('displayPoints', displayPoints)
socket.on('startTimer', startTimer);
socket.on('timesUp', timesUp);
socket.on('hideButton', hideButton);
socket.on('updateInput', updateInput);
socket.on('updateSwitch', updateSwitch);


createRoom.addEventListener('click', () => {
    socket.emit('createRoom')
});

joinRoom.addEventListener('click', () => {
    hintsAmount.disabled = true;
    timeLimit.disabled = true;
    mapSize.disabled = true;
    mapNumber.disabled = true;
    startGameBtn.disabled = true;
    colorAmount.disabled = true;
    canTouch.disabled = true;
    startGameBtn.style.display = "none";
    socket.emit('joinRoom', gameCode.value);
});

startGameBtn.addEventListener('click', () => {
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

// TODO: Start map is not needed to be sent by user (remove later)
changeMapBtn.addEventListener('click', () => {
    socket.emit('changeMap', {
        gameCode: clientRoom, 
        startMap: startMap, 
        currentMap: currentMap, 
        solvedColors: gameObj.solvedColors
    });
});

hintsBtn.addEventListener('click', () => {
    socket.emit('getHint', {
        startMap: startMap, 
        currentMap: currentMap, 
        solvedColors: gameObj.solvedColors,
        roomCode: clientRoom
    });
});

addKeyPressEvent([
    hintsAmount,
    timeLimit,
    mapSize,
    mapNumber,
    startGameBtn,
    colorAmount,
]);


canTouch.addEventListener('click', () => {
    socket.emit('updateSwitch', {
        id: canTouch.id, 
        isChecked: canTouch.checked,
        roomCode: clientRoom
    });
});

function animatePoints(points) {
    const test = document.getElementById('winner-points');
    let pt = 0;
    let intervalId = setInterval(() => {
        test.innerText = `${++pt} points`
        if(pt == points) {
            clearInterval(intervalId);
        } 
    }, 30);
}

function animatePlayerInfo(direction) {
    const playerInfo = document.getElementById('winner-info');
    if(direction == 'middle'){
        playerInfo.classList.add('move-middle');
        return;
    }

    playerInfo.classList.add('move-top');
    
}

//! Tests
let winnerGame = new Game('winner-maps', false);
const map = [
    ['R', '0', 'G', '0', 'O'],
    ['0', '0', 'B', '0', 'Y'],
    ['0', '0', '0', '0', '0'],
    ['0', 'G', '0', 'O', '0'],
    ['0', 'R', 'B', 'Y', '0'],
];
winnerGame.initialize(map, 5, 5);

let loserGame = new Game('loser-maps', false);
loserGame.initialize(map, 5, 5);


function createAlert(type, text) {
    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alertDiv')
    alertDiv.setAttribute('id','alertDiv');

    let icon = document.createElement('i');
    switch(type) {
        case 'error':
            icon.classList.add('fas');
            icon.classList.add('fa-times')
            icon.classList.add('fa-2x')
            break;
        case 'success':
            icon.classList.add('fas');
            icon.classList.add('fa-check-circle')
            icon.classList.add('fa-2x')
            break;
        case 'info':
            icon.classList.add('fas');
            icon.classList.add('fa-info-circle')
            icon.classList.add('fa-2x')
            break;
    }
    icon.classList.add('alertIcon');
    
    let span = document.createElement('span');
    span.classList.add('alertSpan');
    span.innerText = text;
    
    let bar = document.createElement('div');
    bar.classList.add('alertBar');
    
    const domElements = [alertDiv, icon, span, bar];
    
    for (const element of domElements) {
        element.classList.add(type);
    }
    
    alertDiv.appendChild(icon);
    alertDiv.appendChild(span);
    alertDiv.appendChild(bar);
    document.getElementById('alertBox').appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.classList.add('move');
        setTimeout(() => {
            alertDiv.classList.remove('move');
            setTimeout(() => {
                document.getElementById('alertBox').removeChild(alertDiv);
            }, 600);
        }, 2000);
    }, 100);
}

function addKeyPressEvent(inputArray) {
    for (const input of inputArray) {
        input.addEventListener('keyup', () => {
            socket.emit('updateInput', {
                id: input.id, 
                value: input.value,
                roomCode: clientRoom
            });
        });
    }
}

function updateInput(data) {
    const input = document.getElementById(data.id);
    input.value = data.value;
}

function updateSwitch(data) {
    const input = document.getElementById(data.id);
    input.checked = data.isChecked;
}

function test() {
    const cos = document.getElementById('gameEnd');
    cos.classList.add('move');
}

function timesUp() {
    
}

function hideButton() {
    changeMapBtn.style.display = "none";
}

function startTimer(timeLimit) {
    timer(timeLimit * 60, timeDisplay);
}

function displayHint(hint) {
    Draw.drawAfterGlow(hint.color, hint.map, gameObj.context, gameObj.tileW, gameObj.tileH);
}

function displayHintAmount(amount) {
    hintsDisplay.innerText = `Hints remaining: ${amount}`;
}

function displayPoints(points) {
    pointsDisplay.innerText = `${points} points`;
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

function displayAlert(alert) {
    createAlert(alert.type, alert.text);
    startGameBtn.disabled = false;
}

function handleHostGameStart(firstMap) {
    console.log("Game has started!")
    startScreen.style.display = "none";
    lobbyOptions.style.display = "none";
    gameScreen.style.display = "flex";

    hintsDisplay.innerText = `Hints remaining: ${hintsAmount.value}`;

    //! colorAmount.value, mapSize.value <-- This should be from server not from client
    // Setting the canvas and drawing the map
    gameObj = new Game('game', true);
    gameObj.initialize(firstMap, colorAmount.value, mapSize.value);
    // Copying current game map
    startMap = JSON.parse(JSON.stringify(firstMap));
    currentMap = firstMap;
}

function changeMap(nextMap) {
    gameObj.clear();
    startMap = JSON.parse(JSON.stringify(nextMap.map));
    currentMap = nextMap.map;
    gameObj.initialize(nextMap.map, nextMap.color, nextMap.size);
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
