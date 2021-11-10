class Moves {
    static positiveNeighbours(mapState, y, x) {
        let result = [];
        
        const map = mapState.map;
        // TODO: This is completly opposite needs to be changed
        if (x < GameMap.size - 1 && map[y][x + 1] == '0') {
            // console.log("Left neighbour");
            result.push({Y: y, X: x + 1});
        }
        if (y < GameMap.size - 1 && map[y + 1][x] == '0') {
            // console.log("Upp neighbour");
            result.push({Y: y + 1, X: x});
        }

        return result;
    }

    // All possible moves of the given mapState and color
    //TODO: Pass only the map array not whole MapState object
    //? Do i even use FROM?
    static possibleMoves(mapState, color) {
        let result = [];

        const y = mapState.current[color].Y;
        const x = mapState.current[color].X;
        const map = mapState.map;
        const pt = GameMap.endPoint[color]

        if (x < GameMap.size - 1 && map[y][x + 1] == '0' || x < GameMap.size - 1 && y == pt.Y && x + 1 == pt.X) {
            // console.log("Left neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x + 1}});
        }
        if (x > 0 && map[y][x - 1] == '0' || x > 0 && y == pt.Y && x - 1 == pt.X) {
            // console.log("Right neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x - 1}});
        }
        if (y < GameMap.size - 1 && map[y + 1][x] == '0' || y < GameMap.size - 1 && y + 1 == pt.Y && x == pt.X) {
            // console.log("Upp neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y + 1, X: x}});
        }
        if (y > 0 && map[y - 1][x] == '0' || y > 0 && y - 1 == pt.Y && x == pt.X) {
            // console.log("Down neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y - 1, X: x}});
        }


        return result;
    }
 
    // Forced moves of the all nodes
    static forcedMoves(node) {
        for (let i = 0; i < GameMap.numberOfColors; i++) {
            // if(node.mapState.finished == true) {
            //     continue;
            // }
            if(node.mapState.current[i].X == GameMap.endPoint[i].X 
                && node.mapState.current[i].Y == GameMap.endPoint[i].Y){
                continue;
            }

            let moves = this.possibleMoves(node.mapState, i);

            // for (let j = 0; j < moves.length; j++) {
            //     let checkNodes = this.makeMove(_.cloneDeep(node), [moves[j]], i, 0);
            //     let possibleMoves = this.possibleMoves((checkNodes.mapState), i);

            //     if(possibleMoves.length == 1) {
            //         // console.log(possibleMoves);
            //         let test = 0;
            //         for (let c = 0; c < GameMap.numberOfColors; c++) {

            //             if(possibleMoves[0].To.X - 1 == checkNodes.mapState.current[c].X
            //                  && possibleMoves[0].To.Y == checkNodes.mapState.current[c].Y) {
            //                 test++;
            //             }
            //             if(possibleMoves[0].To.X + 1 == checkNodes.mapState.current[c].X
            //             && possibleMoves[0].To.Y == checkNodes.mapState.current[c].Y) {
            //                 test++;

            //             }
            //             if(possibleMoves[0].To.X  == checkNodes.mapState.current[c].X
            //             && possibleMoves[0].To.Y - 1 == checkNodes.mapState.current[c].Y) {
            //                 test++;

            //             }
            //             if(possibleMoves[0].To.X + 1 == checkNodes.mapState.current[c].X
            //             && possibleMoves[0].To.Y == checkNodes.mapState.current[c].Y) {
            //                 test++;
                            
            //             }
            //             if(test == 1) {
            //                 return [[moves[j]], i];                    
                             
            //             }
                        
            //         }
            //     }
            // }

            if(moves.length != 1) {
                continue;
            }

            //TODO: Remove array later
            return [moves, i];
        }
        return -1;
    }

    // Make move from the given node to the given direction (returning updated Node)
    static makeMove(node, moveTo, color, cost) {
        node.parent = node;
        node.g += cost;
        node.updateMapState(color, moveTo);
        node.h = node.manhattan();

        Check.checkAll(node.mapState, color);
        // Check.stranded(node.mapState, color);

        return node;
    }

    // Make all possible moves (atm. only forced ones)
    static makeAllMoves(node) {

        let forced = this.forcedMoves(node);
        let moves = [];

        //If there is a point with a force move on the map 
        if(forced != -1) {
            while(forced != - 1) {
                var forcedNode = this.makeMove(node, forced[0], forced[1] , 0);
                forced = this.forcedMoves(node);
            }
            moves.push(_.cloneDeep(forcedNode));
            return moves;
        }

        //If not
        let colorList = [];
        for (let i = 0; i < GameMap.numberOfColors; i++) {
            if(node.mapState.current[i].X == GameMap.endPoint[i].X &&
                node.mapState.current[i].Y == GameMap.endPoint[i].Y) {
                node.movesNumber[i] = -1;
                continue;
            }
            colorList.push(i);

            //TODO: MERGE THIS WITH
            let numberOfMoves = this.possibleMoves(node.mapState, i).length;

            if(numberOfMoves != 0) {
                node.movesNumber[i] = numberOfMoves;
            }
        }

        if(colorList.length == 0) {
            console.log('%c 0 MOVES', 'color: red;');
            return moves;
        }

        for (const color of colorList) {

            //TODO: THIS
            let posMoves = Moves.possibleMoves(node.mapState, color);

            for (let i = 0; i < posMoves.length; i++) {
                if(!posMoves[i]) {
                    console.log("NO POSSIBLE MOVES");
                    continue;
                }

                let cost = 1;
                if(posMoves.length == 1 || node.movesNumber[i] == 1) {
                    console.log("Cost ZERO");
                    cost = 0;
                }

                let newNode = Moves.makeMove(_.cloneDeep(node), [posMoves[i]], color, cost);

                if(newNode != null) {
                    moves.push(newNode);
                }
            }
            break;
        }
        return moves;
    }
}