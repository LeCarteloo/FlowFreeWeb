class Draw {
  #STROKE_COLOR;
  #FILL_COLOR;
  constructor(context, daltonismMode, tileW, tileH, gameMap) {
    this.#STROKE_COLOR = "#FFF";
    this.#FILL_COLOR = "#121212";
    this.context = context;
    this.daltonismMode = daltonismMode;
    this.tileH = tileH;
    this.tileW = tileW;
    this.gameMap = gameMap;
  }

  // TODO: Think about better option without 2x 'FOR' loops
  drawAfterGlow(point, alpha = 0.2) {
    for (var y = 0; y < this.mapSize; y++) {
      for (var x = 0; x < this.mapSize; x++) {
        if (this.gameMap[y][x].toUpperCase() == point) {
          this.context.globalAlpha = alpha;
          this.context.fillStyle = Colors[this.gameMap[y][x].toUpperCase()];
          this.context.fillRect(
            x * this.tileW,
            y * this.tileW,
            this.tileW,
            this.tileH
          );
          this.context.globalAlpha = 1.0;
        }
      }
    }
  }

  // Drawing pipes from mouse movement
  drawPipe(color, positionFrom, positionTo) {
    this.context.beginPath();
    this.context.moveTo(
      positionFrom.X * this.tileW + this.tileW / 2,
      positionFrom.Y * this.tileW + this.tileW / 2
    ); // X, Y
    this.context.lineTo(
      positionTo.X * this.tileW + this.tileW / 2,
      positionTo.Y * this.tileW + this.tileW / 2
    );

    this.context.strokeStyle = color;
    this.context.lineCap = "round";
    this.context.lineWidth = this.tileW * 0.4;

    this.context.stroke();
    this.context.closePath();

    // TODO: Add global variable and handle this
    // Drawing text for colorblind users
    if (this.daltonismMode) {
      this.drawText(positionTo.X, positionTo.Y);
      this.drawText(positionFrom.X, positionFrom.Y);
    }
  }

  drawSquares(x, y, fillColor = this.#FILL_COLOR) {
    // Start drawing square with dark background and white stroke
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.strokeStyle = this.#STROKE_COLOR;
    this.context.fillStyle = fillColor;
    this.context.fillRect(
      x * this.tileW,
      y * this.tileH,
      this.tileW,
      this.tileH
    );
    this.context.strokeRect(
      x * this.tileW,
      y * this.tileH,
      this.tileW,
      this.tileH
    );
  }

  // Drawing a point
  drawPoint(x, y) {
    if (this.gameMap[y][x] != "0") {
      this.context.fillStyle = Colors[this.gameMap[y][x]];

      var circle = new Path2D();
      circle.moveTo(x * this.tileW, y * this.tileH);
      circle.arc(
        x * this.tileW + this.tileW / 2,
        y * this.tileH + this.tileH / 2,
        this.tileW * 0.47,
        this.tileH * 0.47,
        0,
        360
      );
      this.context.fill(circle);

      // Drawing text for colorblind users
      if (this.daltonismMode) {
        this.drawText(x, y);
      }
    }
  }

  // Draw a text over a pipe or point
  drawText(x, y, color = this.#FILL_COLOR) {
    this.context.beginPath();
    this.context.font = "48px arial";
    this.context.fillStyle = color;
    this.context.fillText(
      this.gameMap[y][x],
      x * this.tileW + this.tileW / 2 - 15,
      y * this.tileH + this.tileH / 2 + 12
    );
  }

  // Function for visualizing CCL
  drawSectorNumber(number) {
    for (let y = 0; y < this.mapSize; y++) {
      for (let x = 0; x < this.mapSize; x++) {
        if (this.gameMap[y][x] == number) {
          this.drawAfterGlow(number, 0.05);
          this.context.font = "48px roboto";
          this.context.fillStyle = this.#STROKE_COLOR;
          this.context.fillText(
            number,
            x * this.tileW + this.tileW / 2 - 15,
            y * this.tileH + this.tileH / 2 + 12
          );
        }
      }
    }
  }
}
