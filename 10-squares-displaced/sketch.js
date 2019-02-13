const canvasSketch = require("canvas-sketch");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const numRows = 10;
const numCols = numRows;

const margin = 20;
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
        context.translate(widthCell / 2, heightCell / 2);
        const off = (i + 1) / numRows;
        context.rotate(randomSign(Math.random() * (Math.PI / 10)) * off);
        context.translate(-widthCell / 2, -heightCell / 2);
        context.rect(0, 0, widthCell, heightCell);
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
