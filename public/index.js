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


const toyCollection = document.getElementById("toy-collection");

document.addEventListener("DOMContentLoaded", e => {
  const renderToy = toy => {
    const toyDiv = document.createElement("div");
    toyDiv.class = "card";
    toyDiv.id = toy.id
    const name = document.createElement("h2");
    name.innerText = toy.name;
    const image = document.createElement("img");
    image.src = toy.image;
    image.class = "toy-avatar";
    const likes = document.createElement("p");
    likes.value = toy.likes;
    likes.innerText = `${toy.likes} Likes`;
    const likeButton = document.createElement("button");
    likeButton.class = "like-btn";
    likeButton.innerText = "Like <3";
    toyDiv.append(name, image, likes, likeButton);
    toyCollection.appendChild(toyDiv);
  }


  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(resp => resp.forEach(renderToy))


  toyCollection.addEventListener("click", ({target}) => {
    target.class === "like-btn" && fetch("http://localhost:3000/toys/" + target.parentElement.id, {method: "PATCH", headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }, body: JSON.stringify({
      "likes": ++target.parentElement.querySelector("p").value
    })})
    .then(resp => resp.json())
    .then(resp => {
      const likes = document.querySelector(`[id='${resp.id}'] p`);
      likes.value = resp.likes;
      likes.innerText = `${resp.likes} Likes`;
  });
  })

  document.querySelector(".add-toy-form").addEventListener("submit", e => {
    e.preventDefault();
    const name = e.target[0].value;
    const url = e.target[1].value;
    const data = {
      "name": name,
      "image": url,
      "likes": 0
    };
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
    .then(renderToy);
  })
})
