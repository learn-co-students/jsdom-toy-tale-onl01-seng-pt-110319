
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toyCards();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyName = document.querySelector("input[name='name']");
  const toyImg = document.querySelector("input[name='image']")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const createToyBtn = document.querySelector("input[name='submit']")
  createToyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let toyNameValue = toyName.value
    let toyImgValue = toyImg.value
    submitToy(toyNameValue, toyImgValue);
  })
});

function toyCards() {
  const collection = document.getElementById('toy-collection');
  let card = document.createElement('div');
  card.setAttribute('class', 'card');

    fetch('http://localhost:3000/toys')
      .then(function(response) {
      return response.json();
      })
    .then(function(json) {
      let toy = json.map(function(t) {

        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        let h2 = document.createElement('h2')
        h2.innerHTML = t.name
        card.appendChild(h2)

        let img = document.createElement('img')
        img.src = t.image
        card.appendChild(img)

        let p = document.createElement('p')
        p.innerHTML = t.likes + " " + "likes"
        card.appendChild(p)

        let btn = document.createElement('button')
        btn.setAttribute('class', 'like-btn')
        btn.innerHTML = "Like"
        card.appendChild(btn)

          btn.addEventListener('click', (event) => {
            event.preventDefault();
            increaseLikes(t.likes, t.id).then(function(e) {
              fetch(`http://localhost:3000/toys/${t.id}`)
              .then(function(response) {
              return response.json();
              })
              .then(function(json) {
                p.innerHTML = json.likes + " " + "likes"
              })
            })

          })

        collection.appendChild(card)
    })
    });
}

function submitToy(inputName, inputImage) {

  let inputObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name: inputName,
        image: inputImage,
        likes: 0
      } )
    }

  return fetch('http://localhost:3000/toys', inputObject)

  .then(function(response) {
    return response.json
  })
  .then(function(json) {
    location.reload();
  })

}

function increaseLikes(inputLikes,toyId) {

    let inputObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        likes: inputLikes+1
      } )
    }

   return fetch(`http://localhost:3000/toys/${toyId}`, inputObject)

      .then(function(response) {
        return response.json
      })
      .then(function(json) {
        
      })

}

