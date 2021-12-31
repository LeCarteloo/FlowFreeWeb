const NodeOrder = require('./node/NodeOrder');
const GameMap = require('./GameMap');
const Node = require('./node/Node');
const Global = require('./Global');
const Moves = require('./Moves');
const _ = require('lodash');

module.exports = class Astar {
    search(move) {
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

        // Solving map with moves
        if(move != null) {
            console.log("Solving with moves...");
            node.mapState.map = [
                [ '0', '0', '0', '0', '0' ],
                [ 'B', 'R', '0', '0', '0' ],
                [ 'O', 'Y', 'Y', '0', 'B' ],
                [ '0', '0', '0', '0', '0' ],
                [ 'G', 'G', '0', 'O', 'R' ]
              ]
            // GameMap.foundColors.indexOf(move.solvedColors)
            // node.mapState.current[2] = GameMap.endPoint[2];
            // node.mapState.finishedPoints = [2];
            // node.h = node.manhattan();
        }

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
                // return 'Solved';
                return {isSolved: true, map: pickedNode.mapState.map};
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
                console.log("Paused");
                return {isSolved: 'Paused', map: pickedNode.mapState.map};
            }
        }
        Global.usedNodes = nodeCounter;
        return {isSolved: false, map: pickedNode.mapState.map};
    }
}

