class Moves {
    static allNeighbours(y, x) {
        let result = [];
        
        if (x < GameMap.size - 1) {
            result.push({Y: y, X: x + 1});
        }
        if (y < GameMap.size - 1) {
            result.push({Y: y + 1, X: x});
        }
        if (y > 0) {
            result.push({Y: y - 1, X: x});
        }
        if (x > 0) {
            result.push({Y: y, X: x - 1});
        }

        return result;
    }

    static isValid(mapState, y, x, color) {
        const map = mapState.map;
        if (x < GameMap.size - 1 && map[y][x + 1] == GameMap.foundColors[color]
            && mapState.current[color].X != x + 1 && mapState.current[color].Y != y) {
            // console.log("Left neighbour");
            return false;
        }
        if (x > 0 && map[y][x - 1] == GameMap.foundColors[color] 
            && mapState.current[color].X != x - 1 && mapState.current[color].Y != y) {
            // console.log("Right neighbour");
            return false;
        }
        if (y < GameMap.size - 1 && map[y + 1][x] == GameMap.foundColors[color]
            && mapState.current[color].X != x && mapState.current[color].Y != y + 1) {
            // console.log("Upp neighbour");
            return false;
        }
        if (y > 0 && map[y - 1][x] == GameMap.foundColors[color]
            && mapState.current[color].X != x && mapState.current[color].Y != y - 1) {
            // console.log("Down neighbour");
            return false;
        }
        return true;
    }

    // All possible moves of the given mapState and color

    //TODO: Pass only the map array not whole MapState object
    //? Do i even use FROM?
    static testMoves(mapState, color) {
        let result = [];
        const y = mapState.current[color].Y;
        const x = mapState.current[color].X;
        const map = mapState.map;
        const pt = GameMap.endPoint[color]

        if ((x < GameMap.size - 1 && map[y][x + 1] == '0')) {
            // console.log("Left neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x + 1}});
        }
        if ((x > 0 && map[y][x - 1] == '0')) {
            // console.log("Right neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x - 1}});
        }
        if ((y < GameMap.size - 1 && map[y + 1][x] == '0')) {
            // console.log("Upp neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y + 1, X: x}});
        }
        if ((y > 0 && map[y - 1][x] == '0')) {
            // console.log("Down neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y - 1, X: x}});
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

        if ((x < GameMap.size - 1 && map[y][x + 1] == '0' || x < GameMap.size - 1 && y == pt.Y && x + 1 == pt.X)
        && Moves.isValid(mapState, y, x + 1, color)) {
            // console.log("Left neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x + 1}});
        }
        if ((x > 0 && map[y][x - 1] == '0' || x > 0 && y == pt.Y && x - 1 == pt.X)
        && Moves.isValid(mapState, y, x - 1, color)) {
            // console.log("Right neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x - 1}});
        }
        if ((y > 0 && map[y - 1][x] == '0' || y > 0 && y - 1 == pt.Y && x == pt.X)
        && Moves.isValid(mapState, y - 1, x, color)) {
            // console.log("Down neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y - 1, X: x}});
        }
        if ((y < GameMap.size - 1 && map[y + 1][x] == '0' || y < GameMap.size - 1 && y + 1 == pt.Y && x == pt.X)
        && Moves.isValid(mapState, y + 1, x, color)) {
            // console.log("Upp neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y + 1, X: x}});
        }


        return result;
    }
 
    // Forced moves of the all nodes
    static forcedMoves(node) {
        for (let i = 0; i < GameMap.numberOfColors; i++) {
            if(node.isFinished(i)) {
                continue;
            }

            let moves = this.possibleMoves(node.mapState, i);
            // console.log(_.cloneDeep(node.mapState.map));
            // console.log('');
            // console.log(moves);

            for (const move of moves) {
                let tempNode = _.cloneDeep(node);
                // console.log(move);
                tempNode.updateMapState(i, [move])
                // console.log(tempNode.mapState.map);

                let neighbourMoves = this.testMoves(tempNode.mapState, i);
                // console.log(neighbourMoves, GameMap.foundColors[i]);
                if(neighbourMoves.length != 1) {
                    // console.log("Tu -1 jest");
                    continue;
                }
                let test = 0;
                // console.log("Neighbour", {Y: neighbourMoves[0].To.Y, X: neighbourMoves[0].To.X});
                // console.log("Porownanie z", move.To.Y, move.To.X);

                // TODO: FIX THOSE IFs (I'm not sure about that EndPoints in IF statements)
                for (let c = 0; c < GameMap.numberOfColors; c++) {
                    // console.log("CUR", node.mapState.current[c]);
                    // console.log("END", GameMap.endPoint[c]);

                    if((move.To.X - 1 == node.mapState.current[c].X
                    && move.To.Y == node.mapState.current[c].Y)) {
                        // console.log("Left from " + i);
                        test++;
                    }
                    if((move.To.X + 1 == node.mapState.current[c].X
                    && move.To.Y == node.mapState.current[c].Y)) {
                        // console.log("Right from " + i);
                        test++;
                    }
                    if((move.To.X  == node.mapState.current[c].X
                    && move.To.Y - 1 == node.mapState.current[c].Y)) {
                        // console.log("Up from " + i);
                        test++;

                    }
                    if((move.To.X == node.mapState.current[c].X
                    && move.To.Y + 1 == node.mapState.current[c].Y)) {
                        // console.log("Down from" + i);
                        test++;
                    }

                    //! Just testing (atm have no idea how to fix Yellow Color move [from (2,5) to (3,5))]
                    if((move.To.X - 1 == GameMap.endPoint[c].X
                    && move.To.Y == GameMap.endPoint[c].Y && i != c)) {
                        // console.log("Left from " + i);
                        test++;
                    }
                    if((move.To.X + 1 == GameMap.endPoint[c].X
                    && move.To.Y == GameMap.endPoint[c].Y && i != c)) {
                        // console.log("Right from " + i);
                        test++;
                    }
                    if((move.To.X == GameMap.endPoint[c].X
                    && move.To.Y - 1 == GameMap.endPoint[c].Y && i != c)) {
                        // console.log("Up from " + i);
                        test++;
                    }
                    if((move.To.X == GameMap.endPoint[c].X
                    && move.To.Y + 1 == GameMap.endPoint[c].Y && i != c)) {
                        // console.log("Down from " + i);
                        test++;
                    }
                    // if((move.To.X == tempNode.mapState.current[c].X
                    // && move.To.Y == tempNode.mapState.current[c].Y)) {
                    //     test++;
                    // }
                }    
                // console.log("Counter value " + test);

                if(test == 1) {
                    // console.log("FORCED - " + test);
                    return [[move], i];
                }            
            }

            if(moves.length != 1) {
                continue;
            }
            //TODO: Remove array later
            console.log("FORCED2");
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

        Debug.printMapState(_.cloneDeep(node.mapState), "MakeMOVE");
        
        // Check if current pipe is one tile away from end point
        //! By this VVV two times make Move is called (check it)
        let moves = Moves.possibleMoves(node.mapState, color);
        for (const move of moves) {
            if(move.To.X == GameMap.endPoint[color].X && move.To.Y == GameMap.endPoint[color].Y) {
                // console.log("gut?");
                //! ADDED
                GameMap.finishedPoints.push(color);
                if(Check.checkAll(node.mapState, color)) {
                    let index = GameMap.finishedPoints.indexOf(color);
                    GameMap.finishedPoints.splice(index, 1);
                    return null;
                }
                this.makeMove(node, [move], color, 0);
                
            }
        }
        //! Debug
        // !node.isFinished(color) && 
        if(Check.checkAll(node.mapState, color)) {
            return null;
        }
        
        // console.log(GameMap.finishedPoints);

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
                if(forcedNode == null) {
                    return moves;
                }
                forced = this.forcedMoves(node);
            }
            moves.push(_.cloneDeep(forcedNode));
            return moves;
        }

        //If not
        let colorList = [];
        for (let i = 0; i < GameMap.numberOfColors; i++) {
            if(node.isFinished(i)) {
                // console.log("SIEMA");
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