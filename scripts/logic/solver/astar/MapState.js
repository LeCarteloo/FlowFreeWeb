class MapState {
    map;
    current;
    freeTiles;
    finished;

    constructor() {
        this.map = [];
        this.current = [];
        this.freeTiles = 0;
        this.finished = false;
    }

    setMapState(mapState) {
        this.map = mapState.map;
        this.current = mapState.current;
    }

    // Check if map is solved
    isFinished() {
        return this.freeTiles == 0;
    }
}