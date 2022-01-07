const Solver = require('../solver/Solver')
const LobbySettings = require('../LobbySettings')
const { workerData, parentPort } = require('worker_threads');
    
let result = worker(workerData);
parentPort.postMessage(result);

// Solving given map with moves done by user
function worker(workerData) {
    LobbySettings.canTouch = workerData.canTouch;
    let solver = new Solver(workerData.startMap);
    const result = solver.init({map: workerData.currentMap, solvedColors: workerData.solvedColors});
    LobbySettings.canTouch = false;

    return result;
}