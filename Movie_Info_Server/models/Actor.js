const mongoose = require("mongoose");

// Schema
const ActorSchema = new mongoose.Schema({
  imdb_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
});

// Model
const ActorModel = mongoose.model("actor", ActorSchema);

module.exports = ActorModel;
