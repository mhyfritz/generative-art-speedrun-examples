const canvasSketch = require("canvas-sketch");
const palettes = require("nice-color-palettes");

const size = 620;

const settings = {
  dimensions: [size, size]
};

const numRows = 10;
const numCols = 20;

const margin = 20;
const sizeInner = size - 2 * margin;
const widthCell = sizeInner / numCols;
const heightCell = sizeInner / numRows;
const pCross = 0.5;

const sketch = ({ canvas, context, width, height }) => {
  canvas.addEventListener("click", render);

  function render() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(margin, margin);
    const colors = genColors();
    context.lineWidth = Math.floor(widthCell / 4);

    // keep track of previous row to avoid immediately "inversing" a crossing
    // cf. http://rectangleworld.com/blog/archives/733
    // 0: no crossing, 1: crossing "right-on-top" 2: crossing: "left-on-top"
    const states = new Array(numCols).fill(0);

    for (let i = 0; i < numRows; i += 1) {
      for (let j = 0; j < numCols; ) {
        context.save();
        context.translate(j * widthCell, i * heightCell);
        const r = Math.random();

        if (j === numCols - 1 || r > pCross) {
          line(
            context,
            widthCell * 0.5,
            0,
            widthCell * 0.5,
            heightCell,
            colors[j]
          );
          states[j] = 0;
          j += 1;
        } else {
          if (states[j] === 1) {
            crossing(
              context,
              widthCell * 0.5,
              0,
              widthCell * 1.5,
              heightCell,
              widthCell * 1.5,
              0,
              widthCell * 0.5,
              heightCell,
              colors[j],
              colors[j + 1]
            );
          } else if (states[j] === 2) {
            crossing(
              context,
              widthCell * 1.5,
              0,
              widthCell * 0.5,
              heightCell,
              widthCell * 0.5,
              0,
              widthCell * 1.5,
              heightCell,
              colors[j + 1],
              colors[j]
            );
          } else {
            if (Math.random() < 0.5) {
              crossing(
                context,
                widthCell * 0.5,
                0,
                widthCell * 1.5,
                heightCell,
                widthCell * 1.5,
                0,
                widthCell * 0.5,
                heightCell,
                colors[j],
                colors[j + 1]
              );
              states[j] = 1;
            } else {
              crossing(
                context,
                widthCell * 1.5,
                0,
                widthCell * 0.5,
                heightCell,
                widthCell * 0.5,
                0,
                widthCell * 1.5,
                heightCell,
                colors[j + 1],
                colors[j]
              );
              states[j] = 2;
            }
          }
          [colors[j], colors[j + 1]] = [colors[j + 1], colors[j]];
          j += 2;
        }
        context.restore();
      }
    }
    context.restore();
  }

  return render;
};

canvasSketch(sketch, settings);

function genColors() {
  const palette = palettes[Math.floor(Math.random() * palettes.length)];
  const colors = [];
  for (let i = 0; i < numCols; i += 1) {
    colors.push(palette[Math.floor(Math.random() * palette.length)]);
  }
  return colors;
}

function line(context, x1, y1, x2, y2, color) {
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function curve(context, x1, y1, x2, y2, color) {
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(x1, y1);
  const h = y2 - y1;
  context.lineTo(x1, y1 + h * 0.2);
  context.bezierCurveTo(x1, y1 + h * 0.6, x2, y1 + h * 0.4, x2, y1 + h * 0.8);
  context.lineTo(x2, y2);
  context.stroke();
}

function crossing(
  context,
  x1_1,
  y1_1,
  x1_2,
  y1_2,
  x2_1,
  y2_1,
  x2_2,
  y2_2,
  color1,
  color2
) {
  curve(context, x1_1, y1_1, x1_2, y1_2, color1);
  curve(context, x2_1, y2_1, x2_2, y2_2, color2);
}
