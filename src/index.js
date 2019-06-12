const addBtn = document.querySelector("#new-toy-btn");
const createBtn = document.querySelector("input[name= 'submit']");
let toyName = document.querySelector("input[name= 'name']");
let toyImg = document.querySelector("input[name= 'image']");
const toyForm = document.querySelector(".container"); //DO I need?
const form = document.querySelector(".add-toy-form"); //tested
let addToy = false;
const BASE_URL = `http://localhost:3000/toys/`;

let toyCollection = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", function() {
  console.log("The DOM has loaded");
  getToys();
});

function getToys() {
  //returns a Promise with the data
  toyCollection.innerHTML = "";
  return fetch(BASE_URL)
    .then(resp => resp.json())
    .then(object => {
      object.forEach(toy => displayToyCard(toy));
    });
}

function displayToyCard(toy) {
  let toyDiv = document.createElement("div");
  toyDiv.className = "card";
  let labelName = document.createElement("h2");
  let toyPic = document.createElement("img");
  let pTagLikes = document.createElement("p");
  let likeButton = document.createElement("button");

  labelName.innerText = toy.name;
  toyPic.src = toy.image;
  toyPic.className = "toy-avatar"; //not adding an attribute>!
  pTagLikes.innerText = toy.likes;
  pTagLikes.dataset.toyId = toy.id;
  likeButton.innerText = "Like <3";
  likeButton.className = "like-btn";

  toyDiv.append(labelName, toyPic, pTagLikes, likeButton);
  toyCollection.append(toyDiv);

  addLikeListener(toy, likeButton);
}

function addLikeListener(toy, likeButton) {
  likeButton.addEventListener("click", () => {
    event.preventDefault();
    addLike(toy);
    //debugger;
  });
}

function addLike(toy) {
  toy.likes += 1;

  fetch(BASE_URL + toy.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  });
  let like = document.querySelector(`p[data-toy-id = '${toy.id}']`);
  like.innerText = toy.likes;
  //getToys();
}

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here //WHHHYYYYY?
  } else {
    toyForm.style.display = "none";
  }
});
// MY CODE:
form.addEventListener("submit", addNewToy);

function addNewToy() {
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: toyName.value,
      image: toyImg.value,
      likes: 0
    })
  }); //.catch(error => console.error("Ahh! It's all gone Wonks!")); //not working
  //throw new Error("Network response was not ok."); // not working
  //then ...CATCH()!?
}
