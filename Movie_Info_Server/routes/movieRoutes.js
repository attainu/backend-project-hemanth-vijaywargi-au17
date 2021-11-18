// Dependencies
const MovieModel = require("../models/Movie.js");
const { Router } = require("express");
const axios = require("axios").default;

// Router
const movieRoutes = Router();

movieRoutes.get("/by_id", async (req, res) => {
  let id = req.query.id;
  let key = (req.query.type==="imdb"? "IMDB_id" : "TMDB_id")
  let response = await MovieModel.find({ key : id });
  
  if (response.length != 0) {
    res.json(response);
  } else {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
    );
    let m = response.data;
    let movieObj = {
      name: m.title,
      overview: m.overview,
      runtime: m.runtime + " mins",
      poster_path: `https://image.tmdb.org/t/p/original${m.poster_path}`,
      backdrop_path: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
      release_date: m.release_date,
      adult: m.adult,
      TMDB_id: m.id,
      IMDB_id: m.imdb_id,
      genres: m.genres.map((genre) => {
        return genre.name;
      }),
      language: m.spoken_languages[0].english_name,
      rating: m.vote_average,
      // Not Marked as Required in Schema
      trailer_link: "",
      actors: [],
      directors: [],
      writers: [],
      tagline: m.tagline,
    };

    // Get Movie Trailer
    let trailer_response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
    );
    let clips = trailer_response.data.results;
    let trailer_key = "";
    for (i in clips) {
      if (clips[i].type === "Trailer") {
        trailer_key = clips[i].key;
        break;
      }
    }
    movieObj.trailer_link = trailer_key;

    // Get Movie Cast
    let cast_response = await axios.get(
      `https://data-imdb1.p.rapidapi.com/movie/id/${movieObj.IMDB_id}/cast/`,
      {
        headers: {
          "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
        },
      }
    );

    // Full Cast Array
    let full_cast = cast_response.data.results.roles;

    for (let i = 0; i < full_cast.length; i++) {
      let role = full_cast[i].role;
      let actor_info = full_cast[i].actor;
      let complete_info = {};
      complete_info.role = role;
      complete_info.actor_info = actor_info;

      if (role === "Director") {
        movieObj.directors.push(actor_info);
      } else if (role === "Writer") {
        movieObj.writers.push(actor_info);
      } else {
        movieObj.actors.push(complete_info);
      }
      if (i === 14) {
        break;
      }
    }

    let insertedData = await MovieModel.create(movieObj);
    res.json(insertedData);
  }
});

movieRoutes.get('/nowplaying',async(req,res)=>{
  let response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`)
  res.json(response.data.results)
})

movieRoutes.get('/toprated',async(req,res)=>{
  let response = await axios.get('https://data-imdb1.p.rapidapi.com/movie/order/byRating/',{
    headers: {
      'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
      'x-rapidapi-key': `${process.env.RAPID_API_KEY}`
    }
  })
  res.json(response.data.results)
})

movieRoutes.get('/upcoming',async(req,res)=>{
  let response = await axios.get('https://data-imdb1.p.rapidapi.com/movie/order/upcoming/',{
    headers: {
      'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
      'x-rapidapi-key': `${process.env.RAPID_API_KEY}`
    }
  })
  res.json(response.data.results)
})

movieRoutes.get('/search',async(req,res)=>{
  let query = req.query.query
  let response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=1`)
  res.json(response.data)
})

module.exports = movieRoutes;
