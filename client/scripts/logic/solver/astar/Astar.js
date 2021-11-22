class Astar {
    search() {
        // List of nodes to be evaluated, list that have been visited, result, neighbours
        // and counter of how much nodes have been created
        // var openList = [];
        let openList = new NodeOrder();
        //TODO: Change closed list to other type of array
        var closedList = [];
        var nodeCounter = 0;
        const stop = 100;

        let node = new Node();

        // Starting node
        openList.push(_.cloneDeep(node));
       
        if(node == 'empty') {
            return 'No solution'
        }
        while(openList.length() > 0) {
            console.count("Astar call")
            // Utility.sortNodes(openList);
            
            var nextNode = openList.shift();

            // console.log(_.cloneDeep(openList));
            Debug.printMapState(nextNode.mapState, "Picked Up")
            // console.log(nextNode.h, nextNode.g, nextNode.getFCost());

            nodeCounter++;

            closedList.push(_.cloneDeep(nextNode.mapState));

            if(nodeCounter == 100) {
                Global.nodeNumber = nodeCounter;
                return 'No solution';
            }

            if(nextNode.isSolved()){
                Global.nodeNumber = nodeCounter;
                return 'Solved';
            }
            let nodeList = Moves.makeAllMoves(_.cloneDeep(nextNode));    

            nodeList.forEach(nodeElem => {
                //  Debug.printMapState(nodeElem.mapState, "Gen Moves")
                if(closedList.includes(nodeElem.mapState) || openList.includes(nodeElem)) {
                    return;
                }
                openList.push(_.cloneDeep(nodeElem));
            });
            
            //! Testing
            if(nodeCounter == stop) {

                openList.printMapState();
                
                return 'Paused'
            }
        }
        return 'No solution';
    }
}

