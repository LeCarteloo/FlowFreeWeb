module.exports = class GameMap {
    // TODO: If there is a problem, add constructor and change a bit this class
    static map;
    static size;
    static numberOfColors;
    static foundColors;
    static startPoint;
    static endPoint;
    
    // Find size of the map, colors, positions for start and endpoint.
    static initializeMap(gameMap) {
        const points = this.findPoints(gameMap);
        
        this.size = gameMap.length;
        this.foundColors = points.foundColors;
        this.numberOfColors = points.numberOfColors;
        this.startPoint = points.startPoint;
        this.endPoint = points.endPoint;
        this.map = gameMap; //_.cloneDeep(gameMap)
        this.finishedPoints = [];
    }

    static findPoints(gameMap) {
        let foundColors = [];
        let startPoint = [];
        let endPoint = [];
        let numberOfColors = 0;

        for (let y = 0; y < gameMap.length; y++) {
            for (let x = 0; x < gameMap.length; x++) {
                if(gameMap[y][x] == '0') {
                    continue;
                }

                let index;
                let tileValue = gameMap[y][x];
                // Start and end position of each point.
                if(foundColors.includes(tileValue)) {
                    index = foundColors.indexOf(tileValue);
                    endPoint.splice(index, 1, {Y: y, X: x})
                    gameMap[y][x] = '|';
                }
                else {
                    index = numberOfColors;
                    foundColors.push(gameMap[y][x]);
                    startPoint.splice(index, 0, {Y: y, X: x})
                    endPoint.push(-1);
                    numberOfColors++;
                }
            }
        }

        //! Map not initializated - error handling would be here

        return {startPoint: startPoint, endPoint: endPoint, foundColors: foundColors, numberOfColors: numberOfColors};
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