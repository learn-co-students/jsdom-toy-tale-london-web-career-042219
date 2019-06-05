const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

const TOY_PATH = "http://localhost:3000/toys"

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

document.addEventListener("DOMContentLoaded", function(){
	
	const toyCollection = document.getElementById("toy-collection");
	
	//Get all the toys
	fetch(TOY_PATH)
		.then((response) => {
			return response.json();
		})
		.then((object) => {
			renderToys(object);
		})

	function createCard(toyObj) {
		const card = document.createElement("div");
		card.class = "card";
		card.dataset.id = toyObj.id;

		//name
		const name = document.createElement("h2");
		name.innerHTML = toyObj.name;
		card.appendChild(name);

		//picture
		const picture = document.createElement("img");
		picture.class = "toy-avatar";
		picture.src = toyObj.image;
		card.appendChild(picture);

		//likes
		const likes = document.createElement("p");
		likes.innerHTML = `${toyObj.likes} likes`;
		card.appendChild(likes);

		//button
		const button = document.createElement("button");
		button.class = "like-btn";
		button.innerHTML = "LIKE!";
		button.addEventListener("click", like);
		card.appendChild(button);
		
		toyCollection.appendChild(card);
	}
	
	function renderToys(object) {
		object.forEach((e) => {
			createCard(e);
		})
	}

	function update(toyObj, id){
		return fetch(`${TOY_PATH}/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(toyObj)
		})
			.then(() => {
				createCard(toyObj);
			});
	}

	function like(e) {
		card = e.target.parentNode;
		id = card.dataset.id;
		let obj = {};
		p = card.querySelector("p");
		let likes = parseInt(p.innerHTML.replace(" likes", ""), 10) + 1;
		obj.likes = likes;
		update(obj, id)
			.then(() => {
				p.innerHTML = `${likes} likes`;
			});
	}

	let addToyForm = document.querySelector(".add-toy-form");

	addToyForm.addEventListener("submit", (e) => {
		e.preventDefault();
		//Construct toy object
		let toy = {};
		toy.name = e.target[0].value;
		toy.image = e.target[1].value;
		toy.likes = 0;
		addToy(toy);
	});

	function addToy(toyObj) {
		fetch(TOY_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(toyObj)
		})
			.then(() => {
				createCard(toyObj);
			});
	}
});
