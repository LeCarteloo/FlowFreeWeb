class Path {

    arrayWithTiles = [];
    counter;
    blockedColors = [];
    // Generate everything
    static drawPath(map, color, speed, blockedColors) {
        this.counter = 1;
        this.blockedColors = blockedColors;
        this.arrayWithTiles = this.getCoordinates(map, color);
        this.arrayWithTiles = this.removeExtra(this.arrayWithTiles);
        this.arrayWithTiles = this.sortCoordinates(this.arrayWithTiles);

        // Start position is needed to draw a low opacity color when points are conected
        var startPosition = {
            Y: this.arrayWithTiles[0][0],
            X: this.arrayWithTiles[0][1]
        };

        this.arrayWithTiles = this.createPath(this.arrayWithTiles, speed);
        this.animatePath(this.arrayWithTiles, Colors[color], startPosition, blockedColors);
    }

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

    // Function returns sorted array with coordinates
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
    static createPath(array, speed) {
        var points = [];
        for (let i = 1; i < array.length; i++) {
                var startPoint = [array[i - 1][0] * tileW + tileW / 2, array[i - 1][1] * tileW + tileW / 2];
                var endPoint =  [array[i][0] * tileW + tileW / 2, array[i][1] * tileW + tileW / 2];
                // console.log(startPoint)
                var xDiff = endPoint[0] - startPoint[0];
                var yDiff = endPoint[1] - startPoint[1];
                for (let j = 0; j < speed; j++) {
                    points.push({
                        X: startPoint[0] + xDiff * j / speed, 
                        Y: startPoint[1] + yDiff * j / speed
                    });
                }
        }
        return points;
    }
    
    // Function draw path from given array
    static animatePath(arrayToDraw, color, startPosition){
        if (this.counter < arrayToDraw.length - 1) {
            requestAnimationFrame(fn => {
                this.animatePath(arrayToDraw, color, startPosition);
            });
        }
        else {
            // Drawing the after glow of every pipe and point with that color
            drawAfterGlow(gameMap[startPosition.Y][startPosition.X]);
            blockedColors.splice(blockedColors.indexOf(gameMap[startPosition.Y][startPosition.X]), 1)
            return;
        }
        context.beginPath();
        context.strokeStyle = color;
        context.lineCap = "round";
        context.lineWidth = tileW * 0.4;
        context.moveTo(arrayToDraw[this.counter - 1].Y, arrayToDraw[this.counter - 1].X);
        context.lineTo(arrayToDraw[this.counter].Y, arrayToDraw[this.counter].X);
        context.stroke();
        context.closePath();
        this.counter++;
    }

    // Returning the coordinates of tiles where path will be drawn
    static getCoordinates(gameMap, value) {
        // Coordinates of pipes (every pipe has a value of an point (but lower cased).
        var point = [];
        console.groupCollapsed("%c Rendering pipes from map", "color: red")
        for (let y = 0; y < gameMap.length; y++) {
            for(let x = 0; x < gameMap.length; x++) {
                if(!Utility.isUpper(gameMap[y][x]) && gameMap[y][x] > '0') {
                    const upperCasedMap = gameMap.map(row => row.map(column => column.toUpperCase()));
                    if (y > 0 && upperCasedMap[y - 1][x] == upperCasedMap[y][x] && upperCasedMap[y - 1][x] == value) {
                        console.log(`%c From: (${y}, ${x}) To: (${y - 1}, ${x}) Move: Down`, `color: ${Colors[upperCasedMap[y][x]]}`)
                        point.push([y - 1, x, upperCasedMap[y - 1][x]]);
                    }
                    if (y < upperCasedMap.length - 1 && upperCasedMap[y + 1][x] == upperCasedMap[y][x] && upperCasedMap[y + 1][x] == value) {
                        console.log(`%c From: (${y}, ${x}) To: (${y + 1}, ${x}) Move: Up`, `color: ${Colors[upperCasedMap[y][x]]}`)
                        point.push([y + 1, x, upperCasedMap[y + 1][x]]);
                    }
                    if (x > 0 && upperCasedMap[y][x - 1] == upperCasedMap[y][x] && upperCasedMap[y][x - 1] == value) {
                        console.log(`%c From: (${y}, ${x}) To: (${y}, ${x - 1}) Move: Right`, `color: ${Colors[upperCasedMap[y][x]]}`)
                        point.push([y, x - 1, upperCasedMap[y][x - 1]]);
                    }
                    if (x < upperCasedMap.length - 1 && upperCasedMap[y][x + 1] == upperCasedMap[y][x] && upperCasedMap[y][x + 1] == value) {
                        console.log(`%c From: (${y}, ${x}) To: (${y}, ${x + 1}) Move: Left`, `color: ${Colors[upperCasedMap[y][x]]}`)
                        point.push([y, x + 1, upperCasedMap[y][x + 1]]);
                    }
                }
            }        
        }

        console.groupEnd();
        return point;
    }
}

