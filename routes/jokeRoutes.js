"use strict";
const express = require("express");
const router = express.Router();
const jokecontroller = require('../controllers/jokeController');

router.get('/categories', jokecontroller.fetchAllCategories);
router.get('/category/:category', jokecontroller.fetchJokesByCategory);
router.get('/random', jokecontroller.getRandomJoke);
router.post('/joke/add', jokecontroller.createJoke);

module.exports = router;