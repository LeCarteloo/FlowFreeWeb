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

let previousPosition = {
    X: 0,
    Y: 0
}

// X and Y coordinate of the second tile with a point with this same color
var endX = null, endY = null;

selected = Boolean(false);
pressed = Boolean(false);
win = Boolean(false);

// Test divs variables
var current = null;
var end = null;
var mouse = null;
var gameMapArray = null;

// Enum with colors
var Colors = {
    1: "red",
    2: "green",
    3: "blue",
    4: "yellow",
    5: "orange",
    6: "aqua",
    7: "purple",
    8: "pink",
    9: "brown",
    10: "",
    11: "",
    12: "",
};

// GAME MAP (for test purposes)
var gameMap = [
    [1, 0, 2, 0, 4],
    [0, 0, 3, 0, 5],
    [0, 0, 0, 0, 0],
    [0, 2, 0, 4, 0],
    [0, 1, 3, 5, 0],
];

window.onload = function() {
    // Getting the canvas and context from the HTML file
    canvas = document.getElementById('game');
    context = canvas.getContext("2d");

    requestAnimationFrame(drawGame);

    // Adding the event listeners for handling user events
    canvas.addEventListener('mousedown',handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp)

    // Height and weight of a tile is equal to size of canvas divided by map size
    // Map size is always a square
    tileW = canvas.width/gameMap.length;
    tileH = canvas.height/gameMap.length;
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
}

function handleMouseDown(event) {
    pressed = true;

    console.log("Mouse pressed");

    // Drawing game when mouse is pressed
    drawGame(event);
}

function drawGame(event) {
    // Clearing the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Checking if canvas exists
    if(context==null) {
        return;
    }

    // Loops drawing map with points and pipes from gameMap object.
    for(var y = 0; y < mapLength; y++) { 
        for(var x = 0; x < mapLength; x++){
            context.lineWidth = 2;
            // Drawing a border of map
            context.strokeStyle = "#FFF";
            context.strokeRect(x * tileW, y * tileH, tileW, tileH);

            // Using the enum with colors to draw points and pipes (If point is higher than 100 then it's getting lovered by 100)
            // context.fillStyle = Colors[(gameMap[y][x] > 100) ? gameMap[y][x] - 100 : gameMap[y][x]];
            context.fillStyle = Colors[gameMap[y][x]];

            // Drawing points (points are numbers above 0 and less than 100)
            if(gameMap[y][x] > 0 && gameMap[y][x] < 100) {
                // context.fillRect(x*titleW, y*titleH, titleW, titleH) <- drawing the background of tiles
                var circle = new Path2D();
                circle.moveTo(x * tileW, y * tileH);
                circle.arc(x * tileW + tileW / 2, y * tileH + tileH / 2 , tileW * .45 , tileH * .45, 0, 360);
                context.fill(circle);
            }
            // Drawing pipes (every pipe at the moment have number equals - point number plus one hundred)
            if(gameMap[y][x] > 100) {
                console.log("inside");
                drawPipe(Colors[gameMap[y][x] - 100], previousPosition, currentPosition)
                // context.fillRect(x * tileW, y * tileH, tileW - 20, tileH - 20);
            } 

            //! Printing a position of every tile
            context.fillStyle = "#FFF";
            context.fillText("(" + x * tileW + ", "  + y * tileH+ ")", x * tileW, y * tileH + 10);
   
        }
    }

    // Coordinates of a mouse when mouse is pressed
    var mouseX = (Math.floor(event.offsetX / tileW) * tileW) / tileW;
    var mouseY = (Math.floor(event.offsetY / tileW) * tileW) / tileH;

    if(!pressed) {       
        // If tile with point is pressed then 'IF' statement is executed
        if(selected) {
            selected = false;

            // 'FOR' loops search for a tile with same color
            for(var y = 0; y < mapLength; y++) {
                for (var x = 0; x < mapLength; x++) {
                    // console.log(gameMap[y][x] + ", " + gameMap[startPosition.Y][startPosition.X]);
                    if(!(x == startPosition.X && y == startPosition.Y) && gameMap[y][x] == gameMap[startPosition.Y][startPosition.X]) {
                        endX = x;
                        endY = y;
                    }
                }
            }
            // Clearing the board if points ain't connected (removing the specific pipes)
            //!  || (gameMap[mouseY][mouseX] != 0  && gameMap[mouseY][mouseX] != gameMap[endY][endX]) <- just testing
            if(!(endX == mouseX && endY == mouseY)) {
                for(var y = 0; y < mapLength; y++) {
                    for (var x = 0; x < mapLength; x++) {
                        if(gameMap[y][x] == gameMap[startPosition.Y][startPosition.X] + 100) {
                            gameMap[y][x] = 0;
                        }
                    }
                }
                drawGame(event);
            }
        }
    }
    else {
        // If no tile is selected then 'IF' statement is executed
        if(!selected) {
            startPosition.X = mouseX;
            startPosition.Y = mouseY;
            previousPosition.X = startPosition.X;
            previousPosition.Y = startPosition.Y;
            currentPosition.X = startPosition.X;
            currentPosition.Y = startPosition.Y;

            /* If tile with a point is selected then selected = true (it prevents from clicking an empty tile)
            0 is a blank space and numbers above 100 are pipes*/ 
            console.log(startPosition)
            if(gameMap[startPosition.Y][startPosition.X] > 0 && gameMap[startPosition.Y][startPosition.X] < 100) {
                selected = true;
                drawGame(event);
            }
        }
        else {
            // Adding the mousemove event after pressing the button (For test purposes) // it should help to draw a pipe
            // TODO: make this function public and write it apart from MouseDown function
            canvas.onmousemove = function(moveEvent) {
                // Canvas height and width are reduced by 3 to avoid moving on border of Map
                if(moveEvent.offsetX > 0 && moveEvent.offsetX <= canvas.width - 3 && moveEvent.offsetY > 0 
                    && moveEvent.offsetY <= canvas.height - 3) {
                        
                        var mouseMoveX = (Math.floor(moveEvent.offsetX / tileW) * tileW) / tileW;
                        var mouseMoveY = (Math.floor(moveEvent.offsetY / tileW) * tileW) / tileH;

                        //! Mouse div showing current position of mouse when button is hold
                        mouse.innerHTML = "Mouse(X, Y): " + moveEvent.offsetX + ", " + moveEvent.offsetY;
                        
                        //  Drawing a lines
                        if(gameMap[mouseMoveY][mouseMoveX] == 0) {
                            // 'IF' does not allow diagonal moves
                            if((mouseMoveX == currentPosition.X + 1 && mouseMoveY == currentPosition.Y) || (mouseMoveX == currentPosition.X - 1 && mouseMoveY == currentPosition.Y) 
                            || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y + 1) || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y - 1)) {
                                gameMap[mouseMoveY][mouseMoveX] = gameMap[startPosition.Y][startPosition.X] + 100;
                                // Saving the previous position for drawing the Pipe
                                previousPosition.X = currentPosition.X;
                                previousPosition.Y = currentPosition.Y;

                                currentPosition.X = mouseMoveX;
                                currentPosition.Y = mouseMoveY;
                                // Clearing and redrawing a gameMap to avoid drawing points top of each other.
                                // TODO: Check how this impact performance
                                drawPipe(Colors[gameMap[startPosition.Y][startPosition.X]], previousPosition, currentPosition)
                                // drawGame(event);
                            }
                        }
                        //! If users make 'back' move pipe should be removed and abbreviated 
                        // if(gameMap[mouseMoveY][mouseMoveX] ==) {
                        //     gameMap[mouseMoveY][mouseMoveX] = 0;
                        //     drawGame(event);
                        // }
                }
                else {
                    handleMouseUp(event);
                }
            }
        }
    }

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
    for(var y = 0; y < mapLength; y++) {
        for(var x = 0; x < mapLength; x++) {
            gameMapArray.innerHTML += gameMap[y][x] + " ";
        }
        gameMapArray.innerHTML += "<br />";
    }

}

function drawPipe(color, positionFrom, positionTo) {
    console.log("Previous position (X,Y): " + positionFrom.X + positionFrom.Y)
    console.log("Current position (X,Y): " + positionTo.X + positionTo.Y)

    console.log("Color: " + color)

    context.beginPath();
    context.moveTo(positionFrom.X * 100 + 50, positionFrom.Y * 100 + 50); // X, Y
    context.lineTo(positionTo.X * 100 + 50, positionTo.Y * 100 + 50);
    
    // context.fillRect(positionTo.X * tileW, positionTo.Y * tileH, tileW - 20, tileH - 20);

    context.strokeStyle = color;
    context.lineCap = "round";
    context.lineWidth = tileW * 0.4;

    context.stroke();
    context.closePath();
}
