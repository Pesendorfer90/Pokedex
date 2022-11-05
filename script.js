let currentPokemon;
let currentPokemonImg;
let id = 1;
let currentId = 0;
let loadLimit = 30;


async function loadPokemonInfo() {
    // for (let i = currentId; i < loadLimit.length; i++) {
    //     let id =  i + 1;
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    // console.log('Loaded Pokemon', currentPokemon);
    currentPokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    renderPokemonInfo();
    // }
}


function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImg').src = currentPokemonImg;
}