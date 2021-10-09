//! #################### TESTING #################### !//
// DRAWING PIPE FROM MAP
class DrawSolved {
    drawPipeFromMap(gameMap, colors) {
        // Drawing pipes (every point has a value of an color plus 0 (e.g r0 - stands for red point).
        // Pipes has a value of color and a number of a pipe (e.g r5 - stand for red fifth pipe that
        // only connecting with r4 and r6 it allows to draw pipes close to each other without weird renedring)
        // TODO: Try to simplify logic behind drawing a pipe
        var point = [];
        console.groupCollapsed("%c Rendering pipes from map", "color: red")
        if(colors.length != 0) {
            for (let y = 0; y < gameMap.length; y++) {
                for(let x = 0; x < gameMap.length; x++) {
                    if(!isUpper(gameMap[y][x]) && gameMap[y][x] > '0') {
                        const upperCasedMap = gameMap.map(row => row.map(column => column.toUpperCase()));
                        context.beginPath();
                        if (y > 0 && upperCasedMap[y - 1][x] == upperCasedMap[y][x]) {
                            console.log(`%c From: (${y}, ${x}) To: (${y - 1}, ${x}) Move: Down`, `color: ${Colors[upperCasedMap[y][x]]}`)
                            context.moveTo(x * tileW + tileW / 2, (y- 1) * tileW + tileW / 2);
                            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
                            point.push([{Xs: x * tileW + tileW / 2}, {Ys: (y- 1) * tileW + tileW / 2}, {Xf:x * tileW + tileW / 2}, {Yf: y * tileW + tileW / 2}, {V: upperCasedMap[y - 1][x]} ])
                        }
                        else if (y < upperCasedMap.length - 1 && upperCasedMap[y + 1][x] == upperCasedMap[y][x]) {
                            console.log(`%c From: (${y}, ${x}) To: (${y + 1}, ${x}) Move: Up`, `color: ${Colors[upperCasedMap[y][x]]}`)
                            context.moveTo(x * tileW + tileW / 2,(y + 1) * tileW + tileW / 2);
                            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
                            point.push([{Xs: x * tileW + tileW / 2}, {Ys: (y + 1) * tileW + tileW / 2}, {Xf:x * tileW + tileW / 2}, {Yf: y * tileW + tileW / 2}, {V: upperCasedMap[y + 1][x]} ])

                        }
                        if (x > 0 && upperCasedMap[y][x - 1] == upperCasedMap[y][x]) {
                            console.log(`%c From: (${y}, ${x}) To: (${y}, ${x - 1}) Move: Right`, `color: ${Colors[upperCasedMap[y][x]]}`)
                            context.moveTo((x - 1) * tileW + tileW / 2, y * tileW + tileW / 2);
                            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
                            point.push([{Xs: (x - 1) * tileW + tileW / 2}, {Ys: y * tileW + tileW / 2}, {Xf:x * tileW + tileW / 2}, {Yf: y * tileW + tileW / 2}, {V: upperCasedMap[y][x - 1]} ])


                        }
                        else if (x < upperCasedMap.length - 1 && upperCasedMap[y][x + 1] == upperCasedMap[y][x]) {
                            console.log(`%c From: (${y}, ${x}) To: (${y}, ${x + 1}) Move: Left`, `color: ${Colors[upperCasedMap[y][x]]}`)
                            context.moveTo((x + 1) * tileW + tileW / 2, y * tileW + tileW / 2);
                            context.lineTo(x * tileW + tileW / 2, y * tileW + tileW / 2);
                            point.push([{Xs: (x + 1) * tileW + tileW / 2}, {Ys: y * tileW + tileW / 2}, {Xf:x * tileW + tileW / 2}, {Yf: y * tileW + tileW / 2}, {V: upperCasedMap[y][x + 1]} ])

                        }
                        context.strokeStyle = Colors[upperCasedMap[y][x]];
                        context.lineCap = "round";
                        context.lineWidth = tileW * 0.4;
                        context.stroke();
                        context.closePath();
                    }
                }        
            }
        }
        console.groupEnd();
        return point;
    }
    animate(fromX, fromY, endX, endY) {
        var finished = false;
        var drawLinesInterval = setInterval(function() {
            if(finished) {
                clearInterval(drawLinesInterval);
            }
            var startx = fromX
            var starty = fromY
            var endx = endX
            var endy = endY
            console.log("elo")
            var linepercentage = 0;

            var animateInterval = setInterval(function() {
                linepercentage += 0.01;
                if(linepercentage > 1)
                {
                    clearInterval(animateInterval);
                    finished = true;
                }
                
                context.strokeStyle = "black";
                context.lineWidth = 1;
                context.strokeStyle = "#707070";
                context.moveTo(startx, starty);
                var tempxend = 0;
                var tempyend = 0;
                if(startx > endx)
                    tempxend = startx - ((startx-endx)*linepercentage);
                else
                    tempxend = startx + ((endx-startx)*linepercentage);
                if(starty > endy)
                    tempyend = starty - ((starty-endy)*linepercentage);
                else
                    tempyend = starty + ((endy-starty)*linepercentage);
                                      
                context.lineTo(tempxend, tempyend);
                context.stroke();
            }, 10);
        }, 3000);
        return;
    }


}
