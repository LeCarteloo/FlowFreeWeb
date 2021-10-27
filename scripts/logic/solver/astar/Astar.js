class Astar {
    search() {
        // List of nodes to be evaluated, list that have been visited, result, neighbours
        // and counter of how much nodes have been created
        var openList = [];
        var closedList = [];
        var result = [];
        var neighbours = [];
        var nodeCounter = 0;

        let node = new Node();
        
        // Starting node
        openList.push(node);

        if(node == 'empty') {
            return 'No solution'
        }

        while(openList.length > 0) {
            let nextNode = new Node();
            nodeCounter++;
            

            if(nodeCounter == 10000) {
                return 'No solution';
            }

            if(nextNode.isFinished()){
                Global.nodeNumber = nodeCounter;
                return 'Solved';
            }

            // console.log(nextNode);
            let nodeList = Moves.makeAllMoves(nextNode);    
            console.log(nodeList);

            nodeList.forEach(nodeElem => {
                console.log(nodeElem);
                if(closedList.includes(nodeElem.mapState) || openList.includes(nodeElem)) {
                    return;
                }
                openList.push(nodeElem);
            });

            console.count("Astar call")

            // return 'No solution';
            // openList.splice(index, 1);
            // closedList.push(nextNode);

            // if(currentNode.position === end.position) {
            //     result = [];
            //     while(currentNode.parent) {
            //         result.push(currentNode);
            //         currentNode = currentNode.parent;
            //     }
            //     return result.reverse();
            // }

            // neighbours = this.findAllNeighbours(map, currentNode);

            // neighbours.forEach(neighbour => {
            //     if(closedList.includes(neighbour) || (neighbour.value != 0 && neighbour.value != start.value)) {
            //         return;
            //     }

            //     var costToGo = this.heuristic(start, neighbour) + currentNode.g;

            //     if(costToGo < neighbour.g || !closedList.includes(neighbour)) {
            //         neighbour.g = costToGo;
            //         neighbour.h = this.heuristic(neighbour, end);
            //         neighbour.parent = currentNode;
            //         if(!closedList.includes(neighbour)) {
            //             openList.push(neighbour);
            //         }
            //     }
            // });
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
        return Math.abs(start.position.X - end.position.X) + Math.abs(start.position.Y - end.position.Y);
    }
}

