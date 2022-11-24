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

// load pokemon Names in array for search function
async function loadPokemonName() {
    for (let i = 0; i < maxID; i++) {
        j = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${j}/`;
        let response = await fetch(url);
        arrayName = await response.json();
        pokemon.push(arrayName['name'])
    }
    console.log('Loaded Pokemon', pokemon);
}

// collect information for rendering
async function loadPokemonInfo() {
    loading = true;
    for (let i = currentId; i < loadLimit; i++) {
        if (id < maxID) {
            id = i + 1;
            let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            console.log('Loaded Pokemon', currentPokemon);
            collectdata();
            renderPokemonInfo();
        }
    }
    loading = false;
}


// trigger function after scroll to the Bottom  
window.onscroll = function (ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        loadMore();
    }
}

// set the load limit higher if the function loadPokemonInfo is not active otherwise wait 3 seconds and try again
function loadMore() {
    if (loading == false) {
        loadLimit += 30;
        currentId += 30;
        loadPokemonInfo();
    } else {
        setTimeout(function () {loadMore();}, 3000);
    }
}


// collecting all data for cardContainer
function collectdata() {
    currentPokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    pokemonName = currentPokemon['name'];
    collectType();
}


function collectType() {
    type = `<span>${currentPokemon['types']['0']['type']['name']}</span>`;
    // search for second type
    let j = currentPokemon['types']['length'];
    if (j == '2') {
        secondType = `<span>${currentPokemon['types']['1']['type']['name']}</span>`;
    } else {
        secondType = '';
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
                        ${type}
                        ${secondType}
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