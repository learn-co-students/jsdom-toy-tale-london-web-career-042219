
const formEl= document.querySelector('.add-toy-form');
const toyCollectionEl = document.querySelector('#toy-collection');


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let showAddToyForm = false

addBtn.addEventListener('click', () =>{
  //hide & seek with the form
  showAddToyForm = !showAddToyForm
  if (showAddToyForm){
    toyForm.style.display ='block'
    // submit listener here
    }else{
    toyForm.style.display = 'none'

    }
})


//add a single toy to the page
  function addToy(toy){
    const toyDiv = document.createElement("div");
    toyDiv.className = "card";
    toyDiv.innerHTML = `

    <H2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p class="likes">${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button> `

    toyCollectionEl.append(toyDiv);  // putting a toy inside the DOM

    const likeBtn = toyDiv.querySelector('.like-btn')   //likeButton only can find inside toyDiv.innerHTML
    const likesEl = toyDiv.querySelector('.likes')

    likeBtn.addEventListener('click', ()=>{
      toy.likes++

      updateToy(toy)
        .then(toy =>likesEl.innerText = `${toy.likes} Likes`)
    })
    }



// add multiple toys to the page
 function addToys(toys){

   toys.forEach(toy =>addToy(toy))
   }


 // when click form submit to create a new toy
  function addNewToyListener(){
    formEl.addEventListener('submit', event =>{
      // event.target and formEl is the same thing 
      // target is what element to trigger this event, target is different everytime. in this case target is the form element.
       event.preventDefault(); // stop page of refreshing 

       // create a temp toy for addToy function
       const toy ={
         name: formEl.name.value,
         image: formEl.image.value,
         likes: 0
       }

       createToy(toy)
         .then(toy =>addToy(toy))

         formEl.reset()
     })
    }


 // do whatever you need to do when the page loads

    function init(){   // inside init(), everything want to show on the page when load the page
      getToys()
         .then(toys => addToys(toys))
         addNewToyListener()
         }

    init()









