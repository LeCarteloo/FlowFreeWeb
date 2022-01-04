module.exports = {
    makeid,
    validateData,
    validate2d,
}
  
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// TODO: Think about more ways to validate data 
// Validating the maps sent by user  
function validateData(startMap, currentMap, solvedColors) {
    
    // Validate if arrays are 2D
    if(!validate2d(startMap) && !validate2d(currentMap)) {
        return false;
    }

    // Check if both maps has the same size
    if(startMap.length != currentMap.length) {
        return false;
    }

    for (let y = 0; y < startMap.length; y++) {
        for (let x = 0; x < startMap.length; x++) {
            // Check if start and end points are placed correctly
            if(startMap[y][x] != 0) {
                if(startMap[y][x] != currentMap[y][x]) {
                    return false;
                }
            }
        }
    }

}

function validate2d(map) {
    return map.every(item => Array.isArray(item));
}