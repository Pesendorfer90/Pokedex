let height;
let weight;
let abilities;
let baseExperience;
var loadFullInfo = false;


// collects all data and shows results
function showFullInfo(infoId) {
    if (loading == false, loadJSON == false) {
        loadFullInfo = true;
        currentPokemon = pokemonJSON[infoId - 1];
        checkWidth();
        collectMainData();
        collectType();
        collectBodyProperties();
        getAbilities();
        renderFullInfo(infoId);
        checkForsecendType();
        getEvolution(infoId);
        getMoves();
        getStats();
        setTimeout(function () { checkNumberOfEvolutions(); }, 500);
        loadFullInfo = false;
    }
}


// collect height and weight
function collectBodyProperties() {
    height = currentPokemon['height'];
    weight = currentPokemon['weight'];
    baseExperience = currentPokemon['base_experience'];
}


// collect abilities
function getAbilities() {
    abilities = '';
    for (i = 0; i < currentPokemon.abilities.length; i++) {
        ability = currentPokemon['abilities'][i]['ability']['name'];
        abilities += `${ability.charAt(0).toUpperCase() + ability.slice(1)}, `;
    }
    abilities = abilities.slice(0, -2); 
}


// get the link to the evolutions
async function getEvolution() {
    let speciesUrl = currentPokemon['species']['url'];
    let species = await fetch(speciesUrl);
    let speciesAsJson = await species.json();
    if (speciesAsJson.evolution_chain !== null) {
        let evolutionChainUrl = speciesAsJson['evolution_chain']['url'];
        let evolutionChain = await fetch(evolutionChainUrl);
        let evolutionChainJSON = await evolutionChain.json();
        getEvolutionChain(evolutionChainJSON);
    }
}


// check how many evolutions there are
function getEvolutionChain(evolutionChainJSON) {
    let evolutionChain = evolutionChainJSON['chain']['evolves_to'];
    if (evolutionChain.length < 1) {
        noEvolutionChain();
    } else if (evolutionChain[0]['evolves_to'].length == 0) {
        getFirstEvolutionStep(evolutionChainJSON);
        getSecondEvolutionStep(evolutionChainJSON);
    } else if (evolutionChain[0]['evolves_to'].length > 0) {
        getFirstEvolutionStep(evolutionChainJSON);
        getSecondEvolutionStep(evolutionChainJSON);
        getThirdEvolutionStep(evolutionChainJSON);
    }
}


// get img and name for the first pokemon in the evolution chain
function getFirstEvolutionStep(evolutionChainJSON) {
    let evolutionSteps = document.getElementById('evoChain');
    let firstEvoStepName = evolutionChainJSON['chain']['species']['name'];
    let firstEvoStepNameFormatted = firstEvoStepName.charAt(0).toUpperCase() + firstEvoStepName.slice(1);
    for (let i = 0; i < maxID - 1; i++) {
        const firstEvoPokemon = pokemonJSON[i];
        let firstEvoPokemonName = firstEvoPokemon['name'];
        let firstEvoPokemonNameFormatted = firstEvoPokemonName.charAt(0).toUpperCase() + firstEvoPokemonName.slice(1)
        let firstEvoPokemonImage = pokemonJSON[i]['sprites']['other']['official-artwork']['front_default'];
        if (firstEvoStepNameFormatted == firstEvoPokemonNameFormatted) {
            evolutionSteps.innerHTML += renderEvolutionStep(firstEvoStepNameFormatted, firstEvoPokemonImage, i);
        }
    }
}


// get img and name for the second pokemon in the evolution chain
function getSecondEvolutionStep(evolutionChainJSON) {
    let evolutionSteps = document.getElementById('evoChain');
    let secondEvoStepName = evolutionChainJSON['chain']['evolves_to'][0]['species']['name'];
    let secondEvoStepNameFormatted = secondEvoStepName.charAt(0).toUpperCase() + secondEvoStepName.slice(1);
    for (let i = 0; i < maxID; i++) {
        const secondEvoPokemon = pokemonJSON[i];
        let secondEvoPokemonName = secondEvoPokemon['name'];
        let secondEvoPokemonNameFormatted = secondEvoPokemonName.charAt(0).toUpperCase() + secondEvoPokemonName.slice(1)
        let secondEvoPokemonImage = pokemonJSON[i]['sprites']['other']['official-artwork']['front_default'];
        if (secondEvoStepNameFormatted == secondEvoPokemonNameFormatted) {
            evolutionSteps.innerHTML += renderEvolutionStep(secondEvoStepNameFormatted, secondEvoPokemonImage, i);
        }
    }
}


// get img and name for the third pokemon in the evolution chain
function getThirdEvolutionStep(evolutionChainJSON) {
    let evolutionSteps = document.getElementById('evoChain');
    let thirdEvoStepName = evolutionChainJSON['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
    let thirdEvoStepNameFormatted = thirdEvoStepName.charAt(0).toUpperCase() + thirdEvoStepName.slice(1);
    for (let i = 0; i < maxID; i++) {
        const thirdEvoPokemon = pokemonJSON[i];
        let thirdEvoPokemonName = thirdEvoPokemon['name'];
        let thirdEvoPokemonNameFormatted = thirdEvoPokemonName.charAt(0).toUpperCase() + thirdEvoPokemonName.slice(1)
        let thirdEvoPokemonImage = pokemonJSON[i]['sprites']['other']['official-artwork']['front_default'];
        if (thirdEvoStepNameFormatted == thirdEvoPokemonNameFormatted) {
            evolutionSteps.innerHTML += renderEvolutionStep(thirdEvoStepNameFormatted, thirdEvoPokemonImage, i);
        }
    }
}


// render the evolution chain into the fullinfocard
function renderEvolutionStep(evoStepNameFormatted, evoPokemonImage, i) {
    return /*html*/ `
        <div class="evo-steps" onclick="showFullInfo(${i + 1})">
            <img src="${evoPokemonImage}">
            <p>${evoStepNameFormatted}</p>
        </div>
        `;
}


// if there is no evolution
function noEvolutionChain() {
    document.getElementById('evoChain').innerHTML += `No evolutions available`
}


// collect and render moves
function getMoves() {
    movesContainer = document.getElementById('moves');
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        move = currentPokemon['moves'][i]['move']['name'];
        movesContainer.innerHTML += `
        <li>${move}</li>&nbsp; 
        `
    }
}


// create an info card with all the details about the selected pokemeon
function renderFullInfo(infoId) {
    document.getElementById('fullInfoCard').classList.remove("d-none");
    document.getElementById('header').classList.add("z-index2");
    document.getElementById('fullInfoCard').innerHTML = /*html*/ `
    <div class="info-container">
        <div class="pokedex-main-info" style="background-color: var(--c-${currentPokemon['types'][0]['type']['name']})">
            <div class="info-ID">
                <img onclick="closeFullInfo()" class="close-arrow" src="img/arrow1.png">
                <div class="ID-container">#${infoId}</div>
            </div>
        
            <div class="main-info">
                <div class="pokemon-info">
                    <h2>${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h2>
                    <div class="pokemon-type-full">
                        <span>${type.charAt(0).toUpperCase() + type.slice(1)}</span>
                        <span id="secondTypeFull">${secondType.charAt(0).toUpperCase() + secondType.slice(1)}</span>
                    </div>
                </div>
                <div class="full-img-container">
                    <img class="pokemon-img-full" src="${currentPokemonImg}">
                </div>
            </div>
            <div class="bg-container">
            <img class="bg-img-full-info" src="img/pokeball.png">
            </div>
        </div>
        <div class="detail">
            <div class="detail-nav">
                <a onclick="switchToAbout()" id="about-nav" class="font-weight">About</a>
                <a onclick="switchToStats()" id="stats-nav" class="">Base Stats</a>
                <a onclick="switchToMoves()" id="moves-nav" class="">Moves</a>
            </div>
        
            <div class="slider">
                <div class="about-container" id="about">
                    <table>
                        <tr>
                            <td>Height</td>
                            <td>${height}0cm</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>${weight}kg</td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td>${abilities}</td>
                        </tr>
                    </table>
                    <div class="evolution">
                        <h3>Evolution</h3>
                        <div class="evo-container" id="evoChain"></div>
                    </div>
                </div>

                <div class="base-stats-container z-index-1 d-none" id="baseStats">
                <canvas class="stats-chart" id="baseStatsChart"></canvas>
                </div>

                <div class="moves-container d-none" id="moves"></div>
            </div>
        </div>
    </div>
    <div onclick="closeFullInfo()" class="invisible-div" id="closeInfo"></div>
    `
}


// close full Info
function closeFullInfo() {
    document.getElementById('fullInfoCard').innerHTML = ''
    document.getElementById('fullInfoCard').classList.add("d-none");
    document.getElementById('header').classList.remove("d-none");
    document.getElementById('header').classList.remove("z-index2");
    document.getElementById('cardContainer').classList.remove("d-none");
    document.body.style = "overflow: auto"
}


// switch to about
function switchToAbout(){
    document.getElementById('about').classList.remove("d-none");
    document.getElementById('baseStats').classList.add("d-none");
    document.getElementById('moves').classList.add("d-none");
    document.getElementById('about-nav').classList.add("font-weight");
    document.getElementById('stats-nav').classList.remove("font-weight");
    document.getElementById('moves-nav').classList.remove("font-weight");
}


// switch to stats
function switchToStats(){
    document.getElementById('about').classList.add("d-none");
    document.getElementById('baseStats').classList.remove("d-none");
    document.getElementById('moves').classList.add("d-none");
    document.getElementById('about-nav').classList.remove("font-weight");
    document.getElementById('stats-nav').classList.add("font-weight");
    document.getElementById('moves-nav').classList.remove("font-weight");
    drawChart();
}


// switch to moves
function switchToMoves(){
    document.getElementById('about').classList.add("d-none");
    document.getElementById('baseStats').classList.add("d-none");
    document.getElementById('moves').classList.remove("d-none");
    document.getElementById('about-nav').classList.remove("font-weight");
    document.getElementById('stats-nav').classList.remove("font-weight");
    document.getElementById('moves-nav').classList.add("font-weight");
}