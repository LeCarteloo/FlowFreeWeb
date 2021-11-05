class Check {
    // Check if pipe has missed any tile that cannot be filled later
    // One tile is surrounded by three pipes with this same color
    //! WORK IN PROGRESS (probably not working atm)
    static #missedTile(mapState, color) {
        let neighbours = Moves.possibleMoves(mapState, color)
        let tilesFiled = 0;
        
        neighbours.forEach(neighbour => {
            const y = neighbour.To.Y;
            const x = neighbour.To.X;
            if(mapState.map[y][x] == Map.foundColors[color] 
                && mapState.finished.includes(color)){
                tilesFiled++;
            }
        });
        return tilesFiled >= 3;
    }

    //! WORK IN PROGRESS
    static #stranded(mapState, color) {
        let tempState = new MapState();

        for (let y = 0; y < Map.size; y++) {
            for (let x = 0; x < Map.size; x++) {
                
            }
        }

        for (let y = 0; y < Map.size; y++) {
            for (let x = 0; x < Map.size; x++) {
                if(mapState.map[y][x] == '0') {
                    // Moves.positiveNeighbours()
                }      
            }
        }
    }

    static checkAll(mapState, color) {
        console.log("Checking...");
        this.#missedTile(mapState, color);
        this.#stranded(mapState, color);
    }
}