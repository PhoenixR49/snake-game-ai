const fs = require("fs");
const path = require("path");
const brain = require("brain.js");

const networkOptions = {};
const net = new brain.NeuralNetwork(networkOptions);

const model = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/model.json")).toString("utf-8"),
);

net.fromJSON(model);

module.exports = net;
