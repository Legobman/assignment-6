//script.js
"use strict";
const MY_SERVER_BASEURL = "/jokebook";
// the funcations that are needed upon loading
window.onload = () => {
  getRandomJoke();
  getCategories();
}

// if the user uses the form to find jokes, fetch needed data and call the function
document.getElementById("jokeSearch").addEventListener("click", (e) => {
  e.preventDefault();
  const category = document.getElementById("searchCategory").value;
  const limit = parseInt(document.getElementById("limit").value, 10);
  getJokesByCategory(category, limit);
});
// the eventlistener for the button to call the addjoke function
document.getElementById("insertJoke").addEventListener("submit", addJoke);

/** @function getRandomJoke */
// function that fetches a random joke and build the elements to display that joke
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

/** @function getRandomJoke */
// function that displays the categories and assigns an event listner to display all the jokes of the category
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

/** @function getJokesByCategory */
// the function to display the jokes of a specific category, if called by the form there can be a limit to the number of jokes
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

/** @function addJoke */
// function to take what the user entered into the form and add it to the database.
// Then call the function to display all the jokes of the entered category to show that it worked.
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