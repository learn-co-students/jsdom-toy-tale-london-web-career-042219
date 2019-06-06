const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const form = document.getElementsByClassName('add-toy-form') 
const newToyName = form[0][0]
const newToyImage = form[0][1]
const submitBtn = form[0][2]
const TOYS_URL = "http://localhost:3000/toys"

// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", initiPage)

function initiPage(){
  getToys()
  submitBtn.addEventListener("click", function submit(event){
    event.preventDefault()
    newToy()
  })
}

function getToys() {
  fetch(TOYS_URL)
  .then(function(response) {
      return response.json()
  })
  .then(function(object) {
      makeCards(object)
  })
}

function newToy() {
  let newToyNameInner = newToyName.value
  let newToyImageInner = newToyImage.value

  fetch(TOYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newToyNameInner,
      image: newToyImageInner,
      likes: 0
    })
  })
  .then(function(response) {
    return response.json()
  })
    .then(function(toy) {
      const toyCollection = document.getElementById('toy-collection')
      const newToy = document.createElement('div')
      toyCollection.appendChild(newToy)
      newToy.setAttribute('class', 'card')
      const toyName = document.createElement('h2')
      newToy.appendChild(toyName)
      toyName.innerHTML = toy.name 
      const toyImage = document.createElement('img')
      newToy.appendChild(toyImage)
      toyImage.setAttribute('src', toy.image)
      toyImage.setAttribute('class', 'toy-avatar')
      const toyLikes = document.createElement('p')
      newToy.appendChild(toyLikes)
      toyLikes.innerHTML = toy.likes 
      const toyButton = document.createElement('button')
      newToy.appendChild(toyButton)
      toyButton.setAttribute('class', 'like-btn')
      toyButton.innerHTML = 'Like'
  })
}

function makeCards(object) {
  const toys = object
  const toyCollection = document.getElementById('toy-collection')
  for(const toy of toys) {
    const newToy = document.createElement('div')
    toyCollection.appendChild(newToy)
    newToy.setAttribute('class', 'card')
    const toyName = document.createElement('h2')
    newToy.appendChild(toyName)
    toyName.innerHTML = toy.name 
    const toyImage = document.createElement('img')
    newToy.appendChild(toyImage)
    toyImage.setAttribute('src', toy.image)
    toyImage.setAttribute('class', 'toy-avatar')
    const toyLikes = document.createElement('p')
    newToy.appendChild(toyLikes)
    toyLikes.innerHTML = toy.likes 
    const toyButton = document.createElement('button')
    newToy.appendChild(toyButton)
    toyButton.setAttribute('class', 'like-btn')
    toyButton.innerHTML = 'Like'
    toyButton.addEventListener("click", function like(){
      const id = toy.id
      likeToy(newToy, id)
    })
  }
}


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

function likeToy(newToy, id){
  let currentLikes = newToy.querySelector('p').innerHTML
  currentLikes++
  fetch(`${TOYS_URL}/${id}`, {
    method: "PATCH",
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: currentLikes
    })
  })
  .then(function(response) {
      return response.json()
  })
  .then(function(toy) {
    newToy.querySelector('p').innerHTML = toy.likes
  })
}
// OR HERE!
