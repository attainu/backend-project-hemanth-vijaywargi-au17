const mongoose = require("mongoose");

// Schema
const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  runtime: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  adult: {
    type: Boolean,
    required: true,
  },
  TMDB_id: {
    type: String,
    required: true,
  },
  IMDB_id: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  trailer_link: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
  actors: {
    type: [Object],
  },
  directors: {
    type: [Object],
  },
  writers: {
    type: [Object],
  },
  budget: {
    type: String,
  },
  revenue: {
    type: String,
  },
  tagline:{
    type:String
  }
});

// Model
const MovieModel = mongoose.model("movie", MovieSchema);

module.exports = MovieModel;
