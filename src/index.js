let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

  fetch('http://localhost:3000/toys')
    .then(response=>response.json())
    .then(toys=>renderToys(toys));
  const createToyForm = document.querySelector("form.add-toy-form")
  createToyForm.submit.addEventListener("click",(event)=>{
    //addNewToy(createToyForm.elements['name'].value,createToyForm.elements['image'].value);
    event.preventDefault()
    fetch('http://localhost:3000/toys',{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
            "name": createToyForm.elements['name'].value,
            "image":createToyForm.elements['image'].value,
            "likes":0
          })
      })
      .then(response=>response.json())
      .then(toy=>{
        const collection = document.querySelector('#toy-collection');
        collection.appendChild(createToy(toy));
      })
        addToy = !addToy;
        toyFormContainer.style.display = "none";
        createToyForm.reset();
      })
      addLike();
  });



function renderToys(toys) {
  const collection = document.querySelector('#toy-collection');
  toys.forEach((toy) => {
    collection.appendChild(createToy(toy));
  });

}

function createToy(toy) {
  const toyCard=document.createElement('div');
  toyCard.className='card';
  toyCard.id = toy.id
  const h2=document.createElement('h2');
  h2.innerText=toy.name;
  const img=document.createElement('img');
  img.className='toy-avatar';
  img.src=toy.image;
  const likes=document.createElement('p');
  if (toy.likes === 0) {
    likes.innerText='No likes '
    }
    else if (toy.likes===1) {
    likes.innerText='1 like '
    }
    else {
      likes.innerText=`${toy.likes} likes `
    };
  const likeButton = document.createElement('button');
  likeButton.className='like-btn';
  likeButton.innerText='Like <3';
  toyCard.appendChild(h2);
  toyCard.appendChild(img);
  toyCard.appendChild(likes);
  toyCard.appendChild(likeButton);
  return toyCard;
};


function addLike() {
let collection = document.querySelector('#toy-collection');
collection.addEventListener('click', function (event) {
  if (event.target.className === 'like-btn') {
    let id=event.target.parentElement.id;
    let likesMsg=event.target.previousElementSibling;
    let likes = parseInt(likesMsg.innerText,10);
    if (isNaN(likes)) {
          likes=0;
        };
        likes++;
        //console.log(likes);
        if (likes === 0) {
          likesMsg.innerText='No likes '
          }
          else if (likes===1) {
          likesMsg.innerText='1 like '
          }
          else {
            likesMsg.innerText=`${likes} likes `
          };

        fetch(`http://localhost:3000/toys/${id}`,{
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
              },
              body: JSON.stringify({
                  "likes": likes // need to figure out how to updae
                })
            })
     }
   })
}
//likeButtons.forEach((like,index) => {
//    like.addEventListener('click',(event)=>{
//    let toyCard=collection.childNodes[index];
//    let likesMsg=toyCard.querySelector('p');
//  //  console.log(likesMsg.innerText);
//    let likes = parseInt(likesMsg.innerText,10);
//  //  console.log(isNaN(likes));
//    if (isNaN(likes)) {
//      likes=0;
//    };
//    likes++;
//    //console.log(likes);
//    if (likes === 0) {
//      likesMsg.innerText='No likes '
//      }
//      else if (likes===1) {
//      likesMsg.innerText='1 like '
//      }
//      else {
//        likesMsg.innerText=`${likes} likes `
//      };
//
//    fetch(`http://localhost:3000/toys/${index+1}`,{
//          method: "PATCH",
//          headers: {
//            "Content-Type":"application/json",
//            "Accept":"application/json"
//          },
//          body: JSON.stringify({
//              "likes": likes // need to figure out how to updae
//            })
//        })
// })
//})
