//! Comments with exlamation mark are for test purposes (they will be removed later)
// TODO: Rewrite thing with end point pipes !IMPORTANT!

var SPEED = 30;

var context = null;
var tileW, tileH, mapLength;
var canvas = null;
var selected = false;
var pressed = false;
var isMapDrawn = false;

// Debug divs from DOM
var current = null;
var end = null;
var mouse = null;
var gameMapArray = null;
var checkBox = null;
var debugMode = true;
let satMap = [];

//! GAME MAP (for test purposes)
var gameMap = [
    ['R', '0', 'G', '0', 'O'],
    ['0', '0', 'B', '0', 'Y'],
    ['0', '0', '0', '0', '0'],
    ['0', 'G', '0', 'O', '0'],
    ['0', 'R', 'B', 'Y', '0'],
];

var solvedGameMap = [
    ['R', 'g', 'G', 'o', 'O'],
    ['r', 'g', 'B', 'o', 'Y'],
    ['r', 'g', 'b', 'o', 'y'],
    ['r', 'G', 'b', 'O', 'y'],
    ['r', 'R', 'B', 'Y', 'y'],
];

var numberOfColors = 5;

var colors;
var solvedColors = [];
var blockedColors = [];


window.onload = function () {
    // Getting the canvas and context from the HTML file
    canvas = document.getElementById('game');
    context = canvas.getContext("2d");

    requestAnimationFrame(drawGame);

    // Adding the event listeners for handling user events
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp)

    // Height and weight of a tile is equal to size of canvas divided by map size
    // Map size is always a square
    tileW = canvas.width / gameMap.length;
    tileH = canvas.height / gameMap.length;
    mapLength = gameMap.length;

    //! Debug divs
    current = document.getElementById('status');
    end = document.getElementById('end');
    mouse = document.getElementById('mouseMoved');
    gameMapArray = document.getElementById('gameMapArray');
    bugWithPipes = document.getElementById('bugWithPipes');
    checkBox = document.getElementById('debugCheckBox');

    var gameInfo = document.querySelector('.game-info');
    var solverInfo = document.querySelector('.solver-info');
    var satLog = document.getElementById('satLog');
    var solveTime = document.getElementById('solveTime');
    var solverComplexity = document.getElementById('solverComplexity');
    var completedMap = document.getElementById('completedMap');
    var solve = document.getElementById('solver');

    checkBox.addEventListener('change', function() {
        if (this.checked) {
            debugMode = true;
            gameInfo.style.display = 'block';
            solverInfo.style.display = 'block';
        } else {
            debugMode = false;
            gameInfo.style.display = 'none';
            solverInfo.style.display = 'none';
            drawGame(event)
        }
      });

    //!#######################################################!//
                //! Testing the SAT ALGORITHM !//

    // Global game map variable for test puropses
    satMap = [
        [1, 0, 2, 0, 3],
        [0, 0, 4, 0, 5],
        [0, 0, 0, 0, 0],
        [0, 2, 0, 3, 0],
        [0, 1, 4, 5, 0]
    ];
    // Enum with colors for test purposes
    const satColors = {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3,
        '5': 4,
        // '6': 6
    }
    const satNumberColors = 5;
    var satClass = new SAT(satMap, satColors, satNumberColors);
    satClass.main();
    var debugClauses = satClass.colorArray;
    satLog.value = "";

    satLog.value += `p cnf 126 ${debugClauses.length}\n`

    for(let i = 0; i < debugClauses.length; i++) {
        satLog.value += (debugClauses[i].toString()).replaceAll(",", " ") + " 0\n";
    }

    solveTime.innerHTML = `Solved in: ${satClass.time}`
    solverComplexity.innerHTML = `Clauses: ${debugClauses.length}`
    //!#######################################################!//  
    
    // MapGenerator.placePoints();

    //! Responsive canvas
    //TODO: Need to be done
    // window.addEventListener('resize', function() {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     tileW = canvas.width / gameMap.length;
    //     tileH = canvas.height / gameMap.length;
    //     isMapDrawn = false;
    //     drawGame(event);
    // });

    //! Timer test
    window.setTimeout(function() {
        var win = new Win();
        console.log(`Time is up - Points: ${win.checkWin(gameMap, solvedColors)}`);

    }, 30000);
};

function solveAll() {
    console.log("SOLVED ALL POINTS");
    var color;
    for (let index = 0; index < numberOfColors; index++) {
        color = Object.keys(Colors)[index];
        if(!solvedColors.includes(color)) {
            solvedColors.push(color);
            blockedColors.push(color);
            var path = new Path()
            path.drawPath(solvedGameMap, Object.keys(Colors)[index], SPEED);

            for (let y = 0; y < gameMap.length; y++) {
                for (let x = 0; x < gameMap.length; x++) {
                    if(solvedGameMap[y][x] == color.toLowerCase()) {
                        gameMap[y][x] = solvedGameMap[y][x];
                    }
                }
            }

        }
    }

    document.getElementById('solveAll').classList.add('hide');
    document.getElementById('solveOne').classList.add('hide');

}

// Solving one random color when it is not yet solved
function solveOne() {
    if(solvedColors.length != 5) {
        do {
            var randomColor = Object.keys(Colors)[Math.floor(Math.random() * numberOfColors)];
        } while(solvedColors.includes(randomColor))
    
        solvedColors.push(randomColor);
        blockedColors.push(randomColor);
    
        for (let y = 0; y < gameMap.length; y++) {
            for (let x = 0; x < gameMap.length; x++) {
                if(solvedGameMap[y][x] == randomColor.toLowerCase()) {
                    gameMap[y][x] = solvedGameMap[y][x];
                }
            }
        }
    
        var path = new Path();
        console.log(`SOLVED ONE POINT - ${randomColor}`);
        path.drawPath(solvedGameMap, randomColor, SPEED, blockedColors);
    }

}

function handleMouseUp(event) {
    // Removing the onmousemove event when mouse button is unpressed
    canvas.onmousemove = null;
    pressed = false;

    console.log("Mouse unpressed");

    // Redrawing a game when button is unpressed (to remove unlinked pipes)
    drawGame(event);
    // clearNotConntectedPipes(event.offsetX, event.offsetY);
}

function handleMouseDown(event) {
    pressed = true;
    var mouseX = (Math.floor(event.offsetX / tileW) * tileW) / tileW;
    var mouseY = (Math.floor(event.offsetY / tileW) * tileW) / tileH;

    // If mouse is pressed on point all pipes with this color are removed
    if(Utility.isUpper(gameMap[mouseY][mouseX]) && !blockedColors.includes(gameMap[mouseY][mouseX])){
        for (var y = 0; y < mapLength; y++) {
            for (var x = 0; x < mapLength; x++) {

                // Clearing pipes
                if (gameMap[y][x].toUpperCase() == gameMap[mouseY][mouseX] && !Utility.isUpper(gameMap[y][x])) {
                    gameMap[y][x] = '0';

                    context.clearRect(x * tileH, y*tileW, tileW - 1, tileH - 1);
                   
                    drawSquares(x, y);

                    //! Developer tool
                   Debug.drawPosOfSquares(x, y, debugMode);
                }

                // Clearing points
                if(gameMap[y][x].toUpperCase() == gameMap[mouseY][mouseX] && Utility.isUpper(gameMap[y][x])) {
                    context.clearRect(x * tileH, y*tileW, tileW - 1, tileH - 1);
                    // TODO: Should be written better
                    // Redrawing squares and points (clearing the pipes from game map)
                    drawSquares(x, y);
                    drawPoint(x, y);

                    //! Developer tool
                    Debug.drawPosOfSquares(x, y, debugMode);
                }
            }
        }
    }
 
    console.log("Mouse pressed");
    // Drawing game when mouse is pressed
    drawGame(event);
}

function clearNotConntectedPipes(mouseX, mouseY) {

    if (!(endPosition.X == mouseX && endPosition.Y == mouseY) || !((currentPosition.X == endPosition.X - 1 && currentPosition.Y == endPosition.Y) 
    || (currentPosition.X == endPosition.X + 1 && currentPosition.Y == endPosition.Y) || (currentPosition.X == endPosition.X && currentPosition.Y == endPosition.Y - 1)
    || (currentPosition.X == endPosition.X && currentPosition.Y == endPosition.Y + 1))) {
        for (var y = 0; y < mapLength; y++) {
            for (var x = 0; x < mapLength; x++) {
                if (gameMap[y][x].toUpperCase() == gameMap[startPosition.Y][startPosition.X] && !Utility.isUpper(gameMap[y][x])) {
                    gameMap[y][x] = '0';
                    context.clearRect(startPosition.X * tileH, startPosition.Y*tileW, tileW - 1, tileH - 1);
                    context.clearRect(endPosition.X * tileH, endPosition.Y*tileW, tileW - 1, tileH - 1);
                    context.clearRect(x * tileH, y*tileW, tileW - 1, tileH - 1);

                    // TODO: Should be written better
                    // Redrawing squares and points (clearing the pipes from game map)
                    drawSquares(startPosition.X, startPosition.Y);
                    drawSquares(endPosition.X, endPosition.Y);
                    drawSquares(x, y);
                    drawPoint(startPosition.X, startPosition.Y);
                    drawPoint(endPosition.X, endPosition.Y);
                }
            }
        }
    }
    // TODO: Should be changed 
    // Drawing pipe to end point
    else {
        if(mouseX == endPosition.X && mouseY == endPosition.Y){


            drawPipe(Colors[gameMap[startPosition.Y][startPosition.X]], currentPosition, endPosition);
            // Drawing the after glow of every pipe and point with that color
            drawAfterGlow(gameMap[startPosition.Y][startPosition.X]);
            solvedColors.push(gameMap[startPosition.Y][startPosition.X]);
        }
    }
}

// TODO: Think about better option without 2x 'FOR' loops
function drawAfterGlow(point) {
    for (var y = 0; y < mapLength; y++) {
        for (var x = 0; x < mapLength; x++) {
            if(gameMap[y][x].toUpperCase() == point) {
                context.globalAlpha = 0.2;
                context.fillStyle = Colors[point];
                context.fillRect(x * tileW, y * tileW, tileW, tileH);
                context.globalAlpha = 1.0;
            }
        }
    }
}


// Drawing pipes from mouse movement
function drawPipe(color, positionFrom, positionTo) {
    context.beginPath();
    context.moveTo(positionFrom.X * tileW + tileW / 2, positionFrom.Y * tileW + tileW / 2); // X, Y
    context.lineTo(positionTo.X  * tileW + tileW / 2, positionTo.Y  * tileW + tileW / 2);

    context.strokeStyle = color;
    context.lineCap = "round";
    context.lineWidth = tileW * 0.4;

    context.stroke();
    context.closePath();
}

function drawSquares(x, y) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "#FFF";
    context.fillStyle = "#121212";
    // Fill react needs to be commented if map is read from an array
    context.fillRect(x * tileW, y * tileH, tileW, tileH);
    context.strokeRect(x * tileW, y * tileH, tileW, tileH);    
}

// Drawing a point
function drawPoint(x, y) {
    if (gameMap[y][x] != '0') {

        context.fillStyle = Colors[gameMap[y][x]];

        var circle = new Path2D();
        circle.moveTo(x * tileW, y * tileH);
        circle.arc(x * tileW + tileW / 2, y * tileH + tileH / 2, tileW * .47, tileH * .47, 0, 360);
        context.fill(circle);
    }
}

function drawGame(event) {

    // Checking if canvas exists
    if (context == null) {
        return;
    }

    // Loops drawing map with points and pipes from gameMap object.
    for (var y = 0; y < mapLength; y++) {
        for (var x = 0; x < mapLength; x++) {
            // Full map with points is drawn only once (at startup)
            if (!isMapDrawn) {
                drawSquares(x, y)

                drawPoint(x, y);

                // Drawing map from game map array
                // drawPipe(x, y);

                //! Developer tool
                Debug.drawPosOfSquares(x, y, debugMode);
            }
        }
       
    }

    //Border is drawn only once
    isMapDrawn = true;

    // Coordinates of a mouse when mouse is pressed
    // TODO: Code it diffrent (note)
    var mouseX = (Math.floor(event.offsetX / tileW) * tileW) / tileW;
    var mouseY = (Math.floor(event.offsetY / tileW) * tileW) / tileH;

    if (!pressed) {
        // If tile with point is pressed then 'IF' statement is executed
        if (selected) {
            selected = false;

            // 'FOR' loops search for a tile with same color
            for (var y = 0; y < mapLength; y++) {
                for (var x = 0; x < mapLength; x++) {
                    if (!(x == startPosition.X && y == startPosition.Y) && gameMap[y][x] == gameMap[startPosition.Y][startPosition.X]) {
                        endPosition.X = x;
                        endPosition.Y = y;
                    }
                }
            }

            // Clearing the points and squares if the points are not connected
            clearNotConntectedPipes(mouseX, mouseY);
        }
    }
    else {
        // If no tile is selected then 'IF' statement is executed
        if (!selected) {
            startPosition.X = mouseX;
            startPosition.Y = mouseY;
            previousPosition.X = startPosition.X;
            previousPosition.Y = startPosition.Y;
            currentPosition.X = startPosition.X;
            currentPosition.Y = startPosition.Y;

            /* If tile with a point is selected then selected = true (it prevents from clicking an empty tile)
            If a value is upper case that tells that this is the point*/
            if (Utility.isUpper(gameMap[startPosition.Y][startPosition.X]) && !blockedColors.includes(gameMap[startPosition.Y][startPosition.X])) {
                selected = true;
                drawGame(event);
            }
        }
        else {
            // Adding the mousemove event after pressing the button (For test purposes) // it should help to draw a pipe
            // TODO: make this function public and write it apart from MouseDown function
            canvas.onmousemove = function (moveEvent) {
                // Canvas height and width are reduced by 3 to avoid moving on border of Map
                if (moveEvent.offsetX > 0 && moveEvent.offsetX <= canvas.width - 3 && moveEvent.offsetY > 0
                    && moveEvent.offsetY <= canvas.height - 3) {

                    var mouseMoveX = (Math.floor(moveEvent.offsetX / tileW) * tileW) / tileW;
                    var mouseMoveY = (Math.floor(moveEvent.offsetY / tileW) * tileW) / tileH;

                    //! Developer tool
                    Debug.mouseOffset(moveEvent, debugMode);

                    //  Drawing a lines
                    if (gameMap[mouseMoveY][mouseMoveX] == '0') {
                        // 'IF' does not allow diagonal moves
                        if ((mouseMoveX == currentPosition.X + 1 && mouseMoveY == currentPosition.Y) || (mouseMoveX == currentPosition.X - 1 && mouseMoveY == currentPosition.Y)
                            || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y + 1) || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y - 1)) {
                            gameMap[mouseMoveY][mouseMoveX] = gameMap[startPosition.Y][startPosition.X].toLowerCase();
                            previousPosition.X = currentPosition.X;
                            previousPosition.Y = currentPosition.Y;
                            currentPosition.X = mouseMoveX;
                            currentPosition.Y = mouseMoveY;

                            // Drawing the pipe     
                            drawPipe(Colors[gameMap[startPosition.Y][startPosition.X]], previousPosition, currentPosition)
                        }
                    }

                    //! If users make 'back' move pipe should be removed and abbreviated 
                    // if(gameMap[mouseMoveY][mouseMoveX] == gameMap[startPosition.Y][startPosition.X].toLowerCase()
                    // && mouseMoveY == previousPosition.Y && mouseMoveX == previousPosition.X) {
                    
                    // gameMap[currentPosition.Y][currentPosition.X] = 0;
                    // drawSquares(currentPosition.X, currentPosition.Y);
                    // currentPosition.X = mouseMoveX;
                    // currentPosition.Y = mouseMoveY;

                    // previousPosition.X = mouseMoveX; 
                    // previousPosition.Y = mouseMoveY + 1;
                    
                    // console.log(`Previous: ${previousPosition.Y}, ${previousPosition.X}`)
                    // console.log(`Current: ${currentPosition.Y}, ${currentPosition.X} `)
                    // }

                }
            }
        }
    }

    //! Developer tool
    Debug.gameDebugInfo(event, debugMode);
}
