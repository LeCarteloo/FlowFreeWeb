class Node {
    constructor(x, y, g, h, parent, value){
        this.position = {
            X: x,
            Y: y,
        }
        this.parent = parent;
        this.value = value;
        
        // Map state and number of free tiles
        this.mapState = new MapState();
        this.mapState.map = Map.map;
        this.mapState.freeTiles = Map.size ** 2 - Map.numberOfColors;

        // Current position of every point (later - of last moved pipe of each point)
        for (let i = 0; i < Map.numberOfColors; i++) {
            this.mapState.current[i] = Map.startPoint[i];
        }

        this.g = g;
        this.h = this.manhattan();
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

    toString() {
        // return this.mapState;
    }

    getFCost() {
        return this.g + this.h;
    }

    setHCost(value) {
        this.h = value;
    }
}