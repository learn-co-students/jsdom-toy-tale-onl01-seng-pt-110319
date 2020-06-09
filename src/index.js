let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  fetchToys();

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    if (document.getElementById('new-toy-btn').clicked == true) {
      toyForm()
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
  let div = document.getElementById("toy-collection")
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
        button.className = 'like-btn'
        button.innerHTML = "Like <3"
        card.appendChild(button)

      div.appendChild(card)
  })
}

function toyForm() {
    
      let newToy = {
        name: document.getElementsByName("name"),
        image: document.getElementsByName("image")
      }

      console.log(newToy)
    
      let configObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newToy)
      };

      return fetch("http://localhost:3000/toys", configObject)
        .then(function(response){
          return response.json();
        })
        .then(function(object) {
          console.log(object);
        })

}