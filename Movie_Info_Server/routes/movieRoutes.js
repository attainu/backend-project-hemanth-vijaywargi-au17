// Dependencies
const MovieModel = require("../models/Movie.js");
const { Router } = require("express");
const axios = require("axios").default;

// Router
const movieRoutes = Router();

movieRoutes.get("/by_id", async (req, res) => {
  // Check if Movie Already Exists in Database
  let id = req.query.id;
  let db_response = await MovieModel.find({ IMDB_id: id });
  if (db_response.length !== 0) {
    res.json(db_response);
  } else {
    // Fetch Movie Details from TMDB API
    try {
      let movie_response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
      );
      let m = movie_response.data;
      let movieObj = {
        name: m.title,
        overview: m.overview || "",
        runtime: m.runtime + " mins" || "",
        poster_path: m.poster_path || "",
        backdrop_path: m.backdrop_path || "",
        release_date: m.release_date || "",
        adult: m.adult,
        TMDB_id: m.id,
        IMDB_id: m.imdb_id,
        genres: m.genres.map((genre) => {
          return genre.name;
        }),
        languages:
          m.spoken_languages.map((language) => {
            return language.english_name;
          }) || [],
        rating: m.vote_average || "",
        trailer_link: "",
        actors: [],
        directors: [],
        writers: [],
        tagline: m.tagline || "",
        production_companies:
          m.production_companies.map((company) => {
            return {
              name: company.name,
              logo_path: company.logo_path || "",
              origin_country: company.origin_country,
              id: company.id,
            };
          }) || [],
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
      if (full_cast !== undefined) {
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
      }
      let insertedData = await MovieModel.create(movieObj);
      res.json(insertedData);
    } catch (error) {
      res.json({
        error: true,
        errorObj: error,
      });
    }
  }
});

movieRoutes.get("/nowplaying", async (req, res) => {
  let response = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`
  );
  let movies = response.data.results;
  const promisesArray = movies.map((movie) => {
    let responsePromise = axios.get(
      `https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${process.env.TMDB_API_KEY}`
    );
    return responsePromise;
  });
  const responseData = await Promise.all(promisesArray);
  responseData.forEach((response, index) => {
    movies[index].imdb_id = response.data.imdb_id;
  });
  res.json(movies);
});

movieRoutes.get("/toprated", async (req, res) => {
  let response = await axios.get(
    "https://data-imdb1.p.rapidapi.com/movie/order/byRating/",
    {
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
      },
    }
  );
  res.json(response.data.results);
});

movieRoutes.get("/upcoming", async (req, res) => {
  let response = await axios.get(
    "https://data-imdb1.p.rapidapi.com/movie/order/upcoming/",
    {
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
      },
    }
  );
  res.json(response.data.results);
});

movieRoutes.get("/search", async (req, res) => {
  let query = req.query.query;
  let response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=1`
  );
  let movies = response.data.results;
  const promisesArray = movies.map((movie) => {
    let responsePromise = axios.get(
      `https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${process.env.TMDB_API_KEY}`
    );
    return responsePromise;
  });
  const responseData = await Promise.all(promisesArray);
  responseData.forEach((response, index) => {
    movies[index].IMDB_id = response.data.imdb_id;
  });
  res.json(movies);
});

module.exports = movieRoutes;
