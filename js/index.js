
const monsURL = "http://localhost:3000/monsters"

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('#monster-container')
    const newMonsterDiv = document.getElementById('create-monster')
    const forwardButton = document.getElementById("forward");
    const backButton = document.getElementById("back");
    let page = 1;
    let pageCount = 20;
    countMonsters();

    fetchMonsters(container, page);
    newMonsterForm(newMonsterDiv);

    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        createMonster(form);
        form.name.value = "";
        form.age.value = "";
        form.description.value = "";
    });

    forwardButton.addEventListener("click", (e) => {
        if (page <= pageCount) {
            page++;
        };
        fetchMonsters(container, page);
    });

    backButton.addEventListener("click", (e) => {
        if (page > 1) {
            page--;
        };
        fetchMonsters(container, page);
    })



    function fetchMonsters(monsterContainer, page) {
        fetch(`${monsURL}/?_limit=50&_page=${page}`)
            .then((r) => r.json())
            .then((data) => renderMonsters(data))
    }

    function renderMonsters(data) {
        data.forEach((monster) => renderMonster(monster))
    }

    function renderMonster(monster) {
        const monsterInfo = document.createElement('div')
        monsterInfo.innerHTML = `
                                <h2>${monster.name}</h2>
                                <p>${monster.age}</p>
                                <p>${monster.description}</p>`
        container.appendChild(monsterInfo);
    }


    function newMonsterForm(container) {
        const form = document.createElement('div')
        form.innerHTML = `<h2>Create a Monster</h2>
                            <form action="${monsURL}">
                            <label for="name">Name:</label><br>
                            <input type="text" id="name" name="name"><br>
                            <label for="age">Age:</label><br>
                            <input type="number" id="age" name="age"><br>
                            <label for="description">Description:</label><br>
                            <input type="text" id="description" name="description"><br><br>
                            <input type="submit" value="Submit">
                            </form>`
        container.append(form);
    }

    function createMonster(form) {
       
        event.preventDefault()
        fetch(`${monsURL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": `${form.name.value}`,
                "age": `${form.age.value}`,
                "description": `${form.description.value}`
            })
        })
        .then(countMonsters());

    }

    function countMonsters() {
        fetch(monsURL)
            .then(response => response.json())
            .then(monsters => {
                pageCount = Math.ceil(monsters.length / 50);
            })
    }

});