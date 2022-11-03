let currentPokemon;
let currentPokemonImg;


async function loadPokemonInfo() {
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded Pokemon', currentPokemon);
    currentPokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    console.log('Loaded Pokemon IMG',currentPokemonImg)

    renderPokemonInfo();
}


function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImg').src = currentPokemonImg;
}