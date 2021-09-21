class Node {
    constructor(x, y, g, h, parent, value, state){
        this.position = {
            x: x,
            y: y,
        }
        this.g = g;
        this.h = h;
        this.parent = parent;
        
        //! For future work
        this.value = value;
        this.state = state;
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")"
    }

    getFCost() {
        return this.g + this.h;
    }
}