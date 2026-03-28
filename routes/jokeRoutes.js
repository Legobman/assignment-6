"use strict";
const express = require("express");
const router = express.Router();
const jokecontroller = require('../controllers/jokeController');

router.get('/categories', jokecontroller.fetchAllCategories);
router.get('/category/:category', jokecontroller.fetchJokesByCategory);
router.get('/random', jokecontroller.getRandomJoke);
router.post('/joke/add', jokecontroller.createJoke);

module.exports = router;
/*
router.get("/", productController.fetchAllProducts);
router.get("/:id", productController.fetchProductById);
router.get("/type/:type", productController.fetchProductsByType);
router.post("/", productController.createProduct);
router.delete("/:id", productController.removeProduct);
module.exports = router;
*/