var t = 1;
let canvas;
let context;

const TestColors = {
  red: "red",
  green: "green",
  blue: "blue",
  yellow: "yellow",
  orange: "orange",
  aqua: "aqua",
  purple: "purple",
  lime: "lime",
  M: "magenta",
  W: "white",
  D: "darkblue",
  S: "silver",
  C: "cyan",
};
window.onload = function () {
  canvas = document.getElementById("start-canvas");
  context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  animate();
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let animFrom = { X: -700, Y: 130 };
let animTo = { X: -50, Y: 130 };
let animColor = "red";
let direction = "x";
let speed = 5;

function animate() {
  requestAnimationFrame(animate);

  context.clearRect(0, 0, canvas.width, canvas.height);

  if (
    (animFrom.X <= canvas.width + speed && direction == "x") ||
    (animFrom.Y <= canvas.height + speed && direction == "y")
  ) {
    context.beginPath();
    context.globalAlpha = 1;
    context.strokeStyle = animColor;
    context.lineCap = "round";
    context.lineWidth = 120 * 0.4;
    context.moveTo(animFrom.X, animFrom.Y);
    context.lineTo(animTo.X, animTo.Y);
    context.stroke();
    if (direction == "x") {
      animFrom.X += speed;
      animTo.X += speed;
    } else {
      animFrom.Y += speed;
      animTo.Y += speed;
    }
  } else {
    direction = Math.random() >= 0.5 ? "x" : "y";

    const randomColor = Math.floor(Math.random() * 12);
    animColor = Object.values(Colors)[randomColor];
    speed = Math.floor(Math.random() * 10) + 5;
    if (direction == "x") {
      const randomY = Math.floor(Math.random() * canvas.height) + 50;
      animFrom = { X: -700, Y: randomY };
      animTo = { X: -50, Y: randomY };
    } else {
      const randomX = Math.floor(Math.random() * canvas.width) + 50;
      animFrom = { X: randomX, Y: -500 };
      animTo = { X: randomX, Y: -50 };
    }
  }
}

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
