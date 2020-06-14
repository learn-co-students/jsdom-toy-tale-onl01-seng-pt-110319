let addToy = false;

// insertToys(allToys)
document.addEventListener("DOMContentLoaded", () => {
  getAllToys()

  // add all toys to index.html from the api database
  function getAllToys() {
    return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach(toy => {
        let toyCard = `
          <div class="card">
            <h2 class='toyName'>${toy.name}</h2>
            <img src="${toy.image}" width="200"/>
            <p>${toy.likes} likes!</p>
            <button>Like</button>
          </div>
        `
        if (toy.image) {
          document.querySelector("#toy-collection").insertAdjacentHTML("beforeend", toyCard)
        }
      })
    })
         
  };
        
  // add new toys to database
  function newToy(toy) {
    let configObjPost = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "name": toy.name.value,
        "image": toy.image.value,
        "likes": 0
      })
    };

    return fetch('http://localhost:3000/toys', configObjPost)
    .then(resp => resp.json())
    .then(toy_param => { 
      
      let newHtml = `
      <h3>Recently Added!</h3>
      <h2 class='toyName'>${toy_param.name.value}</h2>
      <img src="${toy_param.image.value}"/>
      <p>${toy_param.likes.value} likes!</p>
      <button>Like</button>
      `
      debugger

      let newGuy = newHtml
      document.querySelector("#new-toy-btn").insertAdjacentHTML("afterend", newGuy)
        
    })
    .catch((error) => {   // how to manage when fetch goes wrong
      alert("Nope! That wasn't it!"),
      document.body.innerHTML = error.message
    })
  };
  
    // update likes
//     let configObjPatch = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
  
//       body: JSON.stringify({"likes": <new number></new>}
//       )
//     };

// function newLikes() {

//   return fetch('http://localhost:3000/toys/:id', configObjPatch)
//   .then(resp => resp.json)
//   .then(number => {
//     (number)
//     let newLikes = `
//     <p>${number.likes} likes!</p>
//     `
//   })
// };

  // Event Listeners
  const toyForm = document.querySelector(".container");
  toyForm.addEventListener('submit', s => { 
    s.preventDefault(),
    newToy();
  });
  document.addEventListener("click", (e) => {
    // hide & seek with the form
    if (e.target.matches("#new-toy-btn")) {
      addToy = true
      if (addToy) {
        toyForm.style.display = "block";
      } else {
        toyForm.style.display = "none";
      }
    }
  });

});
