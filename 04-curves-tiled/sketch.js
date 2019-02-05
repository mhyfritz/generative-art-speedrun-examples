const canvasSketch = require("canvas-sketch");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const numRows = 30;
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

        if (Math.random() < 0.5) {
          context.moveTo(widthCell / 2, 0);
          context.quadraticCurveTo(
            widthCell / 2,
            heightCell / 2,
            widthCell,
            heightCell / 2
          );
          context.moveTo(0, heightCell / 2);
          context.quadraticCurveTo(
            widthCell / 2,
            heightCell / 2,
            widthCell / 2,
            heightCell
          );
        } else {
          context.moveTo(widthCell / 2, 0);
          context.quadraticCurveTo(
            widthCell / 2,
            heightCell / 2,
            0,
            heightCell / 2
          );
          context.moveTo(widthCell, heightCell / 2);
          context.quadraticCurveTo(
            widthCell / 2,
            heightCell / 2,
            widthCell / 2,
            heightCell
          );
        }
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
