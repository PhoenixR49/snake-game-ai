const socket = io();

const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = "right";
const food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function createMap() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (i = 0; i < snake.length; i += 1) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

function update(nextDirection) {
  if (nextDirection === "left") {
    if (direction !== "right") {
      direction = "left";
    }
  } else if (nextDirection === "up") {
    if (direction !== "down") {
      direction = "up";
    }
  } else if (nextDirection === "right") {
    if (direction !== "left") {
      direction = "right";
    }
  } else if (nextDirection === "down") {
    if (direction !== "up") {
      direction = "down";
    }
  }
}

function startGame() {
  const scoreElement = document.getElementById("score");

  const score = snake.length - 1;

  scoreElement.innerHTML = `Score: ${score}`;

  if (snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction === "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction === "up") snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i += 1) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(game);
      setTimeout(() => {
        snake = [
          {
            x: 8 * box,
            y: 8 * box,
          },
        ];
        game = setInterval(startGame, 50);
      }, 1000);
      // alert("Game Over 😞\nMy AI isn't so strong after all...");
    }
  }

  createMap();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "right") snakeX += box;
  if (direction === "left") snakeX -= box;
  if (direction === "up") snakeY -= box;
  if (direction === "down") snakeY += box;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);

  const fullSnakeXY = [];

  for (let i = 0; i < snake.length; i += 1) {
    const element = snake[i];

    fullSnakeXY.push({
      X: element.x / 32,
      Y: element.y / 32,
    });
  }

  socket.emit(
    "direction_request",
    snake.length,
    newHead.x / 32,
    newHead.y / 32,
    food.x / 32,
    food.y / 32,
    fullSnakeXY,
  );

  socket.on("direction_output", (output) => {
    update(output);
  });
}

let game = setInterval(startGame, 50);
