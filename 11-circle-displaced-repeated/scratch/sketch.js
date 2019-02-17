const canvasSketch = require("canvas-sketch");
const random = require("random");

const size = 600;

const settings = {
  animate: true,
  dimensions: [size, size],
  loop: false,
  totalFrames: 500
};

const numPoints = 8;
const margin = 10;

const sketch = ({ context, width, height }) => {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);
  const cx = size / 2;
  const cy = cx;
  const r = size / 4;
  const gap = (2 * Math.PI) / numPoints;

  context.lineWidth = 5;
  for (i = 0; i < numPoints; i += 1) {
    const angle = i * gap;
    const x = r * Math.cos(angle) + cx;
    const y = r * Math.sin(angle) + cy;
    context.beginPath();
    context.strokeStyle = "red";
    context.moveTo(cx, cy);
    context.lineTo(x, y);
    context.stroke();
  }

  context.beginPath();
  context.strokeStyle = "blue";
  context.arc(cx, cy, r, 0, 2 * Math.PI);
  context.stroke();

  function isInSegment(x, y) {
    const angle = Math.atan2(y - cy, x - cx);
    return angle > gap && angle < 2 * gap;
  }

  function render() {
    context.save();
    //context.translate(margin, margin);
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    context.beginPath();
    context.fillStyle = isInSegment(x, y) ? "black" : "#ccc";
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fill();
  }

  return render;
};

canvasSketch(sketch, settings);
