const canvasSketch = require("canvas-sketch");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const numRows = 12;
const numCols = numRows;

const margin = 20;
const sizeInner = size - 2 * margin;
const widthCell = sizeInner / numCols;
const heightCell = sizeInner / numRows;

// north, northeast, east, ...
const directions = "n ne e se s sw w nw".split(" ");
const minLevels = 3;
const maxLevels = 6;

const sketch = ({ canvas, context, width, height }) => {
  canvas.addEventListener("click", render);

  function render() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(margin, margin);
    context.strokeStyle = "#555";
    context.lineWidth = 1.5;
    context.beginPath();
    for (let i = 0; i < numRows; i += 1) {
      for (let j = 0; j < numCols; j += 1) {
        context.save();
        context.translate(j * widthCell, i * heightCell);
        const numLevels =
          minLevels + Math.floor(Math.random() * (maxLevels + 1 - minLevels));
        const direction = randomPick(directions);
        drawSquare(context, widthCell, 1, numLevels, direction);
        context.restore();
      }
    }
    context.stroke();
    context.restore();
  }

  return render;
};

canvasSketch(sketch, settings);

function randomSign(x) {
  return Math.random() < 0.5 ? x : -x;
}

function drawSquare(context, size, level, maxLevel, direction = "") {
  if (level > maxLevel) {
    return;
  }
  const numSegments = 2 * maxLevel - 1;
  const gap = size / numSegments;
  const x = (level - 1) * gap;
  const y = x;
  const w = ((maxLevel - level) * 2 + 1) * gap;
  const h = w;

  let dx = 0;
  let dy = 0;

  if (direction.indexOf("n") >= 0) {
    dy += -(level - 1) * (gap / 2);
  }
  if (direction.indexOf("s") >= 0) {
    dy += (level - 1) * (gap / 2);
  }
  if (direction.indexOf("w") >= 0) {
    dx += -(level - 1) * (gap / 2);
  }
  if (direction.indexOf("e") >= 0) {
    dx += (level - 1) * (gap / 2);
  }

  context.translate(dx, dy);
  context.rect(x, y, w, h);
  context.translate(-dx, -dy);
  drawSquare(context, size, level + 1, maxLevel, direction);
}

function randomPick(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
