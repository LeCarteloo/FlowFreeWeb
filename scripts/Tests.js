class Tests {
    //Performance test 

    static astarPerformance() {
    // Initializing map
    // Gathering informations (where is the start point,
    // endpoint and how many colors)
    // try {
        let start = performance.now();

        let astar = new Astar();

        console.log(`Game map is ${astar.search()} and it created ${Global.nodeNumber} nodes`);

        let end = performance.now();
        let time = `${(end - start) / 1000} seconds`;

        if(Global.nodeNumber == 3000) {
            console.log('%c WARNING 10000 NODES HAVE BEEN CREATED', 'color: yellow');
            console.log(`%c PERFORMANCE IS LOW - IT TOOK ${time} TO GENERATE`, 'color: yellow;' );
            console.log(`%c STOPPED A SEARCH ALGORITHM`, 'color: yellow;' );
        } else {
            console.log(`%c It took ${time}`, 'color: yellow;' );
        }

    // } catch (error) {
    //     console.log(`%c${error}`, 'color: red;');
    // }
    }
    

    static comonentLabelingPerformance() {
        let start = performance.now()

        let componentLabeling = new ComponentLabeling();
        let node = new Node();
        //! Stranded
        // node.mapState.map = [    
        //     ['R', 'R', '0', '0', '0', '0'],
        //     ['B', 'R', '0', '0', 'B', 'R'],
        //     ['B', 'R', 'R', 'R', '0', 'Y'],
        //     ['0', 'G', 'A', '0', '0', '0'],
        //     ['0', '0', '0', '0', 'G', 'A'],
        //     ['Y', 'O', '0', '0', '0', 'O'],
        // ]
        // node.mapState.current[0] = {Y: 2, X: 3}
        // node.mapState.current[1] = {Y: 2, X: 0}

        node.mapState.map = [    
            ['R', 'R', 'R', '0', '0', '0'],
            ['B', '0', 'R', 'R', 'B', 'R'],
            ['B', '0', '0', '0', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ]
        node.mapState.current[0] = {Y: 1, X: 3}
        node.mapState.current[1] = {Y: 2, X: 0}
        // console.log(node);
        // componentLabeling.twoPass(node.mapState.map);
        // componentLabeling.addCurrentToSector(node.mapState)
        console.log(componentLabeling.isStranded(node.mapState));
        let end = performance.now();
        let time = `${(end - start) / 1000} seconds`;
        console.log(`%c It took ${time}`, 'color: yellow;' );
    }

    static missedTileTest() {
        let start = performance.now()

        let node = new Node();
        node.mapState.map = [    
            ['R', 'R', '0', 'R', '0', '0'],
            ['B', 'R', 'R', 'R', 'B', 'R'],
            ['B', '0', '0', '0', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ]
        node.mapState.current[0] = {Y: 0, X: 3}
        let check = new Check();
        console.log("Missed Tile " + check.missedTile(node.mapState, 0));

        let end = performance.now();
        let time = `${(end - start) / 1000} seconds`;
        console.log(`%c It took ${time}`, 'color: yellow;' );
    }

    static forcedMoveTest() {
        let start = performance.now()

        let node = new Node();
        // ! Forced
        // node.mapState.map = [    
        //     ['0', '0', '0', '0', '0', '0'],
        //     ['R', 'C', '0', '0', 'C', 'R'],
        //     ['B', '0', '0', '0', '0', 'B'],
        //     ['0', '0', '0', '0', '0', '0'],
        //     ['0', '0', '0', '0', '0', '0'],
        //     ['0', '0', '0', '0', '0', '0'],
        // ]
        // node.mapState.current[0] = {Y: 1, X: 0}
        // node.mapState.current[1] = {Y: 1, X: 1}
        // node.mapState.current[2] = {Y: 2, X: 0}
        // GameMap.numberOfColors = 3;

        //! Forced
        // node.mapState.map = [    
        //     ['0', '0', '0', '0', '0', '0'],
        //     ['R', '0', '0', '0', '0', 'R'],
        //     ['B', '0', '0', '0', '0', 'B'],
        //     ['0', '0', '0', '0', '0', '0'],
        //     ['0', '0', '0', '0', '0', '0'],
        //     ['0', '0', '0', '0', '0', '0'],
        // ]
        // node.mapState.current[0] = {Y: 1, X: 0}
        // node.mapState.current[1] = {Y: 2, X: 0}
        // GameMap.numberOfColors = 2;

        //! Not Forced
        // node.mapState.map = [    
        //     ['R', 'R', '0', '0', '0', '0'],
        //     ['B', 'R', '0', '0', '0', 'R'],
        //     ['B', '0', '0', '0', '0', 'B'],
        //     ['B', 'C', '0', '0', 'C', '0'],
        //     ['B', '0', '0', '0', '0', '0'],
        //     ['0', '0', '0', '0', '0', '0'],
        // ]
        // node.mapState.current[0] = {Y: 1, X: 1}
        // node.mapState.current[1] = {Y: 3, X: 0}
        // node.mapState.current[2] = {Y: 3, X: 1}
        // GameMap.numberOfColors = 3;

        //! Forced
        // node.mapState.map = [    
        //     ['R', 'R', 'R', '0', '0', '0'],
        //     ['B', '0', 'R', '0', '0', 'R'],
        //     ['0', '0', 'R', '0', '0', 'B'],
        //     ['0', '0', '0', '0', '0', '0'],
        //     ['0', '0', '0', '0', '0', '0'],
        //     ['0', '0', '0', '0', '0', '0'],
        // ]
        // node.mapState.current[0] = {Y: 2, X: 2}
        // node.mapState.current[1] = {Y: 1, X: 0}
        // GameMap.endPoint[0] = {Y: 1, X: 5}
        // GameMap.endPoint[1] = {Y: 2, X: 5}
        // GameMap.numberOfColors = 2;

        //! Not Forced
        // node.mapState.map = [    
        //     ['R', 'R', 'R', '0', '0', '0'],
        //     ['B', '0', 'R', '0', 'B', 'R'],
        //     ['0', '0', '0', '0', '0', 'Y'],
        //     ['0', 'G', 'A', '0', '0', '0'],
        //     ['0', '0', '0', '0', 'G', 'A'],
        //     ['Y', 'O', '0', '0', '0', 'O'],
        // ]
        // node.mapState.current[0] = {Y: 1, X: 2}
        // node.mapState.current[1] = {Y: 1, X: 0}
        // node.mapState.current[2] = {Y: 2, X: 5}
        // node.mapState.current[3] = {Y: 3, X: 1}
        // node.mapState.current[4] = {Y: 3, X: 2}
        // GameMap.numberOfColors = 5;

        //! Not Forced
        // node.mapState.map = [    
        //     ['R', 'R', '0', '0', '0', '0'],
        //     ['B', '0', '0', '0', 'B', 'R'],
        //     ['0', '0', '0', '0', '0', 'Y'],
        //     ['0', 'G', 'A', '0', '0', '0'],
        //     ['0', '0', '0', '0', 'G', 'A'],
        //     ['Y', 'O', '0', '0', '0', 'O'],
        // ]
        // node.mapState.current[0] = {Y: 0, X: 1}
        // node.mapState.current[1] = {Y: 1, X: 0}
        // node.mapState.current[2] = {Y: 2, X: 5}
        // node.mapState.current[3] = {Y: 3, X: 1}
        // node.mapState.current[4] = {Y: 3, X: 2}
        // //TODO: Tutaj endpoint podac do testów
        // GameMap.numberOfColors = 5;



        Debug.printMapState(node.mapState, "Before Forced")
        let move = Moves.forcedMoves(node);
        // console.log(move);
        if(move != -1) {
            Moves.makeMove(node, move[0], move[1], 0)
            Debug.printMapState(node.mapState, "Forced")
        }

        let end = performance.now();
        let time = `${(end - start) / 1000} seconds`;
        console.log(`%c It took ${time}`, 'color: yellow;' );
    }
}
