
# Snake Game AI

An AI built with [Brain.js](https://brain.js.org) that plays snake.

## Run Locally

### Installation

Clone the project

```bash
  git clone https://github.com/PhoenixR49/snake-game-ai
```

Go to the project directory

```bash
  cd snake-game-ai
```

Install dependencies

```bash
  npm install
```

### Start the server

```bash
  npm run start
```

### Training your own models

#### `process_snake_data.js`

This file converts the dataset's text data into JSON data that can be used in Brain.js.

This file is automatically executed during model training.

#### `trainer.js`

File used to train the model, manages how it will be trained.

To train the AI, you can run the command `npm run train` in the application folder.

See also [the Brain.js training](https://github.com/BrainJS/brain.js?tab=readme-ov-file#training).

#### `ai.js`

The main AI file. It loads the trained model from the `model.json` file located in the `data` folder.

> [!IMPORTANT]
> The AI is currently unable to know its body size, so the snake runs into itself. I'm currently looking for a way to use the `FullSnakeXY` data in the dataset so that it can be used. If anyone has any ideas on how to do this, please let me know in an issue or PR.

## Tech Stack

**Client:** [EJS](https://ejs.co/), [Socket.IO](https://socket.io)

**Server:** [Node](https://nodejs.org/), [Express](https://expressjs.com/), [Socket.IO](https://socket.io)

## Acknowledgements

- [Snake dataset](https://www.kaggle.com/datasets/ichabuddaeta/snake-data) by [Michael Vine](https://www.kaggle.com/ichabuddaeta)
- [Snake game](https://github.com/SpruceGabriela/snake-the-game) by [Gabriela Pinheiro](https://github.com/SpruceGabriela)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT](LICENSE)

See the original license [here](https://mit-license.org/).
