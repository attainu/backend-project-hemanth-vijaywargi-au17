const ActorModel = require("../models/Actor.js");

const { Router } = require("express");
const axios = require("axios").default;

// Router
const actorRoutes = Router();

actorRoutes.get("/by_imdb_id", async (req, res) => {
  let id = req.query.imdb_id;
  let response = await ActorModel.find({ "imdb_id": id });

  if (response.length !== 0) {
    res.json(response);
  } else {
    try {
      const response = await axios.get(
        `https://data-imdb1.p.rapidapi.com/actor/id/${id}/`,
        {
          headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
          },
        }
      );

      let actorObj = {
        imdb_id: id,
        name: response.data.results.name,
        imageURL:
          response.data.results.image_url || "",
      };
      let insertedData = await ActorModel.create(actorObj);
      res.json(insertedData);
    } catch (err) {
      res.json({
        error: true,
        errorObj: err,
      });
    }
  }
});

module.exports = actorRoutes;
