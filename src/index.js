let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        addNewToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});

function getToys(){
  fetch('http://localhost:3000/toys')
  .then(function(resp) {
    return resp.json();
  })
  .then(function(json){
    let toyList = json;
    addFetchToys(toyList);  
  })
}

function addFetchToys(toyList){
  const container = document.getElementById('toy-collection');
    for (const key of toyList) {
      container.append(toyInfo(key))
      
    }
}

function toyInfo(toy){
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card');
  
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
  let btn = document.createElement('button')
  btn.setAttribute('class', 'likes')
  btn.setAttribute('id', toy.id)
  btn.innerText = "Add Like"
  btn.addEventListener('click', (event) => {
    console.log(event.target.dataset);
    sendLike(event)
  })

  divCard.append(h2, img, p, btn)
  return divCard;
}

function sendLike(toy){
  toy.preventDefault()
  let newNum = parseInt(toy.target.previousElementSibling.innerText) + 1
  console.log(toy.target.id);
  let data = {
    "likes": newNum
  };
  configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  };
  fetch(`http://localhost:3000/toys/${toy.target.id}`, configObj)
  .then(function(response) {
    return response.json();
    })
    .then((like_obj => {
      toy.target.previousElementSibling.innerText = `${newNum} likes`;
    }))
    .catch(function(error) {
      alert("Likes Not Working");
      console.log(error.message);
    });

 
}
function addNewToy(toy){
  let formData = {
    name: toy.name.value,
    image: toy.image.value,
    likes: "0"
  }
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
    })
    .then(function(newToy){
      console.log(newToy)
    })
    .catch(function(error) {
      alert("New Toy Not Working");
      console.log(error.message);
    });
}