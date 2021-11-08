class ComponentLabeling {
  constructor() {
    this.linked = [];
    // Creating empty array 2D with size of the map
    // -1 - Points
    this.labels = Array(GameMap.size)
      .fill()
      .map(() => Array(GameMap.size).fill(-1));
    // HashMap
    this.union = new Map();
    this.nextLabel = 0;
  }

  neighbours(mapState, y, x) {
    let result = [];

    const map = mapState;
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
  // TODO: Check performance on this (if it's gonna be bad rewrite it)
  twoPass(map) {
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
    console.log(this.labels);

    // Second run
    for (let y = 0; y < GameMap.size; y++) {
      for (let x = 0; x < GameMap.size; x++) {
        if (map[y][x] == "0") {
          this.labels[y][x] = this.union.get(this.labels[y][x]);
        }
      }
    }

    console.log(this.union);
    console.log(this.labels);
  }
}
