const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  myImg: {
    data: Buffer,
    contentType: String,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
