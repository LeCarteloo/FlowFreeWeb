const GameMap = require('./GameMap');
const Astar = require('./Astar')

module.exports = class Solver {
    constructor(gameMap) {
        this.gameMap = gameMap;
        GameMap.initializeMap(this.gameMap);
    }
    
    init(move = null) {        

        let astar = new Astar();

        return astar.search(move);
    }
}