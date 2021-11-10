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
        let zone;
        let zoneNum;
        let unstrandedFlows;
        let zoneId;
        let adjCur;
        let adjEnd;

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
                        console.log(neigbour.Y, neigbour.X, mapState.map[neigbour.Y][neigbour.X]);
                        let ancQ = this.#anc(x, y);
                        let ancP = this.#anc(neigbour.X, neigbour.Y);
                        if(ancQ != ancP) {
                            test++;
                        }
                    });
                }      
            }
        }

        console.log("Ofensywny tescik " + test);
    }

    #anc(x, y) {
        if(x == this.par[x].X && y == this.par[y].Y) {
            return {Y: y, X: x}
        }
        return this.#anc(this.par[x].X, this.par[y].Y)
    }

	getPos(x, y) {
		return y * GameMap.size + x;
	}

    static checkAll(mapState, color) {

        // console.log("Checking...");
        let check = new Check();
        // check.missedTile(mapState, color);
        let componentLabeling = new ComponentLabeling();
        componentLabeling.check(mapState);
        // check.stranded(mapState, color);
    }
}