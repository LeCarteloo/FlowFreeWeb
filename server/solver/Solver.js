const GameMap = require('./GameMap');
const Astar = require('./Astar')

module.exports = class Solver {
    constructor(gameMap) {
        this.gameMap = gameMap;
    }
    
    init() {        
        GameMap.initializeMap(this.gameMap);

        let astar = new Astar();

        return astar.search();
    }
}