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
        openList.push(_.cloneDeep(node));

        if(node == 'empty') {
            return 'No solution'
        }
        while(openList.length > 0) {
            // console.log(_.cloneDeep(openList));
            Utility.sortNodes(openList);
            console.log(_.cloneDeep(openList));
            // console.log(_.cloneDeep(openList));

            var nextNode = openList.shift();
            
            // for (let index = 0; index < openList.length; index++) {
            //     console.log(openList[index].getFCost());
            // }
            //! Debugging
    
            console.log("Picked node");

            Debug.printMapState(nextNode.mapState, "Best")

            // console.log(best);
            //!
        
            // nextNode.mapState = _.cloneDeep(best.mapState);
            // console.log(nextNode);
            // console.log(nextNode.mapState);
            nodeCounter++;

            closedList.push(_.cloneDeep(nextNode.mapState));

            // Debug.printMapState(nextNode.mapState);
            

            if(nodeCounter == 300) {
                Global.nodeNumber = nodeCounter;
                return 'No solution';
            }

            if(nextNode.isFinished()){
                Global.nodeNumber = nodeCounter;
                // console.log(nextNode.mapState.finished);
                return 'Solved';
            }
            let nodeList = Moves.makeAllMoves(_.cloneDeep(nextNode));    

            console.log("Length of move list - " + nodeList.length);

        
            nodeList.forEach(nodeElem => {
                // Debug.printMapState(nodeElem.mapState, "Node elem");
                if(closedList.includes(nodeElem.mapState) || openList.includes(nodeElem)) {
                    return;
                }
                console.log("PUSH");
                openList.push(_.cloneDeep(nodeElem));
            });
            console.count("Astar call")

            // //! Testing
            // if(nodeCounter == 7) {
            //     return 'Paused'
            // }
        }
        return 'No solution';
    }
}

