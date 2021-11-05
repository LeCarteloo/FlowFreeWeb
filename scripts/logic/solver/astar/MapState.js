class MapState {
    constructor() {
        this.map = [];
        this.current = [];
        this.freeTiles = 0;
        this.finished = [];
        //TODO: Maybe add extra info about pipes
    }

    // Check if map is solved
    isFinished() {
        return this.freeTiles == 0;
    }
}