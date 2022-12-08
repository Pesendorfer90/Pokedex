let currentPokemon;
let currentPokemonImg;
let cardColor;
let pokemonName;
let type;
let secondType;
let id = 0;
const maxID = 151;
let currentId = 0;
let loadLimit = 30;
const pokemon = [];
var loading = false;
var loadMain = false;
let typeLength;

// load pokemon Names in array for search function
async function loadPokemonName() {
    for (let i = 0; i < maxID; i++) {
        j = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${j}/`;
        let response = await fetch(url);
        arrayName = await response.json();
        pokemon.push(arrayName['name'])
    }
}

// collect information for rendering
async function loadPokemonInfo() {
    loading = true;
    for (let i = currentId; i < loadLimit; i++) {
        if (id < maxID) {
            loadMain = true;
            id = i + 1;
            let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            collectMainData();
            collectType();
            renderPokemonInfo();
            checkForsecendType(id)
        }
    }
    loading = false;
    loadMain = false;
    checkScrollbar();
}


// set the load limit higher if the function loadPokemonInfo is not active otherwise wait 3 seconds and try again
function loadMore() {
    if (loading == false) {
        loadLimit += 30;
        currentId += 30;
        loadPokemonInfo();
    } else {
        setTimeout(function () { loadMore(); }, 3000);
    }
}


// collecting name and img for cardContainer
function collectMainData() {
    currentPokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    pokemonName = currentPokemon['name'];
}


function collectType() {
    type = currentPokemon['types']['0']['type']['name'];
    // search for second type
    typeLength = currentPokemon['types']['length'];
    if (typeLength == '2') {
        secondType = currentPokemon['types']['1']['type']['name'];
    }
}


// see if there are 2 types in the api
function checkForsecendType(id) {
    if (typeLength == '1') {
        if (loadMain == true) {
            secondTypeMain = `secondType${id}`
            document.getElementById(secondTypeMain).classList.add("d-none");
        }
        if (loadFullInfo == true) {
            document.getElementById('secondTypeFull').classList.add("d-none");
        }
    }
}


    // create the divs with information for each Pokemon
    function renderPokemonInfo() {
        document.getElementById('cardContainer').innerHTML += `
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