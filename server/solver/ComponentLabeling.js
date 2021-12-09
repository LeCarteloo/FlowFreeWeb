const Neighbours = require('./Neighbours');
const GameMap = require('./GameMap');

module.exports = class ComponentLabeling {
  constructor() {
    // Creating empty array 3D with size of the map
    // Filling map with -1
    this.labels = Array(GameMap.size)
      .fill()
      .map(() => Array(GameMap.size).fill('-1'));

    // Equivalent table
    this.equivalent = []; // Array(GameMap.size).fill('')
    this.union = new Map();

    // Counting next labels
    this.nextLabel = 0;
    this.numberOfSectors = []; // = 0

    // To which sector points belong
    this.currentPoint = [];
    this.endPoint = [];
  }
  // Printing labels for debug
  #printLabels(labels) {
    for (let y = 0; y < labels.length; y++) {
      console.log(labels[y]);
    }
  }

  //TODO: Remove this function and wrote it in Moves.js
  #possibleMoves(color) {
    let result = [];
    const y = GameMap.endPoint[color].Y;
    const x = GameMap.endPoint[color].X;
    const map = GameMap.map;

    if (x < GameMap.size - 1 && map[y][x + 1] == "0") {
      // console.log("Left neighbour");
      result.push({Y: y, X: x + 1 });
    }
    if (x > 0 && map[y][x - 1] == "0") {
      // console.log("Right neighbour");
      result.push({Y: y, X: x - 1 });
    }
    if (y < GameMap.size - 1 && map[y + 1][x] == "0") {
      // console.log("Upp neighbour");
      result.push({Y: y + 1, X: x });
    }
    if (y > 0 && map[y - 1][x] == "0") {
      // console.log("Down neighbour");
      result.push({Y: y - 1, X: x });
    }

    return result;
  }

  // Two neighbours of point (north, west) needed for detecting sectors
  #fourConnectivity(map, y, x) {
    let result = [];

    if (x > 0 && map[y][x - 1] == "0") {
      result.push({ Y: y, X: x - 1 });
    }
    if (y > 0 && map[y - 1][x] == "0") {
      result.push({ Y: y - 1, X: x });
    }

    return result;
}

  // TODO: It really needs to be rewrited (later)
  // Connected-component labeling //! (without Disjoint set)
  // Detecting sectors and generating equivalent table
  #detectSectors(map) {
    // First run, '0' - is not background
    // Raster scan
    for (let y = 0; y < GameMap.size; y++) {
      for (let x = 0; x < GameMap.size; x++) {
        if (map[y][x] == "0") {
          let neighbours = this.#fourConnectivity(map, y, x);
          if (neighbours.length == 0) {
            this.equivalent[this.nextLabel] = this.nextLabel.toString();
            this.labels[y][x] = this.nextLabel;
            this.union.set(this.nextLabel, this.nextLabel)
            this.nextLabel++;
          } else {
            let label = [];
            neighbours.forEach(neighbour => {
              label.push(this.labels[neighbour.Y][neighbour.X]);
            });
            this.labels[y][x] = Math.min(...label);
            label.forEach((l) => {
              if(this.labels[y][x] != l) {
                this.equivalent[l] += this.labels[y][x];
                this.equivalent[this.labels[y][x]] += l;
              }
            });
          }
        }
        // console.log(this.equivalent);
      }
    }
    // this.#printLabels(this.labels)

    //! If got time change it
    for (let i = 0; i < this.equivalent.length; i++) {
      for (let j = 0; j < this.equivalent[i].length; j++) {
        if(this.equivalent[i][j] == i) {
          continue;
        }
        
        let ts = parseInt(Math.min(...this.equivalent[Math.min(...this.equivalent[i])]));
        if(ts < parseInt(this.equivalent[i][j]) && ts < this.union.get(parseInt(this.equivalent[i][j]))) {
          this.union.set(parseInt(this.equivalent[i][j]), ts)
        }
      }
    }

      
    // console.log("###########################");
    // console.log(this.union);
    // this.#printLabels(this.labels)

    // console.log("###########################");

    // Second run
    for (let y = 0; y < GameMap.size; y++) {
      for (let x = 0; x < GameMap.size; x++) {
        if (map[y][x] == "0") {
            this.labels[y][x] = this.union.get(this.labels[y][x]);
            if (!this.numberOfSectors.includes(this.labels[y][x])) {
              this.numberOfSectors.push(this.labels[y][x]);
            }
            // TODO: (NOTE)
        }
      }
    }

  // Third run
  for (let y = 0; y < GameMap.size; y++) {
    for (let x = 0; x < GameMap.size; x++) {
      if (map[y][x] == "0") {
          this.labels[y][x] = this.union.get(this.labels[y][x]);
          if (!this.numberOfSectors.includes(this.labels[y][x])) {
            this.numberOfSectors.push(this.labels[y][x]);
          }
          // TODO: (NOTE)
      }
    }
  }

    // this.#printLabels(this.labels)
    // Normalizing sectors id's
    //! 2/10
    for (let y = 0; y < GameMap.size; y++) {
      for (let x = 0; x < GameMap.size; x++) {
        if (map[y][x] == "0") {
          this.labels[y][x] = this.numberOfSectors.indexOf(this.labels[y][x]);
        }
      }
    }

    // console.log('');
    // console.log(this.union);
    // console.log("###########################");
    // console.log(this.numberOfSectors);
    // this.#printLabels(this.labels)
  }

  // Add points to detected sectors
  #addPointsToSectors(mapState) {
    // TODO: IMPORTANT NUMBER OF SECTORS COULD BE LARGER THAN NUMBER OF COLORS
    for (let i = 0; i < this.numberOfSectors.length; i++) {
      this.currentPoint[i] = "";
      this.endPoint[i] = "";
    }

    for (let j = 0; j < GameMap.numberOfColors; j++) {
      if (mapState.isFinished(j)) {
        continue;
      }

      let neighboursOfCurrent = Neighbours.allFreeSpace(mapState, j);
      // let temp = [];
      neighboursOfCurrent.forEach((neighbour) => {
        const y = neighbour.Y;
        const x = neighbour.X;
        if (
          this.labels[y][x] != -1 &&
          !this.currentPoint[this.labels[y][x]].includes(GameMap.foundColors[j])
        ) {
          this.currentPoint[this.labels[y][x]] += GameMap.foundColors[j];
          // this.currentPoint.splice(this.labels[y][x], 0, j.toString())
        }
      });

      let neighboursOfEnd = this.#possibleMoves(j);

      neighboursOfEnd.forEach((neighbour) => {
        const y = neighbour.Y;
        const x = neighbour.X;
        if (
          this.labels[y][x] != -1 &&
          !this.endPoint[this.labels[y][x]].includes(GameMap.foundColors[j])
        ) {
          this.endPoint[this.labels[y][x]] += GameMap.foundColors[j];
        }
      });
    }

    // console.log(this.labels);
    // console.log("current ", this.currentPoint);
    // console.log("end ", this.endPoint);
  }

  isStranded(mapState, skip) {
    // Hardcoded number of generated sectors
    // let sectorNum = 2;
    this.#detectSectors(mapState.map);
    this.#addPointsToSectors(mapState);

    //! Maybe change it
    let colorsInSectors = [];

    // console.log(this.numberOfSectors.length);
    //! It was this.numberOfSectors.length in FOR
    // console.log(this.numberOfSectors[this.numberOfSectors.length - 1]);
    for (let i = 0; i <= this.numberOfSectors.length; i++) {
      const curr = this.currentPoint[i];
      const end = this.endPoint[i];
      // console.log(curr, end);
      if(typeof curr == 'undefined' && typeof end == 'undefined') {
        continue;
      }
      // console.log(this.currentPoint);
      // console.log(this.endPoint);
      // console.log(this.currentPoint[i]);
      // console.log(this.numberOfSectors.length);
      if (
        ((curr.length > 0 && end.length == 0) ||
        (end.length > 0 && curr.length == 0)) && !skip
      ) {
        return {Is: true, Num: (GameMap.numberOfColors - mapState.finishedPoints.length) - colorsInSectors.length};
      }

      for (let c = 0; c < curr.length; c++) {
        for (let e = 0; e < end.length; e++) {
          // console.log(this.currentPoint[i][c], this.endPoint[i][e]);
          if (this.currentPoint[i][c] == this.endPoint[i][e]) {
            if (!colorsInSectors.includes(this.endPoint[i][e])) {
              colorsInSectors.push(this.endPoint[i][e]);
            }
            break;
          }
        }
      }
    }

    // console.log(colorsInSectors.length, GameMap.numberOfColors - GameMap.finishedPoints.length);
    // console.log(colorsInSectors);
    // for (let i = 0; i < colorsInSectors.length; i++) {
    //   console.log(GameMap.foundColors[colorsInSectors[i]]);
    // }

    if (colorsInSectors.length != GameMap.numberOfColors - mapState.finishedPoints.length) {
      // console.log(GameMap.finishedPoints.length);
      return {Is: true, Num: (GameMap.numberOfColors - mapState.finishedPoints.length) - colorsInSectors.length};
    }

    return {Is: false, Num: (GameMap.numberOfColors - mapState.finishedPoints.length) - colorsInSectors.length};
  }
}