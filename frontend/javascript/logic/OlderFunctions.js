//! Could be usefull later
// DRAWING PIPE FROM MAP
function drawPipe(x, y) {
    // Drawing pipes (every point has a value of an color plus 0 (e.g r0 - stands for red point).
    // Pipes has a value of color and a number of a pipe (e.g r5 - stand for red fifth pipe that
    // only connecting with r4 and r6 it allows to draw pipes close to each other without weird renedring)
    // TODO: Try to simplify logic behind drawing a pipe
    if (parseInt(gameMap[y][x].substr(1, 3)) > 0) {
        context.beginPath();
        if ((y > 0 && (parseInt(gameMap[y - 1][x].substr(1, 3)) == parseInt(gameMap[y][x].substr(1, 3)) - 1) 
            && gameMap[y - 1][x] != '0') && gameMap[y - 1][x].substr(0, 1) == gameMap[y][x].substr(0, 1)) {
            console.log("Down")
            context.moveTo(x * tileW + tileW / 2, (y- 1) * tileW + tileW / 2);
            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
        }
         if ((y < gameMap.length - 1 && (parseInt(gameMap[y + 1][x].substr(1, 3)) == parseInt(gameMap[y][x].substr(1, 3)) - 1) 
            && gameMap[y + 1][x] != '0' && gameMap[y + 1][x].substr(0, 1) == gameMap[y][x].substr(0, 1))) {
            console.log("Up")
            context.moveTo(x * tileW + tileW / 2,(y + 1) * tileW + tileW / 2);
            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
        }
        if ((x > 0 && (parseInt(gameMap[y][x - 1].substr(1, 3)) == parseInt(gameMap[y][x].substr(1, 3)) - 1 ) 
        && gameMap[y][x - 1] != '0') && gameMap[y][x - 1].substr(0, 1) == gameMap[y][x].substr(0, 1)) {
            console.log("Right")
            context.moveTo((x - 1) * tileW + tileW / 2, y * tileW + tileW / 2);
            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
        }
        if (x < gameMap.length - 1 && (parseInt(gameMap[y][x + 1].substr(1, 3)) == parseInt(gameMap[y][x].substr(1, 3)) - 1) && gameMap[y][x + 1] != '0'
            && gameMap[y][x + 1].substr(0, 1) == gameMap[y][x].substr(0, 1)) {
            console.log("Left")
            context.moveTo((x + 1) * tileW + tileW / 2, y * tileW + tileW / 2);
            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
        }
        // ! TESTS
        console.log("X, Y " + x + ", " + y);
        if( x > 0 && parseInt(gameMap[y][x - 1].substr(1, 3)) == 0 && gameMap[y][x - 1].substr(0, 1) == gameMap[y][x].substr(0, 1)) {
            console.log("cze");
            context.moveTo((x - 1) * tileW + tileW / 2, y * tileW + tileW / 2);
            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
        }
                context.strokeStyle = Colors[gameMap[y][x].substr(0, 1)];
        context.lineCap = "round";
        context.fillStyle = "red";
        context.lineWidth = tileW * 0.4;
        context.stroke();
        context.closePath();
    }
}