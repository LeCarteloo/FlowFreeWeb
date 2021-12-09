const Neighbours = require('./Neighbours');
const GameMap = require('./GameMap');
const Check = require('./Check');
const _ = require('lodash');

module.exports = class Moves { 
    // Find forced moves of all not finished colors
    static forcedMoves(node) {
        for (let i = 0; i < GameMap.numberOfColors; i++) {
            if(node.isFinished(i)) {
                continue;
            }

            /* Getting neighbours where current node can move,
            later check neighbours of this node possible moves */
            let moves = Neighbours.possibleMoves(node.mapState, i);

            for (const move of moves) {
                // Cloning the current node and making move in given direction
                let tempNode = _.cloneDeep(node);
                tempNode.updateMapState(i, move)

                /* Checking how many free tiles this node have, if it has more than 
                one free tile then this is not a forced move so skip the current iteration*/
                let neighbourMoves = Neighbours.allFreeSpace(tempNode.mapState, i);

                if(neighbourMoves.length != 1) {
                    continue;
                }

                let freeTiles = 0;

                // TODO: 'If' statements inside loop needs to be rewrited somehow
                for (let j = 0; j < GameMap.numberOfColors; j++) {
                    // console.log("CUR", node.mapState.current[c]);
                    // console.log("END", GameMap.endPoint[c]);

                    if((move.X - 1 == node.mapState.current[j].X
                    && move.Y == node.mapState.current[j].Y)) {
                        freeTiles++;
                    }
                    if((move.X + 1 == node.mapState.current[j].X
                    && move.Y == node.mapState.current[j].Y)) {
                        freeTiles++;
                    }
                    if((move.X  == node.mapState.current[j].X
                    && move.Y - 1 == node.mapState.current[j].Y)) {
                        freeTiles++;

                    }
                    if((move.X == node.mapState.current[j].X
                    && move.Y + 1 == node.mapState.current[j].Y)) {
                        freeTiles++;
                    }

                    //! Just testing (atm have no idea how to fix Yellow Color move [from (2,5) to (3,5))]
                    if((move.X - 1 == GameMap.endPoint[j].X
                    && move.Y == GameMap.endPoint[j].Y && i != j)) {
                        freeTiles++;
                    }
                    if((move.X + 1 == GameMap.endPoint[j].X
                    && move.Y == GameMap.endPoint[j].Y && i != j)) {
                        freeTiles++;
                    }
                    if((move.X == GameMap.endPoint[j].X
                    && move.Y - 1 == GameMap.endPoint[j].Y && i != j)) {
                        freeTiles++;
                    }
                    if((move.X == GameMap.endPoint[j].X
                    && move.Y + 1 == GameMap.endPoint[j].Y && i != j)) {
                        freeTiles++;
                    }
                }    

                if(freeTiles == 1) {
                    return [move, i];
                }            
            }

            /* If the above loop haven't found a neighbour with forced move then 
            forced move is only possible when node has only one neighbour */
            if(moves.length != 1) {
                continue;
            }

            return [moves[0], i];
        }
        return false;
    }

    // Making move on the given node - moving specific color with given cost to the given position
    static makeMove(node, moveTo, color, cost) {
        node.parent = node;
        node.g += cost;
        node.updateMapState(color, moveTo);
        node.h = node.manhattan();
        
        // Check if current pipe is one tile away from end point
        // This cause to check two times if the move is valid (even when first one is not)
        // TODO: Fix double checking valid node
        let moves = Neighbours.possibleMoves(node.mapState, color);
        for (const move of moves) {
            if(move.X == GameMap.endPoint[color].X &&
                move.Y == GameMap.endPoint[color].Y) {
                this.makeMove(node, move, color, 0);
            }
        }

        // If node doesn't meet requirements then return null
        if(Check.checkAll(node.mapState, color)) {
            return null;
        }
        
        return node;
    }

    /* Make all possible moves of given node. Start with forced moves, then
    generate moves for the first color or if it is finished take another one */
    static makeAllMoves(node) {

        let forced = this.forcedMoves(node);
        let moves = [];

        // If there is a point with a force move on the map state
        if(forced != false) {
            // Perform all the forced moves on the current map state
            while(forced != false) {
                var forcedNode = this.makeMove(node, forced[0], forced[1] , 0);
                if(forcedNode == null) {
                    return moves;
                }
                forced = this.forcedMoves(node);
            }
            moves.push(_.cloneDeep(forcedNode));
            return moves;
        }

        // Check how many colors are still unfinished
        let colorList = [];
        for (let i = 0; i < GameMap.numberOfColors; i++) {
            if(node.isFinished(i)) {
                continue;
            }
            colorList.push(i);
        }

        if(colorList.length == 0) {
            return moves;
        }

        // Generate move for the first not finished color
        for (const color of colorList) {
            let posMoves = Neighbours.possibleMoves(node.mapState, color);

            for (const posMove of posMoves) {

                let newNode = Moves.makeMove(_.cloneDeep(node), posMove, color, 1);

                if(newNode != null) {
                    moves.push(newNode);
                }
            }
            /* This 'break' is causing that only one color is moving untill 
            it's finished (not counting forced moves) */
            break;
        }
        return moves;
    }
}