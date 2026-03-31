"use strict";
const express = require("express");
const router = express.Router();
const jokecontroller = require('../controllers/jokeController');
// the routes needed to talk to the controller
router.get('/categories', jokecontroller.fetchAllCategories);
router.get('/category/:category', jokecontroller.fetchJokesByCategory);
router.get('/random', jokecontroller.getRandomJoke);
router.post('/joke/add', jokecontroller.createJoke);

module.exports = router;