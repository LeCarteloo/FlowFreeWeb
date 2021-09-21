class Astar {
    search(map, start, end) {
        // List of nodes to be evaluated, list that have been visited, result and neighbours
        var openList = [];
        var closedList = [];
        var result = [];
        var neighbours = [];
        
        // Starting node
        openList.push(start);

        while(openList.length > 0) {
            var index = 0;

            // Searching for node with the lowest FCost
            for(var i = 0; i < openList.length; i++) {
                if(openList[i].getFCost() < openList[index].getFCost() ||
                   openList[i].getFCost() == openList[index].getFCost()) {
                    index = i;
                }
            }

            var currentNode = openList[index];

            // Removing from open list the current node and adding it to the closed list
            openList.splice(index, 1);
            closedList.push(currentNode);

            // If current node is the target node return the result reversed
            if(currentNode.position === end.position) {
                result = [];
                while(currentNode.parent) {
                    //! console.log(currentNode.position.x + " | " + currentNode.position.y)
                    result.push(currentNode);
                    currentNode = currentNode.parent;
                }
                return result.reverse();
            }

            // Searching for all neighbours (not diagonal)
            neighbours = this.findNeighbours(map, currentNode);

            // For every visited neighbour of current node change the costs
            neighbours.forEach(neighbour => {
                //! console.log(neighbour);

                if(closedList.includes(neighbour)) {
                    return;
                }

                // Distance between current node and neighbour node
                var costToGo = this.heuristic(currentNode, neighbour) + currentNode.g;

                if(costToGo <= neighbour.g || !closedList.includes(neighbour)) {
                    neighbour.g = costToGo;
                    neighbour.h = this.heuristic(neighbour, end);
                    neighbour.parent = currentNode;
                    if(!closedList.includes(neighbour)) {
                        openList.push(neighbour);
                    }
                }
            });
        }
    }
    // Searching for neighbours on map around specific node (no diagonal moves)
    findNeighbours(map, node) {
        var neighbours = [];

        var x = node.position.x;
        var y = node.position.y;		    

        if (y > 0 && map[y - 1][x]) {
            console.log("Down neighbour");
            neighbours.push(map[y - 1][x]);
        }
        if (y < map.length - 1 && map[y + 1][x]) {
            console.log("Upp neighbour");
            neighbours.push(map[y + 1][x]);

        }
        if (x > 0 && map[y][x - 1]) {
            console.log("Right neighbour");
            neighbours.push(map[y][x - 1]);
        }
        if (x < map.length - 1 && map[y][x + 1]) {
            console.log("Left neighbour");
            neighbours.push(map[y][x + 1]);
        }
    
        return neighbours;
    }

    // Manhattan distance (not allowing diagonal moves)
    heuristic(start, end) {
        return Math.abs(start.position.x - end.position.x) + Math.abs(start.position.y - end.position.y);
    }
}