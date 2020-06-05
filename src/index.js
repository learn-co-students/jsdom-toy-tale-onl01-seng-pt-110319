let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    getToys();
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
            toyFormContainer.addEventListener('submit', event => {
                event.preventDefault();
                toyData(event.target)
            })
        } else {
            toyFormContainer.style.display = "none";
        }
    });
});

function getToys() {
    return fetch('http://localhost:3000/toys')
        .then(res => res.json())
        .then(toys => {
            toys.forEach(toy => {
                renderToys(toy)
            })
        })
}

function toyData(toy) {
    fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: toy.name.value,
                image: toy.image.value,
                likes: 0
            })
        })
        .then(res => res.json())
        .then(object => renderToys(object));
}

function renderToys(toy) {
    let divCollect = document.querySelector('#toy-collection')

    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    let button = document.createElement('button')
    button.setAttribute('class', 'like-btn')
    button.setAttribute('id', toy.id)
    button.innerText = 'like'
    button.addEventListener('click', (event) => {
        console.log(event.target.dataset)
        toyLikes(event)
    })
    let card = document.createElement('div')
    card.setAttribute('class', 'card')
    divCollect.append(card)
    card.append(h2, img, p, button)

}

function toyLikes(event) {
    event.preventDefault();
    let incrementLikes = parseInt(event.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${event.target.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "likes": incrementLikes
            })
        })
        .then(res => res.json())
        .then(object => {
            event.target.previousElementSibling.innerText = `${incrementLikes} likes`
        })
}