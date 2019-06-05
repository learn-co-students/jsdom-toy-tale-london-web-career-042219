const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

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


// OR HERE!
const BASE_URL = "http://localhost:3000/toys"

// After the DOM has loaded, call the function that gets all of the toys
document.addEventListener("DOMContentLoaded", () => {
  getToys() // Get the toys and display them

  // add a submit event on the create a new toy form
  document.getElementsByClassName("add-toy-form")[0].addEventListener("submit", createToy )

});


// Create a function that gets all toys
// use fetch(url, config) using method='GET', 
// with the standard :headers  with Content-Type: application/json and Accept:applciation/jason
// no body for gets, as this gives an error
//
function getToys() {

  configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept":  "application/json"
    }
  }

    
  fetch( BASE_URL, configObj)
    .then(function(response) {
      return response.json();
    })
    .then( displayToys ); // this will render the toys

} // End of getToys() function


// Once the toys are loaded into an json object, create a function  that loops
// through each, creating the following elements,
// h2 toysname
// img with src with toys image, with class toy-avatar
// p tag with number of likes
// button with class like-btn <-- this will need an event listener to up the likes
  // <div class="card">
  //   <h2>Woody</h2>
  //   <img src=toy_image_url class="toy-avatar" />
  //   <p>4 Likes </p>
  //   <button class="like-btn">Like <3</button>
  // </div>

function displayToys( toysObject) {

  for (counter in toysObject) {
      renderToy( toysObject[counter])
    }
}

function renderToy( toyObject ) {

  let toyId = document.getElementById("toy-collection")

  let divId=document.createElement("DIV")
  divId.setAttribute("class","card")

  let h2Id=document.createElement("H2")
  let nameId=document.createElement("TEXT")
  nameId.innerHTML=toyObject["name"]
  h2Id.appendChild(nameId)
  divId.appendChild(h2Id)

  let imgId=document.createElement("IMG")
  imgId.setAttribute("class","toy-avatar")
  imgId.setAttribute("src",toyObject["image"])
  divId.appendChild(imgId)

  let pId=document.createElement("P")
  pId.innerHTML=toyObject['likes'] + " likes"
  divId.appendChild(pId)

  let btnId=document.createElement("button")
  btnId.setAttribute("class","like-btn")
  btnId.setAttribute("data-id",toyObject["id"])
  btnId.innerHTML="Like"
  divId.appendChild(btnId)

  // To allow for an increment to like, add a click listener here
  btnId.addEventListener('click', incrementClick)

  toyId.appendChild(divId)

}

// Increment the click
function incrementClick(event) {

  console.log(event)
  pId = event.target.parentNode.children[2] // So, the p is the 2nd element in the parents, children ...
  console.log(pId)
  let likesNum = pId.innerHTML.match(/[0-9]+/g)[0]
  likesNum = parseInt(likesNum) + 1
  console.log(likesNum)
  pId.innerHTML = likesNum + " likes"

  console.log( event.target.dataset.id )

  // Now update the database with the new clicks
  configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept":  "application/json"
    },
    body: JSON.stringify(  { "id": event.target.dataset.id,
                            "likes": likesNum })
  }
      
  fetch( BASE_URL + "/" + event.target.dataset.id , configObj)
    .then(function(response) {
      return response.json();
    })

}


// Create a new toy
function createToy(event) {
  event.preventDefault();
  newToy = {
    "name": document.getElementsByName("name")[0].value,
    "image": document.getElementsByName("image")[0].value,
    "likes": 0
  }

  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept":  "application/json"
    },
    body: JSON.stringify(newToy)
  }

  fetch( BASE_URL , configObj)
    .then(function(response) {
      return response.json();
    })
    .then( renderToy );

    document.getElementsByName("name")[0].value=""
    document.getElementsByName("image")[0].value=""
    toyForm.style.display = 'none' // Return to the original state
} // End creating a new toy