const Generator = require('../generator/Generator');
const GameMap = require('./GameMap');
const Global = require('./Global')
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