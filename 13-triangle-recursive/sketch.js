const canvasSketch = require("canvas-sketch");
const random = require("random");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const margin = 60;
const sizeInner = size - 2 * margin;

const maxLevel = 3;
const repeat = 20;

const sketch = ({ canvas, context, width, height }) => {
  canvas.addEventListener("click", render);

  function render() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(margin, margin);
    draw(
      context,
      { x: sizeInner / 2 + off1(), y: 0 + off1() },
      { x: 0 + off1(), y: sizeInner + off1() },
      { x: sizeInner + off1(), y: sizeInner + off1() },
      1,
      maxLevel
    );
    context.restore();
  }

  return render;
};

canvasSketch(sketch, settings);

function draw(context, p1, p2, p3, level, maxLevel) {
  const midpoints = [
    {
      x: p2.x + (p3.x - p2.x) * 0.25 + off1(),
      y: p1.y + (p2.y - p1.y) / 2 + off1()
    },
    {
      x: p2.x + (p3.x - p2.x) * 0.75 + off1(),
      y: p1.y + (p2.y - p1.y) / 2 + off1()
    },
    { x: p2.x + (p3.x - p2.x) * 0.5 + off1(), y: p2.y + off1() }
  ];

  if (level === maxLevel) {
    triangle(context, p1, midpoints[0], midpoints[1]);
    triangle(context, midpoints[0], p2, midpoints[2]);
    triangle(context, midpoints[1], midpoints[2], p3);
    for (i = 0; i < repeat; i += 1) {
      triangle(
        context,
        { x: p1.x + off2(), y: p1.y + off2() },
        { x: midpoints[0].x + off2(), y: midpoints[0].y + off2() },
        { x: midpoints[1].x + off2(), y: midpoints[1].y + off2() }
      );
      triangle(
        context,
        { x: midpoints[0].x + off2(), y: midpoints[0].y + off2() },
        { x: p2.x + off2(), y: p2.y + off2() },
        { x: midpoints[2].x + off2(), y: midpoints[2].y + off2() }
      );
      triangle(
        context,
        { x: midpoints[1].x + off2(), y: midpoints[1].y + off2() },
        { x: midpoints[2].x + off2(), y: midpoints[2].y + off2() },
        { x: p3.x + off2(), y: p3.y + off2() }
      );
    }
    return;
  }

  draw(context, p1, midpoints[0], midpoints[1], level + 1, maxLevel);
  draw(context, midpoints[0], p2, midpoints[2], level + 1, maxLevel);
  draw(context, midpoints[1], midpoints[2], p3, level + 1, maxLevel);
}

function triangle(context, p1, p2, p3) {
  context.beginPath();
  context.strokeStyle = "rgba(0,0,0,0.25)";
  context.lineWidth = 2;
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
  context.stroke();
}

function off1() {
  return random.normal(0, 8)();
}

function off2() {
  return random.normal(0, 4)();
}
