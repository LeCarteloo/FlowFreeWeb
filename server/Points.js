const GameMap = require("./solver/GameMap");
const { validateData } = require("./Utility");

module.exports = class Points {
    constructor(startMap, completedMap, solvedColors) {
        this.startMap = startMap;
        // this.size = startMap.length
        this.completedMap = completedMap;
        this.solvedColors = solvedColors;
        this.points = {};
    }
    countPoints() {
        // TODO: When user changes startMap to ['1'] (in code) it throw error fix it
        // Validate data sent by user
        if(validateData(this.startMap, this.completedMap, this.solvedColors)) {
            return -1;
        }

        this.points = GameMap.findPoints(this.startMap);
        let filedTiles = 0;

        for (let y = 0; y < this.startMap.length; y++) {
            for (let x = 0; x < this.startMap.length; x++) {
                if(this.completedMap[y][x] != 0) {
                    filedTiles++;
                }
            }            
        }
        filedTiles -= this.points.numberOfColors * 2
        return filedTiles + this.solvedColors.length * 10;
    }
}