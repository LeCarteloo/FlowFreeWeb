var gameMap = [
    ['R', '0', '0', '0', '0', '0'],
    ['B', '0', '0', '0', 'B', 'R'],
    ['0', '0', '0', '0', '0', 'Y'],
    ['0', 'G', 'A', '0', '0', '0'],
    ['0', '0', '0', '0', 'G', 'A'],
    ['Y', 'O', '0', '0', '0', 'O'],
];

var graph = [];
var size = gameMap.length;
var cells = gameMap.length * gameMap[1].length;

console.log("Map size: " + size + "x" + size);
console.log("Cells: " + cells);
console.log("Colors: " + size);

const astarColor = {
    'R': "red",
    'G': "green",
    'O': "orange",
    'B': "blue",
    'Y': "yellow",
    'A': "aqua",
    'P': "purple",
}

window.onload = function () {
    //! Debug divs
    before = document.getElementById('before');
    console.log(before.innerHTML)

    // Initializing map
    // Gathering informations (where is the start point,
    // endpoint and how many colors)
    Map.initializeMap(gameMap);

    for(var y = 0; y < Map.size; y++) {
        for(var x = 0; x < Map.size; x++) {
            before.innerHTML += `<p style="margin:0; padding:0; display: inline-block; font-weight: bold; color:${astarColor[gameMap[y][x]]}"> ${gameMap[y][x]} </p>`;
        }
        before.innerHTML += '</br>';
    }

    
    //? #################### ASTAR #################### ?//

    console.log('%c ######### INIT MAP ###########', 'color: aqua;')


    let start = performance.now();

    let astar = new Astar();

    console.log(`Game map is ${astar.search()} and it created ${Global.nodeNumber} nodes`);

    let end = performance.now();
    let time = `${(end - start) / 1000} SECONDS`;

    if(Global.nodeNumber == 3000) {
        console.log('%c WARNING 10000 NODES HAVE BEEN CREATED', 'color: yellow');
        console.log(`%c PERFORMANCE IS LOW - IT TOOK ${time} TO GENERATE`, 'color: yellow;' );
        console.log(`%c STOPPED A SEARCH ALGORITHM`, 'color: yellow;' );
    } else {
        console.log(`%c It took ${time}`, 'color: green;' );
    }

    
};
