var ctx = null;
var current = null;
var tileW = 500/5, tileH = 500/5;
var mapW = 5, mapH = 5;

var currentX, currentY, startX, startY;
selected = Boolean(false);
win = Boolean(false);

var currentSecond = 0, frameCount = 0, frameLastSecond = 0;

var gameMap = [
    [1, 0, 2, 0, 4],
    [0, 0, 3, 0, 5],
    [0, 0, 0, 0, 0],
    [0, 2, 0, 4, 0],
    [0, 1, 3, 5, 0],
];
window.onload = function() {
    var canvas = document.getElementById('game');
    ctx = canvas.getContext("2d");
    requestAnimationFrame(drawGame);
    ctx.font = "bold 10pt sans-serif";
    canvas.addEventListener('mousedown',handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp)

    //tests
    current = document.getElementById('status');
};

function handleMouseUp(event) {
    console.log("up");

}

function handleMouseDown(event) {
    console.log("down");
    if(!selected) {
        startX = (Math.floor(event.offsetX / tileW) * tileW) / 100;
        startY = (Math.floor(event.offsetY / tileH) * tileH) / 100;
        currentX = startX;
        currentY = startY;

        if(gameMap[startY][startX] > 0) {
            selected = true;
        }
    }


    var valueOfY = (Math.floor(event.offsetY / tileW) * tileW) / 100;
    var valueOfX = (Math.floor(event.offsetX / tileW) * tileW) / 100;

    // ctx.beginPath();
    // ctx.moveTo(valueOfX*tileH + 50, valueOfY*tileW + 50);
    // ctx.lineTo(50,150);
    // ctx.lineWidth = 20;
    // ctx.strokeStyle = "red";
    // ctx.stroke();

    // gameMap[valueOfY][valueOfX] = 3;

    current.innerHTML = " Rect: " + Math.floor(event.offsetX / tileW) * tileW + 
    ", " + Math.floor(event.offsetY / tileW) * tileW + "<br />Offset: " + event.offsetX + ", " + event.offsetY
    + "<br />Array: " + gameMap + "<br />X, Y: " + valueOfX*tileW + " " + valueOfY*tileH;
}

function drawGame() {

    if(ctx==null) {
        return;
    }

    var sec = Math.floor(Date.now()/1000);
    
    if(sec!=currentSecond) {
        currentSecond = sec;
        frameLastSecond = frameCount;
        frameCount = 1;
    }
    else {
        frameCount++;
    }

    // Loop drawing a board (with height and width variables)
    for(var y = 0; y < mapH; y++) { 
        for(var x = 0; x < mapW; x++){
            // Switch statement for colors of the points
            switch(gameMap[y][x]) {
                case 1:
                    ctx.fillStyle = "red";
                    break;
                case 2:
                    ctx.fillStyle = "green";
                    break;
                case 3:
                    ctx.fillStyle = "blue";
                    break;
                case 4:
                    ctx.fillStyle = "yellow";
                    break;
                case 5:
                    ctx.fillStyle = "orange";
                    break;
            }
            
            ctx.strokeStyle = "#FFF";
            ctx.strokeRect(x*tileW, y*tileH, tileW, tileH);

            if(gameMap[y][x] != 0) {
                // ctx.fillRect(x*titleW, y*titleH, titleW, titleH) drawing colors of tiles
                var circle = new Path2D();
                circle.moveTo(x*tileW, y*tileH);
                circle.arc(x * tileW + tileW/2, y * tileH + tileH/2 , 35, 25, 0, 360)
                ctx.fill(circle);
            }
            
        }
    }

    ctx.fillStyle = "#FFF";
    ctx.fillText("FPS: " + frameLastSecond, 10, 20);
}
