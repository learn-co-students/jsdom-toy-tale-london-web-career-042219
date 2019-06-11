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

function like(toyId, newLikes) {
  const options = {
    method: "PATCH",
    body: JSON.stringify({ likes: newLikes }),
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetch(`${BASE_URL}/${toyId}`, options);
}

function deleteToy(toy) {
  const toyId = toy.dataset.id;

  const options = {
    method: "DELETE"
  };

  return fetch(`${BASE_URL}/${toyId}`, options).then;
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
  return (
    fetch(BASE_URL)
      .then(resp => resp.json())
      // .then(orderByLikes)
      .then(parseToysFromDb)
  );
}

// function orderByLikes(toysArray) {
//   toysArray.sort()
// }

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
  div.className = "card";
  div.dataset.id = toy.id;

  const h2 = document.createElement("h2");
  h2.innerText = toy.name;
  div.appendChild(h2);

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";
  div.appendChild(img);

  const p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;
  div.appendChild(p);

  const btn = document.createElement("button");
  btn.class = "like-btn";
  btn.innerText = "Like";
  btn.addEventListener("click", e => {
    const toy = e.target.parentNode;
    const toyId = parseInt(toy.dataset.id, 10);

    const likes = toy.querySelector("p");
    const newLikes = parseInt(likes.innerText.replace(" likes", ""), 10) + 1;
    const likesText = newLikes.toString() + " likes";

    // toy.querySelector("p").innerText = likesText;
    like(toyId, newLikes).then(() => (likes.innerText = likesText));
  });
  div.appendChild(btn);

  const deleteBtn = document.createElement("button");
  deleteBtn.class = "like-btn";
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", e => {
    const toy = e.target.parentNode;
    deleteToy(toy).then(toy.remove());
  });
  div.appendChild(deleteBtn);

  return div;
}

init();
