module.exports = class GameMap {
    static map;
    static size;
    static numberOfColors;
    static foundColors;
    static startPoint;
    static endPoint;
    
    // Find size of the map, colors, positions for start and endpoint.
    static initializeMap(gameMap) {
        this.size = gameMap.length;
        this.foundColors = [];
        this.numberOfColors = 0;
        this.startPoint = [];
        this.endPoint = [];
        this.map = gameMap; //_.cloneDeep(gameMap)
        this.finishedPoints = [];

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if(gameMap[y][x] == '0') {
                    continue;
                }

                let index;
                let tileValue = gameMap[y][x];
                // Start and end position of each point.
                if(this.foundColors.includes(tileValue)) {
                    index = this.foundColors.indexOf(tileValue);
                    this.endPoint.splice(index, 1, {Y: y, X: x})
                    gameMap[y][x] = '|';
                }
                else {
                    index = this.numberOfColors;
                    this.foundColors.push(gameMap[y][x]);
                    this.startPoint.splice(index, 0, {Y: y, X: x})
                    this.endPoint.push(-1);
                    this.numberOfColors++;
                }
                
            }
        }
        //! Map not initializated - error handling would be here
    }

    // Clearing all variables needed for game map initialization.
    static clearAll() {
        this.size = 0;
        this.foundColors = [];
        this.numberOfColors = 0;
        this.startPoint = [];
        this.endPoint = [];
        this.map = [];
        this.finishedPoints = [];
    }

    static missingPoint() {
        return this.startPoint.includes(-1) || this.endPoint.includes(-1);
    }
}