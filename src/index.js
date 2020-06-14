let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  
  const addbutton = document.querySelector("#new-toy-button");
  const toyFormContainer = document.querySelector(".container");
  addbutton.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', function(e){
        e.preventDefault()
        createToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(toy => {
    renderToys(toy)
  }))
}

function renderToys(toy){
  const toyCollect = document.querySelector('#toy-collection');
  
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'card');
  
  const h2 = document.createElement('h2');
  h2.innerText = toy.name
  
  const img = document.createElement('img');
  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');
  
  const p = document.createElement('p');
  p.innerText = `${toy.likes} likes `
  
  const button = document.createElement('button');
  button.setAttribute('class', 'like-button');
  button.setAttribute('id', toy.id)
  button.textContent = 'Like <3';
  button.addEventListener('click', function(e){
    updateLikes(e);
  })
  
  cardDiv.append(h2, img, p, button);
  
  toyCollect.appendChild(cardDiv);
}

const createToy = (toy) => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: toy.name.value,
      image: toy.image.value,
      likes: 0
    })
  })
  .then(res => res.json())
  .then((toy) => {
    console.log(toy);
    
    renderToys(toy);
  })
}

function updateLikes(e){
  e.preventDefault();
  let newNumber = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newNumber
    })
  })
  .then(function(response){
    response.json();
  })
  .then(function(object){
    e.target.previousElementSibling.innerText = `${newNumber} likes`
  })
}