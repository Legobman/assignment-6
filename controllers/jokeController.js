"use strict";
const model = require('../models/jokeModel');

async function fetchAllCategories(req,res) {
    try{
        const categories = await model.getCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchJokesByCategory(req, res) {
    const category = req.params.category;
    const limit = req.query.limit;
    let params;
    if (category) {
        try {
            const jokes = await model.getJokesByCategory(category, limit);
            res.json(jokes);
            // res.json(products);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required type param!");
    }
}

async function getRandomJoke(req, res){
    try {
        const joke = await model.getRandomJoke();
        res.json(joke);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function createJoke(req, res) {
    const {setup, delivery, category} = req.body;
    if (setup && delivery && category) {
        try {
            const newjoke = await model.addJoke(setup, delivery, category);
            // no need to render here since we are redirecting in the frontend
            res.status(201).json(newjoke);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required product fields!");
    }
}
module.exports = {
    fetchAllCategories,
    fetchJokesByCategory,
    getRandomJoke,
    createJoke
};