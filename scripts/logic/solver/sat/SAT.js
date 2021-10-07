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
    // Main function
    main() {
        // var result = collection.flatMap(
        //     (v, i) => collection.slice(i+1).map( w => [v, w] ));
        this.printGroup("Map", this.GameMap)
        this.printGroup("Neighbours of point (0, 0)", this.neighbours(0, 0))
        console.log("Creating " + (this.GameMap.length * this.GameMap.length * Object.keys(this.Colors).length) + " color variables...");
        
        this.printGroup("Colors reduced to SAT", this.colorSAT(this.GameMap, this.Colors))
        // this.neighbours(0, 2);
        this.debugArray = this.colorSAT(this.GameMap, this.Colors);
        
        this.printGroup("All possible combinations", this.allPossibleCombinations([1]))
        this.printGroup("Negated neighbours", this.notBothNeighbours([1, 2]))

    }
    printGroup(name, value) {
        console.groupCollapsed(name);
        console.log(value);
        console.groupEnd();
    }
    // Color variables (needed for reducing colors to SAT)
    colorVariables(y, x, point) {
        return (y + x) * this.NumberOfColors + point;
    }
    // All possible comibinations of an given array
    allPossibleCombinations(array) {
        return array.flatMap(a => array.map(c => [a, c]));
    }
    // No two neighbours of the point can share color with other
    notBothNeighbours(array) {
        var result = [];
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            result.push(this.allPossibleCombinations(element))
        }
        return result;
    }
    // Returns  positon of all neighbours that are within game map borders
    neighbours(y, x) {
        var neighbours = [];
        if(y > 0) {
            // console.log("Up")
            neighbours.push([SAT.#POSITION.UP.Y + y, SAT.#POSITION.UP.X + x]);
        }   
        if(y + 1 < this.GameMap.length) {
            // console.log("Down")
            neighbours.push([SAT.#POSITION.DOWN.Y + y, SAT.#POSITION.DOWN.X + x]);
        }
        if(x > 0) {
            // console.log("Left")
            neighbours.push([SAT.#POSITION.LEFT.Y + y, SAT.#POSITION.LEFT.X + x]);
        }
        if(x + 1 < this.GameMap.length) {
            // console.log("Right")
            neighbours.push([SAT.#POSITION.RIGHT.Y + y, SAT.#POSITION.RIGHT.X + x]);
        }
        return neighbours;
    }
    // Reducing colors to SAT
    colorSAT(map, colors) {
        var satArray = [];
        var firstColor = parseInt(Object.keys(colors)[0]);
        // For every tile in game map search for points
        // Creating boolean variables
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map.length; x++) {
                // If tile is not empty
                if(map[y][x] != 0) {
                    var point = colors[map[y][x]];
                    // if(map[y][x] == point) {}
                    // Color variable is true (tile has exactly this color)
                    satArray.push(this.colorVariables(y, x, point));

                    // All other colors values are negated 
                    for(let i = firstColor; i < this.NumberOfColors + firstColor; i++) {
                        if(i != point) {
                            satArray.push(-this.colorVariables(y, x, i))
                        }
                    }

                    var tempNeighbours = [];
                    
                    // One tile can have only one neighbour with the same color
                    for(let position of this.neighbours(y, x).entries()) {
                        tempNeighbours.push(this.colorVariables(position[1][0], position[1][1], point))
                    }

                    satArray.push(tempNeighbours)
                }
                else {
                    
                }
            }
        }
        // for(let)
        return satArray;
    }
}