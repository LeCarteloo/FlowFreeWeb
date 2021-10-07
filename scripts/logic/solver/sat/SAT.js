//! Constraints
//! One point can have only one color (rest is negated)
class SAT {
    constructor(gameMap, colors, numberOfColors) {
        this.GameMap = gameMap;
        this.Colors = colors;
        this.NumberOfColors = numberOfColors;
    }

    static #POSITION = {
        UP: {
            Y: -1,
            X: 0
        },
        DOWN: {
            Y: 1,
            X: 0
        },
        LEFT: {
            Y: 0,
            X: -1
        },
        RIGHT: {
            Y: 0,
            X: 1
        }
    }

    //! dev tool
    debugArray = [];
    time = 0;

    // Main function
    main() {
        var start = performance.now();
        // Tests
        this.printGroup("Map", this.GameMap)
        this.printGroup("Neighbours of point (0, 0)", this.neighbours(0, 0))
        this.printGroup("All possible pairs of array [7,8,9,10,11]", this.pairs([7,8,9,10,11]))
        this.printGroup("Negated neighbours", this.notBothNeighbours([7,8,9,10,11],[1, 2]))
        this.debugArray = this.colorSAT(this.GameMap, this.Colors);
        this.printGroup("Colors reduced to SAT", this.debugArray)
        this.printGroup("Solved game map", this.decodeSAT(this.GameMap, solved, this.Colors));

        var end = performance.now();
        this.time = `${end - start} ms`;
        console.log(`Solved in: ${this.time}`);
    }

    printGroup(name, value) {
        console.groupCollapsed(`%c ${name}`, 'color:red; text-transform: uppercase;');
        console.log(value);
        console.groupEnd();
    }

    // Color variables (needed for reducing colors to SAT)
    genColorVariable(y, x, point) {
        return (y * gameMap.length + x) * this.NumberOfColors + point + 1;
    }

    // All possible pairs of given array [1, 2, 3] = [1, 2] [1, 3] [2, 3]
    pairs(array) {
        var result = [];
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i; j < array.length - 1; j++) {
                result.push([array[i], array[j + 1]]);
            }
        }
        return result;
    }

    // No two neighbours of the point can share color with other
    notBothNeighbours(array, satArray) {
        var result = [];
        for (let pair of this.pairs(array)) {
            result.push(-pair[0], -pair[1]);
            satArray.push(result);
            result = [];
        }
    }

    // Returns positon of all neighbours that are within game map borders
    neighbours(y, x) {
        var neighbours = [];
        if(y > 0) {
            neighbours.push([SAT.#POSITION.UP.Y + y, SAT.#POSITION.UP.X + x]);
        }   
        if(y + 1 < this.GameMap.length) {
            neighbours.push([SAT.#POSITION.DOWN.Y + y, SAT.#POSITION.DOWN.X + x]);
        }
        if(x > 0) {
            neighbours.push([SAT.#POSITION.LEFT.Y + y, SAT.#POSITION.LEFT.X + x]);
        }
        if(x + 1 < this.GameMap.length) {
            neighbours.push([SAT.#POSITION.RIGHT.Y + y, SAT.#POSITION.RIGHT.X + x]);
        }
        return neighbours;
    }

    // Reducing colors to SAT
    colorSAT(map, colors) {
        var satArray = [];
        var firstColor = parseInt(Object.keys(colors)[0]);
        // For every tile in game map
        // Creating boolean variables
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map.length; x++) {
                // If tile is not empty
                if(map[y][x] != 0) {
                    var point = colors[map[y][x]];
                    // Color variable is true (tile has exactly this color)
                    satArray.push(this.genColorVariable(y, x, point));

                    // All other colors values are negated 
                    for(let i = firstColor; i < this.NumberOfColors + firstColor; i++) {
                        if(i != point) {
                            satArray.push(-this.genColorVariable(y, x, i))
                        }
                    }

                    var tempNeighbours = [];
                    
                    // One tile can have only one neighbour with the same color
                    for(let position of this.neighbours(y, x).entries()) {
                        tempNeighbours.push(this.genColorVariable(position[1][0], position[1][1], point))
                    }

                    satArray.push(tempNeighbours);
                    this.notBothNeighbours(tempNeighbours, satArray);
                }
                else {
                    var tempFreeTile = [];
                    // All free tiles can have every color inside BUT two colors cannot be true
                    // So that means only one color can be true
                    for (let i = firstColor; i < this.NumberOfColors + firstColor; i++) {
                        tempFreeTile.push(this.genColorVariable(y, x, i))
                    }
                    satArray.push(tempFreeTile);
                    this.notBothNeighbours(tempFreeTile, satArray)
                }
            }
        }
        
        return satArray;
    }

    // Decode SAT solution from given array (atm. from MiniSat)
    // Returns a solved map array
    decodeSAT(map, solvedArray, colors) {
        var firstColor = parseInt(Object.keys(colors)[0]);
        for (let y = 0; y < map.length; y++) {
          for (let x = 0; x < map.length; x++) {

            for (let i = firstColor; i < this.NumberOfColors + firstColor; i++) {
                if(solvedArray.includes(this.genColorVariable(y, x, i))) {
                    map[y][x] = i;
                }
            }
          }
           
        }
        return map;
    }

}