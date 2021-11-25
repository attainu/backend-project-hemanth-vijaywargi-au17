// Dependencies
require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const { resolve } = require("path");

// Server
const app = express();
const PORT = process.env.PORT;

// MiddleWares
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

// Statically Serving Build Folder
const buildFolderPath = resolve(__dirname, "../Movie_Info_Frontend/build");
app.use(express.static(buildFolderPath));

// Database
require("./db.js").dbConnect();

// Routes
const userRoutes = require("./routes/userRoutes.js");
app.use("/user", userRoutes);
const movieRoutes = require("./routes/movieRoutes.js");
app.use("/movie", movieRoutes);
const actorRoutes = require("./routes/actorRoutes.js");
app.use("/actor", actorRoutes);

//React Router
app.get("*", (req, res) => {
  res.sendFile(`${buildFolderPath}/index.html`);
});

// Starting the Server
app.listen(PORT, () => {
  console.log(`app listening on port : ${PORT}`);
});
