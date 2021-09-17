// ############ Game debug functions ############ //

function gameDebugInfo(event) {
    // Position of clicked rectangle and positon of square with the point (same color)
    end.innerHTML = "startPosition.X, startPosition.Y: " + startPosition.X + " " 
    + startPosition.Y + "<br />endPosition.X, endPosition.Y: " 
    + endPosition.X + " " + endPosition.Y;

    // Position of clicked rectangle, offset of the mouse (x, y) and full array of the current game map
    current.innerHTML = "Rect(X,Y): " + Math.floor(event.offsetX / tileW) * tileW +
    ", " + Math.floor(event.offsetY / tileW) * tileW + "<br />Offset: " + event.offsetX + ", " + event.offsetY
    + "<br />Array: ";

    // Priting out gameMap array to HTML div
    gameMapArray.innerHTML = "";
    for (var y = 0; y < mapLength; y++) {
        for (var x = 0; x < mapLength; x++) {
            gameMapArray.innerHTML += gameMap[y][x] + " ";
        }
        gameMapArray.innerHTML += "<br />";
    }
}

function mouseOffset(moveEvent) {
    // Mouse div showing current position of mouse when button is hold
    mouse.innerHTML = "Mouse(X, Y): " + moveEvent.offsetX + ", " + moveEvent.offsetY;
}

function drawPosOfSquares(x, y) {
    context.fillStyle = "#FFF";
    context.fillText("(X:" + x * tileW + ", Y:" + y * tileH + ")", x * tileW, y * tileH + 10);
}

// ############ Algorithm debug functions ############ //