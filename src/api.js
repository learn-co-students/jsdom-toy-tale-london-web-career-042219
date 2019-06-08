// server stuff goes here
const TOYS_URL = 'http://localhost:3000/toys'

// GET ALL THE TOYS: GET
function getToys () {
  return fetch(TOYS_URL)
    .then(resp => resp.json())
}

// ADD A TOY: POST
function createToy (toy) {
  return fetch(TOYS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

// LIKE A TOY: PATCH
function updateToy (toy) {
  return fetch(TOYS_URL + `/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}
