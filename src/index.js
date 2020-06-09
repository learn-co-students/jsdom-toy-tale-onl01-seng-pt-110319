let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let div = document.getElementById("toy-collection");
//These are all of my global variables that I set.


document.addEventListener("DOMContentLoaded", () => {

  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  let div = document.getElementById("toy-collection");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", event => {
        event.preventDefault()
        postForm(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {

  fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      renderToys(json)
    })

}

function renderToys(toys) {
  let div = document.getElementById("toy-collection");
    toys.forEach(toy => {
      let card = document.createElement('div')
      card.className = "card"

        let h2 = document.createElement('h2')
        h2.innerHTML = toy.name
        card.appendChild(h2)

        let img = document.createElement('img')
        img.src = toy.image
        card.appendChild(img)

        let p = document.createElement('p')
        p.innerHTML = toy.likes
        card.appendChild(p)

        let button = document.createElement('button')

        button.addEventListener('click', (e) => {
          console.log(e.target.dataset);
          likes(e)
        })

        button.className = 'like-btn'
        button.innerHTML = "Like <3"
        card.appendChild(button)

      div.appendChild(card)
  })
}

function postForm(toys) {
  let div = document.getElementById("toy-collection");
    
      let configObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": toys.name.value,
          "image": toys.image.value,
          "likes": 0
        })
      };

      return fetch("http://localhost:3000/toys", configObject)
        .then(function(response){
          return response.json();
        })
        .then(function(object) {
          let newToy = renderToys(object)
          div.appendChild(newToy)
        })

}

function likes(e) {
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}