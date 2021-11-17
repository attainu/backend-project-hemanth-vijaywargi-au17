// Dependencies
const express = require("express");
const fileUpload = require("express-fileupload");

// Server
const app = express();
const port = process.env.PORT || 5000;

// MiddleWares
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Database
const dbHelper = require("./db.js");
dbHelper.dbInit();

// Routes
const userRoutes = require("./routes/userRoutes.js");
app.use('/user',userRoutes)
const movieRoutes = require('./routes/movieRoutes.js')
app.use('/movie',movieRoutes)

// Starting the Server
app.listen(port, () => {
  console.log(`app listening on port : ${port}`);
});


