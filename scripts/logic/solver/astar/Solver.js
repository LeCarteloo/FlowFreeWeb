var gameMap = [
    ['0', '0', '0', '0', '0', '0', '0'],
    ['R', '0', '0', '0', '0', 'Y', 'R'],
    ['O', '0', '0', 'B', 'A', '0', '0'],
    ['0', '0', '0', 'G', '0', 'G', '0'],
    ['0', '0', '0', '0', 'A', '0', '0'],
    ['0', '0', '0', '0', 'P', '0', '0'],
    ['0', 'O', 'Y', '0', '0', 'B', 'P'],
];

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
    //! Debug div
    before = document.getElementById('before');

    // Initializing map
    // Gathering informations (where is the start point,
    // endpoint and how many colors)
    try {
        Map.initializeMap(gameMap);
        
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

    } catch (error) {
        console.log(`%c${error}`, 'color: red;');
    }

    
    for(var y = 0; y < Map.size; y++) {
        for(var x = 0; x < Map.size; x++) {
            before.innerHTML += `<p style="margin:0; padding:0; display: inline-block; font-weight: bold; color:${astarColor[gameMap[y][x]]}"> ${gameMap[y][x]} </p>`;
        }
        before.innerHTML += '</br>';
    }

};
