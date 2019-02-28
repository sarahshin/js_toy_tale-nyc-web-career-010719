const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyURL = "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")
const addToyForm = document.querySelector(".add-toy-form")
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded',function(){
  console.log('everything is loaded')

  fetch(toyURL)
  .then(response => response.json())
  .then(parsedJSON => {
    toys = parsedJSON
    parsedJSON.forEach(toy => {
      toyCollection.innerHTML += `
        <div class = "card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p data-id="numLikes">${toy.likes} Likes </p>
          <button data-id=${toy.id} class="like-btn">Like <3</button>
        </div>
      `
    })
  })

  //EVENT LISTENERS-------------------------------------------------------------
  addToyForm.addEventListener("submit", function(e){
    fetch(toyURL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: `${e.target.name.value}`,
        image: `${e.target.image.value}`,
        likes: 0
      })
    })
  })

  toyCollection.addEventListener("click", function(e){
    // console.log(e.target)

    if(e.target.tagName === "BUTTON"){
      var thisToy = toys.find(toy => toy.id == e.target.dataset.id)
      console.log(++thisToy.likes)
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: {
          likes: `${++thisToy.likes}`
        }
      })
      // .then(response => return response.json())
      // .then(console.log)
    }
  })
})

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
