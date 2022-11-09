let currentPokemon;
let currentPokemonImg;
let cardColor;
let pokemonName;
let type;
let secondType;
let id;
let currentId = 0;
let loadLimit = 30;



async function loadPokemonInfo() {
    for (let i = currentId; i < loadLimit; i++) {
        id = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('Loaded Pokemon', currentPokemon);
        collectdata();

        renderPokemonInfo();
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


function renderPokemonInfo() {
    document.getElementById('cardContainer').innerHTML += `
    <div class="card-container">
        <div class="pokedex-card" style="background-color: var(--c-${currentPokemon['types'][0]['type']['name']})">
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