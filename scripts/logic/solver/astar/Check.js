class Check {
    //TODO: First check function that is faster if it found 
    //TODO: the problem then return and stop everything else

    // Check if pipe has missed any tile that cannot be filled later
    // One tile is surrounded by three pipes with this same color
    //! WORK IN PROGRESS (probably not working atm)
    par;

    constructor() {
        this.par = [];
    }

    missedTile(mapState, color) {
        let neighbours = Moves.possibleMoves(mapState, color)
        let tilesFiled = 0;
        
        neighbours.forEach(neighbour => {
            const y = neighbour.To.Y;
            const x = neighbour.To.X;
            if(mapState.map[y][x] == GameMap.foundColors[color] 
                && mapState.finished.includes(color)){
                tilesFiled++;
            }
        });
        return tilesFiled >= 3;
    }

    //! WORK IN PROGRESS
    stranded(mapState, color) {
        // Variables
        let tempState = new MapState();

        for (let y = 0; y < GameMap.size; y++) {
            for (let x = 0; x < GameMap.size; x++) {
                // console.log(y * GameMap.size + x);
                // console.count("o");
                // console.log(this.par);
                this.par.push({Y: y, X: x});
                // this.par.splice(y * GameMap.size + x, 0, {Y: y, X: x});
            }
        }
        let test = 0;
        for (let y = 0; y < GameMap.size; y++) {
            for (let x = 0; x < GameMap.size; x++) {
                if(mapState.map[y][x] == '0') {
                    let neighbours = Moves.positiveNeighbours(mapState, y, x);
                    neighbours.forEach(neigbour => {
                        test++;
                    });
                }      
            }
        }
        console.log("tescik " + test);
    }


    static checkAll(mapState, color) {

        console.log("Checking...");
        let check = new Check();
        check.missedTile(mapState, color);
        check.stranded(mapState, color);
    }
}