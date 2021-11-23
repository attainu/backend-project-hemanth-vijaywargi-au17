const mongoose = require("mongoose");

// Schema
const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  overview: {
    type: String,
  },
  runtime: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  backdrop_path: {
    type: String,
  },
  release_date: {
    type: String,
  },
  adult: {
    type: Boolean,
  },
  TMDB_id: {
    type: String,
  },
  IMDB_id: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
  },
  trailer_link: {
    type: String,
  },
  languages: {
    type: [String],
  },
  rating: {
    type: Number,
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
  },
  production_companies:{
    type:[Object]
  }
});

// Model
const MovieModel = mongoose.model("movie", MovieSchema);

module.exports = MovieModel;
