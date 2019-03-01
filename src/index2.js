document.addEventListener("DOMContentLoaded",()=>{
//VARIABLES=====================================================================
  const toysURL = "http://localhost:3000/toys"
  const addBtn = document.querySelector("#new-toy-btn")
  const toyForm = document.querySelector(".container")
  const toyCollection = document.querySelector("#toy-collection")
  const addToyForm = document.querySelector(".add-toy-form")
  const newToyName = document.querySelector("#new-name")
  const newToyImg = document.querySelector("#new-image")

  let addToy = false
  let allToys = []

//CALLS=========================================================================
  fetchToys()

//EVENT LISTENERS===============================================================
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })

  addToyForm.addEventListener("submit", (e) => {
    // e.preventDefault()
    postFetch()
  })

  toyCollection.addEventListener("click", (e)=> {
    // console.log(e.target)
    if(e.target.tagName === "BUTTON"){
      let toyToLike = allToys.find(toy => toy.id == e.target.dataset.id)
      let updatedLikes = ++toyToLike.likes
      patchFetch(toyToLike,updatedLikes)
      e.target.previousElementSibling.innerHTML = updatedLikes + " Likes "
    }
  })

//FUNCTIONS=====================================================================
  function fetchToys(){
    fetch(toysURL)
    .then(res => res.json())
    .then(parsedJSON => {
      allToys = parsedJSON
      renderAllToys(parsedJSON)
    })
  }

  function postFetch(){
    fetch(toysURL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": newToyName.value,
        "image": newToyImg.value,
        "likes": 0
      })
    })
    // .then(res => res.json())
    // .then(console.log)
  }

  function patchFetch(toy,num){
    fetch(toysURL+"/"+`${toy.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": num
      })
    })
    .then(res => res.json())
    .then(console.log)
  }

  function renderToy(toy){
    toyCollection.innerHTML +=  `
    <div data-id=${toy.id} class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p data-id=${toy.id}>${toy.likes} Likes </p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
    </div>`
  }

  function renderAllToys(toys){
    toys.forEach(renderToy)
  }

  // function renderLikes(toy)
})
