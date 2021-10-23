class Moves {
    // All possible moves of the given node
    possibleMoves(map, node) {
        var astar = new Astar();
        var neighbours = astar.findAllNeighbours(map, node);
        var result = [];
        neighbours.forEach(neighbour => {
            if(neighbour.value == 0) {
                result.push(neighbour);
            }
        });
        return result;
    }
 
    // Forced moves of the given node
    forcedMoves(map, node) {
        var possibleMoves = this.possibleMoves(map, node);
        if(possibleMoves.length == 1) {
            // Move is forced when point has only one neighbour (one possible move)
            return possibleMoves[0].position;
        }
        else {
            for (let i = 0; i < possibleMoves.length; i++) {
                if(this.possibleMoves(map, possibleMoves[i]).length == 1) {
                    // Move is forced when point has neighbour that has only one neighbour
                    return possibleMoves[i].position;
                } 
            }
            //Not forced
            return -1;
        }
    }
    // Make move from the given node to the given direction (returning updated Node)
    makeMove(node, moveTo, cost) {
        node.parent = node;
        node.position.x = moveTo.x;
        node.position.y = moveTo.y;
        node.g = node.g + cost;

        return node;
    }
}