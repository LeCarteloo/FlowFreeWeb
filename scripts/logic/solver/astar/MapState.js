class MapState {
    constructor() {
        this.map = [];
        this.current = [];
        this.freeTiles = 0;
        this.finished = false;
        //TODO: Maybe add extra info about pipes
    }

    // Check if map is solved
    isSolved() {
        return this.freeTiles == 0;
    }

    isFinished(color) {
        if(GameMap.finishedPoints.includes(color)) {
            return true;
        }
        return false;
    }
}