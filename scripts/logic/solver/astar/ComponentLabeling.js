class ComponentLabeling {
  constructor() {
    this.linked = [];
    // Creating empty array 2D with size of the map
    // -1 - Points
    this.labels = Array(GameMap.size)
      .fill()
      .map(() => Array(GameMap.size).fill(9)); //! To -1 later
    // HashMap
    this.union = new Map();
    this.nextLabel = 0;
    this.sectorNumber = 0;

    // Tests
    this.currentPoint = [];
    this.endPoint = [];
  }

  neighbours(map, y, x) {
    let result = [];

    if (x > 0 && map[y][x - 1] == "0") {
      // console.log("Left neighbour");
      result.push({ Y: y, X: x - 1 });
    }
    if (y > 0 && map[y - 1][x] == "0") {
      // console.log("Upp neighbour");
      result.push({ Y: y - 1, X: x });
    }

    return result;
  }

  // Connected-component labeling with Disjoint set
  // TODO: Something is wrong with Map (union) - looks closly
  detectSectors(map) {
    // First run, '0' - is not background
    // Raster scan
    for (let y = 0; y < GameMap.size; y++) {
      for (let x = 0; x < GameMap.size; x++) {
        if (map[y][x] == "0") {
          let neighbours = this.neighbours(map, y, x);

          if (neighbours.length == 0) {
            this.linked.push(this.nextLabel);
            this.labels[y][x] = this.nextLabel;
            this.nextLabel++;
          } else {
            let label = [];
            label.push(this.labels[neighbours[0].Y][neighbours[0].X]);

            if (neighbours.length == 2) {
              label.push(this.labels[neighbours[1].Y][neighbours[1].X]);
            }
            this.labels[y][x] = Math.min(...label);
            label.forEach((l) => {
              this.union.set(this.linked[l], Math.min(...label));
            });
          }
        }
      }
    }
    // console.log(_.cloneDeep(this.labels));

    // Second run
    for (let y = 0; y < GameMap.size; y++) {
      for (let x = 0; x < GameMap.size; x++) {
        if (map[y][x] == "0") {
          // TODO: REWRITE IT
          this.labels[y][x] =
            typeof this.union.get(this.labels[y][x]) == "undefined"
              ? this.labels[y][x]
              : this.union.get(this.labels[y][x]);
            if(this.union.has(this.labels[y][x])) {
                this.sectorNumber++;
            }
        }
      }
    }
    console.log(this.sectorNumber);
    // console.log(this.union);
    console.log(this.labels);
  }

  // Add points to detected sectors
  addCurrentToSector(mapState) {
    for (let i = 0; i < GameMap.numberOfColors; i++) {
      this.currentPoint[i] = this.endPoint[i] = "";
    }

    for (let j = 0; j < GameMap.numberOfColors; j++) {
      // Finish condition
      //TODO: IMPORTANT ADD TO ARRAY AFTER FINISHING COLOR (in Moves.js)
      if (mapState.finished.includes(j)) {
        continue;
      }

      let neighboursOfCurrent = Moves.possibleMoves(mapState, j);
      let temp = [];
      neighboursOfCurrent.forEach((neighbour) => {
        const y = neighbour.To.Y;
        const x = neighbour.To.X;
        if (this.labels[y][x] != -1) {
          // this.currentPoint[j] += this.labels[y][x].toString();
          temp.push(this.labels[y][x]);
        }
      });
      this.currentPoint[j] = temp;

      let neighboursOfEnd = this.possibleMoves(j);
      temp = [];

      neighboursOfEnd.forEach((neighbour) => {
        const y = neighbour.To.Y;
        const x = neighbour.To.X;
        if (this.labels[y][x] != -1) {
          temp.push(this.labels[y][x]);
        }
      });
      this.endPoint[j] = temp;
    }

    // console.log(this.currentPoint);
    // console.log(this.endPoint);
  }

  check(mapState) {
    // Hardcoded number of generated sectors
    // let sectorNum = 2;

    this.detectSectors(mapState.map);
    this.addCurrentToSector(mapState);

    let counter = GameMap.numberOfColors;

    //TODO: It kinda suck, rewrite it
    for (let i = 0; i < GameMap.numberOfColors; i++) {
      const curr = this.currentPoint[i];
      const end = this.endPoint[i];
      for (let c = 0; c < curr.length; c++) {
        for (let e = 0; e < end.length; e++) {
          if (this.currentPoint[i][c] == this.endPoint[i][e]) {
            counter--;
            c = this.currentPoint[i].length;
            break;
          }
        }
      }
    }

    if (counter != 0) {
      console.log("Blocked");
    }
  }

  //TODO: Remove this function and wrote it in Moves.js
  possibleMoves(color) {
    let result = [];
    const y = GameMap.endPoint[color].Y;
    const x = GameMap.endPoint[color].X;
    const map = GameMap.map;

    if (x < GameMap.size - 1 && map[y][x + 1] == "0") {
      // console.log("Left neighbour");
      result.push({ From: { Y: y, X: x }, To: { Y: y, X: x + 1 } });
    }
    if (x > 0 && map[y][x - 1] == "0") {
      // console.log("Right neighbour");
      result.push({ From: { Y: y, X: x }, To: { Y: y, X: x - 1 } });
    }
    if (y < GameMap.size - 1 && map[y + 1][x] == "0") {
      // console.log("Upp neighbour");
      result.push({ From: { Y: y, X: x }, To: { Y: y + 1, X: x } });
    }
    if (y > 0 && map[y - 1][x] == "0") {
      // console.log("Down neighbour");
      result.push({ From: { Y: y, X: x }, To: { Y: y - 1, X: x } });
    }

    return result;
  }
}
