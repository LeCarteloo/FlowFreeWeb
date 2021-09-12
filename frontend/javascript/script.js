//! Comments with exlamation mark are for test purposes (they will be deleted later)
// TODO: After completing level, drawing a pipes, connecting them to the points and win condition
// TODO: Code needs to be cleaned up IMPORTANT
// TODO: Code needs to have less n^2 'FOR' loops
// TODO: Do a faster searching by gameMap quickSort or other algorithm
var context = null;
var tileW, tileH, mapW, mapH;
var canvas = null;

var currentX, currentY, startX, startY;
selected = Boolean(false);
win = Boolean(false);

//Test divs variables
var current = null;
var end = null;
var mouse = null;
var gameMapArray = null;

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
    mapW = gameMap.length;
    mapH = gameMap.length;

    //! Debug divs
    current = document.getElementById('status');
    end = document.getElementById('end');
    mouse = document.getElementById('mouseMoved');
    gameMapArray = document.getElementById('gameMapArray');

};

// Fitting the tiles into the size of a canvas


function handleMouseUp(event) {
    // Removing the onmousemove event when mouse button is unpressed
    canvas.onmousemove = null;

    console.log("Mouse unpressed");

    //! Variables of coordinate of a mouse when mouse is pressed TESTS
    var mouseX = (Math.floor(event.offsetX / tileW) * tileW) / 100;
    var mouseY = (Math.floor(event.offsetY / tileW) * tileW) / 100;
    
    // If tile with point is pressed then 'IF' statement is executed
    if(selected) {
        selected = false;

        // X and Y coordinate of the second tile with a point with this same color
        var endX = 0, endY = 0;

        // 'FOR' loops search for a tile with same color
        for(var y = 0; y < mapH; y++) {
            for (var x = 0; x < mapW; x++) {
                // console.log(gameMap[y][x] + ", " + gameMap[startY][startX]);
                if(!(x == startX && y == startY) && gameMap[y][x] == gameMap[startY][startX]) {
                    endX = x;
                    endY = y;
                }
            }
        }

        // Clearing the board if points ain't connected (wiping the pipe)
        console.log(endX + " " + endY + " " + mouseX + " " + mouseY);
        if(!(endX == mouseX && endY == mouseY)) {
            for(var y = 0; y < mapH; y++) {
                for (var x = 0; x < mapW; x++) {
                    if(gameMap[y][x] == gameMap[startY][startX] + 100) {
                        gameMap[y][x] = 0;
                    }
                }
            }
            // TODO: Clearing the canvas should be moved to separate function with drawGame()
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGame();
        }
    }

    //! Information for debugging
    //! Position of clicked rectangle and positon of triangle with the point (same color)
    end.innerHTML = "StartX, StartY: " + startX + " " + startY + "<br />EndX, EndY: " + endX + " " + endY;
}

function handleMouseDown(event) {
    console.log("Mouse pressed");

    // Variables of coordinate of a mouse when mouse is pressed
    var mouseX = (Math.floor(event.offsetX / tileW) * tileW) / 100;
    var mouseY = (Math.floor(event.offsetY / tileW) * tileW) / 100;

    // If no tile is selected then 'IF' statement is executed
    if(!selected) {
        startX = mouseX;
        startY = mouseY;
        currentX = startX;
        currentY = startY;

        // If tile with a point is selected then selected = true (it prevents from clicking an empty tile)
        if(gameMap[startY][startX] > 0 && gameMap[startY][startX] < 100) {
            selected = true;
            // Adding the mousemove event after pressing the button (For test purposes) // it should help to draw a pipe
            // TODO: make this function public and write it apart from MouseDown function
            canvas.onmousemove = function(event) {
                    if(event.offsetX > 0 && event.offsetX <= canvas.width && event.offsetY > 0 && event.offsetY <= canvas.height) {
                    //! Mouse div showing current position of mouse when button is hold
                    mouse.innerHTML = "Mouse(X, Y): " + event.offsetX + ", " + event.offsetY;
                    //  Drawing a lines
                    // TODO: This 'IF' needs to be rewrited it's too long
                    if(gameMap[(Math.floor(event.offsetY / tileW) * tileW) / 100][(Math.floor(event.offsetX / tileW) * tileW) / 100] == 0) {
                        
                        gameMap[(Math.floor(event.offsetY / tileW) * tileW) / 100][(Math.floor(event.offsetX / tileW) * tileW) / 100] = gameMap[mouseY][mouseX] + 100;
                    
                        // Clearing and redrawing a gameMap to avoid drawing points top of each other.
                        // TODO: Check how this impact performance
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        drawGame();
                    }
                    //! Trying to disable moving through other points
                    // if(!(gameMap[(Math.floor(event.offsetY / tileW) * tileW) / 100][(Math.floor(event.offsetX / tileW) * tileW) / 100] == gameMap[startY][startX] 
                    // && gameMap[(Math.floor(event.offsetY / tileW) * tileW) / 100][(Math.floor(event.offsetX / tileW) * tileW) / 100] == 0)) {
                    //     canvas.onmousemove = null;
                    //     handleMouseUp(event);
                    // }
                    
                }
                else {
                    canvas.onmousemove = null;
                    handleMouseUp(event);
                }
            }
        }
    }
    else {
        var x = mouseX;
        var y = mouseY;
        if(x >= 0 && y >= 0 && y < gameMap.length && x < gameMap.length && gameMap[y][x]==0) {
            if( (x == currentX + 1 && y == currentY) || (x == currentX - 1 && y == currentY) 
            || (x == currentX && y == currentY + 1) || (x == currentX + 1 && y == currentY - 1)) {
                gameMap[y][x] = gameMap[startY][startX] + 100;
                currentX = x;
                currentY = y;           
            }
        
        }
    }

    // Drawing a line
    /* context.beginPath();
    context.moveTo(mouseX*tileH + 50, mouseY*tileW + 50);
    context.lineTo(50,150);
    context.lineWidth = 20;
    context.strokeStyle = "red";
    context.stroke();
    gameMap[mouseY][mouseX] = 3; */

    //! Information for debugging
    //! Position of clicked rectangle, offset of the mouse (x, y) and full array of the current game map
    current.innerHTML = "Rect(X,Y): " + Math.floor(event.offsetX / tileW) * tileW + 
    ", " + Math.floor(event.offsetY / tileW) * tileW + "<br />Offset: " + event.offsetX + ", " + event.offsetY
    + "<br />Array: ";

    //! Priting out gameMap array to HTML div
    gameMapArray.innerHTML = "";
    for(var y = 0; y < mapH; y++) {
        for(var x = 0; x < mapW; x++) {
            gameMapArray.innerHTML += gameMap[y][x] + " ";
        }
        gameMapArray.innerHTML += "<br />";
    }

}

function drawGame() {

    if(context==null) {
        return;
    }

    // Loop drawing a board (with height and width variables)
    for(var y = 0; y < mapH; y++) { 
        for(var x = 0; x < mapW; x++){

            // Drawing a border
            context.strokeStyle = "#FFF";
            context.strokeRect(x*tileW, y*tileH, tileW, tileH);

            // Switch statement for colors of the points 
            // TODO: Move switch statment into the enum with colors later
            switch(gameMap[y][x]) {
                case 1:
                case 101:
                    context.fillStyle = "red";
                    break;
                case 2:
                case 102:
                    context.fillStyle = "green";
                    break;
                case 3:
                case 103:
                    context.fillStyle = "blue";
                    break;
                case 4:
                case 104:
                    context.fillStyle = "yellow";
                    break;
                case 5:
                case 105:
                    context.fillStyle = "orange";
            }

            if(gameMap[y][x] != 0 && gameMap[y][x] < 100) {
                // context.fillRect(x*titleW, y*titleH, titleW, titleH) <- drawing colors of tiles
                var circle = new Path2D();
                circle.moveTo(x*tileW, y*tileH);
                circle.arc(x * tileW + tileW/2, y * tileH + tileH/2 , tileW * .45 , tileH * .45, 0, 360);
                context.fill(circle);
            }
            if(gameMap[y][x] > 100) {
                context.strokeStyle = "#FFF";
                context.fillRect(x*tileW, y*tileH, tileW-20, tileH-20);
            }

            //! Printing a position of every tile
            context.fillStyle = "#FFF";
            context.fillText("(" + x*tileW + ", "  + y*tileH+ ")", x * tileW, y * tileH + 10);
   
        }
    }
}
