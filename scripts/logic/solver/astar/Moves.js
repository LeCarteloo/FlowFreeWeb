class Moves {
    // All possible moves of the given mapState and color
    static possibleMoves(mapState, color) {
        let result = [];

        // console.log(mapState, color);

        const y = mapState.current[color].Y;
        const x = mapState.current[color].X;
        const map = mapState.map;
        const pt = Map.endPoint[color]

        if(y > 0 && y - 1 == pt.Y && x == pt.X) {
            console.log("DOWN");
        }
        if(y < Map.size - 1 && y + 1 == pt.Y && x == pt.X) {
            console.log("UPP");
        }
        if(x > 0 && y == pt.Y && x - 1 == pt.X) {
            console.log("RIGHT");
        }
        if(x < Map.size - 1 && y == pt.Y && x + 1 == pt.X) {
            console.log("LEFT");
        }

        if (y > 0 && map[y - 1][x] == '0' || y > 0 && y - 1 == pt.Y && x == pt.X) {
            // console.log("Down neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y - 1, X: x}});
        }
        if (y < Map.size - 1 && map[y + 1][x] == '0' || y < Map.size - 1 && y + 1 == pt.Y && x == pt.X) {
            // console.log("Upp neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y + 1, X: x}});
        }
        if (x > 0 && map[y][x - 1] == '0' || x > 0 && y == pt.Y && x - 1 == pt.X) {
            // console.log("Right neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x - 1}});
        }
        if (x < Map.size - 1 && map[y][x + 1] == '0' || x < Map.size - 1 && y == pt.Y && x + 1 == pt.X) {
            // console.log("Left neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x + 1}});
        }

        return result;
    }
 
    // Forced moves of the all nodes
    static forcedMoves(mapState) {
        // console.log(mapState);
        for (let i = 0; i < Map.numberOfColors; i++) {
            // if(mapState.finished == true) {
            //     continue;
            // }
            if(mapState.current[i].X == Map.endPoint[i].X && mapState.current[i].Y == Map.endPoint[i].Y){
                continue;
            }

            // console.log(i)

            let moves = this.possibleMoves(mapState, i);

            // console.log(moves);

            if(moves.length != 1) {
                continue;
            }

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
        if(node.mapState.current[color].X == Map.endPoint[color].X 
            && node.mapState.current[color].Y == Map.endPoint[color].Y) {
                node.mapState.finished = true;
        }
        return node;
    }

    // Make all possible moves (atm. only forced ones)
    static makeAllMoves(node) {

        let forced = this.forcedMoves(node.mapState);
        let moves = [];
        //If there is a point with a force move on the map 
        if(forced != -1) {
            while(forced != - 1) {
                // console.log(forced);
                var forcedNode = this.makeMove(node, forced[0], forced[1] , 0);
                forced = this.forcedMoves(node.mapState);
                // return Moves.forcedMoves(node.mapState)
            }
            moves.push(_.cloneDeep(forcedNode));

            return moves;
        }

        //If not
        let colorList = [];
        for (let i = 0; i < Map.numberOfColors; i++) {
            if(node.mapState.current[i].X == Map.endPoint[i].X &&
                node.mapState.current[i].Y == Map.endPoint[i].Y) {
                node.movesNumber[i] = -1;
                continue;
            }
            colorList.push(i);

            let numberOfMoves = this.possibleMoves(node.mapState, i).length;

            if(numberOfMoves != 0) {
                node.movesNumber[i] = numberOfMoves;
            }
            
        }

        // console.log(node.movesNumber.toString(), colorList.length.toString());

        if(colorList.length == 0) {
            console.log('%c 0 MOVES', 'color: red;');
            return moves;
        }

        for (const color of colorList) {
            // console.log(color);

            let posMoves = Moves.possibleMoves(node.mapState, color);
            for (let i = 0; i < posMoves.length; i++) {
                // console.log(posMoves);
                if(!posMoves[i]) {
                    console.log("NO POSSIBLE MOVES");
                    continue;
                }

                let cost = 1;
                if(posMoves.length == 1 || node.movesNumber[i] == 1) {
                    cost = 0;
                }

                // console.log(posMoves[i]);
                let newNode = Moves.makeMove(_.cloneDeep(node), [posMoves[i]], color, cost);
                // Debug.printMapState(newNode.mapState, "New Node");
                // console.log(newNode);

                // console.log(moves.length);

                if(newNode != null) {
                    moves.push(newNode);
                    // console.log(moves);
                }
            }
            break;
        }

        return moves;
    }
}