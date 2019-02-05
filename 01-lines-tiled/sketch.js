const canvasSketch = require("canvas-sketch");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const numRows = 50;
const numCols = numRows;

const margin = 10;
const sizeInner = size - 2 * margin;
const widthCell = sizeInner / numCols;
const heightCell = sizeInner / numRows;

const sketch = ({ canvas, context, width, height }) => {
  canvas.addEventListener("click", render);

  function render() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(margin, margin);
    context.strokeStyle = "black";
    context.beginPath();
    for (let i = 0; i < numRows; i += 1) {
      for (let j = 0; j < numCols; j += 1) {
        context.save();
        context.translate(j * widthCell, i * heightCell);
        let x1, y1, x2, y2;
        if (Math.random() < 0.5) {
          [x1, y1, x2, y2] = [0, 0, widthCell, heightCell];
        } else {
          [x1, y1, x2, y2] = [widthCell, 0, 0, heightCell];
        }
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.restore();
      }
    }
    context.stroke();
    context.closePath();
    context.restore();
  }

  return render;
};

canvasSketch(sketch, settings);
