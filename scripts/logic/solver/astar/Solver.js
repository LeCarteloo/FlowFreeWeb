var gameMap = [
    ['R', '0', '0', '0', '0', '0'],
    ['B', '0', '0', '0', 'B', 'R'],
    ['0', '0', '0', '0', '0', 'Y'],
    ['0', 'G', 'A', '0', '0', '0'],
    ['0', '0', '0', '0', 'G', 'A'],
    ['Y', 'O', '0', '0', '0', 'O'],
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

    GameMap.initializeMap(gameMap);

    let astar = new Astar();

    console.log(`Game map is ${astar.search()} and it created ${Global.nodeNumber} nodes`);

    // Tests.astarPerformance();

    // console.log(gameMap);

    // let unionFind = new UnionFind();

    // unionFind.init(gameMap);

    // Tests.comonentLabelingPerformance();

    for(var y = 0; y < GameMap.size; y++) {
        for(var x = 0; x < GameMap.size; x++) {
            before.innerHTML += `<p style="margin:0; padding:0; display: inline-block; font-weight: bold; color:${astarColor[gameMap[y][x]]}"> ${gameMap[y][x]} </p>`;
        }
        before.innerHTML += '</br>';
    }

};