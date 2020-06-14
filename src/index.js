let addToy = false;

// insertToys(allToys)
document.addEventListener("DOMContentLoaded", () => {
  getAllToys()

  // add all toys to index.html from the api database
  function getAllToys() {
    return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toy => {toy.forEach(toy => {
      let html = `
        <div class="card">
          <h2 class='toyName'>${toy.name}</h2>
          <img src="${toy.image}" width="200"/>
          <p>${toy.likes} likes!</p>
          <button>Like</button>
        </div>
      `
      if (toy.image) {
        document.querySelector("#toy-collection").insertAdjacentHTML("beforeend", html)
      }
    })})
         
  };
        
  // add new toys to database

  let configObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newHtml)
  };
  function newToy() {

    return fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
    
    .then(json => { (json)
      
        let newHtml = `
        <h3>Recently Added!</h3>
        <h2 class='toyName'>${newToy.name}</h2>
        <img src="${json.image}"/>
        <p>${json.likes} likes!</p>
        <button>Like</button>
        `
        // debugger
        document.querySelector("#new-toy-btn").insertAdjacentHTML("afterend", newHtml)
    })
      .catch((error) => {   // how to manage when fetch goes wrong
        alert("Nope! That wasn't it!"),
        document.body.innerHTML = error.message
      });
    }
  


  // Event Listeners
  const toyForm = document.querySelector(".container");
  toyForm.addEventListener('submit', s => { 
    s.preventDefault(),
    newToy();
  });
  document.addEventListener("click", (e) => {
    // hide & seek with the form
    if (e.target.matches("#new-toy-btn")) {
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = "block";
      } else {
        toyForm.style.display = "none";
      }
    }
  });

});
