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


        //! Not stranded
        // node.mapState.map = [    
        //     ['R', 'R', 'R', '0', '0', '0'],
        //     ['B', '0', 'R', 'R', 'B', 'R'],
        //     ['B', '0', '0', '0', '0', 'Y'],
        //     ['0', 'G', 'A', '0', '0', '0'],
        //     ['0', '0', '0', '0', 'G', 'A'],
        //     ['Y', 'O', '0', '0', '0', 'O'],
        // ]
        // node.mapState.current[0] = {Y: 1, X: 3}
        // node.mapState.current[1] = {Y: 2, X: 0}

        
        //! Not stranded
        // node.mapState.map = [    
        //     ['R', 'R', 'R', 'R', 'R', 'R'],
        //     ['B', 'B', '0', '0', 'B', 'R'],
        //     ['0', '0', '0', '0', '0', 'Y'],
        //     ['0', 'G', 'A', '0', '0', '0'],
        //     ['0', '0', '0', '0', 'G', 'A'],
        //     ['Y', 'O', '0', '0', '0', 'O'],
        // ]
        // node.mapState.current[0] = {Y: 1, X: 5}
        // node.mapState.current[1] = {Y: 1, X: 1}
        // node.mapState.current[2] = {Y: 2, X: 5}
        // node.mapState.current[3] = {Y: 3, X: 1}
        // node.mapState.current[4] = {Y: 3, X: 2}
        // //TODO: Tutaj endpoint podac do testów
        // GameMap.numberOfColors = 5;
        // GameMap.finishedPoints.push(0);

        //! Not stranded
        node.mapState.map = [    
            ['R', 'R', 'R', 'R', 'R', 'R'],
            ['B', '0', '0', '0', '?', '?'],
            ['0', '0', '0', '0', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ]
        node.mapState.current[0] = {Y: 0, X: 5}
        node.mapState.current[1] = {Y: 1, X: 0}
        node.mapState.current[2] = {Y: 2, X: 5}
        node.mapState.current[3] = {Y: 3, X: 1}
        node.mapState.current[4] = {Y: 3, X: 2}

        //TODO: Tutaj endpoint podac do testów
        GameMap.numberOfColors = 5;
        // GameMap.finishedPoints.push(0);

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
        let move;

        // ! Forced
        node.mapState.map = [    
            ['0', '0', '0', '0', '0', '0'],
            ['R', 'C', '0', '0', 'C', 'R'],
            ['B', '0', '0', '0', '0', 'B'],
            ['0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0'],
        ]
        node.mapState.current[0] = {Y: 1, X: 0}
        node.mapState.current[1] = {Y: 1, X: 1}
        node.mapState.current[2] = {Y: 2, X: 0}
        GameMap.numberOfColors = 3;

        move = Moves.forcedMoves(node);

        Tests.checkTest(move, 1, 0, 0, 0, 0);

        //! Forced
        node.mapState.map = [    
            ['0', '0', '0', '0', '0', '0'],
            ['R', '0', '0', '0', '0', 'R'],
            ['B', '0', '0', '0', '0', 'B'],
            ['0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0'],
        ]
        node.mapState.current[0] = {Y: 1, X: 0}
        node.mapState.current[1] = {Y: 2, X: 0}
        GameMap.numberOfColors = 2;

        move = Moves.forcedMoves(node);
        
        Tests.checkTest(move, 1, 0, 0, 0, 0);

        //! Not Forced
        node.mapState.map = [    
            ['R', 'R', '0', '0', '0', '0'],
            ['B', 'R', '0', '0', '0', 'R'],
            ['B', '0', '0', '0', '0', 'B'],
            ['B', 'C', '0', '0', 'C', '0'],
            ['B', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0'],
        ]
        node.mapState.current[0] = {Y: 1, X: 1}
        node.mapState.current[1] = {Y: 3, X: 0}
        node.mapState.current[2] = {Y: 3, X: 1}
        GameMap.numberOfColors = 3;

        move = Moves.forcedMoves(node);
        
        Tests.notTest(move);

        //! Forced
        node.mapState.map = [    
            ['R', 'R', 'R', '0', '0', '0'],
            ['B', '0', 'R', '0', '0', 'R'],
            ['0', '0', 'R', '0', '0', 'B'],
            ['0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0'],
        ]
        node.mapState.current[0] = {Y: 2, X: 2}
        node.mapState.current[1] = {Y: 1, X: 0}
        GameMap.endPoint[0] = {Y: 1, X: 5}
        GameMap.endPoint[1] = {Y: 2, X: 5}
        GameMap.numberOfColors = 2;

        move = Moves.forcedMoves(node);
        
        Tests.checkTest(move, 1, 0, 1, 1, 1);

        //! Not Forced
        node.mapState.map = [    
            ['R', 'R', 'R', '0', '0', '0'],
            ['B', '0', 'R', '0', 'B', 'R'],
            ['0', '0', '0', '0', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ]
        node.mapState.current[0] = {Y: 1, X: 2}
        node.mapState.current[1] = {Y: 1, X: 0}
        node.mapState.current[2] = {Y: 2, X: 5}
        node.mapState.current[3] = {Y: 3, X: 1}
        node.mapState.current[4] = {Y: 3, X: 2}
        GameMap.numberOfColors = 5;

        move = Moves.forcedMoves(node);
        
        Tests.notTest(move);

        
        //! Not Forced
        node.mapState.map = [    
            ['R', 'R', '0', '0', '0', '0'],
            ['B', '0', '0', '0', 'B', 'R'],
            ['0', '0', '0', '0', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ]
        node.mapState.current[0] = {Y: 0, X: 1}
        node.mapState.current[1] = {Y: 1, X: 0}
        node.mapState.current[2] = {Y: 2, X: 5}
        node.mapState.current[3] = {Y: 3, X: 1}
        node.mapState.current[4] = {Y: 3, X: 2}
        //TODO: Tutaj endpoint podac do testów
        GameMap.numberOfColors = 5;

        move = Moves.forcedMoves(node);
        
        Tests.notTest(move);

        //! Forced
        node.mapState.map = [    
            ['R', 'R', 'R', 'R', 'R', 'R'],
            ['B', 'B', '0', '0', '?', 'R'],
            ['0', 'B', 'B', 'B', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ]
        node.mapState.current[0] = {Y: 1, X: 5}
        node.mapState.current[1] = {Y: 2, X: 3}
        node.mapState.current[2] = {Y: 2, X: 5}
        node.mapState.current[3] = {Y: 3, X: 1}
        node.mapState.current[4] = {Y: 3, X: 2}
        //TODO: Tutaj endpoint podac do testów
        GameMap.numberOfColors = 5;
        GameMap.finishedPoints.push(0);

        move = Moves.forcedMoves(node);

        Tests.checkTest(move, 2, 3, 1, 3, 1);
        
        // console.log(move);
        // if(move != -1) {
        //     Moves.makeMove(node, move[0], move[1], 1)
        //     Debug.printMapState(node.mapState, "Forced")
        // }


        //! Forced
        // node.mapState.map = [    
        //     ['R', 'R', 'R', 'R', 'R', 'R'],
        //     ['B', '0', '0', '0', '?', 'R'],
        //     ['B', 'B', 'B', '0', '0', 'Y'],
        //     ['0', 'G', 'A', '0', '0', '0'],
        //     ['0', '0', '0', '0', '?', '?'],
        //     ['?', 'O', '0', '0', '0', '?'],
        // ]
        // node.mapState.current[0] = {Y: 1, X: 5}
        // node.mapState.current[1] = {Y: 2, X: 2}
        // node.mapState.current[2] = {Y: 2, X: 5}
        // node.mapState.current[3] = {Y: 3, X: 1}
        // node.mapState.current[4] = {Y: 3, X: 2}

        // //TODO: Tutaj endpoint podac do testów
        // GameMap.numberOfColors = 5;
        // GameMap.finishedPoints.push(0);

        // move = Moves.forcedMoves(node);
        
        // Tests.checkTest(move, 3, 1, 3, 0, 3);


        // Debug.printMapState(node.mapState, "Before Forced")
        // // console.log(Moves.possibleMoves(node.mapState, 1));
        // // return;
        // // let move = Moves.makeAllMoves(node);
        

        // // console.log(move);
       


        let end = performance.now();
        let time = `${(end - start) / 1000} seconds`;
        console.log(`%c It took ${time}`, 'color: yellow;' );
    }

    static endPointTest() {
        let start = performance.now()

        let node = new Node();
        node.mapState.map = [    
            ['R', '0', '?'],
            ['B', '0', '?'],
            ['Y', '0', '?'],
        ]
        node.mapState.current[0] = {Y: 0, X: 0}
        node.mapState.current[1] = {Y: 1, X: 0}
        node.mapState.current[2] = {Y: 2, X: 0}
        GameMap.endPoint[0] = {Y: 0, X: 2}
        GameMap.endPoint[1] = {Y: 1, X: 2}
        GameMap.endPoint[2] = {Y: 2, X: 2}
        GameMap.size = 3;
        GameMap.numberOfColors = 3;

        Debug.printMapState(node.mapState, "EndPoint Before")

        Moves.makeMove(node, [{To: {Y:0, X:1}}], 0, 0);

        Debug.printMapState(node.mapState, "EndPoint After")


        let end = performance.now();
        let time = `${(end - start) / 1000} seconds`;
        console.log(`%c It took ${time}`, 'color: yellow;' );
    }

    static allMovesTest() {
        let start = performance.now()

        let node = new Node();

        //! Forced
        node.mapState.map = [    
            ['R', 'R', 'R', 'R', 'R', 'R'],
            ['B', 'B', '0', '0', 'B', 'R'],
            ['0', 'B', 'B', 'B', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ]
        node.mapState.current[0] = {Y: 1, X: 5}
        node.mapState.current[1] = {Y: 2, X: 3}
        node.mapState.current[2] = {Y: 2, X: 5}
        node.mapState.current[3] = {Y: 3, X: 1}
        node.mapState.current[4] = {Y: 3, X: 2}
        //TODO: Tutaj endpoint podac do testów
        GameMap.numberOfColors = 5;
        GameMap.finishedPoints.push(0);



        Debug.printMapState(node.mapState, "Before")
        // console.log(Moves.possibleMoves(node.mapState, 1));
        // return;
        // let move = Moves.makeAllMoves(node);
        let move = Moves.makeAllMoves(node);

        Debug.printMapState(node.mapState, "After")

        let end = performance.now();
        let time = `${(end - start) / 1000} seconds`;
        console.log(`%c It took ${time}`, 'color: yellow;' );
    }

    static checkTest(move, yF, xF, yT, xT, color) {
        if(move != -1) {
            if(
                JSON.stringify(move[0][0].From) == JSON.stringify({Y: yF, X: xF}) &&
                JSON.stringify(move[0][0].To) == JSON.stringify({Y: yT, X: xT}) &&
                move[1] == color
            ) {
                console.log('%c V Passed','color: green;');
            } else {
                console.log('%c X Not Passed','color: red;');
            }
        } else {
            console.log('%c X Not Passed','color: red;');
        }
    }

    static notTest(move) {
        if(move != -1) {
            console.log('%c X Not Passed','color: red;');
        } else {
            console.log('%c V Passed','color: green;');
        }
    }
}
