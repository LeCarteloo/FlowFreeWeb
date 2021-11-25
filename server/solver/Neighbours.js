const GameMap = require('./GameMap');

module.exports = class Neighbours {
    static allNeighbours(y, x) {
        let result = [];
        
        if (x < GameMap.size - 1) {
            result.push({Y: y, X: x + 1});
        }
        if (y < GameMap.size - 1) {
            result.push({Y: y + 1, X: x});
        }
        if (y > 0) {
            result.push({Y: y - 1, X: x});
        }
        if (x > 0) {
            result.push({Y: y, X: x - 1});
        }

        return result;
    }

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

    // All possible moves of the given mapState and color

    //TODO: Pass only the map array not whole MapState object
    //? Do i even use FROM?
    static testMoves(mapState, color) {
        let result = [];
        const y = mapState.current[color].Y;
        const x = mapState.current[color].X;
        const map = mapState.map;
        const pt = GameMap.endPoint[color]

        if ((x < GameMap.size - 1 && map[y][x + 1] == '0')) {
            // console.log("Left neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x + 1}});
        }
        if ((x > 0 && map[y][x - 1] == '0')) {
            // console.log("Right neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x - 1}});
        }
        if ((y < GameMap.size - 1 && map[y + 1][x] == '0')) {
            // console.log("Upp neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y + 1, X: x}});
        }
        if ((y > 0 && map[y - 1][x] == '0')) {
            // console.log("Down neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y - 1, X: x}});
        }


        return result;
    }

    // All possible moves of the given mapState and color
    //TODO: Pass only the map array not whole MapState object
    //? Do i even use FROM?
    static possibleMoves(mapState, color) {
        let result = [];
        const y = mapState.current[color].Y;
        const x = mapState.current[color].X;
        const map = mapState.map;
        const pt = GameMap.endPoint[color]

        if ((x < GameMap.size - 1 && map[y][x + 1] == '0' || x < GameMap.size - 1 && y == pt.Y && x + 1 == pt.X)
        && Moves.isValid(mapState, y, x + 1, color)) {
            // console.log("Left neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x + 1}});
        }
        if ((x > 0 && map[y][x - 1] == '0' || x > 0 && y == pt.Y && x - 1 == pt.X)
        && Moves.isValid(mapState, y, x - 1, color)) {
            // console.log("Right neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y, X: x - 1}});
        }
        if ((y > 0 && map[y - 1][x] == '0' || y > 0 && y - 1 == pt.Y && x == pt.X)
        && Moves.isValid(mapState, y - 1, x, color)) {
            // console.log("Down neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y - 1, X: x}});
        }
        if ((y < GameMap.size - 1 && map[y + 1][x] == '0' || y < GameMap.size - 1 && y + 1 == pt.Y && x == pt.X)
        && Moves.isValid(mapState, y + 1, x, color)) {
            // console.log("Upp neighbour");
            result.push({From: {Y: y, X: x}, To: {Y: y + 1, X: x}});
        }


        return result;
    }
}