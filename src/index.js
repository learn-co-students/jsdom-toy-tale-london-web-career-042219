document.addEventListener('DOMContentLoader', init)
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector("#toy-collection")
const toysUrl = "http://localhost:3000/toys/"
const addToyForm = document.querySelector(".add-toy-form")
addToyForm.addEventListener("submit", createToy)


// YOUR CODE HERE

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

function fetchToys () {
  return fetch(toysUrl)
    .then(response => response.json())
    .then(toysObject => renderToys(toysObject))
}

function renderToys(toysObject) {
  toysObject.forEach(toy => {
    renderToy(toy)
  })
}

function renderToy(toy) {
  
  let divToy = document.createElement("div");
    divToy.className = "card";
    let h2 = document.createElement("h2");
    let img = document.createElement("img");
    img.className = "toy-avatar"
    let paragraph = document.createElement("p");
    let button = document.createElement("button");
    button.className = "like-btn";
    h2.innerText = toy.name;
    img.src = toy.image;
    paragraph.innerText = toy.likes + " Likes";
    button.innerText = "Like <3"
    button.dataset.id = toy.id
    button.addEventListener('click', event => likes(event, toy, paragraph))

    divToy.append(h2, img, paragraph, button)
    toyCollection.append(divToy)
}

function createToy(event) {
  event.preventDefault();
  
  let newToy = {
    name: addToyForm.name.value,
    image: addToyForm.image.value,
    likes: 0
  };
  postToy(newToy).then(init)
//The toy info is inside the form. Get the infor from the form. 
// Fetch request POST with the values from the form inside the body of the request. When we get a response then we rerender the page. Call init again or take the response and just create one individual toy. 
// 
}

// Post a toy 
function postToy(toy) {
  return fetch(toysUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toy)
  })
}

function likes(event, toy, paragraph) {
  event.preventDefault();

  toy.likes++
  console.log(paragraph)
  paragraph.innerText = toy.likes + " Likes";

  return fetch(toysUrl + toy.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes 
    })
  })
}


function init() {
  fetchToys();
}

init()
// OR HERE!
