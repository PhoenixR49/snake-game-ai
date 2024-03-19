const fs = require("fs");
const path = require("path");

const data = fs
  .readFileSync(path.join(__dirname, "../data/dataset.txt"))
  .toString("utf-8");

const lines = data.trim().split("\n").slice(1);

const states = [];

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  const elements = line.split(",");

  const snakeLength = parseInt(elements[2], 10);
  const snakeHeadX = Math.round((parseInt(elements[3], 10) / 26) * 15);
  const snakeHeadY = Math.round((parseInt(elements[4], 10) / 26) * 15);
  const foodX = Math.round((parseInt(elements[5], 10) / 26) * 15);
  const foodY = Math.round((parseInt(elements[6], 10) / 26) * 15);
  const snakeHeadDirection = elements[7];
  // const fullSnakeXY = JSON.parse(JSON.parse(elements.slice(9)));

  const state = {
    input: {
      snakeLength,
      snakeHeadX,
      snakeHeadY,
      foodX,
      foodY,
      // snakeEndX: fullSnakeXY[fullSnakeXY.length - 1].X,
      // snakeEndY: fullSnakeXY[fullSnakeXY.length - 1].Y,
    },
    output: {},
  };

  state.output[
    [...snakeHeadDirection].join("").charAt(0).toLowerCase() +
      [...snakeHeadDirection].join("").slice(1)
  ] = 1;

  states.push(state);
}

fs.writeFileSync(
  path.join(__dirname, "../data/dataset.json"),
  JSON.stringify(states),
);
