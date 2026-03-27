//server.js
"use strict";
const express = require("express");
const app = express();

require('dotenv').config();
// console.log(process.env);

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

/*
async function testDb() {
    let queryText = "INSERT INTO products ( name, type, price, description) VALUES ($1, $2, $3, $4) RETURNING *";
    let values = ['sample', 'apparel', 20.50, 'wide brimmed'];

    const result = await pool.query(queryText, values);
    console.log('result from inserting: ', result);
}
testDb();
*/

//http://localhost:3000/products/1
app.get("/products/:id", async function (req, res) {
  let id = req.params.id;
  if (id) {
    const queryText = "SELECT name, price FROM products where id= $1";
    const values = [id];
    try {
      const result = await pool.query(queryText, values);
      res.json(result.rows);
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Server error");
      return;
    }
  }
  else {
    res.status(400).send("Missing required id param!");
  }
});

//http://localhost:3000/products/type/furniture?price=100
app.get("/products/type/:type", async function (req, res) {
  let type = req.params.type;
  let price = req.query.price;
  if (type) {
    let values = [type];
    let queryText = "SELECT * FROM products where type= $1 ";

    if (price) {
      values.push(price);
      queryText += " AND price <= $2";
    }
    try {
      const result = await pool.query(queryText, values);
      res.json(result.rows);

    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
      return;
    }
  }
  else {
    res.status(400).send("Missing required type param!");
  }

});

//http://localhost:3000/products/add
app.post("/products/add", async function (req, res) {
  let name = req.body.name;
  let type = req.body.type;
  let price = req.body.price;
  let description = req.body.description;
  if (name && type && price && description) {
    let queryText = "INSERT INTO products ( name, type, price, description) VALUES ($1, $2, $3, $4) RETURNING *";
    let values = [name, type, price, description];
    try {
      const result = await pool.query(queryText, values);
      res.json(result.rows);
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Server error");
      return;
    }
  }
  else {
    res.status(400).send("Missing required param!");

  }});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server listening on port: " + PORT + "!");
});
