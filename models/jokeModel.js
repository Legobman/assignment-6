"use strict";
const pool = require('./dbConnection');

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
    let queryText = "INSERT INTO jokebook (setup, delivery, category) VALUES ($1, $2, $3) RETURNING *";
    let values = [setup, delivery, category];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};

/*
async function getAllProducts() {
    const queryText = "SELECT * FROM products";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneProductById(id) {
    const queryText = "SELECT * FROM products where id= $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getProductsByType(params) {
    const queryText = "SELECT * FROM products where type= $1";
    if (params.length > 1) {
        queryText += " AND price <= $2";
    }
    const result = await pool.query(queryText, params);
    return result.rows;
}


async function deleteProduct(id) {
    let queryText = "DELETE FROM products WHERE id = $1 ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addProduct(name, type, price, description) {
    let queryText = "INSERT INTO products ( name, type, price, description) VALUES ($1, $2, $3, $4) RETURNING *";
    let values = [name, type, price, description];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}
module.exports = {
    getAllProducts,
    getOneProductById,
    getProductsByType,
    deleteProduct,
    addProduct
};
*/