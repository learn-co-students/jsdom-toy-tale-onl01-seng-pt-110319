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
    .then(toys=>renderToys(toys))
});


function renderToys(toys) {
  const collection = document.querySelector('#toy-collection')
  toys.forEach((toy) => {
    const toyCard=document.createElement('div');
    toyCard.className='card';
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
    collection.appendChild(toyCard);
  });

}
