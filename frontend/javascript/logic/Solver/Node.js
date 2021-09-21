class Node {
    constructor(x, y, g, h, parent, inside){
        // this.parent = parent;
        this.position = {
            x: x,
            y: y,
        }
        this.g = g;
        this.h = h;
        this.inside = inside;
        this.parent = parent;
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")"
    }

    getFCost() {
        return this.g + this.h;
    }
}