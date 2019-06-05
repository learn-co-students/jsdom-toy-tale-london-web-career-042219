const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyCollection = document.querySelector("#toy-collection")

// YOUR CODE HERE

function makeToy(toy) {
  ;
  const div = makeToyCard(toy);
  div.dataset.id = toy.id;
  toyCollection.appendChild(div); 
}

function makeToyCard(toy) {
  const div = document.createElement("div");
  div.className = "card";
  

  const h2 = document.createElement("h2")
  h2.textContent = toy.name;

  const img = document.createElement("img");
  img.className = "toy-avatar"
  img.src = toy.image;

  const p = document.createElement("p");
  p.className = `likes-amount${toy.id}`
  p.textContent = toy.likes;

  const button = document.createElement("button")
  button.className = "like-btn";
  button.textContent = "Like";
  button.dataset.id = toy.id;
  button.addEventListener("click", e => {
    const likesAmount = document.querySelector(`.likes-amount${e.target.dataset.id}`);
    let   likesNumber = Number(likesAmount.innerText);
    likesNumber++;
    updateToy(likesNumber, e.target.dataset.id).then(init);
  });


  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);

  return div;
}

function showToys(toyArray) {
  toyCollection.innerHTML = ""
  toyArray.map(toy => {
    makeToy(toy);
  });
}

const BASE_URL = "http://localhost:3000/toys";

function init() {
  fetch(BASE_URL)
    .then(data => data.json())
    .then(showToys);
}

init();


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

const form = document.querySelector("form");

function postToy(e) {
  e.preventDefault();
  const target = e.target;
  const toy = {
    name: target[0].value,
    image: target[1].value,
    likes: 0
  };

  createToy(toy)
    .then(toyData => toyData.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .then(toy => makeToy(toy));

  target.reset();
}

form.addEventListener("submit", postToy);

// OR HERE!

function createToy(toy) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  });
}

function updateToy(likes, id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  });
}
