// ############ Game debug statics ############ //
class Debug {
    static gameDebugInfo(event, isOn) {
        
        if(!isOn) {
            return;
        }
    
        // Position of clicked rectangle and positon of square with the point (same color)
        end.innerHTML = `Clicked point position (Y, X): ${startPosition.Y}, ${startPosition.X} <br /> 
        End point position (Y, X): ${endPosition.Y}, ${endPosition.X}`;
    
        // True position of clicked rectangle, offset of the mouse (x, y) and full array of the current game map
        current.innerHTML = `True position of tile (Y, X):  ${Math.floor(event.offsetX / tileW) * tileW} 
        , ${Math.floor(event.offsetY / tileW) * tileW} <br /> Game map Array: `;
    
        // Priting out gameMap array to HTML div
        gameMapArray.innerHTML = "";
        for (var y = 0; y < mapLength; y++) {
            for (var x = 0; x < mapLength; x++) {
                gameMapArray.innerHTML += `<p style="display: inline-block; font-weight: bold; color:${Colors[gameMap[y][x].toUpperCase()]}">
                 ${gameMap[y][x]} </p>`;
            }
            gameMapArray.innerHTML += "<br />";
        }
    }
    
    static mouseOffset(moveEvent, isOn) {
        
        if(!isOn) {
            return;
        }
    
        // Mouse div showing current position of mouse when button is hold
        mouse.innerHTML = `Mouse position (Y: ${moveEvent.offsetY}, X: ${moveEvent.offsetX})` ;
    }
    
    static drawPosOfSquares(x, y, isOn) {
        
        if(!isOn) {
            return;
        }
    
        context.fillStyle = "#FFF";
        context.fillText(`(Y: ${y}, X: ${x} | Y:${y * tileW}, X: ${x * tileH})`, x * tileW, y * tileH + 10)
    }
    
    // ############ Algorithm debug statics ############ //

    static printMapState(elem, name) {
        console.groupCollapsed(`%c ${name}`, 'color: green;');
        for (let y = 0; y < GameMap.size ;y++) {
            console.log(elem.map[y].toString());
        }
        console.groupEnd();
    }
}
