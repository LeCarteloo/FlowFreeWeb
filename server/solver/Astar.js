const NodeOrder = require('./node/NodeOrder');
const Node = require('./node/Node');
const Global = require('./Global');
const Moves = require('./Moves');
const _ = require('lodash');

module.exports = class Astar {
    search() {
        /* Array of nodes that can be picked (openList) with the best move on the begining, 
        Array with nodes that have been used and counter of how many nodes have been used */
        let openList = new NodeOrder();
        //TODO: Change closed list to other type of array
        let closedList = [];
        let nodeCounter = 0;
        const stop = 4000;

        // Starting node
        let node = new Node();

        Global.createdNodes++;

        //! Trying to solve map with one move already
        // node.mapState.map =  [       
        //     ['B','B','B','B','0','G',],
        //     ['B','B','B','B','0','Y',],
        //     ['0','0','B','B','0','0',],
        //     ['0','R','B','?','0','0',],
        //     ['0','B','B','0','?','0',],
        //     ['0','0','0','0','?','0',],
        // ];
        // node.mapState.current[2] = GameMap.endPoint[2];
        // node.mapState.finishedPoints = [2];
        // node.h = node.manhattan();

        openList.push(_.cloneDeep(node));
       
        while(openList.length() > 0) {            
            // Taking the best node and removing it from openList
            var pickedNode = openList.shift();

            nodeCounter++;

            // console.count("Picked node:");
            // console.log(_.cloneDeep(pickedNode.mapState.map));

            // Next node is used so it is pushed to closedList
            closedList.push(_.cloneDeep(pickedNode.mapState));

            if(pickedNode.isSolved()){
                Global.usedNodes = nodeCounter;
                return 'Solved';
            }
            // Generated moves for next node
            let nodeList = Moves.makeAllMoves(_.cloneDeep(pickedNode));    

            // For every generated moves check if map state and node is not already in arrays
            nodeList.forEach(nodeElem => {
                Global.createdNodes++;
                if(closedList.includes(nodeElem.mapState) || openList.includes(nodeElem)) {
                    return;
                }
                openList.push(_.cloneDeep(nodeElem));
            });
            
            //! Used for debugging
            if(nodeCounter == stop) {
                Global.usedNodes = nodeCounter;
                openList.printMapState();
        
                return 'Paused'
            }
        }
        Global.usedNodes = nodeCounter;
        return 'No solution';
    }
}

