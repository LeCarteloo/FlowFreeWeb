var gameMap = [
    [1, 0, 2, 0, 3],
    [0, 0, 4, 0, 5],
    [0, 0, 0, 0, 0],
    [0, 2, 0, 3, 0],
    [0, 1, 4, 5, 0]
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
        row.push(new Node(x, y, 0, 0, null, gameMap[y][x]));
    }
    graph.push(row);
}

var manhattanDistance = astar.heuristic(graph[0][0], graph[4][1])
console.log("Distance: " + manhattanDistance);
// astar.search(graph, graph[0][0], graph[1][4]);
// console.log(astar.findAllNeighbours(graph, graph[1][1]))

var before;
var after;

window.onload = function () {
    //! Debug divs
    before = document.getElementById('before');
    console.log(before.innerHTML)
    after = document.getElementById('after');

    printMap(gameMap, before)

};

var set = []

// for(var y = 0; y < size; y++) {
//     for(var x = 0; x < size; x++) {
//         if(graph[y][x].value > 0 && !set.includes(graph[y][x].value)) {
//             for(var yy = 0; yy < size; yy++) {
//                 for(var xx = 0; xx < size; xx++) {
//                     if(graph[yy][xx].value == graph[y][x].value && graph[yy][xx].position !== graph[y][x].position) {
//                         set.push(graph[y][x].value) 
//                         var result = astar.search(graph, graph[y][x], graph[yy][xx]);
//                         if(result != 'No solution') {
//                             result.forEach(res => {
//                                 gameMap[res.position.y][res.position.x] = graph[y][x].value;
//                                 graph[res.position.y][res.position.x].value = graph[y][x].value;
//                             });
//                         }      
//                     }
//                 }
//             }
//         }
//     }
// }

var moves = new Moves();
console.log(moves.possibleMoves(graph, graph[0][0]))
console.log(moves.forcedMoves(graph, graph[0][0]))

//!


function printMap(map, div) {
    for(var y = 0; y < size; y++) {
        for(var x = 0; x < size; x++) {
            div.innerHTML += map[y][x];
        }
        div.innerHTML += '</br>';
    }
}




