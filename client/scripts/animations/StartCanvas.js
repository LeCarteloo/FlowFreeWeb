var t=1;
let canvas;
let context;

const TestColors = {
    "red": "red",
    "green": "green",
    "blue": "blue",
    "yellow": "yellow",
    "orange": "orange",
    "aqua": "aqua",
    "purple": "purple",
    "lime": "lime",
    M: "magenta",
    W: "white",
    D: "darkblue",
    S: "silver",
    C: "cyan",
};

window.onload = function () {
    canvas = document.getElementById('start-canvas');
    context = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // let points = [];
    // points.push({x:0,y:130});
    // points.push({x:canvas.width - 60,y:130});
    // points.push({x:canvas.width - 60,y:1500});

    // let positions = [];
    // positions.push([{x:canvas.width/2,y:canvas.height/2 - 55}, {x:canvas.width,y:canvas.height/2 - 55}])
    // positions.push([{x:canvas.width/2,y:canvas.height/2 - 55}, {x:0,y:canvas.height/2 - 55}])
    // positions.push([{x:canvas.width/2,y:canvas.height/2 - 55}, {x:canvas.width/2,y:0}])
    // positions.push([{x:canvas.width/2,y:canvas.height/2 - 55}, {x:canvas.width/2,y:canvas.height}])
    // positions.push([{x:canvas.width/2,y:canvas.height/2 - 55}, {x:canvas.width,y:canvas.height}])
    // positions.push([{x:canvas.width/2,y:canvas.height/2 - 55}, {x:0,y:canvas.height}])
    // positions.push([{x:canvas.width/2,y:canvas.height/2 - 55}, {x:canvas.width,y:0}])
    // positions.push([{x:canvas.width/2,y:canvas.height/2 - 55}, {x:0,y:0}])
    // buttonClickedAnimation(positions);

    // let path = new Path(1);
    // path.drawPath(points, "red", 120, 1, "round")
    
    // setTimeout(() => {
    //     let path1 = new Path(1);
    //     path1.drawPath(points, "#121212", 120, 1, "square");
    // }, 1000);


}

function buttonClickedAnimation(positions) {
    for (let i = 0; i < positions.length; i++) {
        let path = new Path(1);
        path.drawPath(positions[i], Object.keys(TestColors)[i], 120, 1, "round");

        setTimeout(() => {
            let path1 = new Path(1);
            path1.drawPath(positions[i], "#121212", 130, 1, "square");
        }, 1000);
    }
}

