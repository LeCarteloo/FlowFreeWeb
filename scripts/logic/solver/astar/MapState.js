class MapState {
    map;
    current;
    freeTiles;

    constructor() {
        this.map = [];
        this.current = [];
        this.freeTiles = 0;
    }

    setMapState(mapState) {
        this.map = mapState.map;
        this.current = mapState.current;
    }
}