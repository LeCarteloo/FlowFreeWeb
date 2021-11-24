class Check {
    //TODO: First check function that is faster if it found 
    //TODO: the problem then return and stop everything else

    // Check if pipe has missed any tile that cannot be filled later
    // One tile is surrounded by three pipes with this same color
    //! WORK IN PROGRESS (probably not working atm)
    missedTile(mapState, color) {
        //! ONLY TESTING (it will be changed)
        let neighbours = Moves.testMoves(mapState, color)
        // console.log(neighbours);
        let tilesFiled = 0;
        
        neighbours.forEach(neighbour => {
            tilesFiled = 0;
            const y = neighbour.To.Y;
            const x = neighbour.To.X;
            let neigh = Moves.allNeighbours(y, x);
            // console.log(neigh);
            neigh.forEach(nei => {
                // console.log(nei);
                const y = nei.Y;
                const x = nei.X;
                if(mapState.map[y][x] == GameMap.foundColors[color]){
                    // console.log(mapState.map[y][x]);
                    tilesFiled++;
                }
            });
        });
        return tilesFiled >= 3;
    }

    static checkAll(mapState, color) {
        // Debug.printMapState(mapState, "Checking Node")
        // console.log("Checking...");
        let check = new Check();
        let componentLabeling = new ComponentLabeling();
        if(check.missedTile(mapState, color)) {
            console.log("MISSEDTILE");
            return true;
        }
        if(componentLabeling.isStranded(mapState)) {
            console.log("STRANDED");
            // Debug.printMapState(mapState, "Stranded")
            return true;
        }
    }
}