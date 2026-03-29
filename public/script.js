//script.js
"use strict";
const MY_SERVER_BASEURL = "/jokebook";
window.onload = () => {
  getRandomJoke();
  getCategories();
}

document.getElementById("jokeSearch").addEventListener("click", (e) => {
  e.preventDefault();
  const category = document.getElementById("searchCategory").value;
  const limit = parseInt(document.getElementById("limit").value, 10);
  getJokesByCategory(category, limit);
});

async function getRandomJoke(){
  const res = await fetch(MY_SERVER_BASEURL + "/random");
  const joke = await res.json();

  const container = document.getElementById("randomJoke");
  const setup = document.createElement("p");
  const delivery = document.createElement("p");

  setup.textContent = joke.setup;
  delivery.textContent = joke.delivery;

  container.appendChild(setup);
  container.appendChild(delivery);
}

async function getCategories(){
  const res = await fetch(MY_SERVER_BASEURL + "/categories");
  const categories = await res.json();

  const types = document.getElementById("categoryTypes");
  categories.forEach(element => {
    const type = document.createElement("li");
    type.textContent = element.category;
    type.addEventListener("click", () => getJokesByCategory(element.category, 0));
    types.appendChild(type);
  });
}

async function getJokesByCategory(category, limit){
  let url = MY_SERVER_BASEURL + "/category/" + category;
  if(limit === 0 || limit === undefined){
    
  } else{
    url += "?limit=" + limit;
  }
  try{
    const res = await fetch(url);
    const jokes = await res.json();

    const jokeList = document.getElementById("jokeList");
    jokeList.textContent = "";
    jokes.forEach(element => {
      const joke = document.createElement("li");
      const setup = document.createElement("p");
      const delivery = document.createElement("p");
      setup.textContent = element.setup;
      delivery.textContent = element.delivery;

      joke.appendChild(setup);
      joke.appendChild(delivery);
      jokeList.appendChild(joke);
    });
  } catch(err){
    console.error(err);
    alert("Search failed");
  }
  
}
/*
(function () {
  const MY_SERVER_BASEURL = "/products";
  window.addEventListener("load", init);
  function init() {
    getProducts();
  }
  function getProducts() {
    let productsDiv = id("products-container");
    fetch(MY_SERVER_BASEURL + "/type/furniture")
      .then(checkStatus)
      .then((response) => {
        for (const item of response) {
          addParagraph(productsDiv, item);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }
  function addParagraph(productsDiv, productObject) {
    let article = document.createElement("article");
    let heading = document.createElement("h3");
    heading.appendChild(document.createTextNode(productObject.name));
    let para = document.createElement("p");
    para.appendChild(document.createTextNode("Type: " + productObject.type + ", Price: " + productObject.price));
    article.appendChild(heading);
    article.appendChild(para);
    productsDiv.appendChild(article);
  }
  //helper functions - place other functions above this line
  function id(idName) {
    return document.getElementById(idName);
  }
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response.json();
  }
})();
*/