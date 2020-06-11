let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys();
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', (e) => {
        e.preventDefault()
        createToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const getToys = () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(toy => {
    renderToys(toy)
  }))
}

const renderToys = (toy) => {
  const toysDiv = document.querySelector('#toy-collection');
  
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'card');
  
  const h2 = document.createElement('h2');
  h2.innerText = toy.name
  
  const img = document.createElement('img');
  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');
  
  const p = document.createElement('p');
  p.innerText = `${toy.likes} likes `
  
  const btn = document.createElement('button');
  btn.setAttribute('class', 'like-btn');
  btn.setAttribute('id', toy.id)
  btn.textContent = 'Like <3';
  btn.addEventListener('click', (e) => {
    updateLikes(e);
  })
  
  cardDiv.append(h2, img, p, btn);
  
  toysDiv.appendChild(cardDiv);
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

/*
When a user clicks on a toy's like button, two things should happen:

Conditional increase to the toy's like count without reloading the page

A patch request sent to the server at http://localhost:3000/toys/:id updating 
the number of likes that the specific toy has

Headers and body are provided below (If your request isn't working, 
make sure your header and keys match the documentation.)
*/

const updateLikes = (e) => {
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