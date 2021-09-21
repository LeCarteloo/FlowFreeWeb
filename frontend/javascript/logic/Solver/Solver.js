//! Wybierz wierzchołek o najmniejszym koszcie i dodaj go do zbioru zamkniętego i oznacz jako aktualny wierzchołek,​

//! Dla każdego sąsiada nowego wierzchołka oblicz  koszt G i H,​

//! Zatrzymaj działanie jeśli cel, jest dodany do zbioru zamkniętego lub zbiór otwarty jest pusty.

var gameMap = [
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

var astar = new Astar();
var graph = [];
var size = gameMap.length;
var cells = gameMap.length * gameMap[1].length;

console.log("Map size: " + size + "x" + size);
console.log("Cells: " + cells);
console.log("Colors: " + size);
// console.log(gameMap);


//! Testing the Astar algorithm
// Every element in array now has position variables, g and h cost, 
// parent node (set to null), value and state
for(var y = 0; y < size; y++) {
    var row = [];
    for(var x = 0; x < size; x++) {
        row.push(new Node(x, y, 0, 0, null, gameMap[y][x], 0));
    }
    graph.push(row);
}

var manhattanDistance = astar.heuristic(graph[0][0], graph[4][3])
console.log("Distance: " + manhattanDistance);
// astar.search(graph, graph[0][0], graph[1][4]);
// console.log(astar.findNeighbours(graph, graph[1][1]))

var result = astar.search(graph, graph[0][0], graph[4][3]);

console.log(result);

result.forEach(res => {
    gameMap[res.position.x][res.position.y] = graph[0][0].value;
})

// Game map after Astar
console.log(gameMap);

//!





