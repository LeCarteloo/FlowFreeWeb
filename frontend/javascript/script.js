var ctx = null;
var titleW = 40, titleH = 40;
var mapW = 10, mapH = 10;

var currentSecond = 0, frameCount = 0, frameLastSecond = 0;

var gameMap = [
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
];

window.onload = function() {
    ctx = document.getElementById('game').getContext('2d');
    requestAnimationFrame(drawGame);
    ctx.font = "bold 10pt sans-serif";
};

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

    for(var y = 0; y < mapH; y++) {
        for(var x = 0; x < mapW; x++){

            switch(gameMap[((y*mapW)+x)]) {
                case 0:
                    ctx.fillStyle = "white";
                    break;
                default:
                    ctx.fillStyle = "#121212";
                    break;
            }

            ctx.fillRect(x*titleW, y*titleH, titleW, titleH)
        }
    }

    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + frameLastSecond, 10, 20);

    requestAnimationFrame(drawGame);
}