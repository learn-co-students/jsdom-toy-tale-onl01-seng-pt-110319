
let addToy = false;

function createToyCard(toy){
  const toyCollection = document.querySelector("#toy-collection");
  let card=document.createElement("div");
  card.setAttribute("class","card");

  let h2=document.createElement("h2");
  h2.innerText=toy.name;

  let img=document.createElement("img");
  img.src=toy.image;
  img.setAttribute("class","toy-avatar");

  let p=document.createElement("p");
  p.innerText=`${toy.likes} like`;

  let button=document.createElement("button");
  button.innerText="Like";
  button.setAttribute("class","like-btn");
  button.setAttribute("id",toy.id);

  button.addEventListener("click", event=>{
    updateLikes(event);

  });

  card.append(h2,img,p,button);
  toyCollection.append(card);

};

function getToys(){
  fetch ("http://localhost:3000/toys")
  .then(function(response){
    return response.json();
  })
  .then(function(object){
    object.forEach(toy=> {
      createToyCard(toy);
    })
  });

};



function postToy(newToy) { 
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
      body: JSON.stringify({
        name: newToy.name,
        image: newToy.image,
        likes: 0
      })
})
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      console.log(object);
      createToyCard(object);
    })

  }

function updateLikes(e){
  e.preventDefault();
  let newNumber=parseInt(e.target.previousElementSibling.innerText)+1
  fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
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
    e.target.previousElementSibling.innerText=`${newNumber} likes`
  })
}

document.addEventListener("DOMContentLoaded", () => {
  getToys();

  let form=document.querySelector(".add-toy-form");

  form.addEventListener("submit",function(event){
    event.preventDefault();
    let newToy=Object.assign({},{name:event.target[0].value},{image: event.target[1].value})
    postToy(newToy);
  })

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
  });

});

