class Node {
    constructor(x, y, g, h, parent, value, mapState){
        this.position = {
            x: x,
            y: y,
        }
        this.g = g;
        this.h = h;
        this.parent = parent;
        this.value = value;

        // Map state and current position of every point (or pipe)
        this.mapState = new MapState();
    }

    manhattan() {
        return;
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")"
    }

    getFCost() {
        return this.g + this.h;
    }

    setHCost(value) {
        this.h = value;
    }
}