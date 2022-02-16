class Game {
  // Colors
  #STROKE_COLOR = "#FFF"; // #FFF
  #FILL_COLOR = "#121212"; // #121212

  // Mouse and map event
  selected = false;
  pressed = false;
  isMapDrawn = false;
  boundMove = null;

  constructor(canvasId, isPlayable, resizeType) {
    // Getting the canvas and it context
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    // Setting the width and height of canvas
    this.resizeType = resizeType;
    this.resize();
    this.isPlayable = isPlayable;
    this.draw = null;
    this.lastPos;

    // Making canvas responsive
    window.addEventListener("resize", () => {
      this.resize();
      this.isMapDrawn = false;
      this.initialize(
        this.gameMap,
        this.numberOfColors,
        this.mapSize,
        this.moves,
        this.solvedColors
      );
    });

    if (!isPlayable) {
      return;
    }

    // Adding the mouse event listeners for handling user events
    if (matchMedia("(pointer:fine)").matches) {
      this.canvas.addEventListener(
        "mousedown",
        this.handleMouseDown.bind(this)
      );
      this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    } else {
      this.canvas.addEventListener(
        "touchstart",
        this.handleMouseDown.bind(this)
      );
      this.canvas.addEventListener("touchend", this.handleMouseUp.bind(this));
    }

    /* Bounding the handleMouseMove to a variable it will allow to 
        remove the listener after user no longer clicks left mouse button */
    this.boundMove = (event) => this.handleMouseMove(event);
  }

  initialize(gameMap, numberOfColors, mapSize, moves = {}, solvedColors = []) {
    this.gameMap = gameMap;
    this.numberOfColors = numberOfColors;
    this.mapSize = mapSize;
    this.moves = moves;
    this.solvedColors = solvedColors;

    if (this.isPlayable && Object.keys(moves).length === 0) {
      for (let i = 0; i < numberOfColors; i++) {
        this.moves[Object.keys(Colors)[i]] = {
          coords: [],
        };
      }
    }

    /* Height and weight of a tile is equal to size of canvas 
        divided by map size. Map size is always a square */
    this.tileW = this.canvas.width / this.mapSize;
    this.tileH = this.canvas.height / this.mapSize;

    this.draw = new Draw(
      this.context,
      false,
      this.tileW,
      this.tileH,
      this.gameMap
    );

    requestAnimationFrame(this.drawGame.bind(this));
  }

  clear() {
    this.gameMap = [];
    this.numberOfColors = 0;
    this.mapSize = 0;
    this.moves = [];
    this.solvedColors = [];
    this.isMapDrawn = false;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  resize() {
    if (window.matchMedia("(max-width: 720px)").matches) {
      if (this.resizeType == 1) {
        this.canvas.height = window.innerWidth * 0.9;
        this.canvas.width = window.innerWidth * 0.9;
      } else {
        this.canvas.height = window.innerWidth * 0.58;
        this.canvas.width = window.innerWidth * 0.58;
      }
    } else {
      if (this.resizeType == 1) {
        const size = (window.innerWidth + window.innerHeight) / 4;
        this.canvas.height = size;
        this.canvas.width = size;
      } else {
        this.canvas.height = window.innerWidth * 0.3;
        this.canvas.width = window.innerWidth * 0.3;
      }
    }
  }

  handleMouseDown(event) {
    this.pressed = true;

    let mouseX;
    let mouseY;

    if (matchMedia("(pointer:fine)").matches) {
      mouseX = Math.floor(
        ((event.offsetX / this.tileW) * this.tileW) / this.tileH
      );
      mouseY = Math.floor(
        ((event.offsetY / this.tileW) * this.tileW) / this.tileH
      );
    } else {
      const rect = this.canvas.getBoundingClientRect();
      mouseX = Math.floor(
        (((event.touches[0].clientX - rect.left) / this.tileW) * this.tileW) /
          this.tileH
      );
      mouseY = Math.floor(
        (((event.touches[0].clientY - rect.top) / this.tileW) * this.tileW) /
          this.tileH
      );
    }

    if (Utility.isPoint(this.gameMap[mouseY][mouseX])) {
      this.moves[this.gameMap[mouseY][mouseX]].coords.push({
        Y: mouseY,
        X: mouseX,
      });
    }

    // If mouse is pressed on point all pipes with this color are removed
    if (
      Utility.isPoint(this.gameMap[mouseY][mouseX]) &&
      this.solvedColors.includes(this.gameMap[mouseY][mouseX])
    ) {
      // Removing all moves
      this.moves[this.gameMap[mouseY][mouseX].toUpperCase()].coords = [];

      // Removing from solved points
      const index = this.solvedColors.indexOf(this.gameMap[mouseY][mouseX]);
      if (index != -1) {
        this.solvedColors.splice(index, 1);
      }

      for (var y = 0; y < this.mapSize; y++) {
        for (var x = 0; x < this.mapSize; x++) {
          // Clearing pipes
          if (
            this.gameMap[y][x].toUpperCase() == this.gameMap[mouseY][mouseX] &&
            !Utility.isPoint(this.gameMap[y][x])
          ) {
            this.gameMap[y][x] = "0";
            this.context.clearRect(
              x * this.tileH,
              y * this.tileW,
              this.tileW - 1,
              this.tileH - 1
            );
            this.draw.drawSquares(x, y);
          }

          // Clearing points
          if (
            this.gameMap[y][x].toUpperCase() == this.gameMap[mouseY][mouseX] &&
            Utility.isPoint(this.gameMap[y][x])
          ) {
            this.context.clearRect(
              x * this.tileH,
              y * this.tileW,
              this.tileW - 1,
              this.tileH - 1
            );
            this.draw.drawSquares(x, y);
            this.draw.drawPoint(x, y);
          }
        }
      }
      socket.emit("removePoints", {
        gameCode: clientRoom,
        startMap: startMap,
        currentMap: currentMap,
        solvedColors: gameObj.solvedColors,
        moves: this.moves,
      });
    }

    // console.log("Mouse pressed");
    // Drawing game when mouse is pressed
    this.drawGame(mouseY, mouseX);
  }

  drawGame(mouseY, mouseX) {
    // Checking if canvas exists
    if (this.context == null) {
      return;
    }

    // Loops drawing map with points and pipes from gameMap object.
    for (var y = 0; y < this.mapSize; y++) {
      for (var x = 0; x < this.mapSize; x++) {
        // Full map with points is drawn only once (at startup)
        if (!this.isMapDrawn) {
          this.draw.drawSquares(x, y);
          this.draw.drawPoint(x, y);
        }
      }
    }

    if (!this.isMapDrawn) {
      for (const solvedColor of this.solvedColors) {
        const move = this.moves[solvedColor].coords;
        for (let i = 1; i < move.length; i++) {
          this.draw.drawPipe(Colors[solvedColor], move[i - 1], move[i]);
        }
        this.draw.drawAfterGlow(solvedColor);
      }
    }

    //Border is drawn only once
    this.isMapDrawn = true;

    // Coordsinates of a mouse when mouse is pressed
    // TODO: Code it diffrent (note)
    var mouseX = mouseX;
    var mouseY = mouseY;

    if (!this.pressed) {
      // If tile with point is pressed then 'IF' statement is executed
      if (this.selected) {
        if (
          mouseY >= 0 &&
          mouseY < this.mapSize &&
          mouseX >= 0 &&
          mouseX < this.mapSize
        ) {
          if (Utility.isPoint(this.gameMap[mouseY][mouseX])) {
            this.moves[this.gameMap[mouseY][mouseX].toUpperCase()].coords.push({
              Y: mouseY,
              X: mouseX,
            });
          }
        }

        this.selected = false;
        // 'FOR' loops search for a tile with same color
        for (var y = 0; y < this.mapSize; y++) {
          for (var x = 0; x < this.mapSize; x++) {
            if (
              !(x == startPosition.X && y == startPosition.Y) &&
              this.gameMap[y][x] ==
                this.gameMap[startPosition.Y][startPosition.X]
            ) {
              endPosition.X = x;
              endPosition.Y = y;
            }
          }
        }
        // Clearing the points and squares if the points are not connected
        this.clearNotConntectedPipes(mouseX, mouseY);
      }
    } else {
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
        if (Utility.isPoint(this.gameMap[startPosition.Y][startPosition.X])) {
          this.selected = true;
          this.drawGame(mouseY, mouseX);
        }
      } else {
        // Adding the mousemove event after pressing the button (For test purposes) // it should help to draw a pipe
        // TODO: make this function public and write it apart from MouseDown function

        if (matchMedia("(pointer:fine)").matches) {
          this.canvas.addEventListener("mousemove", this.boundMove);
        } else {
          this.canvas.addEventListener("touchmove", this.boundMove);
        }
        // this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
      }
    }
    //! Developer tool
    // Debug.gameDebugInfo(event, debugMode);
  }

  handleMouseUp(event) {
    // Removing the onmousemove event when mouse button is unpressed
    this.canvas.removeEventListener("mousemove", this.boundMove);
    this.canvas.removeEventListener("touchmove", this.boundMove);

    this.pressed = false;

    let mouseX;
    let mouseY;

    if (matchMedia("(pointer:fine)").matches) {
      mouseX = Math.floor(
        ((event.offsetX / this.tileW) * this.tileW) / this.tileH
      );
      mouseY = Math.floor(
        ((event.offsetY / this.tileW) * this.tileW) / this.tileH
      );
    } else {
      const rect = this.canvas.getBoundingClientRect();
      mouseX = Math.floor(
        (((this.lastPos.touches[0].clientX - rect.left) / this.tileW) *
          this.tileW) /
          this.tileH
      );
      mouseY = Math.floor(
        (((this.lastPos.touches[0].clientY - rect.top) / this.tileW) *
          this.tileW) /
          this.tileH
      );
    }

    // Redrawing a game when button is unpressed (to remove unlinked pipes)
    this.drawGame(mouseY, mouseX);
    // clearNotConntectedPipes(event.offsetX, event.offsetY);
  }

  handleMouseMove(event) {
    let mouseMoveX;
    let mouseMoveY;

    if (matchMedia("(pointer:fine)").matches) {
      mouseMoveX = Math.floor(
        ((event.offsetX / this.tileW) * this.tileW) / this.tileH
      );
      mouseMoveY = Math.floor(
        ((event.offsetY / this.tileW) * this.tileW) / this.tileH
      );
    } else {
      const rect = this.canvas.getBoundingClientRect();
      mouseMoveX = Math.floor(
        (((event.touches[0].clientX - rect.left) / this.tileW) * this.tileW) /
          this.tileH
      );
      mouseMoveY = Math.floor(
        (((event.touches[0].clientY - rect.top) / this.tileW) * this.tileW) /
          this.tileH
      );
    }

    // mouseMoveX >= 0 &&
    //   mouseMoveX < this.mapSize &&
    //   mouseMoveY >= 0 &&
    //   mouseMoveY < this.mapSize;

    // Canvas height and width are reduced by 3 to avoid moving on border of Map
    if (
      mouseMoveX >= 0 &&
      mouseMoveX < this.mapSize &&
      mouseMoveY >= 0 &&
      mouseMoveY < this.mapSize
    ) {
      this.lastPos = event;
      //  Drawing a lines
      if (this.gameMap[mouseMoveY][mouseMoveX] == "0") {
        // 'IF' does not allow diagonal moves
        if (
          (mouseMoveX == currentPosition.X + 1 &&
            mouseMoveY == currentPosition.Y) ||
          (mouseMoveX == currentPosition.X - 1 &&
            mouseMoveY == currentPosition.Y) ||
          (mouseMoveX == currentPosition.X &&
            mouseMoveY == currentPosition.Y + 1) ||
          (mouseMoveX == currentPosition.X &&
            mouseMoveY == currentPosition.Y - 1)
        ) {
          this.gameMap[mouseMoveY][mouseMoveX] =
            this.gameMap[startPosition.Y][startPosition.X].toLowerCase();
          previousPosition.X = currentPosition.X;
          previousPosition.Y = currentPosition.Y;
          currentPosition.X = mouseMoveX;
          currentPosition.Y = mouseMoveY;

          // Saving the moves for drawing map later
          this.moves[
            this.gameMap[mouseMoveY][mouseMoveX].toUpperCase()
          ].coords.push({ Y: mouseMoveY, X: mouseMoveX });

          // Drawing the pipe
          this.draw.drawPipe(
            Colors[this.gameMap[startPosition.Y][startPosition.X]],
            previousPosition,
            currentPosition
          );
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
    } else {
      // If the mouse is out of bounds then restart everything
      this.handleMouseUp(event);
    }
  }

  // TODO: This is pointless and needs to be renamed and fixed
  clearNotConntectedPipes(mouseX, mouseY) {
    if (
      !(endPosition.X == mouseX && endPosition.Y == mouseY) ||
      !(
        (currentPosition.X == endPosition.X - 1 &&
          currentPosition.Y == endPosition.Y) ||
        (currentPosition.X == endPosition.X + 1 &&
          currentPosition.Y == endPosition.Y) ||
        (currentPosition.X == endPosition.X &&
          currentPosition.Y == endPosition.Y - 1) ||
        (currentPosition.X == endPosition.X &&
          currentPosition.Y == endPosition.Y + 1)
      )
    ) {
      this.moves[
        this.gameMap[startPosition.Y][startPosition.X].toUpperCase()
      ].coords = [];

      for (var y = 0; y < this.mapSize; y++) {
        for (var x = 0; x < this.mapSize; x++) {
          if (
            this.gameMap[y][x].toUpperCase() ==
              this.gameMap[startPosition.Y][startPosition.X] &&
            !Utility.isUpper(this.gameMap[y][x])
          ) {
            this.gameMap[y][x] = "0";
            this.context.clearRect(
              startPosition.X * this.tileH,
              startPosition.Y * this.tileW,
              this.tileW - 1,
              this.tileH - 1
            );
            this.context.clearRect(
              endPosition.X * this.tileH,
              endPosition.Y * this.tileW,
              this.tileW - 1,
              this.tileH - 1
            );
            this.context.clearRect(
              x * this.tileH,
              y * this.tileW,
              this.tileW - 1,
              this.tileH - 1
            );

            // TODO: Should be written better
            // Redrawing squares and points (clearing the pipes from game map)
            this.draw.drawSquares(startPosition.X, startPosition.Y);
            this.draw.drawSquares(endPosition.X, endPosition.Y);
            this.draw.drawSquares(x, y);
            this.draw.drawPoint(startPosition.X, startPosition.Y);
            this.draw.drawPoint(endPosition.X, endPosition.Y);
          }
        }
      }
    }
    // TODO: Should be changed
    // Drawing pipe to end point
    else {
      if (mouseX == endPosition.X && mouseY == endPosition.Y) {
        this.draw.drawPipe(
          Colors[this.gameMap[startPosition.Y][startPosition.X]],
          currentPosition,
          endPosition
        );
        // Drawing the after glow of every pipe and point with that color
        this.draw.drawAfterGlow(this.gameMap[startPosition.Y][startPosition.X]);
        this.solvedColors.push(this.gameMap[startPosition.Y][startPosition.X]);

        // Counting points after every completed move (#)
        socket.emit("countPoints", {
          gameCode: clientRoom,
          startMap: startMap,
          currentMap: currentMap,
          solvedColors: gameObj.solvedColors,
          moves: this.moves,
        });
      }
    }
  }
}
