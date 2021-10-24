var gameMap = [
    ['R', '0', 'G', '0', 'O'],
    ['0', '0', 'B', '0', 'Y'],
    ['0', '0', '0', '0', '0'],
    ['0', 'G', '0', 'O', '0'],
    ['0', 'R', 'B', 'Y', '0']
];

var astar = new Astar();
var graph = [];
var size = gameMap.length;
var cells = gameMap.length * gameMap[1].length;

console.log("Map size: " + size + "x" + size);
console.log("Cells: " + cells);
console.log("Colors: " + size);
// console.log(gameMap);

const astarColor = {
    'R': "red",
    'G': "green",
    'O': "orange",
    'B': "blue",
    'Y': "yellow",
}

//! Testing the Astar algorithm
// Every element in array now has position variables, g and h cost, 
// parent node (set to null), value and state
for(let y = 0; y < size; y++) {
    let row = [];
    for(let x = 0; x < size; x++) {
        row.push(new Node(x, y, 0, 0, null, gameMap[y][x]));
    }
    graph.push(row);
}


for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
        if(graph[y][x].value != 0) {
            // Utility.addStartingHCost(graph, graph[y][x])
            graph[y][x].setHCost(10);
        }
    }
}

var graphInto1D = [].concat(...graph);
var sortedNodes = Utility.sortNodes(graphInto1D);
console.log(sortedNodes)

var moves = new Moves();

for (let i = 0; i < sortedNodes.length; i++) {
    let forcedPos = moves.forcedMoves(graph, sortedNodes[i]);
    // console.log(forcedPos)
    // graph[forcedPos.y][forcedPos.x] = moves.makeMove(sortedNodes[i], forcedPos, 0); 
    sortedNodes[i] = moves.makeMove(sortedNodes[i], forcedPos, 0)
}


console.log(sortedNodes)


window.onload = function () {
    //! Debug divs
    before = document.getElementById('before');
    console.log(before.innerHTML)

    printMap(gameMap, before)
};


//!


function printMap(map, div) {
    for(var y = 0; y < size; y++) {
        for(var x = 0; x < size; x++) {
            div.innerHTML += `<p style="margin:0; padding:0; display: inline-block; font-weight: bold; color:${astarColor[map[y][x]]}"> ${map[y][x]} </p>`;
        }
        div.innerHTML += '</br>';
    }
}

//? #################### ASTAR #################### ?//

// Initializing map
// Gathering informations (where is the start point,
// endpoint and how many colors)

console.log('%c ######### INIT MAP ###########', 'color: aqua;')

let map = new Map();
map.initializeMap(gameMap);
console.log(`Number of colors: ${map.numberOfColors}`)
console.log(map.startPoint[0]);
console.log(map.endPoint[0]);
console.log(map.foundColors);

let mapState = new MapState();
console.log(mapState.map);


