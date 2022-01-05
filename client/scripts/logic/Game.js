class Game {
    // Canvas
    canvas = null;
    context = null;
    
    // Tile width and height (for drawing)
    tileW = 0;
    tileH = 0;

    // Mouse and map event
    selected = false;
    pressed = false;
    isMapDrawn = false;
    boundMove = null;

    // Speed for animations (will be removed)
    SPEED = 30;
    
    // Colors
    colors;
    solvedColors = [];
    blockedColors = [];

    gameMap = [];
    numberOfColors = 0;
    mapSize = 0;

    constructor() {        
        // Getting the canvas and it context
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext("2d");
        
        // Adding the event listeners for handling user events
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        /* Bounding the handleMouseMove to a variable it will allow to 
        remove the listener after user no longer clicks left mouse button */
        this.boundMove = (event) => this.handleMouseMove(event)
    }

    initialize(gameMap, numberOfColors, mapSize) {
        this.gameMap = gameMap
        this.numberOfColors = numberOfColors;
        this.mapSize = mapSize;

        /* Height and weight of a tile is equal to size of canvas 
        divided by map size. Map size is always a square */
        this.tileW = this.canvas.width / this.mapSize;
        this.tileH = this.canvas.height / this.mapSize;

        requestAnimationFrame(this.drawGame.bind(this));
    }

    clear() {
        this.gameMap = [];
        this.numberOfColors = 0;
        this.mapSize = 0;
        this.solvedColors = [];
        this.isMapDrawn = false;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleMouseDown(event) {
        this.pressed = true;
        var mouseX = Math.floor( (( event.offsetX / this.tileW ) * this.tileW) / this.tileH);
        var mouseY = Math.floor( (( event.offsetY / this.tileW ) * this.tileW) / this.tileH);

        // If mouse is pressed on point all pipes with this color are removed
        if(Utility.isUpper(this.gameMap[mouseY][mouseX]) && !this.blockedColors.includes(this.gameMap[mouseY][mouseX])){

            // Removing from solved points
            const index = this.solvedColors.indexOf(this.gameMap[mouseY][mouseX]);
            if(index != -1) {
                this.solvedColors.splice(index, 1);
            }

            for (var y = 0; y < this.mapSize; y++) {
                for (var x = 0; x < this.mapSize; x++) {
    
                    // Clearing pipes
                    if (this.gameMap[y][x].toUpperCase() == this.gameMap[mouseY][mouseX] && !Utility.isUpper(this.gameMap[y][x])) {
                        this.gameMap[y][x] = '0';
    
                        this.context.clearRect(x * this.tileH, y * this.tileW, this.tileW - 1, this.tileH - 1);
                        this.drawSquares(x, y);
                    }
    
                    // Clearing points
                    if(this.gameMap[y][x].toUpperCase() == this.gameMap[mouseY][mouseX] && Utility.isUpper(this.gameMap[y][x])) {
                        this.context.clearRect(x * this.tileH, y * this.tileW, this.tileW - 1, this.tileH - 1);

                        // TODO: Should be written better
                        // Redrawing squares and points (clearing the pipes from game map)
                        this.drawSquares(x, y);
                        this.drawPoint(x, y);
                    }
                }
            }
            socket.emit('removePoints', {gameCode: clientRoom, startMap: startMap, currentMap: currentMap, solvedColors: gameObj.solvedColors});
        }
    
        // console.log("Mouse pressed");
        // Drawing game when mouse is pressed
        this.drawGame(event);
    }

    drawGame(event) {
        // Checking if canvas exists
        if (this.context == null) {
            return;
        }
    
        // Loops drawing map with points and pipes from gameMap object.
        for (var y = 0; y < this.mapSize; y++) {
            for (var x = 0; x < this.mapSize; x++) {
                // Full map with points is drawn only once (at startup)
                if (!this.isMapDrawn) {
                    this.drawSquares(x, y)
    
                    this.drawPoint(x, y);
    
                    // Drawing map from game map array
                    // drawPipe(x, y);
    
                    //! Developer tool
                    // Debug.drawPosOfSquares(x, y, debugMode);
                }
            }
           
        }
    
        //Border is drawn only once
        this.isMapDrawn = true;
    
        // Coordinates of a mouse when mouse is pressed
        // TODO: Code it diffrent (note)
        var mouseX = Math.floor( (( event.offsetX / this.tileW ) * this.tileW) / this.tileH);
        var mouseY = Math.floor( (( event.offsetY / this.tileW ) * this.tileW) / this.tileH);

        if (!this.pressed) {
            // If tile with point is pressed then 'IF' statement is executed
            if (this.selected) {
                this.selected = false;
                
                // 'FOR' loops search for a tile with same color
                for (var y = 0; y < this.mapSize; y++) {
                    for (var x = 0; x < this.mapSize; x++) {
                        if (!(x == startPosition.X && y == startPosition.Y) && this.gameMap[y][x] == this.gameMap[startPosition.Y][startPosition.X]) {
                            endPosition.X = x;
                            endPosition.Y = y;
                        }
                    }
                }
                // Clearing the points and squares if the points are not connected
                this.clearNotConntectedPipes(mouseX, mouseY);
            }
        }
        else {
            // If no tile is selected then 'IF' statement is executed
            if (!this.selected) {
                startPosition.X = mouseX;
                startPosition.Y = mouseY;
                previousPosition.X = startPosition.X;
                previousPosition.Y = startPosition.Y;
                currentPosition.X = startPosition.X;
                currentPosition.Y = startPosition.Y;
    
                /* If tile with a point is selected then selected = true (it prevents from clicking an empty tile)
                If a value is upper case that tells that this is the point*/
                if (Utility.isUpper(this.gameMap[startPosition.Y][startPosition.X]) && !this.blockedColors.includes(this.gameMap[startPosition.Y][startPosition.X])) {
                    this.selected = true;
                    this.drawGame(event);
                }
            }
            else {
                // Adding the mousemove event after pressing the button (For test purposes) // it should help to draw a pipe
                // TODO: make this function public and write it apart from MouseDown function

                this.canvas.addEventListener('mousemove', this.boundMove);
                // this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
            }
        }
        //! Developer tool
        // Debug.gameDebugInfo(event, debugMode);
    }

    handleMouseUp(event) {
        // Removing the onmousemove event when mouse button is unpressed
        this.canvas.removeEventListener('mousemove', this.boundMove);
        // this.canvas.removeEventListener('mousemove', this.handleMouseMove);

        this.pressed = false;
    
        // console.log("Mouse unpressed");

        // Redrawing a game when button is unpressed (to remove unlinked pipes)
        this.drawGame(event);
        // clearNotConntectedPipes(event.offsetX, event.offsetY);
    }

    handleMouseMove(event) {
        // console.log(this.canvas);
        // Canvas height and width are reduced by 3 to avoid moving on border of Map
        if (event.offsetX > 0 && event.offsetX <= this.canvas.width - 3 && event.offsetY > 0
            && event.offsetY <= this.canvas.height - 3) {
            // console.log(event.offsetY, this.tileH, this.tileW);
            var mouseMoveX = Math.floor( (( event.offsetX / this.tileW ) * this.tileW) / this.tileH);
            var mouseMoveY = Math.floor( (( event.offsetY / this.tileW ) * this.tileW) / this.tileH);

            //! Developer tool
            // Debug.mouseOffset(event, debugMode);
            //  Drawing a lines
            if (this.gameMap[mouseMoveY][mouseMoveX] == '0') {
                // 'IF' does not allow diagonal moves
                if ((mouseMoveX == currentPosition.X + 1 && mouseMoveY == currentPosition.Y) || (mouseMoveX == currentPosition.X - 1 && mouseMoveY == currentPosition.Y)
                    || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y + 1) || (mouseMoveX == currentPosition.X && mouseMoveY == currentPosition.Y - 1)) {
                    this.gameMap[mouseMoveY][mouseMoveX] = this.gameMap[startPosition.Y][startPosition.X].toLowerCase();
                    previousPosition.X = currentPosition.X;
                    previousPosition.Y = currentPosition.Y;
                    currentPosition.X = mouseMoveX;
                    currentPosition.Y = mouseMoveY;

                    // Drawing the pipe     
                    this.drawPipe(Colors[this.gameMap[startPosition.Y][startPosition.X]], previousPosition, currentPosition)
                }
            }

            //! If users make 'back' move pipe should be removed and abbreviated 
            // if(gameMap[mouseMoveY][mouseMoveX] == gameMap[startPosition.Y][startPosition.X].toLowerCase()
            // && mouseMoveY == previousPosition.Y && mouseMoveX == previousPosition.X) {
            
            // gameMap[currentPosition.Y][currentPosition.X] = 0;
            // drawSquares(currentPosition.X, currentPosition.Y);
            // currentPosition.X = mouseMoveX;
            // currentPosition.Y = mouseMoveY;

            // previousPosition.X = mouseMoveX; 
            // previousPosition.Y = mouseMoveY + 1;
            
            // console.log(`Previous: ${previousPosition.Y}, ${previousPosition.X}`)
            // console.log(`Current: ${currentPosition.Y}, ${currentPosition.X} `)
            // }

        }  
        else {
            // If the mouse is out of bounds then restart everything
            //TODO: Check it later
            this.handleMouseUp(event);
        }
    }

    clearNotConntectedPipes(mouseX, mouseY) {

        if (!(endPosition.X == mouseX && endPosition.Y == mouseY) || !((currentPosition.X == endPosition.X - 1 && currentPosition.Y == endPosition.Y) 
        || (currentPosition.X == endPosition.X + 1 && currentPosition.Y == endPosition.Y) || (currentPosition.X == endPosition.X && currentPosition.Y == endPosition.Y - 1)
        || (currentPosition.X == endPosition.X && currentPosition.Y == endPosition.Y + 1))) {
            for (var y = 0; y < this.mapSize; y++) {
                for (var x = 0; x < this.mapSize; x++) {
                    if (this.gameMap[y][x].toUpperCase() == this.gameMap[startPosition.Y][startPosition.X] && !Utility.isUpper(this.gameMap[y][x])) {
                        this.gameMap[y][x] = '0';
                        this.context.clearRect(startPosition.X * this.tileH, startPosition.Y*this.tileW, this.tileW - 1, this.tileH - 1);
                        this.context.clearRect(endPosition.X * this.tileH, endPosition.Y*this.tileW, this.tileW - 1, this.tileH - 1);
                        this.context.clearRect(x * this.tileH, y*this.tileW, this.tileW - 1, this.tileH - 1);

                        // TODO: Should be written better
                        // Redrawing squares and points (clearing the pipes from game map)
                        this.drawSquares(startPosition.X, startPosition.Y);
                        this.drawSquares(endPosition.X, endPosition.Y);
                        this.drawSquares(x, y);
                        this.drawPoint(startPosition.X, startPosition.Y);
                        this.drawPoint(endPosition.X, endPosition.Y);
                    }
                }
            }
        }
        // TODO: Should be changed 
        // Drawing pipe to end point
        else {
            if(mouseX == endPosition.X && mouseY == endPosition.Y){
                
                this.drawPipe(Colors[this.gameMap[startPosition.Y][startPosition.X]], currentPosition, endPosition);
                // Drawing the after glow of every pipe and point with that color
                this.drawAfterGlow(this.gameMap[startPosition.Y][startPosition.X]);
                this.solvedColors.push(this.gameMap[startPosition.Y][startPosition.X]);

                // Counting points after every completed move (#)
                socket.emit('countPoints', {gameCode: clientRoom, startMap: startMap, currentMap: currentMap, solvedColors: gameObj.solvedColors});
            }
        }
    }
    
    // TODO: Think about better option without 2x 'FOR' loops
    drawAfterGlow(point) {
        for (var y = 0; y < this.mapSize; y++) {
            for (var x = 0; x < this.mapSize; x++) {
                if(this.gameMap[y][x].toUpperCase() == point) {
                    this.context.globalAlpha = 0.2;
                    this.context.fillStyle = Colors[point];
                    this.context.fillRect(x * this.tileW, y * this.tileW, this.tileW, this.tileH);
                    this.context.globalAlpha = 1.0;
                }
            }
        }
    }
    
    // Drawing pipes from mouse movement
    drawPipe(color, positionFrom, positionTo) {
        this.context.beginPath();
        this.context.moveTo(positionFrom.X * this.tileW + this.tileW / 2, positionFrom.Y * this.tileW + this.tileW / 2); // X, Y
        this.context.lineTo(positionTo.X  * this.tileW + this.tileW / 2, positionTo.Y  * this.tileW + this.tileW / 2);
    
        this.context.strokeStyle = color;
        this.context.lineCap = "round";
        this.context.lineWidth = this.tileW * 0.4;
    
        this.context.stroke();
        this.context.closePath();
    }
    
    drawSquares(x, y) {
        // Start drawing square with dark background and white stroke
        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#FFF";
        this.context.fillStyle = "#121212";
        // Fill react needs to be commented if map is read from an array
        this.context.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);
        this.context.strokeRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);    
    }
    
    // Drawing a point
    drawPoint(x, y) {
        if (this.gameMap[y][x] != '0') {
    
            this.context.fillStyle = Colors[this.gameMap[y][x]];
    
            var circle = new Path2D();
            circle.moveTo(x * this.tileW, y * this.tileH);
            circle.arc(x * this.tileW + this.tileW / 2, y * this.tileH + this.tileH / 2, this.tileW * .47, this.tileH * .47, 0, 360);
            this.context.fill(circle);
        }
    }

}
// let map = [
//     ['0', '0', 'R'],
//     ['R', '0', '0'],
//     ['O', '0', 'O'],
// ];

// let game = new Game();
// game.initialize(map, 2, 3);