// Dependencies
require('dotenv').config()
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan")

// Server
const app = express();
const port = process.env.PORT;

// MiddleWares
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'));

// Database
const dbHelper = require("./db.js");
dbHelper.dbInit();

// Routes
const userRoutes = require("./routes/userRoutes.js");
app.use('/user',userRoutes)
const movieRoutes = require('./routes/movieRoutes.js')
app.use('/movie',movieRoutes)
const actorRoutes = require('./routes/actorRoutes.js')
app.use('/actor',actorRoutes)
app.use(express.static('public'))

// Starting the Server
app.listen(port, () => {
  console.log(`app listening on port : ${port}`);
});
