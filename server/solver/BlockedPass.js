const ComponentLabeling = require("./ComponentLabeling");
const Neighbours = require("./Neighbours");
const _ = require('lodash');

module.exports = class BlockedPass {
    /* Check if current color (with given map state) after 
    extending his flow in any direction doesn't create a pass
    that is impossible to pass by all blocked colors */
    static hasBlockedPass(mapState, color) {
        let moves = Neighbours.possibleMoves(mapState, color);
        for (const move of moves) {
            let width = 0;
            let clonedState = _.cloneDeep(mapState)
            /* How far it should change for blocked pass
            //! Atm it is set to 2, but it can also be 999 
            //! (it is time consuming to be higher than 2)
            //! But haven't tested if this is wide enough */
            let max = 2;

            // Determine in what direction flow will go
            let directionY = move.Y - clonedState.current[color].Y;
            let directionX = move.X - clonedState.current[color].X;
            
            // TODO: Function to check if tile is in board 
            // TODO: (testY > state.map.length) => inGameRange(move.To.Y, move.To.X);
            while(width < max) {
                const y = clonedState.current[color].Y + directionY;
                const x = clonedState.current[color].X + directionX;

                // Check if y and x are in map range and if tile is empty
                if(y > clonedState.map.length - 1 || 
                    x > clonedState.map.length - 1 ||
                    y < 0 || x < 0 ||
                    clonedState.map[y][x] != 0){
                        break;
                    }
                width++;

                clonedState.updateMapState(color, {Y: y, X: x});
            }
            /* Change the current position to original one (because 
            color can't block itself by creating a narrow passage) */
            clonedState.current = mapState.current;

            /* Use component labeling to detect number of points blocked 
            and then compare it do the width of blocked passage */
            let componentLabeling = new ComponentLabeling();
            let result = componentLabeling.isStranded(clonedState, true);
            if(result.Num > width) {
                return true;
            }
        }
        return false;
    }
}