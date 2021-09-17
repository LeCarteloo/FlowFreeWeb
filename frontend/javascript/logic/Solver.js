function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

var gameMap = [
    [1, 0, 2, 0, 5],
    [0, 0, 3, 0, 4],
    [0, 0, 0, 0, 0],
    [0, 2, 0, 5, 0],
    [0, 1, 3, 4, 0],
];
var size = gameMap.length;
var cells = gameMap.length * gameMap[1].length;
var md = manhattanDistance(0, 0, 1, 4)

console.log("Map size: " + size + "x" + size);
console.log("Cells: " + cells);
console.log("Colors: " + size);
console.log("Distance: " + md);
