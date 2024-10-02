let currentPokemon;
let currentPokemonImg;
let cardColor;
let pokemonName;
let type;
let secondType;
let id = 0;
const maxID = 151;
let pokemon = [];
var loading = false;
let typeLength;
let pokemonJSON = [];


// The loadPokemonInfo function asynchronously loads Pokémon data in a loop up to maxID. For each Pokémon,
// it fetches data from the API, processes the response to extract and store key details (like evolution, main data, and types),
// and renders the Pokémon's information in the UI. It also updates a progress indicator and hides the loader
// once the loading is complete. The loading variable is used to control the state during the process.
async function loadPokemonInfo() {
    loading = true;
    for (let i = 0; i < maxID; i++) {
        if (id < maxID) {
            id = i + 1;
            let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            fillJSON();
            getEvolution(i);
            collectMainData();
            collectType();
            renderPokemonInfo();
            checkForsecendType(id);
            updateProgress();
        }
    }
    loading = false;
    loadFully();
}


// The collectMainData function extracts and assigns the main Pokémon data: it retrieves the image URL from the sprites object and
// stores the Pokémon's name, making them available for further use in the application.
function collectMainData() {
    currentPokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    pokemonName = currentPokemon['name'];
}


// The collectType function retrieves the first type of a Pokémon and, if a second type exists, it assigns it to secondType.
// It checks the types array length to determine if the Pokémon has a second type.
function collectType() {
    type = currentPokemon['types']['0']['type']['name'];
    typeLength = currentPokemon['types']['length'];
    if (typeLength == '2') {
        secondType = currentPokemon['types']['1']['type']['name'];
    }
}


// The checkForsecendType function hides the second type element if the Pokémon has only one type.
// It checks the loading and loadFullInfo flags to hide the relevant second type elements by adding the d-none class.
function checkForsecendType(id) {
    if (typeLength == '1') {
        if (loading == true) {
            secondTypeMain = `secondType${id}`;
            document.getElementById(secondTypeMain).classList.add("d-none");
        }
        if (loadFullInfo == true) {
            document.getElementById('secondTypeFull').classList.add("d-none");
        }
    }
}


// The renderPokemonInfo function dynamically generates and inserts HTML content for a Pokémon card into the cardContainer element.
function renderPokemonInfo() {
    document.getElementById('cardContainer').innerHTML += /*html*/ `
        <div class="pokedex-container">
            <div class="pokedex-card" onclick="showFullInfo(${id})" style="background-color: var(--c-${currentPokemon['types'][0]['type']['name']})">
                <img class="bg-img" src="img/pokeball.png">
                <div class="pokemon-ID">
                    <div class="ID-container">#${id}</div>
                </div>

                <div class="pokedex">
                    <div class="pokemon-info">
                        <h2>${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h2>
                        <div class="pokemon-type">
                            <span>${type.charAt(0).toUpperCase() + type.slice(1)}</span>
                            <span id="secondType${id}">${secondType.charAt(0).toUpperCase() + secondType.slice(1)}</span>
                        </div>
                    </div>
                    <div>
                        <img class="pokemonImg" src="${currentPokemonImg}">
                    </div>
                </div>
            </div>
        </div>
        `;
}


// The fillJSON function adds the current Pokémon's name to the pokemon array and pushes the entire currentPokemon object
// into the pokemonJSON array. This helps store the Pokémon's name and its full data for later use.
function fillJSON() {
    pokemon.push(currentPokemon['name']);
    pokemonJSON.push(currentPokemon);
}


// The getEvolution function asynchronously retrieves evolution data for the current Pokémon.
// It fetches the species data using the species URL, then gets the evolution chain URL from that response.
// The evolution chain data is fetched and merged into the pokemonJSON[i] object using Object.assign,
// adding the evolution data to the existing Pokémon data.
async function getEvolution(i) {
    let speciesUrl = currentPokemon['species']['url'];
    let species = await fetch(speciesUrl);
    let speciesAsJson = await species.json();
    let evolutionChainUrl = speciesAsJson['evolution_chain']['url'];
    let evolutionChain = await fetch(evolutionChainUrl);
    evolutionChainJSON = await evolutionChain.json();
    Object.assign(pokemonJSON[i], evolutionChainJSON);
}


// The loadFully function finalizes the loading process by showing the cardContainer (removing the d-none class),
// hiding the loader (adding the d-none class), and enabling the search input by removing its disabled attribute.
function loadFully() {
    document.getElementById('cardContainer').classList.remove("d-none");
    document.getElementById('loader').classList.add("d-none");
    document.getElementById("search").removeAttribute('disabled');
}