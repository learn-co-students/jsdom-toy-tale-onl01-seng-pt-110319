let addToy = false;



function getToys() {
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(toys) {
    toys.forEach(function(toy) {
      createToyCard(toy)
    })
   
  })
  .catch(function(error) {
    console.log(error)
  })
}

function createToyCard(toy) {

    let newDiv = document.createElement('div')
    newDiv.classList.add('card')

      let getDiv = document.getElementById('toy-collection')
      // getDiv.classList.add('card');

      let toyName = document.createElement('h2')
      toyName.textContent = toy.name

      let imgTag = document.createElement("img")
      imgTag.setAttribute("src", toy.image);
      imgTag.setAttribute("class", "toy-avatar");
      // imgTag.textContent = toy.image

      let pTag = document.createElement('p')
      pTag.innerText = `${toy.likes} likes`

      let btnTag = document.createElement('button')
      btnTag.setAttribute("class", "like-btn");
      btnTag.setAttribute("id", toy.id)
      btnTag.innerText = "Like";
      btnTag.addEventListener("click", event => {
        addLikes(event);
      })

      newDiv.appendChild(toyName)
      newDiv.appendChild(imgTag)
      newDiv.appendChild(pTag)
      newDiv.appendChild(btnTag)

      getDiv.appendChild(newDiv)

}

function addNewToy(newName, newImage, newLike) {
  // console.log(newToy)

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      "name": newName,
      "image": newImage,
      likes: newLike
    })

    })

    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      createToyCard(object)
    })
    .catch(function(error) {
      console.log(error)
    })
  
}

function addLikes(e) {
  event.preventDefault();
    // dig through e, last sibling? inner text 
  // pass in e target id in the fetch
  // set likes to the new number
  // set the first task on line 58 == `${newNumber} likes

  // console.log(e.target.previousSibling.innerText)

  let newNum = parseInt(e.target.previousElementSibling.innerText) + 1

  
 

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      likes: newNum
    })

    })

    .then(function(response) {
      return response.json();
    })
    .then(function() {
      // console.log(object)
      e.target.previousElementSibling.innerText = `${newNum}`
    })
    .catch(function(error) {
      console.log(error)
    })
  
  }




document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getToys();
  addBtn.addEventListener("click", () => {
    addNewToy();
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
