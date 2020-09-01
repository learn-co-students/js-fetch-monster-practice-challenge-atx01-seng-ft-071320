document.addEventListener('DOMContentLoaded', () => {
    const URL = "http://localhost:3000/monsters/?_limit=50&_page="
    let pages = 0
    let monsterCon = document.getElementById('monster-container')


    function getMonsters() {
        return fetch(URL + ++pages)
            .then(res => res.json())
    }
    getMonsters().then(monsters => monsters.forEach(monster => renderMonster(monster)))

    function renderMonster(monster) {
        let h2 = document.createElement('h2')
        h2.innerText = monster.name
        let h4 = document.createElement('h4')
        h4.innerText = monster.id
        let h3 = document.createElement('h3')
        h3.innerText = monster.age
        let p = document.createElement('p')
        p.innerText = monster.description
        monsterCon.append(h2, h4, h3, p)
    }

    let nextBtn = document.getElementById('forward')
    let backBtn = document.getElementById('back')

    nextBtn.addEventListener("click", (e) => nextPage(e))

    function nextPage(e) {
        monsterCon.innerHTML = ''
        getMonsters().then(monsters => monsters.forEach(monster => renderMonster(monster)))
    }

    backBtn.addEventListener("click", (e) => backPage(e))

    function backPage(e) {
        monsterCon.innerHTML = ""
        fetchPrevious().then(monsters => monsters.forEach(monster => renderMonster(monster)))
    }

    function fetchPrevious() {
        return fetch(URL + --pages)
            .then(res => res.json())
    }

    function createForm() {
        let formDiv = document.getElementById('create-monster')
        let form = document.createElement('form')
        form.id = "monster-form"
        let nameIn = document.createElement('input')
        nameIn.id = "name"
        nameIn.placeholder = "name monster!"
        let ageIn = document.createElement('input')
        ageIn.id = "age"
        ageIn.placeholder = "how old is monster?"
        let descIn = document.createElement('input')
        descIn.id = "description"
        descIn.placeholder = "what's monster like?"
        let newButton = document.createElement('button')
        newButton.innerText = "Create Monster!"

        form.append(nameIn, ageIn, descIn, newButton)
        formDiv.append(form)
    }

    createForm()

    document.getElementById('monster-form').addEventListener("submit", (e) => handleCreateMonster(e))


    function handleCreateMonster(e) {
        e.preventDefault()
        let newMonName = e.target["name"].value
        let newMonAge = e.target["age"].value
        let newMonDesc = e.target["description"].value
        let monsterInfo = {
            name: newMonName,
            age: newMonAge,
            description: newMonDesc
        }
        //console.log(monsterInfo)
        postMonster(monsterInfo)
        document.getElementById("monster-form").reset()
    }

    function postMonster(monsterInfo) {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(monsterInfo)
        }
        fetch('http://localhost:3000/monsters', configObj)
        .then(res => res.json())
        .then(monster => renderMonster(monster))
    }

});