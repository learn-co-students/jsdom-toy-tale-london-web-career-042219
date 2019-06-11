const addBtn = document.querySelector("#new-toy-btn");
const createBtn = document.querySelector("input[name= 'submit']");
let toyName = document.querySelector("input[name= 'name']");
let toyImg = document.querySelector("input[name= 'image']");
const toyForm = document.querySelector(".container"); //DO I need?
const form = document.querySelector(".add-toy-form"); //tested
let addToy = false;

let toyCollection = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", function() {
  console.log("The DOM has loaded");
  getToys();
});

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

// MY CODE:
createBtn.addEventListener("submit", addNewToy(toyName.value, toyImg.value));

function addNewToy(toyName, toyImage) {
  fetch(" http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  });
  //then ...CATCH()!?
}

function getToys() {
  //returns a Promise with the data
  toyCollection.innerHTML = "";

  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(object => {
      console.log(object);

      object.forEach(toy => {
        console.log(toy.name);
        //make one of these for each toy
        toyCollection.innerHTML += `<div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} </p>
        <button class="like-btn">Like <3</button>
      </div>`;
      });
    });
}

function doStuff(things) {
  //what now?
}
