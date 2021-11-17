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

    static checkAll(mapState, color) {
        Debug.printMapState(mapState, "Checking Node")
        // console.log("Checking...");
        let check = new Check();
        // check.missedTile(mapState, color);
        let componentLabeling = new ComponentLabeling();
        if(componentLabeling.isStranded(mapState)) {
            console.log("STRANDED");
            // Debug.printMapState(mapState, "Stranded")
            return true;
        }
        // check.stranded(mapState, color);
    }
}