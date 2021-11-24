// Dependencies
const UserModel = require("../models/User.js");
const { Router } = require("express");
const jwt = require("jsonwebtoken");

// Router
const userRoutes = Router();

// Authenticator MiddleWare Function
function checkJWTToken(req, res, next) {
  try {
    const authTokenDecodedData = jwt.verify(
      req.header("token"),
      "This is my secret key"
    );
    req.email = authTokenDecodedData.currentUser;
    next();
  } catch (err) {
    res.json({
      error: true,
      errorObj: err,
      message: "Invalid Token",
    });
  }
}

// Login
userRoutes.post("/login", async (req, res) => {
  try {
    const data = req.body;

    //validations
    if (!data.email || !data.password) {
      res.json({
        error: true,
        message: "Empty data",
      });
      return;
    }

    let response = await UserModel.find({ email: data.email });
    if (response.length == 0) {
      res.json({
        error: true,
        message: "User Does Not Exist!",
      });
      return;
    }

    if (data.password == response[0].password) {
      // Generate a token
      const secret = "This is my secret key";
      const jwtToken = jwt.sign({ currentUser: data.email }, secret, {
        expiresIn: "10d",
      });

      res.json({
        error: false,
        message: "User Logged in Successfully!",
        token: jwtToken
      });
      return;
    }

    res.json({
      error: true,
      message: "Incorrect Password !",
    });
  } catch (err) {
    res.json({
      error: true,
      errorObj: err,
      message: "Unknown Error",
    });
  }
});

// Sign Up
userRoutes.post("/signup", async (req, res) => {
  try {
    // Textual Data
    const data = req.body;

    let response = await UserModel.find({ email: data.email });

    if (response.length != 0) {
      res.json({
        error: true,
        message: "User Already Exists",
      });
      return;
    }

    if (req.files) {
      // File Data (any type of file)
      const fileData = req.files.userImage; // userImage is the "name" of our file input field.

      // Making a unique Filename using md5 and actual name of the file when uploaded.
      const fileName = `${fileData.md5}-${fileData.name}`;

      // Path where the file is to be stored on the server.
      const filePath = `${__dirname}/../public/userImages/${fileName}`;

      // Saving the path/url of our file in text data
      data.imageURL = `/userImages/${fileName}`;

      // Moving the uploded file to the specified filePath
      fileData.mv(filePath);
    } else {
      data.imageURL = `/userImages/default.png`;
    }
    data.watchlist = [];
    // Inserting the Textual data in our mongodb Model
    const insertedData = await UserModel.create(data);

    // Sending Textual data as a response to successful submission of data
    res.status(201).send(insertedData);
  } catch (err) {
    res.send({
      error: true,
      errorObj: err,
    });
  }
});

// Get User's WatchList
userRoutes.get("/watchlist", checkJWTToken, async (req, res) => {
  let response = await UserModel.find({ email: req.email });
  res.send(response[0].watchlist);
});

// Add Movie To WatchList
userRoutes.patch("/watchlist/add", checkJWTToken, async (req, res) => {
  let response = await UserModel.updateOne(
    { email: req.email },
    { $addToSet: { watchlist: [req.body.movie_id] } }
  );
  res.send(response);
});

// Remove Movie From WatchList
userRoutes.patch("/watchlist/remove", checkJWTToken, async (req, res) => {
  let response = await UserModel.updateOne(
    { email: req.email },
    { $pull: { watchlist: req.body.movie_id } }
  );
  res.send(response);
});

module.exports = userRoutes;
