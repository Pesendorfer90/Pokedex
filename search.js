// async doesn't work here. timeout set to load the value from the input field in time
function searchPokemon() {
    setTimeout(function () {getAllCharacter();}, 10);
}


// collect value from inputfield
function getAllCharacter() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    showSuggestion(search);

    showNames(search)
}


// show my suggestions div if a character is found
function showSuggestion(search) {
    let inputSection = document.getElementById('search-result');
    let invisibleDiv = document.getElementById('invisible');

    if (search == '') {
        inputSection.classList.add("d-none");
        invisibleDiv.classList.add("d-none");
     } else {
        inputSection.classList.remove("d-none");
        invisibleDiv.classList.remove("d-none");
     }
}


// show search results unter input field
function showNames(search) {
    let list = document.getElementById('search-result');
    list.innerHTML = '';

    for (let index = 0; index < pokemon.length; index++) {
        let name = pokemonJSON[index]['name'];
        if(name.toLocaleLowerCase().includes(search)) {
        list.innerHTML += `<p onclick="showFullInfo(${index + 1}), clearInput()">${name.charAt(0).toUpperCase() + name.slice(1)}</p>`;
        } // else hinzufügen falls nichts gefunden wird
    }
}


// clear the inputfield
function clearInput() {
    document.getElementById('search').value = '';
    searchPokemon();
}