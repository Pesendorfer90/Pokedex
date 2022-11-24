function showNames() {
    let list = document.getElementById('list');

    list.innerHTML = '';

    for (let index = 0; index < names.length; index++) {
        const name = names[index];
        list.innerHTML += `<li>${name}</li>`
        
    }
}


function searchPokemon() {
    setTimeout(function () {getAllCharacter();}, 10);
}


function getAllCharacter() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    showSuggestion(search);

    let list = document.getElementById('search-result'); // anzeigemenü unter der suchleiste hinzufügen
    list.innerHTML = '';

    for (let index = 0; index < pokemon.length; index++) {
        let name = pokemon[index];
        if(name.toLocaleLowerCase().includes(search)) {
        list.innerHTML += `<a href>${pokemon[index]}</a>`;
        } // else hinzufügen falls nichts gefunden wird
    }
}


function showSuggestion(search) {
    let inputSection = document.getElementById('search-result');
    let invisibleDiv = document.getElementById('invisible');

    if (search == '') {  //if (inputSection.innerHTML.trim() == "") {
        inputSection.classList.add("d-none");
        invisibleDiv.classList.add("d-none");
     } else {
        inputSection.classList.remove("d-none");
        invisibleDiv.classList.remove("d-none");
     }
}


function clearInput() {
    document.getElementById('search').value = '';
    searchPokemon();
}