//server.js
// all of the elements that are required for these files to function and setting up the baseline.
"use strict";
const express = require("express");
const app = express();

require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const jokeRoutes = require("./routes/jokeRoutes");
app.use('/jokebook', jokeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server listening on port: " + PORT + "!");
});
