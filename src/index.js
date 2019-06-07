const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

const addToyForm = document.querySelector(".add-toy-form")
const toyNameInput = document.querySelector("input[name = 'name']");
const toyImageInput = document.querySelector("input[name = 'image']")
const toyCollection = document.querySelector("#toy-collection")
const toyURL = `http://localhost:3000/toys`


//This function fetches all toys
function getToys() {
  return fetch(toyURL)
  .then((response) => response.json())
}


function addToys(toys){
  toys.forEach((toy) => addToyCard(toy))

}

function addToyCard(toy) {
  const tr = document.createElement('tr')
   tr.innerHTML = `<div class="card">
                              <h2>${toy.name}</h2>
                              <img src = ${toy.image} class="toy-avatar" />
                              <p>${toy.likes} Likes </p>
                              <button class="like-btn">Like <3</button>
                            </div>`

  toyCollection.append(tr);


}

getToys().then((toys) => addToys(toys))


















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


// OR HERE!
