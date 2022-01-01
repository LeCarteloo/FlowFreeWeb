const GameMap = require('../GameMap');

module.exports = class MapState {
    constructor() {
        this.map = [];
        // Current position of every color
        this.current = [];
        this.freeTiles = 0;
        this.finishedPoints = [];
    }
    isSolved() {
        return this.freeTiles == 0;
    }
    isFinished(color) {
        if(this.finishedPoints.includes(color)) {
            return true;
        }
        return false;
    }
    countFreeTiles() {
        let freeTiles = 0;
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map.length; x++) {
                if(this.map[y][x] == '0') {
                    freeTiles++;
                }
            }            
        }
        return freeTiles + GameMap.numberOfColors - this.finishedPoints.length;
    }
    // Setting the position of the current color
    setCurrent(x, y, color) {
        this.current.splice(color, 1, {Y: y, X: x})
    }
    updateMapState(color, position) {
        const y = position.Y;
        const x = position.X;

        if(y == GameMap.endPoint[color].Y &&
            x == GameMap.endPoint[color].X) {
            this.finishedPoints.push(color);
        }

        this.map[y][x] = GameMap.foundColors[color];
        this.freeTiles--;
        this.setCurrent(x, y, color);
    }
}