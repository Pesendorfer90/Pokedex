let currentPokemon;
let currentPokemonImg;
let pokemonName;
let id;
let currentId = 0;
let loadLimit = 30;



async function loadPokemonInfo() {
    for (let i = currentId; i < loadLimit; i++) {
        id = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('Loaded Pokemon', currentPokemon);
        currentPokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];
        pokemonName = currentPokemon['name']

        renderPokemonInfo();
    }
}


function renderPokemonInfo() {
    document.getElementById('cardContainer').innerHTML += `
    <div class="card-container">
        <div class="pokedex-card">

            <div class="pokemon-ID">
                <div class="ID-container">#${id}</div>
            </div>

            <div class="pokedex">
                <div class="pokemon-info">
                    <h2>${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h2>
                    <div class="pokemon-type">
                        <span>grass</span>
                        <span>poison</span>
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