const ComponentLabeling = require('./ComponentLabeling');
const BlockedPass = require('./BlockedPass');
const Neighbours = require('./Neighbours');
const GameMap = require('./GameMap');
module.exports = class Check {
    /* Check if pipe has missed any tile that cannot be filled later
    (One tile is surrounded by three pipes with the same color */
    hasMissedTile(mapState, color) {

        // Free space around currently checked map state and color
        let neighbours = Neighbours.allFreeSpace(mapState, color);
        let tilesFiled = 0;

        /* For every neighbour - check if their neighbour haven't
        missed any tile (tile surrounded by three pipes with same color) */
        for (const neighbour of neighbours) {
            tilesFiled = 0;

            const y = neighbour.Y;
            const x = neighbour.X;

            let neighboursToCheck = Neighbours.allNeighbours(y, x);

            // For every neighbour check how many tiles surround him (same color)
            for (const neighbour of neighboursToCheck) {

               const y = neighbour.Y;
               const x = neighbour.X;
               
               // Find same color (current position doesn't count)
               if(mapState.map[y][x] == GameMap.foundColors[color] &&
                y != mapState.current[color].Y &&
                x != mapState.current[color].X){
                   tilesFiled++;
               } 
            }
            
            if(neighboursToCheck.length - tilesFiled <= 1) {
                return true;
            }
        }
        return false;
    }

    // Check all the requirements for node to be valid
    static checkAll(mapState, color) {
        let check = new Check();
        let componentLabeling = new ComponentLabeling();

        if(check.hasMissedTile(mapState, color)) {
            return true;
        }
        if(componentLabeling.isStranded(mapState, false).Is) {
            return true;
        }
        if(BlockedPass.hasBlockedPass(mapState, color)) {
            return true;
        }
        
        return false;
    }
}