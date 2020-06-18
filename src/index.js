let addToy = false

// insertToys(allToys)
document.addEventListener("DOMContentLoaded", () => {
  // function toyList(toy) {
  //   let toyProperties = `
  //       <div class="card">
  //         <h2 class='toyName'>${toy.name}</h2>
  //         <img src="${toy.image}" width="200"/>
  //         <p>${toy.likes} likes!</p>
  //         <button class=${toy.id}>Like</button>
  //       </div>
  //     `
  //   document.querySelector('#toy-collection').insertAdjacentHTML('beforeend', toyProperties)
  // }
    
  // add all toys to index.html from the api database
  function getAllToys() {
    return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
  }

  getAllToys().then(toys => {
    toys.forEach(toy => {
      if (toy.image) {
        renderToys(toy)
      }
    })
  })
  
  // configure new toys for database

  function newToy(toy) {
    console.log('toyname', toy.name.value)
    let configNewToy = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "name": toy.name.value,
        "image": toy.image.value,
        "likes": 0
      })
    }

    // add new toys to database

    fetch('http://localhost:3000/toys', configNewToy)
      .then(resp => resp.json())
      .then((toy) => {
        console.log('toyis', toy)
        renderToys(toy)
      })
      .catch((error) => {   // how to manage when fetch goes wrong
        alert("Nope! That wasn't it!"),
        document.body.innerHTML = error.message
      })
  }

  function renderToys(toy) {
    let toyName = document.createElement('h2')
    toyName.innerText = toy.name

    let toyImg = document.createElement('img')
    toyImg.setAttribute('src', toy.image)
    toyImg.setAttribute('class', 'toy-image')

    let likes = document.createElement('p')
    likes.innerText = `${toy.likes} likes`

    let likeBtn = document.createElement('button')
    likeBtn.setAttribute('class', 'like-btn')
    likeBtn.setAttribute('id', toy.id)
    likeBtn.innerText = "like"
    likeBtn.addEventListener("click", (e) => {
      console.log('ya clicked')
      console.log(e.target.dataset)
      newLikes(e, likes)
    })

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(toyName, toyImg, likes, likeBtn)

    document.querySelector("#toy-collection").append(divCard)
  }
  
  // update likes
  function newLikes(e, likes) {
    e.preventDefault()
    let addLike = parseInt(likes.innerText) + 1
    
    let configLikes = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": addLike
      })
    }
    
    fetch(`http://localhost:3000/toys/${e.target.id}`, configLikes)
      .then(resp => resp.json)
      .then(like_value => {
        likes.innerText = `${addLike} likes`;
      })
  }


  // New Toy Like Button Event Listeners
  let toyForm = document.querySelector(".container")
  
  document.addEventListener("click", (e) => {

    if (e.target.matches("#new-toy-btn")) {
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = "block";
        toyForm.addEventListener('submit', (e) => { 
          e.preventDefault()
          newToy(e.target)
        })
      } 
      else {
        toyForm.style.display = "none";
      }
    }
  })
  
})
