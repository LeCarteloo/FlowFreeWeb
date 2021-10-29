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
            let nextNode = openList[0];
            console.log(nextNode.getFCost());
            nodeCounter++;

            closedList.push(nextNode.mapState);

            Debug.printMapState(nextNode.mapState);
            

            if(nodeCounter == 3000) {
                Global.nodeNumber = nodeCounter;
                return 'No solution';
            }

            if(nextNode.isFinished()){
                Global.nodeNumber = nodeCounter;
                // console.log(nextNode.mapState.finished);
                return 'Solved';
            }

            // for (let y = 0; y < Map.size; y++) {
            //     console.log(nextNode.mapState.map[y].toString());
            // }
            // for (let y = 0; y < Map.size; y++) {
            //     console.log(nextNode.mapState.current[y]);
            // }

            // console.log(nextNode);
    
            let nodeList = Moves.makeAllMoves(nextNode);    
            // console.log(nodeList);
            
            if(nodeList == -1) {
                return 'Not Solved'
            }

            nodeList.forEach(nodeElem => {
                // console.log(nodeElem);
                if(closedList.includes(nodeElem.mapState) || openList.includes(nodeElem)) {
                    return;
                }
                openList.push(nodeElem);
            });
            // console.count("Astar call")
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

