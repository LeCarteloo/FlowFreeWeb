const LobbySettings = require('../LobbySettings');
const GameMap = require('./GameMap');

module.exports = class Neighbours {
    // Find all neighbours of tile (east, west, north, south)
    static allNeighbours(y, x) {
        let result = [];
        
        if (x < GameMap.size - 1) {
            result.push({Y: y, X: x + 1});
        }
        if (x > 0) {
            result.push({Y: y, X: x - 1});
        }
        if (y > 0) {
            result.push({Y: y - 1, X: x});
        }
        if (y < GameMap.size - 1) {
            result.push({Y: y + 1, X: x});
        }

        return result;
    }

    // All free space around current position of given color.
    static allFreeSpace(mapState, color) {
        let result = [];
        
        const y = mapState.current[color].Y;
        const x = mapState.current[color].X;
        const map = mapState.map;
        
        if (x < GameMap.size - 1 && map[y][x + 1] == '0') {
            result.push({Y: y, X: x + 1});
        }
        if (x > 0 && map[y][x - 1] == '0') {
            result.push({Y: y, X: x - 1});
        }
        if (y > 0 && map[y - 1][x] == '0') {
            result.push({Y: y - 1, X: x});
        }
        if (y < GameMap.size - 1 && map[y + 1][x] == '0') {
            result.push({Y: y + 1, X: x});
        }
        
        return result;
    }

    // TODO: Fix it
    static isValid(mapState, y, x, color) {
        const map = mapState.map;
        if (x < GameMap.size - 1 && map[y][x + 1] == GameMap.foundColors[color]
            && mapState.current[color].X != x + 1 && mapState.current[color].Y != y) {
            // console.log("Left neighbour");
            return false;
        }
        if (x > 0 && map[y][x - 1] == GameMap.foundColors[color] 
            && mapState.current[color].X != x - 1 && mapState.current[color].Y != y) {
            // console.log("Right neighbour");
            return false;
        }
        if (y < GameMap.size - 1 && map[y + 1][x] == GameMap.foundColors[color]
            && mapState.current[color].X != x && mapState.current[color].Y != y + 1) {
            // console.log("Upp neighbour");
            return false;
        }
        if (y > 0 && map[y - 1][x] == GameMap.foundColors[color]
            && mapState.current[color].X != x && mapState.current[color].Y != y - 1) {
            // console.log("Down neighbour");
            return false;
        }
        return true;
    }

    // All possible moves of the current position of the given color
    // TODO: Try to simplify the condition in 'If' statements
    static possibleMoves(mapState, color) {
        let result = [];

        const y = mapState.current[color].Y;
        const x = mapState.current[color].X;
        const map = mapState.map;
        const pt = GameMap.endPoint[color];

        if(!LobbySettings.canTouch) {
            if ((x < GameMap.size - 1 && map[y][x + 1] == '0' || x < GameMap.size - 1 && y == pt.Y && x + 1 == pt.X)
            && Neighbours.isValid(mapState, y, x + 1, color)) {
                result.push({Y: y, X: x + 1});
            }
            if ((x > 0 && map[y][x - 1] == '0' || x > 0 && y == pt.Y && x - 1 == pt.X)
            && Neighbours.isValid(mapState, y, x - 1, color)) {
                result.push({Y: y, X: x - 1});
            }
            if ((y > 0 && map[y - 1][x] == '0' || y > 0 && y - 1 == pt.Y && x == pt.X)
            && Neighbours.isValid(mapState, y - 1, x, color)) {
                result.push({Y: y - 1, X: x});
            }
            if ((y < GameMap.size - 1 && map[y + 1][x] == '0' || y < GameMap.size - 1 && y + 1 == pt.Y && x == pt.X)
            && Neighbours.isValid(mapState, y + 1, x, color)) {
                result.push({Y: y + 1, X: x});
            }
        }
        else {
            if ((x < GameMap.size - 1 && map[y][x + 1] == '0' || x < GameMap.size - 1 && y == pt.Y && x + 1 == pt.X)) {
                result.push({Y: y, X: x + 1});
            }
            if ((x > 0 && map[y][x - 1] == '0' || x > 0 && y == pt.Y && x - 1 == pt.X)) {
                result.push({Y: y, X: x - 1});
            }
            if ((y > 0 && map[y - 1][x] == '0' || y > 0 && y - 1 == pt.Y && x == pt.X)) {
                result.push({Y: y - 1, X: x});
            }
            if ((y < GameMap.size - 1 && map[y + 1][x] == '0' || y < GameMap.size - 1 && y + 1 == pt.Y && x == pt.X)) {
                result.push({Y: y + 1, X: x});
            }
        }

        return result;
    }

    // Searching for free tiles for endPoint and current
    static forcedFreeTiles(move, point) {
        let result = [];
        const y = point.Y;
        const x = point.X;
        if(move.X == x - 1 && move.Y == y) {
            result.push({Y: y, X: x - 1});
        }
        if(move.X == x + 1 && move.Y == y) {
            result.push({Y: y, X: x + 1});
        }
        if(move.X  == x && move.Y == y - 1) {
            result.push({Y: y - 1, X: x});
        }
        if(move.X == x && move.Y == y + 1) {
            result.push({Y: y + 1, X: x});
        }
        return result;
    }
}