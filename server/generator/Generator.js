const Solver = require("../solver/Solver");
const _ = require('lodash');
module.exports = class Generator {
    // Enum with Colors
    Colors = {
        R: "red",
        G: "green",
        B: "blue",
        Y: "yellow",
        O: "orange",
        A: "aqua",
        P: "purple",
        L: "lime",
        M: "magenta",
        W: "white",
        D: "darkblue",
        S: "silver",
    };
    
    /* At the moment generating maps with same size and number of colors,
    Also the start and end point of the same color can be next to each other */
    generateMap(size, numOfColors, numOfMaps) {
        let maps = [];
        let debugMaps = [];
        while(maps.length != numOfMaps) {
            const createdMap = this.createMap(size, numOfColors);
            const result = this.isSolvable(_.cloneDeep(createdMap));
            // console.log(result);
            if(result.isSolved) {
                maps.push(createdMap);
                // TODO: Remove it after fixing bug
                debugMaps.push(result.map);
            }
            // console.count("generated: ");
        }  
        return {maps: maps, debugMaps: debugMaps};    
    }

    // Try to solve the map and return
    isSolvable(map) {
        let solver = new Solver(map);
        const result = solver.init();
        return {isSolved: result.isSolved, map: result.map};
    }

    createMap(size, numOfColors) {
        // Filling map
        let createdMap = Array(size).fill()
        .map(() => Array(size).fill('0'));

        // For every color place start and end point in random tile
        for (let y = 0; y < numOfColors; y++) {
            for (let x = 0; x < 2; x++) {
                let pointY, pointX;

                do {
                    pointY = Math.floor(Math.random() * ((size - 1) + 1));
                    pointX = Math.floor(Math.random() * ((size - 1) + 1));
                } while(createdMap[pointY][pointX] != 0)

                createdMap[pointY][pointX] = Object.keys(this.Colors)[y];
            }
        }
    
        return createdMap;
    }

    placePoints(numOfColors) {
        for (let index = 0; index < numOfColors; index++) {
            // Starting points
            testMap[0][index] = Object.keys(Colors)[index];
            // End points
            testMap[numOfColors - 1][index] = Object.keys(Colors)[index];
        }
    }

    printMap(map) {
        for (let i = 0; i < map.length; i++) {
            const element = map[i];
            console.log(element);
        }
    }
}