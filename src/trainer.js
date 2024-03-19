const fs = require("fs");
const path = require("path");
const brain = require("brain.js");

const data = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "../data/dataset.json"))
    .toString("utf-8"),
);

const networkOptions = {
  inputSize: 5,
  hiddenLayers: [4],
  outputSize: 4,
};

const trainingOptions = {
  log: true,
  errorThresh: 0.149,
  // iterations: 3500,
  // timeout: 60 * 10 * 1000,
};

const crossValidate = new brain.CrossValidate(
  () => new brain.NeuralNetwork(networkOptions),
);

crossValidate.train(data, trainingOptions);

const net = crossValidate.toNeuralNetwork();

fs.writeFileSync(
  path.join(__dirname, `../public/img/network.svg`),
  brain.utilities.toSVG(net),
);
fs.writeFileSync(
  path.join(__dirname, "../data/model.json"),
  JSON.stringify(net.toJSON()),
);
