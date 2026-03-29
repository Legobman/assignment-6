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

document.getElementById("insertJoke").addEventListener("submit", addJoke);


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
    type.addEventListener("click", () => getJokesByCategory(element.category));
    types.appendChild(type);
  });
}

async function getJokesByCategory(category, limit){
  let url = MY_SERVER_BASEURL + "/category/" + category;
  if(limit){
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

async function addJoke(e) {
  e.preventDefault();

  const setup = document.getElementById("setup").value;
  const delivery = document.getElementById("delivery").value;
  const category = document.getElementById("category").value;

  try{
    const res = await fetch("/jokebook/joke/add", {
      method: "POST",
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({setup, delivery, category}),
    });

    if(!res.ok) {
      const eText = await res.text();
      throw new Error(eText)
    }

    await getJokesByCategory(category);
    
  } catch(err){
    console.error(err);
    alert("add joke failed")
  }
}