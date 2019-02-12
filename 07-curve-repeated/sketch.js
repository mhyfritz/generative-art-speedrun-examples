const canvasSketch = require("canvas-sketch");
const random = require("random");

const size = 620;

const settings = {
  animate: true,
  dimensions: [size, size],
  loop: false,
  totalFrames: 500
};

const numPoints = 21;
const margin = 10;
const sizeInner = size - 2 * margin;

const sketch = ({ context, width, height }) => {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);
  const gap = sizeInner / (numPoints - 1);
  const off = random.normal(0, sizeInner / 100);
  const points = [];
  for (let i = 0; i < numPoints; i += 1) {
    points.push({
      x: i * gap,
      y: sizeInner / 2 + off()
    });
  }

  function render() {
    context.save();
    context.translate(margin, margin);
    context.beginPath();
    context.strokeStyle = "rgba(30, 30, 30, 0.01)";
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < numPoints - 2; i += 1) {
      context.quadraticCurveTo(
        points[i].x,
        points[i].y,
        (points[i].x + points[i + 1].x) / 2,
        (points[i].y + points[i + 1].y) / 2
      );
    }
    context.quadraticCurveTo(
      points[numPoints - 2].x,
      points[numPoints - 2].y,
      points[numPoints - 1].x,
      points[numPoints - 1].y
    );
    context.stroke();
    context.restore();

    for (let i = 0; i < numPoints; i += 1) {
      const point = points[i];
      if (Math.random() < 0.1) {
        point.y += off();
      }
    }
  }

  return render;
};

canvasSketch(sketch, settings);
