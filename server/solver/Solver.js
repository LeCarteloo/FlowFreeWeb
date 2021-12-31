const GameMap = require('./GameMap');
const Astar = require('./Astar')

module.exports = class Solver {
    constructor(gameMap) {
        this.gameMap = gameMap;
    }
    
    init(move = null) {        
        GameMap.initializeMap(this.gameMap);

        let astar = new Astar();

        return astar.search(move);
    }
}