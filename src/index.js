const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const BASE_URL = "http://localhost:3000/toys";
let addToy = false;

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    toyForm.addEventListener("submit", newToy);
  } else {
    toyForm.style.display = "none";
  }
});

function likeBtn(e) {
  e.preventDefault();

  const toyId = e.target.parentNode.dataset.id;
  const toy = toyCollection.querySelector(`div[data-id='${toyId}']`);
  let likesText = toy.querySelector("p").innerText;
  const likes = parseInt(likesText.replace(" likes", ""), 10) + 1;

  likesText = likes.toString() + " likes";
  toy.querySelector("p").innerText = likesText;

  const options = {
    method: "PATCH",
    body: JSON.stringify({ likes: likes }),
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetch(`${BASE_URL}/${toyId}`, options);
}

function newToy(e) {
  e.preventDefault();
  const name = toyForm.querySelector("input[name=name]");
  const image = toyForm.querySelector("input[name=image]");
  const toy = { name: name.value, image: image.value, likes: 0 };
  e.target.reset();
  addToy = false;
  toyForm.style.display = "none";

  const options = {
    method: "POST",
    body: JSON.stringify(toy),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };

  return fetch(BASE_URL, options)
    .then(res => res.json())
    .then(addToyToDom)
    .catch(addErrorToDom);
}

function addErrorToDom(err) {
  document.body.append(err);
}

function init() {
  return fetch(BASE_URL)
    .then(resp => resp.json())
    .then(parseToysFromDb);
}

function parseToysFromDb(toys) {
  toys.forEach(toy => {
    addToyToDom(toy);
  });
}

function addToyToDom(toy) {
  const card = createToyCard(toy);
  toyCollection.appendChild(card);
}

function createToyCard(toy) {
  const div = document.createElement("div");
  div.class = "card";
  div.dataset.id = toy.id;

  const h2 = document.createElement("h2");
  h2.innerText = toy.name;
  div.appendChild(h2);

  const img = document.createElement("img");
  img.src = toy.image;
  img.height = 300;
  div.appendChild(img);

  const p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;
  div.appendChild(p);

  const btn = document.createElement("button", likeBtn);
  btn.class = "like-btn";
  btn.innerText = "Like";
  btn.addEventListener("click", likeBtn);
  div.appendChild(btn);

  const deleteBtn = document.createElement("button", deleteBtn);
  btn.class = "like-btn";
  btn.innerText = "Like";
  btn.addEventListener("click", deleteBtn);
  div.appendChild(btn);

  return div;
}

init();
