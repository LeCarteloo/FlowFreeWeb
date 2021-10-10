class Path {
    // Function return an array with removed extra pipe coordinates
    static removeExtra(array) {
        for (let i = 0; i < array.length; i++) {
            var temp = array[i];
            for (let j = i + 1; j < array.length; j++) {
                if(temp[0] == array[j][0] && temp[1] == array[j][1]) {
                    array.splice(j,1);
                }
            }            
        }
        return array;
    }

    // Function return sorted array with coordinates
    static sortCoordinates(array) {
        var temp = 0;
        for (let i = 0; i < array.length; i++) {
            for (let j = i; j > 0; j--) {
                if(array[j][0] < array[j - 1][0]) {
                    temp = array[j];
                    array[j] = array[j - 1];
                    array[j - 1] = temp;
                }
            }
        }
        return array;
    }

    // Create array with points placed in right order
    static createPath(array) {
        var points = [];
        for (let i = 1; i < array.length; i++) {
                var startPoint = [array[i - 1][0] * tileW + tileW / 2, array[i - 1][1] * tileW + tileW / 2];
                var endPoint =  [array[i][0] * tileW + tileW / 2, array[i][1] * tileW + tileW / 2];
                // console.log(startPoint)
                var xDiff = endPoint[0] - startPoint[0];
                var yDiff = endPoint[1] - startPoint[1];
                for (let j = 0; j < 30; j++) {
                    points.push({
                        X: startPoint[0]+ xDiff * j /30, 
                        Y: startPoint[1]+ yDiff * j / 30
                    });
                }
        }
        return points;
    }
    
    // Function draw path from given array
    static animatePath(arrayToDraw){
        if (counter < arrayToDraw.length - 1) {
            requestAnimationFrame(fn => {
                this.animatePath(arrayToDraw);
            });
        }
        else {
            drawTransparent(gameMap[0][2]);
        }
        context.beginPath();
        context.strokeStyle = "green"
        context.lineCap = "round";
        context.lineWidth = tileW * 0.4;
        context.moveTo(arrayToDraw[counter - 1].Y, arrayToDraw[counter - 1].X);
        context.lineTo(arrayToDraw[counter].Y, arrayToDraw[counter].X);
        context.stroke();
        context.closePath();
        counter++;
    }

    // Returning the coordinates of tiles where path will be drawn
    static getCoordinates(gameMap, colors) {
        // Coordinates of pipes (every pipe has a value of an point (but lower cased).
        var point = [];
        console.groupCollapsed("%c Rendering pipes from map", "color: red")
        if(colors.length != 0) {
            for (let y = 0; y < gameMap.length; y++) {
                for(let x = 0; x < gameMap.length; x++) {
                    if(!isUpper(gameMap[y][x]) && gameMap[y][x] > '0') {
                        const upperCasedMap = gameMap.map(row => row.map(column => column.toUpperCase()));
                        if (y > 0 && upperCasedMap[y - 1][x] == upperCasedMap[y][x]) {
                            console.log(`%c From: (${y}, ${x}) To: (${y - 1}, ${x}) Move: Down`, `color: ${Colors[upperCasedMap[y][x]]}`)
                            point.push([y - 1, x, upperCasedMap[y - 1][x]]);
                            // point.push([y, x, upperCasedMap[y - 1][x]]);
                        }
                        if (y < upperCasedMap.length - 1 && upperCasedMap[y + 1][x] == upperCasedMap[y][x]) {
                            console.log(`%c From: (${y}, ${x}) To: (${y + 1}, ${x}) Move: Up`, `color: ${Colors[upperCasedMap[y][x]]}`)
                            point.push([y + 1, x, upperCasedMap[y + 1][x]]);
                            // point.push([y, x, upperCasedMap[y + 1][x]]);
                        }
                        if (x > 0 && upperCasedMap[y][x - 1] == upperCasedMap[y][x]) {
                            console.log(`%c From: (${y}, ${x}) To: (${y}, ${x - 1}) Move: Right`, `color: ${Colors[upperCasedMap[y][x]]}`)
                            point.push([y, x - 1, upperCasedMap[y][x - 1]]);
                            // point.push([y, x, upperCasedMap[y][x - 1]]);
                        }
                        if (x < upperCasedMap.length - 1 && upperCasedMap[y][x + 1] == upperCasedMap[y][x]) {
                            console.log(`%c From: (${y}, ${x}) To: (${y}, ${x + 1}) Move: Left`, `color: ${Colors[upperCasedMap[y][x]]}`)
                            point.push([y, x + 1, upperCasedMap[y][x + 1]]);
                            // point.push([y, x, upperCasedMap[y][x + 1]]);
                        }
                    }
                }        
            }
        }
        console.groupEnd();
        return point;
    }
}

// 0: (3) [1, 3, 'G']
// 1: (3) [0, 2, 'G']
// 2: (3) [0, 3, 'G']
// 3: (3) [2, 3, 'G']
// 4: (3) [3, 1, 'G']
// 5: (3) [2, 2, 'G']
// 6: (3) [2, 1, 'G']

// 1: (3) [0, 2, 'G']
// 2: (3) [0, 3, 'G']
// 0: (3) [1, 3, 'G']
// 3: (3) [2, 3, 'G']
// 5: (3) [2, 2, 'G']
// 6: (3) [2, 1, 'G']
// 4: (3) [3, 1, 'G']

