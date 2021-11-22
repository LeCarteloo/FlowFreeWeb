class Win {
    constructor() {
    }

    checkWin(map, solvedColors) {

        var filledCells = 0;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map.length; x++) {
                if(map[y][x] != 0) {
                    filledCells++;
                }
            }
        }

        return this.countPoints(filledCells, solvedColors);
    }
    //TODO: Better points counter needs to be wrote
    countPoints(filledCells, solvedColors) {

        return solvedColors.length * filledCells;
    }
}