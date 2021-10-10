// ############ Game debug functions ############ //

function gameDebugInfo(event, isOn) {
    if(!isOn) {
        return;
    }

    // Position of clicked rectangle and positon of square with the point (same color)
    end.innerHTML = "Clicked point position (X, Y):" + startPosition.X + " " 
    + startPosition.Y + "<br />End point position (X, Y): " 
    + endPosition.X + " " + endPosition.Y;

    // True position of clicked rectangle, offset of the mouse (x, y) and full array of the current game map
    current.innerHTML = "True position of tile (X, Y): " + Math.floor(event.offsetX / tileW) * tileW +
    ", " + Math.floor(event.offsetY / tileW) * tileW + "<br />Game map Array: ";

    // Priting out gameMap array to HTML div
    gameMapArray.innerHTML = "";
    for (var y = 0; y < mapLength; y++) {
        for (var x = 0; x < mapLength; x++) {
            gameMapArray.innerHTML += gameMap[y][x] + " ";
        }
        gameMapArray.innerHTML += "<br />";
    }
}

function mouseOffset(moveEvent, isOn) {
    if(!isOn) {
        return;
    }

    // Mouse div showing current position of mouse when button is hold
    mouse.innerHTML = `Mouse position (Y: ${moveEvent.offsetY}, X: ${moveEvent.offsetX})` ;
}

function drawPosOfSquares(x, y, isOn) {
    if(!isOn) {
        return;
    }

    context.fillStyle = "#FFF";
    context.fillText(`(Y: ${y}, X: ${x} | Y:${y * tileW}, X: ${x * tileH})`, x * tileW, y * tileH + 10)
    // context.fillText("(X:" + x * tileW + ", Y:" + y * tileH + ")", x * tileW, y * tileH + 10);
}

// ############ Algorithm debug functions ############ //