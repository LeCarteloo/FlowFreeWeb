const MapState = require('./MapState');
const GameMap = require('../GameMap');
const _ = require('lodash');

module.exports = class Node {
    constructor(){
        // Map state and number of free tiles
        this.mapState = new MapState();
        this.mapState.map = _.cloneDeep(GameMap.map);
        this.mapState.freeTiles = GameMap.size ** 2 - GameMap.numberOfColors;

        // Current position of every point (later - of last moved pipe of each point)
        for (let i = 0; i < GameMap.numberOfColors; i++) {
            this.mapState.current[i] = GameMap.startPoint[i];
        }

        this.g = 0;
        this.h = this.manhattan();
    }
    /* Function returns distance beetwen all points combined.
    Manhattan works slower so at the moment manhattan is equal to free tiles*/
    manhattan() {
        var manhValue = 0; 

        // Distance between two points
        // TODO: Check why is this slower
        for (let i = 0; i < GameMap.numberOfColors; i++) {
            const curr = this.mapState.current[i];
            const end = GameMap.endPoint[i];
            manhValue += Math.abs(curr.X - end.X) + Math.abs(curr.Y - end.Y);
        }
        
        // manhValue = this.mapState.freeTiles;

        return manhValue;
    }
    isSolved() {
        return this.mapState.isSolved();
    }
    isFinished(color) {
        return this.mapState.isFinished(color);
    }
    getFCost() {
        return this.g + this.h;
    }
    // Updating map state for given node
    updateMapState(color, position) {
        this.mapState.updateMapState(color, position);
    }
}