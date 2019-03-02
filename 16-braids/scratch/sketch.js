const canvasSketch = require("canvas-sketch");

const size = 600;

const settings = {
  dimensions: [size, size]
};

const sketch = ({ canvas, context, width, height }) => {
  canvas.addEventListener("click", render);

  function render() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "black";
    context.lineCap = "round";
    context.lineWidth = 25;
    const p = Math.random();
    if (p < 1 / 3) {
      context.beginPath();
      context.strokeStyle = "lavender";
      context.moveTo(width * 0.25, 0);
      context.lineTo(width * 0.25, height);
      context.stroke();

      context.beginPath();
      context.strokeStyle = "lightpink";
      context.moveTo(width * 0.75, 0);
      context.lineTo(width * 0.75, height);
      context.stroke();
    } else if (p < 2 / 3) {
      context.beginPath();
      context.strokeStyle = "lavender";
      context.moveTo(width * 0.25, 0);
      context.lineTo(width * 0.25, height * 0.2);
      context.bezierCurveTo(
        width * 0.25,
        height * 0.6,
        width * 0.75,
        height * 0.4,
        width * 0.75,
        height * 0.8
      );
      context.lineTo(width * 0.75, height);
      context.stroke();

      context.beginPath();
      context.strokeStyle = "lightpink";
      context.moveTo(width * 0.75, 0);
      context.lineTo(width * 0.75, height * 0.2);
      context.bezierCurveTo(
        width * 0.75,
        height * 0.6,
        width * 0.25,
        height * 0.4,
        width * 0.25,
        height * 0.8
      );
      context.lineTo(width * 0.25, height);
      context.stroke();
    } else {
      context.beginPath();
      context.strokeStyle = "lightpink";
      context.moveTo(width * 0.75, 0);
      context.lineTo(width * 0.75, height * 0.2);
      context.bezierCurveTo(
        width * 0.75,
        height * 0.6,
        width * 0.25,
        height * 0.4,
        width * 0.25,
        height * 0.8
      );
      context.lineTo(width * 0.25, height);
      context.stroke();

      context.beginPath();
      context.strokeStyle = "lavender";
      context.moveTo(width * 0.25, 0);
      context.lineTo(width * 0.25, height * 0.2);
      context.bezierCurveTo(
        width * 0.25,
        height * 0.6,
        width * 0.75,
        height * 0.4,
        width * 0.75,
        height * 0.8
      );
      context.lineTo(width * 0.75, height);
      context.stroke();
    }
  }

  return render;
};

canvasSketch(sketch, settings);
