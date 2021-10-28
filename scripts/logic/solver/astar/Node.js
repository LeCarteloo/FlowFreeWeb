class Node {
    constructor(){
        //constructor(x, y, g, h, parent, value)
        // this.position = {
        //     X: x,
        //     Y: y,
        // }
        this.parent = null;
        // this.value = value;
        
        // Map state and number of free tiles
        this.mapState = new MapState();
        this.mapState.map = Map.map;
        this.mapState.freeTiles = Map.size ** 2 - Map.numberOfColors;

        // Current position of every point (later - of last moved pipe of each point)
        for (let i = 0; i < Map.numberOfColors; i++) {
            this.mapState.current[i] = Map.startPoint[i];
        }
        this.g = 0;
        this.h = this.manhattan();
        this.parent = null;
    }
    // A bit modified manhattan distance - it returns remaining free cells beetwen points.
    manhattan() {
        var manhValue = 0; 
        
        for (let i = 0; i < Map.numberOfColors; i++) {
            const curr = this.mapState.current[i];
            const end = Map.endPoint[i];
            manhValue += Math.abs(curr.X - end.X) + Math.abs(curr.Y - end.Y);
        }
        return manhValue;
    }

    //Check if point is finished
    isFinished() {
        return this.mapState.isFinished();
    }

    toString() {
        // return this.mapState;
    }

    getFCost() {
        return this.g + this.h;
    }

    setHCost(value) {
        this.h = value;
    }

    setCurrent(x, y, color) {
        this.mapState.current.splice(color, 1, {Y: y, X: x})
    }

    // Updating map state for given node
    updateMapState(color, position) {  
        this.mapState.map[position[0].To.Y][position[0].To.X] = Map.foundColors[color];
        Map.startPoint[color] = {Y: position[0].To.Y, X: position[0].To.X}
        this.mapState.freeTiles--;
        this.setCurrent(position[0].To.X, position[0].To.Y, color);
    }
}