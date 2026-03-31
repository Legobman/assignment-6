"use strict";
const pool = require('./dbConnection');

// All of the sql statements and queries needed for the functions to talk to the database
async function getCategories() {
    const queryText = "SELECT DISTINCT category FROM jokebook";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getJokesByCategory(category, limit) {
    let queryText = "SELECT setup, delivery FROM jokebook where category= $1";
    const values = [category];
    if(limit){
        queryText += " LIMIT $2";
        values.push(limit);
    } 
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function getRandomJoke() {
    const queryText = "SELECT setup, delivery FROM jokebook ORDER BY RANDOM() LIMIT 1";
    const result = await pool.query(queryText);
    return result.rows[0];
}

async function addJoke(setup, delivery, category) {
    let queryText = "INSERT INTO jokebook (setup, delivery, category) VALUES ($1, $2, $3)";
    let values = [setup, delivery, category];
    await pool.query(queryText, values);

    queryText = "SELECT setup, delivery FROM jokebook WHERE category = $1";
    values = [category];
    const result = await pool.query(queryText, values);
    return result.rows;
}

module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};
