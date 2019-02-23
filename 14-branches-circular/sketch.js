const canvasSketch = require("canvas-sketch");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const maxLineLen = 60;
const maxLevel = 8;
const maxBranchWidth = 4;
const n = 50;

const sketch = ({ canvas, context, width, height }) => {
  canvas.addEventListener("click", render);

  function render() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < n; i += 1) {
      const a = (i / n) * 2 * Math.PI + rand(-0.15, 0.15);
      branch(context, size / 2, size / 2, a, 1, maxLevel);
    }
    context.beginPath();
    context.arc(size / 2, size / 2, 35, 0, 2 * Math.PI);
    context.fillStyle = "rgb(50,50,50)";
    context.fill();
  }

  return render;
};

canvasSketch(sketch, settings);

function branch(context, x, y, a, level, maxLevel) {
  if (level > maxLevel) {
    return;
  }

  context.save();
  context.translate(x, y);
  context.rotate(a);

  context.beginPath();
  context.moveTo(0, 0);
  const len = -maxLineLen * ((maxLevel - level + 1) / maxLevel);
  const end = rand(len - 10, len + 10);
  context.lineTo(0, end);
  context.lineWidth = maxBranchWidth * ((maxLevel - level + 1) / maxLevel);
  context.lineCap = "round";
  context.strokeStyle = "rgb(50,50,50)";
  context.stroke();

  branch(context, 0, end, rand(-0.2, -0.15), level + 1, maxLevel);
  branch(context, 0, end, rand(0.15, 0.2), level + 1, maxLevel);

  context.restore();
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
