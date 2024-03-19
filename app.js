const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const fs = require("fs");
const { randomUUID } = require("node:crypto");
const net = require("./src/ai");

const app = express();
const server = createServer(app);
const io = new Server(server);

const indexRouter = require("./routes/index");

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);

io.on("connection", async (socket) => {
  const roomID = socket.id;

  socket.join(roomID);

  socket.on(
    "direction_request",
    (snakeLength, snakeHeadX, snakeHeadY, foodX, foodY, fullSnakeXY) => {
      const fullSnakeSquareWidth = 1;
      const fullSnakeSquareHeight = 1;

      // fullSnakeXY[0].X;
      // fullSnakeXY[0].Y;

      // fullSnakeXY[fullSnakeXY.lenght - 1].Y;
      // fullSnakeXY[fullSnakeXY.lenght - 1].X;

      const data = {
        snakeLength,
        snakeHeadX,
        snakeHeadY,
        foodX,
        foodY,
        // fullSnakeXY,
        fullSnakeSquareWidth,
        fullSnakeSquareHeight,
      };

      const output = net.run(data);

      let maxValue = Number.NEGATIVE_INFINITY;
      let highestKey;

      for (const key in output) {
        if (output[key] > maxValue) {
          maxValue = output[key];
          highestKey = key;
        }
      }

      io.to(roomID).emit("direction_output", highestKey);
    },
  );

  socket.on("disconnect", () => {
    socket.leave("roomID");
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
