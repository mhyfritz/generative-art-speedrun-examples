const canvasSketch = require("canvas-sketch");
const random = require("random");

const size = 620;

const settings = {
  animate: true,
  dimensions: [size, size],
  loop: false,
  totalFrames: 1000
};

const numPoints = 30;
const margin = 10;

const sketch = ({ context, width, height }) => {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  const cx = size / 2;
  const cy = cx;
  const r = size / 4;
  const gap = (2 * Math.PI) / numPoints;
  const off = random.normal(0, r / 6 / 3);

  const points = [];
  for (let i = 0; i < numPoints; i += 1) {
    const angle = i * gap;
    const x = r * Math.cos(angle) + cx;
    const y = r * Math.sin(angle) + cy;
    points.push({
      _angle: angle,
      x,
      y
    });
  }

  function angle(x, y) {
    const a = Math.atan2(y - cy, x - cx);
    return mod(a + 2 * Math.PI, 2 * Math.PI);
  }

  function render() {
    context.beginPath();
    context.strokeStyle = "white";
    context.lineWidth = margin;
    context.strokeRect(0, 0, size, size);
    //context.save();
    //context.translate(margin, margin);
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < numPoints - 1; i += 1) {
      context.quadraticCurveTo(
        points[i].x,
        points[i].y,
        (points[i].x + points[i + 1].x) / 2,
        (points[i].y + points[i + 1].y) / 2
      );
    }
    context.quadraticCurveTo(
      points[numPoints - 1].x,
      points[numPoints - 1].y,
      points[0].x,
      points[0].y
    );
    context.strokeStyle = "rgba(50, 50, 50, 0.04)";
    context.lineWidth = 1;
    context.stroke();
    //context.restore();

    for (let i = 0; i < numPoints; i += 1) {
      const point = points[i];
      if (Math.random() < 0.1) {
        const xNew = point.x + off();
        const yNew = point.y + off();
        const a = angle(xNew, yNew);
        let s = mod(point._angle - gap / 3, 2 * Math.PI);
        let e = mod(point._angle + gap / 3, 2 * Math.PI);
        if (i == 0 && (a > s || a < e)) {
          point.x = xNew;
          point.y = yNew;
        } else if (a > s && a < e) {
          point.x = xNew;
          point.y = yNew;
        }
      }
    }
  }

  return render;
};

canvasSketch(sketch, settings);

function mod(n, m) {
  return ((n % m) + m) % m;
}
