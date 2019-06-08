
  function renderAllToys(toys) {
    toys.forEach(toy => createToyCardAndAppendToTheDom(toy))
  }


  function fetchAndRenderNewToy() {

  fetch(baseURL, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      name: toyNameInput.value , 
      image: toyImageInput.value
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
  })
  .catch(function(error) {
    alert("Bad things! Ragnarők!");
    console.log(error.message);
  });

}


    submitNewToy.addEventListener('submit', )





    
document.body.onload = fetchAndRenderAllToys;
  





// OR HERE!
