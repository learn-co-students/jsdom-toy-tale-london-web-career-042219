//This is how you make sure that all the content is loaded on the page before anything 
//else on this doc happens
document.addEventListener("DOMContentLoaded", function () {


});
//This is where you want to house all of your constants that you would want to use later
//in other parts of your code. It makes use of DOM manipulation skills 
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const toyNameInput = document.querySelector("input[name='name']")
const toyImageInput = document.querySelector("input[name='image']")
const submitNewToy = document.querySelector("#submit-new-toy")
const baseURL = "http://localhost:3000/toys"
const button = document.createElement("button");
let addToy = false

//You'll want to add the function which will be called by your fetch request
//Here you'll work closely with the HTML file for display
//You'll be calling this function later when you write your get fetch request 

//Add one toy to the page
function createToyCardAndAppendToTheDom(toy) {
  const div = document.createElement("div");
  div.className = "card";
  const h2 = document.createElement("h2");
  h2.textContent = toy.name;
  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";
  const p = document.createElement("p");
  p.textContent = `${toy.likes} Likes`;
  const button = document.createElement("button");
  button.className = "like-btn";
  button.textContent = "Like <3";
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);
  toyCollection.appendChild(div);
  console.log(div)


   button.addEventListener('click', ()=> {
    p.textContent = `${toy.likes++} Likes`
    updateToyLike(toy)
    .then(toy => p.innerText = `${toy.likes} Likes`)
   })
}

//render each toy using our function
//add all toys to the page --> takes an array of toys
function renderAllToys(toys) {
  toys.forEach(toy => createToyCardAndAppendToTheDom(toy))
}

//pulls up the form 
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

//This is the fetch request which will get all of our toys and render them 

function fetchAndRenderAllToys() {
  return fetch(baseURL)
    .then(function (response) {
      return response.json()
    })
    .then(toys => {
      //this is where you want to be able to trigger the creation/addition of the toy cards
      //we want to call the createtoyandappend... function on each object you get from the book collection
      renderAllToys(toys)
    })
}

//our fetch request to post input field values to database 
//This is then used within the toyform event listner
const sendPostRequest = (url, object) => {
  return fetch(url, {
    method: "POST", 
    headers: {
      'content-type': 'application/JSON',
      'accept': "application/json"
    },
      body: JSON.stringify(object)
  })
}

//this is the event listener for the entire form  so that we can use 'enter' if needed

toyForm.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('form submitted')
  newToyObject = {}
  newToyObject.name = toyNameInput.value
  newToyObject.image = toyImageInput.value
  newToyObject.likes = 0
  sendPostRequest(baseURL, newToyObject);
  event.target.reset() 
})

//update the server about the like that is happening

function updateToyLike(toy) { 
  return fetch(baseURl + `/${toy.id}`, {
    method: "PATCH",
   headers: {
     "content-type" : 'application/JSON',
     Accept: 'application/JSON'
   }, 
  body:  JSON.stringify(toy) } )

}


document.body.onload = fetchAndRenderAllToys;