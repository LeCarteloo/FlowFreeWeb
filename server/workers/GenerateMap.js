const Generator = require('../generator/Generator');
const LobbySettings = require('../LobbySettings')
const { workerData, parentPort } = require('worker_threads');

let result = worker(workerData);
parentPort.postMessage(result);

// Generating maps with provided data
function worker(workerData) {
    LobbySettings.canTouch = workerData.canTouch;
    let generator = new Generator();
    let genMaps = generator.generateMap(
        parseInt(workerData.mapSize),
        parseInt(workerData.colorAmount), 
        parseInt(workerData.mapNumber)
    );
    LobbySettings.canTouch = false;
    return {maps: genMaps};
}