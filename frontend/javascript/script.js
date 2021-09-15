//! Comments with exlamation mark are for test purposes (they will be removed later)
// TODO: Add effects to clicking and connecting points + maybe rendering animation
// TODO: Code needs to be cleaned up IMPORTANT
// TODO: Code needs to have less n^2 'FOR' loops
// TODO: Do a faster searching by quickSort or other algorithm of gameMap object
// TODO: Some code should be moved to separate functions to make code more readable
var context = null;
var tileW, tileH, mapLength;
var canvas = null;

let currentPosition = {
    X: 0,
    Y: 0
}

let startPosition = {
    X: 0,
    Y: 0
}


// X and Y coordinate of the second tile with a point with this same color
var endX = null, endY = null;

var selected = false;
var pressed = false;
var vwin = false;
var isMapDrawn = false;


// Test divs variables
var current = null;
var end = null;
var mouse = null;
var gameMapArray = null;
var i = 0;


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
    9: "brown",
    10: "lime",
    11: "",
    12: "",
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

//     [1, 0, 2, 0, 4],
//     [0, 0, 3, 0, 5],
//     [0, 0, 0, 0, 0],
//     [0, 2, 0, 4, 0],
//     [0, 1, 3, 5, 0],

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

    console.log("Mouse pressed");

    // Drawing game when mouse is pressed
    drawGame(event);
}

function clearNotConntectedPipes(mouseX, mouseY) {
    if (!(endX == mouseX && endY == mouseY)) {
        for (var y = 0; y < mapLength; y++) {
            for (var x = 0; x < mapLength; x++) {
                if (gameMap[y][x].substr(0, 1) == gameMap[startPosition.Y][startPosition.X].substr(0, 1) && parseInt(gameMap[y][x].substr(1, 3)) > 0) {
                    gameMap[y][x] = '0';
                    context.clearRect(startPosition.X * tileH, startPosition.Y*tileW, tileW - 1, tileH - 1);
                    context.clearRect(endX * tileH, endY*tileW, tileW - 1, tileH - 1);
                    context.clearRect(x * tileH, y*tileW, tileW - 1, tileH - 1);

                    // TODO: Should be written better
                    // Redrawing squares and points (clearing the pipes from game map)
                    drawSquares(startPosition.X, startPosition.Y);
                    drawSquares(endX, endY);
                    drawSquares(x, y);
                    drawPoint(startPosition.X, startPosition.Y);
                    drawPoint(endX, endY);
                    // drawMap(x, y)
                }
            }
        }
    }
}

function drawPipe(x, y) {

    // Drawing pipes (every point has a value of an color plus 0 (e.g r0 - stands for red point).
    // Pipes has a value of color and a number of a pipe (e.g r5 - stand for red fifth pipe that
    // only connecting with r4 and r6 it allows to draw pipes close to each other without weird renedring)
    // TODO: Try to simplify logic behind drawing a pipe
    if (parseInt(gameMap[y][x].substr(1, 3)) > 0) {
        context.beginPath();

        if ((y > 0 && (parseInt(gameMap[y - 1][x].substr(1, 3)) == parseInt(gameMap[y][x].substr(1, 3)) - 1) && gameMap[y - 1][x] != '0')
            && gameMap[y - 1][x].substr(0, 1) == gameMap[y][x].substr(0, 1)) {
            console.log("Down")

            context.moveTo(x * tileW + tileW / 2, (y - 1) * tileW + tileW / 2);
            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
        }
        else if ((y < gameMap.length - 1 && (parseInt(gameMap[y + 1][x].substr(1, 3)) == parseInt(gameMap[y][x].substr(1, 3)) - 1) && gameMap[y + 1][x] != '0'
            && gameMap[y + 1][x].substr(0, 1) == gameMap[y][x].substr(0, 1))) {
            console.log("Up")

            context.moveTo(x * tileW + tileW / 2, (y + 1) * tileW + tileW / 2);
            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
        }
        else if (x > 0 && (parseInt(gameMap[y][x - 1].substr(1, 3)) == parseInt(gameMap[y][x].substr(1, 3)) - 1
            || (gameMap[y][x - 1] == gameMap[y][x - 1].substr(0, 3) && gameMap[y][x] == gameMap[y][x].substring(0, 1) - 1) && gameMap[x - 1][x] != '0')
            && gameMap[y][x - 1].substr(0, 1) == gameMap[y][x].substr(0, 1)) {
            console.log("Right")
            context.moveTo((x - 1) * tileW + tileW / 2, y * tileW + tileW / 2);
            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
        }
        else if (x < gameMap.length - 1 && (parseInt(gameMap[y][x + 1].substr(1, 3)) == parseInt(gameMap[y][x].substr(1, 3)) - 1
            || (gameMap[y][x + 1] == gameMap[y][x + 1].substr(0, 3) && gameMap[y][x] == gameMap[y][x].substring(0, 1) - 1) && gameMap[y][x + 1] != '0')
            && gameMap[y][x + 1].substr(0, 1) == gameMap[y][x].substr(0, 1)) {
            console.log("Left")
            context.moveTo((x + 1) * tileW + tileW / 2, y * tileW + tileW / 2);
            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
        }

        context.strokeStyle = Colors[gameMap[y][x].substr(0, 1)];
        context.lineCap = "round";
        context.lineWidth = tileW * 0.4;
        context.stroke();
        context.closePath();
    }
}


// Drawing a squares
function drawSquares(x, y) {
    context.lineWidth = 2;
    context.strokeStyle = "#FFF";
    context.fillStyle = "#121212";
    context.fillRect(x * tileW, y * tileH, tileW, tileH);
    context.strokeRect(x * tileW, y * tileH, tileW, tileH);
}

// Drawing a point
function drawPoint(x, y) {
    if (gameMap[y][x] > '0' && gameMap[y][x].substr(1, 3) == '0') {

        context.fillStyle = Colors[gameMap[y][x].substr(0, 1)];

        var circle = new Path2D();
        circle.moveTo(x * tileW, y * tileH);
        circle.arc(x * tileW + tileW / 2, y * tileH + tileH / 2, tileW * .45, tileH * .45, 0, 360);
        context.fill(circle);
    }
}

// Drawing a map
// TODO: Think if this function is even needed
function drawMap(x, y) {


    // Drawing a border around map and around squares
    drawSquares(x, y)

    // Drawing points
    drawPoint(x, y);

    //! Drawing a position of every tile
    context.fillStyle = "#FFF";
    context.fillText("(X:" + x * tileW + ", Y:" + y * tileH + ")", x * tileW, y * tileH + 10);
}


function drawGame(event) {

    // Clearing the canvas
    // context.clearRect(0, 0, canvas.width, canvas.height);

    // Checking if canvas exists
    if (context == null) {
        return;
    }

    // Loops drawing map with points and pipes from gameMap object.
    for (var y = 0; y < mapLength; y++) {
        for (var x = 0; x < mapLength; x++) {
            // Full map with points is drawn only once (at startup)
            if (!isMapDrawn) {
                drawMap(x, y);
                // TODO: Draw pipe below helps to draw a pipes automaticaly from gameMap array
                // TODO: it may help with multiplayer version (worth to check)
                //drawPipe(x, y);
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
                        endX = x;
                        endY = y;
                    }
                }
            }

            if ((endX == currentPosition.X + 1 && endY == currentPosition.Y) || (endX == currentPosition.X - 1 && endY == currentPosition.Y)
            || (endX == currentPosition.X && endY == currentPosition.Y + 1) || (endX == currentPosition.X && endY == currentPosition.Y - 1)) {
                console.log("im in")
                if(parseInt(gameMap[currentPosition.Y + 1][currentPosition.X].substr(1, 3)) == 0 ) {
                    context.beginPath();
                    context.moveTo(currentPosition.X * tileW + tileW / 2, currentPosition.Y * tileW + tileW / 2);
                    context.lineTo(endX * tileW + tileW / 2, endY * tileW + tileW / 2);
                    context.strokeStyle = Colors[gameMap[endY][endX].substr(0, 1)];
                    context.lineCap = "round";
                    context.lineWidth = tileW * 0.4;
                    context.stroke();
                    context.closePath();
                }

        }

            // Clearing the points and squares where pipe is drawn
            clearNotConntectedPipes(mouseX, mouseY);
        }
    }
    else {
        // If no tile is selected then 'IF' statement is executed
        if (!selected) {
            startPosition.X = mouseX;
            startPosition.Y = mouseY;
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

                    //! Mouse div showing current position of mouse when button is hold
                    mouse.innerHTML = "Mouse(X, Y): " + moveEvent.offsetX + ", " + moveEvent.offsetY;

                    //  Drawing a lines
                    if (gameMap[mouseMoveY][mouseMoveX] == '0') {
                        // 'IF' does not allow diagonal moves
                        if ((mouseMoveX == currentPosition.X + 1 && mouseMoveY == currentPosition.Y) || (mouseMoveX == currentPosition.X - 1 && mouseMoveY == currentPosition.Y)
                            || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y + 1) || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y - 1)) {
                            i++;
                            gameMap[mouseMoveY][mouseMoveX] = gameMap[startPosition.Y][startPosition.X].substr(0, 1) + i;

                            currentPosition.X = mouseMoveX;
                            currentPosition.Y = mouseMoveY;

                            // Drawing the pipe
                            drawPipe(mouseMoveX, mouseMoveY);
                        }
                    }
                    //! If users make 'back' move pipe should be removed and abbreviated 
                    // if(gameMap[mouseMoveY][mouseMoveX] ==) {
                    //     gameMap[mouseMoveY][mouseMoveX] = 0;
                    //     drawGame(event);
                    // }
                }
                else {
                    // Mouse went outside of game map so drawing is canceled
                    // TODO: Think if this is needed
                    handleMouseUp(event);
                }
            }
        }
    }
    developerMode(true, event);
}

// Developer tools
// TODO: make separate class with this kind of things
function developerMode(isModeOn, event) {
    if(isModeOn) {
        //! Information for debugging
        //! Position of clicked rectangle and positon of square with the point (same color)
        end.innerHTML = "startPosition.X, startPosition.Y: " + startPosition.X + " " + startPosition.Y + "<br />EndX, EndY: " + endX + " " + endY;

        //! Information for debugging
        //! Position of clicked rectangle, offset of the mouse (x, y) and full array of the current game map
        current.innerHTML = "Rect(X,Y): " + Math.floor(event.offsetX / tileW) * tileW +
            ", " + Math.floor(event.offsetY / tileW) * tileW + "<br />Offset: " + event.offsetX + ", " + event.offsetY
            + "<br />Array: ";

        //! Priting out gameMap array to HTML div
        gameMapArray.innerHTML = "";
        for (var y = 0; y < mapLength; y++) {
            for (var x = 0; x < mapLength; x++) {
                gameMapArray.innerHTML += gameMap[y][x] + " ";
            }
            gameMapArray.innerHTML += "<br />";
        }
    }

}

