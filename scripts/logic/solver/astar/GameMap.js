class GameMap {
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
        this.map = gameMap;
        
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if(gameMap[y][x] == '0') {
                    continue;
                }
                else {
                    let index;
                    let tileValue = gameMap[y][x];
                    // Start and end position of each point.
                    if(this.foundColors.includes(tileValue)) {
                        index = this.foundColors.indexOf(tileValue);
                        this.endPoint.splice(index, 0, {Y: y, X: x})
                        gameMap[y][x] = '?';
                    }
                    else {
                        index = this.numberOfColors;
                        this.foundColors.push(gameMap[y][x]);
                        this.startPoint.splice(index, 0, {Y: y, X: x})
                        this.numberOfColors++;
                    }
                }
            }
        }
        if(!this.#isInitializated(gameMap) || this.endPoint.length != this.startPoint.length) {
            throw('Something went wrong... Map could not be initalized');
        }
    }

static #isInitializated(gameMap) {
    return this.map == gameMap;
}

}