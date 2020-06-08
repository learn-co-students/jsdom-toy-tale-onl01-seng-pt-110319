function createToyCard(toy) {
	console.log(toy.image);
	let getDiv = document.getElementById("toy-collection");
	let newDiv = document.createElement("div");
	newDiv.classList.add("card");
	// h2 tag with the toy's name
	let toyName = document.createElement("h2");
	toyName.innerText = toy.name;
	// img tag with the src of the toy's image attribute and the class name "toy-avatar"
	let imgTag = document.createElement("img");
	imgTag.setAttribute("src", toy.image);
	imgTag.setAttribute("class", "toy-avatar");

	// p tag with how many likes that toy has
	let pTag = document.createElement("p");
	pTag.innerText = `${toy.likes} likes`;
	// button tag with a class "like-btn"
	let btnTag = document.createElement("button");
	btnTag.setAttribute("class", "like-btn");
	btnTag.setAttribute("id", toy.id);
	btnTag.innerText = "Like";
	btnTag.addEventListener("click", (event) => {
		addLikes(event);
	});

	newDiv.appendChild(toyName);
	newDiv.appendChild(imgTag);
	newDiv.appendChild(pTag);
	newDiv.appendChild(btnTag);

	getDiv.appendChild(newDiv);
}

function getToys() {
	fetch("http://localhost:3000/toys")
		.then(function (response) {
			return response.json();
		})
		.then(function (toys) {
			toys.forEach(function (toy) {
				createToyCard(toy);
			});
		})
		.catch(function (error) {
			console.log(error);
		});
}

function addNew(newToy) {
	console.log(newToy);

	fetch("http://localhost:3000/toys", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			name: newToy.name,
			image: newToy.image,
			likes: 0,
		}),
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (object) {
			createToyCard(object);
		});
}

function addLikes(e) {
	event.preventDefault();

	let newNum = parseInt(e.target.previousElementSibling.innerText) + 1;

	fetch(`http://localhost:3000/toys/${e.target.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			likes: newNum,
		}),
	})
		.then(function (response) {
			return response.json();
		})
		.then(function () {
			e.target.previousElementSibling.innerText = `${newNum} likes`;
		})
		.catch(function (error) {
			console.log(error);
		});
}

document.addEventListener("DOMContentLoaded", () => {
	getToys();
	const addBtn = document.querySelector("#new-toy-btn");
	const toyFormContainer = document.querySelector(".container");

	let submit = document
		.querySelector(".submit")
		.addEventListener("submit", function (event) {
			event.preventDefault();
			let newToy = Object.assign(
				{},
				{ name: event.target[0].value },
				{ image: event.target[1].value }
			);
			addNew(newToy);
		});

	addBtn.addEventListener("click", () => {
		addToy = !addToy;
		if (addToy) {
			toyFormContainer.style.display = "block";
		} else {
			toyFormContainer.style.display = "none";
		}
	});
});
