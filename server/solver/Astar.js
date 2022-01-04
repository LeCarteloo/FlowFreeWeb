const NodeOrder = require('./node/NodeOrder');
const GameMap = require('./GameMap');
const Node = require('./node/Node');
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
        const stop = 10000;

        // Starting node
        let node = new Node();

        // Solving map with moves
        // Todo: move.solvedColors.length != 0 (it's better - fix it later)
        if(move != null) {

            for (let y = 0; y < GameMap.size; y++) {
                for (let x = 0; x < GameMap.size; x++) {
                    if(GameMap.map[y][x] == '|') {
                        move.map[y][x] = '|';
                    }
                }
            }

            node.mapState.map = move.map;

            for (let i = 0; i < move.solvedColors.length; i++) {
                // console.log(GameMap.foundColors.indexOf(move.solvedColors[i]));
                node.mapState.finishedPoints.push(GameMap.foundColors.indexOf(move.solvedColors[i]));
            }

            node.mapState.freeTiles = node.mapState.countFreeTiles();
        }

        openList.push(_.cloneDeep(node));
       
        while(openList.length() > 0) {       
            // Solving map is taking to long to skip it
            if(nodeCounter == stop) {
                console.log(nodeCounter);
                console.log("Paused");
                return {isSolved: false, map: pickedNode.mapState.map, foundColors: GameMap.foundColors};
            }     

            // Taking the best node and removing it from openList
            var pickedNode = openList.shift();

            nodeCounter++;

            // console.count("Picked node:");
            // console.log(_.cloneDeep(pickedNode.mapState.map));

            // Next node is used so it is pushed to closedList
            closedList.push(_.cloneDeep(pickedNode.mapState));

            if(pickedNode.isSolved()){
                // return 'Solved';
                return {isSolved: true, map: pickedNode.mapState.map, foundColors: GameMap.foundColors};
            }
            // Generated moves for next node
            let nodeList = Moves.makeAllMoves(_.cloneDeep(pickedNode));    

            // For every generated moves check if map state and node is not already in arrays
            nodeList.forEach(nodeElem => {
                if(closedList.includes(nodeElem.mapState) || openList.includes(nodeElem)) {
                    return;
                }
                openList.push(_.cloneDeep(nodeElem));
            });
        }
        return {isSolved: false, map: pickedNode.mapState.map, foundColors: GameMap.foundColors};
    }
}

