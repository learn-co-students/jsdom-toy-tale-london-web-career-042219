document.addEventListener("DOMContentLoaded", function() {
  fetchThenRenderToys();
});

//////////////////////////////////

const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});

//////////////////////////////////

function fetchToys() {
  return fetch("http://localhost:3000/toys").then(response => response.json());
}

//////////////////////////////////

// This is the main toy div that holds the toy cards
const toyCollection = document.getElementById("toy-collection");

//////////////////////////////////

function makeToyCard(toy) {
  const div = document.createElement("div");
  div.className = "card";
  div.dataset.id = toy.id;

  const h2 = document.createElement("h2");
  h2.innerHTML = `${toy.name}`;
  div.appendChild(h2);

  const img = document.createElement("img");
  img.className = "toy-avatar";
  img.src = `${toy.image}`;
  div.appendChild(img);

  const p = document.createElement("p");
  p.innerHTML = `${toy.likes}`;
  div.appendChild(p);

  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerHTML = " ❤ ";
  button.dataset.id = toy.id;
  div.appendChild(button);
  button.addEventListener("click", postLikeUpdateToServer);
  return div;
}

//////////////////////////////////

function renderToys(json) {
  json.forEach(function(toy) {
    toyCollection.appendChild(makeToyCard(toy));
  });
}

//////////////////////////////////

function fetchThenRenderToys() {
  fetchToys().then(renderToys);
}

//////////////////////////////////

const form = document.querySelector("form");

function postToyToServer(event) {
  event.preventDefault();
  const inputText = document.querySelectorAll("input-text");
  const toyNameInput = document.getElementsByClassName("input-text")[0];
  const toyImageInput = document.getElementsByClassName("input-text")[1];
  const toy = {
    name: toyNameInput.value,
    image: toyImageInput.value,
    likes: "0"
  };
  createToy(toy);
  makeToyCard(toy);

  event.target.reset();
}

form.addEventListener("submit", postToyToServer);

function createToy(toy) {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  });
}

//////////////////////////////////

function postLikeUpdateToServer(e) {
  // e.preventDefault();
  let id = e.target.dataset.id;
  // console.log(e.target.parentElement.dataset.id);
  let currentLikes = parseInt(
    e.target.parentElement.childNodes[2].innerHTML,
    10
  );
  // let pLikes = e.target.parentElement.childNodes[2].innerHTML;
  // pLikes.innerHTML = currentLikes + 1;
  const likes = {
    likes: currentLikes + 1
  };
  updateLikes(likes, id);
}

function updateLikes(likes, id) {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(likes)
  });
}
