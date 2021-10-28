class Moves {
    // All possible moves of the given mapState and color
    static possibleMoves(mapState, color) {
        let result = [];

        // console.log(mapState, color);

        const y = mapState.current[color].Y;
        const x = mapState.current[color].X;
        const map = mapState.map;

        if (y > 0 && map[y - 1][x] == '0') {
            // console.log("Down neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y - 1, X: x}});
        }
        if (y < Map.size - 1 && map[y + 1][x] == '0') {
            // console.log("Upp neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y + 1, X: x}});
        }
        if (x > 0 && map[y][x - 1] == '0') {
            // console.log("Right neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x - 1}});
        }
        if (x < Map.size - 1 && map[y][x + 1] == '0') {
            // console.log("Left neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x + 1}});
        }
        return result;
    }
 
    // Forced moves of the all nodes
    static forcedMoves(mapState) {
        // console.log(mapState);
        for (let i = 0; i < Map.numberOfColors; i++) {
            if(mapState.finished == true) {
                continue;
            }
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
        return node;
    }

    // Make all possible moves (atm. only forced ones)
    static makeAllMoves(node) {
        if(this.forcedMoves(node.mapState) != -1) {
            // console.log(this.forcedMoves(node.mapState));
         return [this.makeMove(node, this.forcedMoves(node.mapState)[0],this.forcedMoves(node.mapState)[1] , 0)];
          // return Moves.forcedMoves(node.mapState)
        }
        return -1;
    }
}