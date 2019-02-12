import canvasSketch from "canvas-sketch";
import { scaleLinear } from "d3-scale";

const size = 620;

const settings = {
  dimensions: [size, size]
};

const numRows = 30;
const numCols = 20;

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
    context.fillStyle = "black";
    context.fillRect(0, 0, sizeInner, sizeInner);
    context.strokeStyle = "white";
    context.lineWidth = 2;
    const center = Math.floor(numCols / 2);

    const y = scaleLinear()
      .domain([0, center])
      .range([heightCell, 0]);

    const maxOff = scaleLinear()
      .domain([0, center])
      .range([heightCell * 5, 0]);

    for (let i = 4; i < numRows; i += 1) {
      const points = [];
      for (let j = 0; j < numCols; j += 1) {
        const toCenter = Math.abs(center - j);
        points.push({
          x: j * widthCell + widthCell / 2,
          y:
            y(toCenter) -
            (Math.random() * maxOff(toCenter) * ((center - toCenter) * 2)) /
              (center * 2)
        });
      }

      context.save();
      context.translate(0, i * heightCell);

      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let j = 1; j < numCols - 2; j += 1) {
        /*
          use points as control points and midpoint as end points to generate smooth curve
          https://stackoverflow.com/a/7058606
        */
        const xEnd = (points[j].x + points[j + 1].x) / 2;
        const yEnd = (points[j].y + points[j + 1].y) / 2;
        context.quadraticCurveTo(points[j].x, points[j].y, xEnd, yEnd);
      }
      context.quadraticCurveTo(
        points[numCols - 2].x,
        points[numCols - 2].y,
        points[numCols - 1].x,
        points[numCols - 1].y
      );
      context.fillStyle = "black";
      context.fill();
      context.stroke();
      context.restore();
    }
    context.restore();
  }

  return render;
};

canvasSketch(sketch, settings);
