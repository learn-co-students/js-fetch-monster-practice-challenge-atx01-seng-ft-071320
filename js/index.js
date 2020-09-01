const monsterListURL = "http://localhost:3000/monsters";

document.addEventListener("DOMContentLoaded", (e) => {
    const createMonster = document.getElementById("create-monster");
    const monsterContainer = document.getElementById("monster-container");
    const forwardButton = document.getElementById("forward");
    const backButton = document.getElementById("back");
    let page = 1;
    let pageCount = 20;
    countMonsters();

    loadMonsters(monsterContainer, page);
    loadForm(createMonster);

    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        submitMonster(form);
        form.name.value = "";
        form.age.value = "";
        form.description.value = "";
    });

    forwardButton.addEventListener("click", (e) => {
        if (page <= pageCount) {
            page++;
        };
        loadMonsters(monsterContainer, page);
    });

    backButton.addEventListener("click", (e) => {
        if (page > 1) {
            page--;
        };
        loadMonsters(monsterContainer, page);
    })
});

function loadMonsters(container, page) {
    fetch(`${monsterListURL}/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            monsters.forEach(monster => {
                const monsterInfo = document.createElement("div");
                monsterInfo.innerHTML = `<h2>${monster["name"]}</h2>
                                        <h3>${monster["age"]} years old</h3>
                                        <p>${monster["description"]}</p>`
                container.append(monsterInfo);
            });
        });
};

function countMonsters() {
    fetch(monsterListURL)
        .then(response => response.json())
        .then(monsters => {
            pageCount = Math.ceil(monsters.length / 50);
        })
}


function loadForm(container) {
    const form = document.createElement("div")
    form.innerHTML = `<h2>Create a Monster</h2>
                    <form action="${monsterListURL}">
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

function submitMonster(form) {

    event.preventDefault()
    fetch(`${monsterListURL}`, {
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