class Draw {
    static drawAfterGlow(point, gameMap, context, tileW, tileH) {
        for (var y = 0; y < gameMap.length; y++) {
            for (var x = 0; x < gameMap.length; x++) {
                if(gameMap[y][x].toUpperCase() == point) {
                    context.globalAlpha = 0.2;
                    context.fillStyle = Colors[point];
                    context.fillRect(x * tileW, y * tileW, tileW, tileH);
                    context.globalAlpha = 1.0;
                }
            }
        }
    }
}