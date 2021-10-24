class Astar {
    search(map, start, end) {
        // List of nodes to be evaluated, list that have been visited, result, neighbours
        // and counter of how much nodes have been created
        var openList = [];
        var closedList = [];
        var result = [];
        var neighbours = [];
        var nodeCounter = 0;

        // Starting node
        openList.push(start);

        console.log(start.value)

        while(openList.length > 0) {
            var index = 0;
            nodeCounter++;
            // Searching for node with the lowest FCost
            for(var i = 0; i < openList.length; i++) {
                if(openList[i].getFCost() < openList[index].getFCost() ||
                   openList[i].getFCost() == openList[index].getFCost()) {
                    index = i;
                }
            }

            var currentNode = openList[index];
            // console.log("f(x): " + currentNode.h + " + " + currentNode.g)

            // Removing from open list the current node and adding it to the closed list
            openList.splice(index, 1);
            closedList.push(currentNode);

            // console.log(currentNode.position);
            // console.log(end.position);
            // console.log(currentNode.position == end.position)

            // If current node is the target node return the result reversed
            if(currentNode.position === end.position) {
                result = [];
                while(currentNode.parent) {
                    //! console.log(currentNode.position.x + " | " + currentNode.position.y)
                    result.push(currentNode);
                    currentNode = currentNode.parent;
                }
                // console.log("Nodes: " + nodeCounter);
                return result.reverse();
            }

            // Searching for all neighbours (not diagonal)
            neighbours = this.findAllNeighbours(map, currentNode);

            // For every visited neighbour of current node change the costs
            neighbours.forEach(neighbour => {
                //! console.log(neighbour);
                //! console.log(neighbour.value)
                if(closedList.includes(neighbour) || (neighbour.value != 0 && neighbour.value != start.value)) {
                    return;
                }

                // Distance between current node and neighbour node
                //! Changed from currentNode to start node (got some errors idk why)
                var costToGo = this.heuristic(start, neighbour) + currentNode.g;

                if(costToGo < neighbour.g || !closedList.includes(neighbour)) {
                    neighbour.g = costToGo;
                    neighbour.h = this.heuristic(neighbour, end);
                    neighbour.parent = currentNode;
                    if(!closedList.includes(neighbour)) {
                        openList.push(neighbour);
                    }
                }
            });
        }
        return 'No solution';
    }
    // Searching for neighbours on map around specific node (no diagonal moves)
    findAllNeighbours(map, node) {
        var neighbours = [];
        var x = node.position.X;
        var y = node.position.Y;		    

        if (y > 0) {
            // console.log("Down neighbour");
            neighbours.push(map[y - 1][x]);
        }
        if (y < map.length - 1) {
            // console.log("Upp neighbour");
            neighbours.push(map[y + 1][x]);

        }
        if (x > 0) {
            // console.log("Right neighbour");
            neighbours.push(map[y][x - 1]);
        }
        if (x < map.length - 1) {
            // console.log("Left neighbour");
            neighbours.push(map[y][x + 1]);
        }
    
        // console.log(neighbours)

        return neighbours;
    }

    // Calculate manhattan distance (not allowing diagonal moves)
    heuristic(start, end) {
        return Math.abs(start.position.x - end.position.x) + Math.abs(start.position.y - end.position.y);
    }
}