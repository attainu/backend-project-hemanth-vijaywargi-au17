// Dependencies
const MovieModel = require("../models/Movie.js");
const { Router } = require("express");
const axios = require("axios").default;

// Router
const movieRoutes = Router();

movieRoutes.get("/getby_tmdb_id", async (req, res) => {
  let tmdb = req.query.tmdb_id;
  let response = await MovieModel.find({ TMDB_id: tmdb });
  if (response.length != 0) {
    res.json(response);
  } else {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdb}?api_key=b5ace0ef9632f0269d0d8b57da2d3d6b`
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
      // Not Required
      trailer_link: "",
      actors: [],
      directors: [],
      writers:[],
      tagline: m.tagline,
    };

    // Get Movie Trailer
    let trailer_response = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdb}/videos?api_key=b5ace0ef9632f0269d0d8b57da2d3d6b`
    );
    let clips = trailer_response.data.results;
    let trailer_key = ""
    for (i in clips){
        if(clips[i].type==="Trailer"){
            trailer_key = clips[i].key
            break
        }
    }
    movieObj.trailer_link = trailer_key

    // Get Movie Cast
    let cast_response = await axios.get(`https://data-imdb1.p.rapidapi.com/movie/id/${movieObj.IMDB_id}/cast/`,{
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': '4755fe6f5cmshfce3fde01e42fb1p1efedfjsn26eda2ac8f76'
          }
    })

    // Full Cast Array
    let full_cast = cast_response.data.results.roles

    for (let i = 0; i < full_cast.length; i++) {
        let role = full_cast[i].role
        let actor_info = full_cast[i].actor
        let complete_info = {}
        complete_info.role = role;
        complete_info.actor_info = actor_info
        
        if(role==="Director"){
            movieObj.directors.push(actor_info)
        }
        else if(role==="Writer"){
            movieObj.writers.push(actor_info)
        }
        else{
            movieObj.actors.push(complete_info)
        }
        if(i===24){
            break;
        }
    }

    let insertedData = await MovieModel.create(movieObj);
    res.json(insertedData);
  }
});

module.exports = movieRoutes;
