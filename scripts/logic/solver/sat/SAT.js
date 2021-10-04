//! Constraints
//! One point can have only one color (rest is negated)
class SAT {
    // Global game map variable for test puropses
    gameMap = [
        [1, 0, 2, 0, 3],
        [0, 0, 4, 0, 5],
        [0, 0, 0, 0, 0],
        [0, 2, 0, 3, 0],
        [0, 1, 4, 5, 0]
    ];
    // Enum with colors for test purposes
    Colors = {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        // '6': 6
    }
    // Main function
    main() {
        console.log(this.gameMap);
        this.colorSAT(this.gameMap, this.Colors);
    }
    colorVariables(y, x, point) {
        return (y * gameMap.length + x) * numberOfColors + color + 1;
    }
    colorSAT(map, colors) {
        var sat = [];
        console.log("Creating " + (map.length * map.length * Object.keys(colors).length) + " color variables...");
        // For every tile in game map search for points
        // Creating C boolean variables
        for(let y = 0; y < this.gameMap.length; y++) {
            for(let x = 0; x < this.gameMap.length; x++) {
                // If tile is not empty
                if(map[y][x] != 0) {
                    var point = colors[map[y][x]];
                    // if(map[y][x] == point) {}
                    sat.push(this.colorVariables(y, x, point))
                }
            }
        }
    }
}