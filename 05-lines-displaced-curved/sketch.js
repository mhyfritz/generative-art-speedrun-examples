const canvasSketch = require("canvas-sketch");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const numRows = 40;
const numCols = 40;

const margin = 10;
const sizeInner = size - 2 * margin;
const widthCell = sizeInner / numCols;
const heightCell = sizeInner / numRows;

function cap(x, max) {
  return x > max ? max : x;
}

const sketch = ({ canvas, context, width, height }) => {
  canvas.addEventListener("click", render);

  function render() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(margin, margin);
    context.strokeStyle = "black";
    for (let i = 0; i < numRows; i += 1) {
      const points = [];
      for (let j = 0; j < numCols; j += 1) {
        points.push({
          x: j * widthCell + widthCell / 2,
          y:
            heightCell / 2 +
            (Math.random() < 0.5 ? -1 : 1) *
              cap((i * j * 4) / (numRows * numCols), 1.4) *
              Math.floor(Math.random() * heightCell * 0.8)
        });
      }

      context.save();
      context.translate(0, i * heightCell);

      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let j = 1; j < numCols - 2; j += 1) {
        /*
          use points as control points and midpoint as end points to generate smooth curve
          https://stackoverflow.com/a/7058606
        */
        const xEnd = (points[j].x + points[j + 1].x) / 2;
        const yEnd = (points[j].y + points[j + 1].y) / 2;
        context.quadraticCurveTo(points[j].x, points[j].y, xEnd, yEnd);
      }
      context.quadraticCurveTo(
        points[numCols - 2].x,
        points[numCols - 2].y,
        points[numCols - 1].x,
        points[numCols - 1].y
      );

      context.stroke();
      context.restore();
    }
    context.restore();
  }

  return render;
};

canvasSketch(sketch, settings);
