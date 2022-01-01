class Path {
    constructor(counter) {
        this.counter = counter;
    }
    drawPath(points, color, width, alpha, lineCap) {
        const pts = this.createPath(points);
        this.animatePath(pts, color, width, alpha, lineCap);
    }

    createPath(points) {
        let positions = [];
        let pt0, pt1;
        let dx, dy, x, y;
        for (let i = 1; i < points.length; i++) {
            pt0 = points[i - 1];
            pt1 = points[i];
    
            dx = pt1.x - pt0.x;
            dy = pt1.y - pt0.y;
    
            for (let j = 0; j < 100; j++) {
                x = pt0.x + dx * j / 100;
                y = pt0.y + dy * j / 100;    
                positions.push({x: x, y: y});    
            }
        }
        return positions;
    }
    
    animatePath(positions, color, width, alpha, lineCap) {
        if(this.counter < positions.length-1){ 
            requestAnimationFrame( () => {
                this.animatePath(positions, color, width, alpha, lineCap);
            }); 
        }
        // draw a line segment from the last waypoint
        // to the current waypoint
        context.beginPath();
        context.globalAlpha = alpha;
        context.strokeStyle = color;
        context.lineCap = lineCap;
        context.lineWidth = width * 0.4;
        context.moveTo(positions[this.counter-1].x, positions[this.counter-1].y);
        context.lineTo(positions[this.counter].x, positions[this.counter].y);
        context.stroke();

        // increment "counter" to get the next position
        this.counter++;
    }
}