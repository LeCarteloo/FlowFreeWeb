class Astar {
    search() {
        // List of nodes to be evaluated, list that have been visited, result, neighbours
        // and counter of how much nodes have been created
        var openList = [];
        var closedList = [];
        var result = [];
        var neighbours = [];
        var nodeCounter = 0;
        var steps = 0;

        let node = new Node();

        // Starting node
        openList.push(_.cloneDeep(node));

        if(node == 'empty') {
            return 'No solution'
        }
        while(openList.length > 0) {
            // console.log(openList.length);
            var best = openList[0];
            
            //! Debugging
            for (let index = 0; index < openList.length; index++) {
                // console.log(openList[index].getFCost());
                Debug.printMapState(openList[index].mapState, index)
                if(openList[index].getFCost() <= best.getFCost()) {
                    best = openList[index];
                    var whichPicked = index;
                }
            }
            console.log(whichPicked);
            // console.log(best);
            //!

            var nextNode = _.cloneDeep(best);
            // nextNode.mapState = _.cloneDeep(best.mapState);
            // console.log(nextNode);
            // console.log(nextNode.mapState);
            nodeCounter++;

            closedList.push(nextNode.mapState);

            // Debug.printMapState(nextNode.mapState);
            

            if(nodeCounter == 100) {
                Global.nodeNumber = nodeCounter;
                return 'No solution';
            }

            if(nextNode.isFinished()){
                Global.nodeNumber = nodeCounter;
                // console.log(nextNode.mapState.finished);
                return 'Solved';
            }
            let nodeList = Moves.makeAllMoves(nextNode);    

            console.log("Length of move list - " + nodeList.length);

        
            nodeList.forEach(nodeElem => {
                // Debug.printMapState(nodeElem.mapState, "Node elem");
                if(closedList.includes(nodeElem.mapState) || openList.includes(nodeElem)) {
                    return;
                }
                console.log("PUSH");
                openList.push(nodeElem);
            });
            console.count("Astar call")

            //! Testing
            // steps++;
            // if(steps == 7) {
            //     return 'Paused'
            // }
        }
        return 'No solution';
    }
}

