const socket = io("http://localhost:3000");

// Main views
const startScreen = document.getElementById("start-screen");
const lobbyOptions = document.getElementById("lobby-options");
const gameScreen = document.getElementById("game-screen");
const nickname = document.getElementById("nickname");

// Other important stuff
const createRoom = document.getElementById("create-room");
const joinRoom = document.getElementById("join-room");
const gameCode = document.getElementById("game-code");
const codeDisplay = document.getElementById("code-display");
const connectedUsers = document.getElementById("connected-users");

// Lobby options
const hintsAmount = document.getElementById("hints-amount");
const timeLimit = document.getElementById("time-limit");
const mapSize = document.getElementById("map-size");
const mapNumber = document.getElementById("map-number");
const startGameBtn = document.getElementById("start-game");
const colorAmount = document.getElementById("color-amount");
const canTouch = document.getElementById("can-touch");
const progressAlert = document.querySelector(".progress-alert");
const progressBar = document.querySelector(".progress-bar");
const progressInfo = document.getElementById("progress-info");

// Users
const rowTwo = document.getElementById("row-two");
const rowThree = document.getElementById("row-three");
const userOne = document.getElementById("user-one");
const userTwo = document.getElementById("user-two");
const rows = [rowTwo, rowThree];
const users = [userOne, userTwo];

// Timer and points
const timeDisplay = document.getElementById("time-display");
const pointsDisplay = document.getElementById("points-display");

// Hints
const hintsBtn = document.getElementById("hints-btn");
const hintsDisplay = document.getElementById("hints-display");

// Change map btn
const changeMapBtn = document.getElementById("change-btn");

// Info at end view
const endScreen = document.getElementById("end-screen");
const winnerInfo = document.getElementById("winner-info");
const loserInfo = document.getElementById("loser-info");

// Buttons at end view
const winnerIncrease = document.getElementById("winner-increase");
const winnerReduce = document.getElementById("winner-reduce");
const loserIncrease = document.getElementById("loser-increase");
const loserReduce = document.getElementById("loser-reduce");
const resultDisplay = document.getElementById("result");
const leaveRoom = document.getElementById("leave-room");
const leaveRoomOne = document.getElementById("leave-room1");

let clientRoom = 0;
let gameObj = {};
let startMap = [];
let currentMap = [];

let winnerMaps = [];
let winnerIndex = 0;
let winnerGame = {};
let winnerMoves = [];

let loserMaps = [];
let loserIndex = 0;
let loserGame = {};
let loserMoves = [];

// Connecting client to and server room
socket.on("sendCode", (data) => {
  console.log(data);
  clientRoom = data;
});

// Display game code after creating the room
socket.on("displayGameCode", (data) => {
  codeDisplay.innerText = data;
});

// Handling server responses
socket.on("displayAlert", displayAlert);

socket.on("userConnected", handleUserConnected);
socket.on("init", init);

socket.on("hostGameStart", handleHostGameStart);
socket.on("showProgress", showProgress);
socket.on("updateProgress", updateProgress);
socket.on("hideProgress", hideProgress);

socket.on("changeMap", changeMap);
socket.on("displayHint", displayHint);
socket.on("displayHintAmount", displayHintAmount);
socket.on("displayPoints", displayPoints);
socket.on("startTimer", startTimer);
socket.on("timesUp", timesUp);
socket.on("hideButton", hideButton);
socket.on("updateInput", updateInput);
socket.on("updateSwitch", updateSwitch);
socket.on("gameEnded", gameEnded);
socket.on("displayResult", displayResult);
socket.on("resetUi", resetUi);

createRoom.addEventListener("click", () => {
  startGameBtn.style.display = "block";
  socket.emit("setNickname", nickname.value);
  socket.emit("createRoom");
});

joinRoom.addEventListener("click", () => {
  hintsAmount.disabled = true;
  timeLimit.disabled = true;
  mapSize.disabled = true;
  mapNumber.disabled = true;
  startGameBtn.disabled = true;
  colorAmount.disabled = true;
  canTouch.disabled = true;
  startGameBtn.style.display = "none";
  socket.emit("setNickname", nickname.value);
  socket.emit("joinRoom", gameCode.value);
});

startGameBtn.addEventListener("click", () => {
  startGameBtn.disabled = true;
  const options = {
    hintsAmount: hintsAmount.value,
    timeLimit: timeLimit.value,
    mapSize: mapSize.value,
    mapNumber: mapNumber.value,
    canTouch: canTouch.checked,
    colorAmount: colorAmount.value,
    roomCode: clientRoom,
  };
  socket.emit("startGame", options);
});

// TODO: Start map is not needed to be sent by user (remove later)
changeMapBtn.addEventListener("click", () => {
  socket.emit("changeMap", {
    gameCode: clientRoom,
    startMap: startMap,
    currentMap: currentMap,
    solvedColors: gameObj.solvedColors,
  });
});

hintsBtn.addEventListener("click", () => {
  socket.emit("getHint", {
    startMap: startMap,
    currentMap: currentMap,
    solvedColors: gameObj.solvedColors,
    roomCode: clientRoom,
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

canTouch.addEventListener("click", () => {
  socket.emit("updateSwitch", {
    id: canTouch.id,
    isChecked: canTouch.checked,
    roomCode: clientRoom,
  });
});

leaveRoomOne.addEventListener("click", () => {
  handleLeaveRoom();
});

leaveRoom.addEventListener("click", () => {
  handleLeaveRoom();
});

function animatePoints(pointsId, infoId, pointsW, pointsL, callback) {
  const pointsSpan = document.getElementById(pointsId);
  let pt = -1;
  let intervalId = setInterval(() => {
    pointsSpan.innerText = `${++pt} points`;
    if (pt == pointsW) {
      clearInterval(intervalId);
      animatePlayerInfo("", infoId);
      if (callback) {
        animateEndScreen("loser-points", "loser-info", pointsL, pointsW, false);
      }
    }
  }, 30);
}
// 'winner-info'
function animatePlayerInfo(direction, id) {
  const playerInfo = document.getElementById(id);
  if (direction == "middle") {
    playerInfo.classList.add("move-middle");
    return;
  }
  playerInfo.classList.remove("move-middle");
  playerInfo.classList.add("move-top");
}

function addChangeEvent(
  increase,
  map,
  moves,
  colors,
  mapIndex,
  gameRef,
  button
) {
  button.addEventListener("click", () => {
    gameRef.clear();

    let index = 0;
    if (increase) {
      index = ++mapIndex == map.length ? 0 : mapIndex;
      mapIndex = index;
    } else {
      index = --mapIndex == -1 ? map.length - 1 : mapIndex;
      mapIndex = index;
    }

    gameRef.initialize(map[index], 5, 5, moves[index], colors[index]);
  });
}

function createAlert(type, text) {
  let alertDiv = document.createElement("div");
  alertDiv.classList.add("alertDiv");
  alertDiv.setAttribute("id", "alertDiv");

  let icon = document.createElement("i");
  switch (type) {
    case "error":
      icon.classList.add("fas");
      icon.classList.add("fa-times");
      icon.classList.add("fa-2x");
      break;
    case "success":
      icon.classList.add("fas");
      icon.classList.add("fa-check-circle");
      icon.classList.add("fa-2x");
      break;
    case "info":
      icon.classList.add("fas");
      icon.classList.add("fa-info-circle");
      icon.classList.add("fa-2x");
      break;
  }
  icon.classList.add("alertIcon");

  let span = document.createElement("span");
  span.classList.add("alertSpan");
  span.innerText = text;

  let bar = document.createElement("div");
  bar.classList.add("alertBar");

  const domElements = [alertDiv, icon, span, bar];

  for (const element of domElements) {
    element.classList.add(type);
  }

  alertDiv.appendChild(icon);
  alertDiv.appendChild(span);
  alertDiv.appendChild(bar);
  document.getElementById("alertBox").appendChild(alertDiv);
  setTimeout(() => {
    alertDiv.classList.add("move");
    setTimeout(() => {
      alertDiv.classList.remove("move");
      setTimeout(() => {
        document.getElementById("alertBox").removeChild(alertDiv);
      }, 600);
    }, 2000);
  }, 100);
}

function addKeyPressEvent(inputArray) {
  for (const input of inputArray) {
    input.addEventListener("keyup", () => {
      socket.emit("updateInput", {
        id: input.id,
        value: input.value,
        roomCode: clientRoom,
      });
    });
  }
}

function gameEnded(data) {
  endScreen.classList.add("move");
  animateEndScreen(
    "winner-points",
    "winner-info",
    data.won.points + data.won.currentPoints,
    data.lost.points + data.lost.currentPoints,
    true
  );

  console.log(data);

  const winner = document.getElementById("winner-name");
  const loser = document.getElementById("loser-name");
  winner.innerText = data.won.nickname;
  loser.innerText = data.lost.nickname;

  winnerMaps = data.won.finishedMaps;
  winnerColors = data.won.solvedColors;
  winnerMoves = data.won.moves;

  loserMaps = data.lost.finishedMaps;
  loserColors = data.lost.solvedColors;
  loserMoves = data.lost.moves;

  console.log(winnerMoves);
  console.log(loserMoves);

  winnerGame = new Game("winner-maps", false);
  winnerGame.initialize(
    winnerMaps[0],
    data.colors,
    data.size,
    winnerMoves[0],
    winnerColors[0]
  );
  loserGame = new Game("loser-maps", false);
  loserGame.initialize(
    loserMaps[0],
    data.colors,
    data.size,
    loserMoves[0],
    loserColors[0]
  );

  console.log(winnerMaps.length);
  console.log(winnerMaps);
  if (winnerMaps.length == 1) {
    winnerIncrease.style.display = "none";
    winnerReduce.style.display = "none";
    loserIncrease.style.display = "none";
    loserReduce.style.display = "none";
    return;
  }

  addChangeEvent(
    true,
    winnerMaps,
    winnerMoves,
    winnerColors,
    winnerIndex,
    winnerGame,
    winnerIncrease
  );
  addChangeEvent(
    false,
    winnerMaps,
    winnerMoves,
    winnerColors,
    winnerIndex,
    winnerGame,
    winnerReduce
  );
  addChangeEvent(
    true,
    loserMaps,
    loserMoves,
    loserColors,
    loserIndex,
    loserGame,
    loserIncrease
  );
  addChangeEvent(
    false,
    loserMaps,
    loserMoves,
    loserColors,
    loserIndex,
    loserGame,
    loserReduce
  );
}

function displayResult(result) {
  resultDisplay.innerText = result;
}

function resetUi() {
  startScreen.style.display = "flex";
  lobbyOptions.style.display = "none";
  gameScreen.style.display = "none";
  resultDisplay.innerText = "";
  winnerInfo.classList.remove("move-top");
  loserInfo.classList.remove("move-top");
  endScreen.classList.remove("move");
  clientRoom = 0;
  gameObj = {};
  startMap = [];
  currentMap = [];
  winnerMaps = [];
  winnerIndex = 0;
  winnerMoves = [];
  loserMaps = [];
  loserIndex = 0;
  loserMoves = [];
  rows[0].style.display = "none";
  rows[1].style.display = "none";
  users[0].innerText = "";
  users[1].innerText = "";
}

function animateEndScreen(pointsDOM, infoDOM, pointsW, pointsL, callback) {
  animatePlayerInfo("middle", infoDOM);
  animatePoints(pointsDOM, infoDOM, pointsW, pointsL, callback);
}

function updateInput(data) {
  const input = document.getElementById(data.id);
  input.value = data.value;
}

function updateSwitch(data) {
  const input = document.getElementById(data.id);
  input.checked = data.isChecked;
}

function timesUp() {}

function hideButton() {
  changeMapBtn.style.display = "none";
}

function startTimer(timeLimit) {
  timer(timeLimit * 60, timeDisplay);
}

function displayHint(hint) {
  Draw.drawAfterGlow(
    hint.color,
    hint.map,
    gameObj.context,
    gameObj.tileW,
    gameObj.tileH
  );
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

function handleLeaveRoom() {
  console.log("YOOOO");
  socket.emit("leaveRoom");
}

function handleUserConnected(players) {
  init();
  rows[0].style.display = "none";
  rows[1].style.display = "none";
  users[0].innerText = "";
  users[1].innerText = "";
  for (let i = 1; i <= players.length; i++) {
    // Display users
    rows[i - 1].style.display = "flex";
    users[i - 1].innerText = players[i - 1].nickname;
  }
}

function displayAlert(alert) {
  createAlert(alert.type, alert.text);
  startGameBtn.disabled = false;
}

function updateProgress(progress) {
  progressBar.style.width = progress + "%";
  progressInfo.innerText = "Generating maps...";
}

function showProgress() {
  progressAlert.classList.add("move");
}

function hideProgress() {
  progressAlert.classList.remove("move");
  progressBar.style.width = 0 + "%";
  progressInfo.innerText = "Initializing...";
}

function handleHostGameStart(firstMap) {
  startScreen.style.display = "none";
  lobbyOptions.style.display = "none";
  gameScreen.style.display = "flex";

  hintsDisplay.innerText = `Hints remaining: ${hintsAmount.value}`;
  //! colorAmount.value, mapSize.value <-- This should be from server not from client
  // Setting the canvas and drawing the map
  gameObj = new Game("game", true);
  gameObj.initialize(firstMap, colorAmount.value, mapSize.value);
  // Copying current game map
  startMap = JSON.parse(JSON.stringify(firstMap));
  currentMap = firstMap;
}

function changeMap(nextMap) {
  gameObj.clear();
  startMap = JSON.parse(JSON.stringify(nextMap.map));
  currentMap = nextMap.map;
  gameObj.initialize(nextMap.map, nextMap.colors, nextMap.size);
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

    if (--timer < 0) {
      timer = time;
    }
  }, 1000);
}
