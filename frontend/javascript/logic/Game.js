//! Comments with exlamation mark are for test purposes (they will be removed later)
// TODO: Add effects to clicking and connecting points + maybe rendering animation (if got time)
// TODO: Code needs to have less n^2 'FOR' loops
// TODO: Rewrite thing with end point pipes
var context = null;
var tileW, tileH, mapLength;
var canvas = null;


// Enums with localization of tiles
let currentPosition = {
    X: 0,
    Y: 0
}

let startPosition = {
    X: 0,
    Y: 0
}

let previousPosition = {
    X: 0,
    Y: 0
}

let endPosition = {
    X: 0,
    Y: 0
}

var selected = false;
var pressed = false;
var isMapDrawn = false;
var i = 0;

// Test divs variables
var current = null;
var end = null;
var mouse = null;
var gameMapArray = null;


// Enum with colors
var Colors = {
    r: "red",
    g: "green",
    b: "blue",
    y: "yellow",
    o: "orange",
    a: "aqua",
    p: "purple",
    l: "lime",
    n: "brown",
    w: "white",
    d: "darkblue",
    e: "grey",
};

// GAME MAP (for test purposes)
var gameMap = [
    ['g0', '0', '0', 'y0', '0', 'y0', 'a0', '0'],
    ['0', '0', '0', '0', 'g0', 'r0', '0', '0'],
    ['0', '0', 'o0', '0', '0', 'r0', '0', '0'],
    ['0', '0', '0', 'l0', '0', '0', '0', '0'],
    ['0', 'p0', '0', '0', 'o0', '0', '0', '0'],
    ['0', '0', 'l0', '0', '0', '0', '0', '0'],
    ['p0', '0', 'b0', 'a0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', 'b0', '0'],
];

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

};

function handleMouseUp(event) {
    // Removing the onmousemove event when mouse button is unpressed
    canvas.onmousemove = null;
    pressed = false;

    console.log("Mouse unpressed");

    

    // Redrawing a game when button is unpressed (to remove unlinked pipes)
    drawGame(event);
    // clearNotConntectedPipes(event.offsetX, event.offsetY);

    i = 0;
}

function handleMouseDown(event) {
    pressed = true;

    var mouseX = (Math.floor(event.offsetX / tileW) * tileW) / tileW;
    var mouseY = (Math.floor(event.offsetY / tileW) * tileW) / tileH;

    // If mouse is pressed on point all pipes with this color are removed
    if(gameMap[mouseY][mouseX].substr(1, 3) == '0'){
        for (var y = 0; y < mapLength; y++) {
            for (var x = 0; x < mapLength; x++) {

                // Clearing pipes
                if (gameMap[y][x].substr(0, 1) == gameMap[mouseY][mouseX].substr(0, 1) && parseInt(gameMap[y][x].substr(1, 3)) > 0) {
                    gameMap[y][x] = '0';

                    context.clearRect(x * tileH, y*tileW, tileW - 1, tileH - 1);
                   
                    drawSquares(x, y);

                    //! Developer tool
                   drawPosOfSquares(x, y);
                }

                // Clearing points
                if(gameMap[y][x].substr(0, 1) == gameMap[mouseY][mouseX].substr(0, 1) && parseInt(gameMap[y][x].substr(1, 2)) == 0) {
                    context.clearRect(x * tileH, y*tileW, tileW - 1, tileH - 1);
                    // TODO: Should be written better
                    // Redrawing squares and points (clearing the pipes from game map)
                    drawSquares(x, y);
                    drawPoint(x, y);

                    //! Developer tool
                    drawPosOfSquares(x, y);
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
                if (gameMap[y][x].substr(0, 1) == gameMap[startPosition.Y][startPosition.X].substr(0, 1) && parseInt(gameMap[y][x].substr(1, 3)) > 0) {
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
            drawPipe(Colors[gameMap[startPosition.Y][startPosition.X].substr(0, 1)], currentPosition, endPosition);
            // Drawing transparent tile when points are connected
            drawTransparent(gameMap[startPosition.Y][startPosition.X].substr(0, 1));
        }
    }
}

// TODO: Think about better option without 2x 'FOR' loops
function drawTransparent(point) {
    for (var y = 0; y < mapLength; y++) {
        for (var x = 0; x < mapLength; x++) {
            if(gameMap[y][x].substr(0,1) == point) {
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
    if (gameMap[y][x] > '0' && gameMap[y][x].substr(1, 3) == '0') {

        context.fillStyle = Colors[gameMap[y][x].substr(0, 1)];

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

                drawPosOfSquares(x, y);
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
            '0' is a blank space and substr(1, 3) == '0' tells that this is a point*/
            if (gameMap[startPosition.Y][startPosition.X] > '0' && gameMap[startPosition.Y][startPosition.X].substr(1, 3) == '0') {
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

                    mouseOffset(moveEvent);

                    //  Drawing a lines
                    if (gameMap[mouseMoveY][mouseMoveX] == '0') {
                        // 'IF' does not allow diagonal moves
                        if ((mouseMoveX == currentPosition.X + 1 && mouseMoveY == currentPosition.Y) || (mouseMoveX == currentPosition.X - 1 && mouseMoveY == currentPosition.Y)
                            || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y + 1) || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y - 1)) {
                            i++;
                            gameMap[mouseMoveY][mouseMoveX] = gameMap[startPosition.Y][startPosition.X].substr(0, 1) + i;
                            previousPosition.X = currentPosition.X;
                            previousPosition.Y = currentPosition.Y;
                            currentPosition.X = mouseMoveX;
                            currentPosition.Y = mouseMoveY;

                            // Drawing the pipe     
                            drawPipe(Colors[gameMap[startPosition.Y][startPosition.X].substr(0, 1)], previousPosition, currentPosition)
                        }
                    }
                    //! If users make 'back' move pipe should be removed and abbreviated 
                    // if(gameMap[mouseMoveY][mouseMoveX] ==) {
                    //     gameMap[mouseMoveY][mouseMoveX] = 0;
                    //     drawGame(event);
                    // }
                }
            }
        }
    }
    //! Developer tool
    gameDebugInfo(event);
}