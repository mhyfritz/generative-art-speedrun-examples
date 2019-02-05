const canvasSketch = require("canvas-sketch");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const numRows = 40;
const numCols = 30;

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
      context.save();
      context.translate(0, i * heightCell);
      context.beginPath();
      context.moveTo(0, heightCell / 2);
      let yLast = heightCell / 2;
      for (let j = 0; j < numCols; j += 1) {
        const yNext =
          heightCell / 2 +
          (Math.random() < 0.5 ? -1 : 1) *
            // cap to value >1 to allow overlap / crossing of lines
            cap((i * j * 4) / (numRows * numCols), 1.4) *
            Math.floor(Math.random() * (heightCell * 0.5));

        const cp = {
          x: widthCell / 2,
          y: yLast + (yNext - yLast) * 2
        };
        context.quadraticCurveTo(cp.x, cp.y, widthCell, yNext);
        yLast = yNext;
        context.translate(widthCell, 0);
      }
      context.stroke();
      context.closePath();
      context.restore();
    }
    context.restore();
  }

  return render;
};

canvasSketch(sketch, settings);
