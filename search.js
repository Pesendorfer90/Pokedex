// The searchPokemon function initiates a delayed search for Pokémon by calling the
// getAllCharacter() function after a 10-millisecond delay using setTimeout.
// This introduces a brief delay before executing the search.
function searchPokemon() {
    setTimeout(function () {getAllCharacter();}, 10);
}


// The getAllCharacter function retrieves the search input value from the search field,
// converts it to lowercase for case-insensitive comparison, and then calls two functions:
// showSuggestion(search) and showNames(search), which likely handle displaying search suggestions and
// matching Pokémon names based on the input.
function getAllCharacter() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    showSuggestion(search);
    showNames(search)
}


// The showSuggestion function toggles the visibility of the search results. If the search input is empty,
// it hides the search results and an invisible div by adding the d-none class. If there is search input,
// it displays them by removing the d-none class.
// This helps control when search suggestions are shown or hidden based on user input.
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


// The showNames function filters the list of Pokémon names based on the user's search input.
// It clears the previous search results, then iterates through the pokemonJSON array, checking if each name includes
// the search term (in lowercase). Matching names are displayed as clickable <p> elements that,
// when clicked, trigger the showFullInfo and clearInput functions.
// The Pokémon names are displayed with the first letter capitalized.
function showNames(search) {
    let list = document.getElementById('search-result');
    list.innerHTML = '';

    for (let index = 0; index < pokemon.length; index++) {
        let name = pokemonJSON[index]['name'];
        if(name.toLocaleLowerCase().includes(search)) {
        list.innerHTML += `<p onclick="showFullInfo(${index + 1}), clearInput()">${name.charAt(0).toUpperCase() + name.slice(1)}</p>`;
        }
    }
}


// The clearInput function clears the search input field by setting its value to an empty string.
// After clearing the input, it triggers the searchPokemon function to refresh or update the search results.
function clearInput() {
    document.getElementById('search').value = '';
    searchPokemon();
}