const canvasSketch = require("canvas-sketch");
const palettes = require("nice-color-palettes");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const numRows = 40;
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
    const colors = palettes[Math.floor(Math.random() * palettes.length)];
    for (let i = 0; i < numRows; i += 1) {
      for (let j = 0; j < numCols; j += 1) {
        context.save();
        context.translate(j * widthCell, i * heightCell);
        const shape = randomPickShape();
        const color = colors[Math.floor(Math.random() * colors.length)];
        shape(context, widthCell, heightCell, color);
        context.restore();
      }
    }
    context.restore();
  }

  return render;
};

canvasSketch(sketch, settings);

function randomPickShape() {
  const choices = [circle, squares, triangle];
  return choices[Math.floor(Math.random() * choices.length)];
}

function circle(context, width, height, color) {
  context.beginPath();
  context.arc(width / 2, height / 2, width * 0.35, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
}

function squares(context, width, height, color) {
  context.fillStyle = color;
  if (Math.random() < 0.5) {
    context.fillRect(0, 0, width / 2, height / 2);
    context.fillRect(width / 2, height / 2, width / 2, height / 2);
  } else {
    context.fillRect(width / 2, 0, width / 2, height / 2);
    context.fillRect(0, height / 2, width / 2, height / 2);
  }
}

function triangle(context, width, height, color) {
  context.fillStyle = color;
  context.strokeStyle = color;
  context.beginPath();
  if (Math.random() < 0.5) {
    context.moveTo(0, 0);
    context.lineTo(width, 0);
    context.lineTo(0, height);
  } else {
    context.moveTo(width, 0);
    context.lineTo(width, height);
    context.lineTo(0, height);
  }
  context.fill();
}
