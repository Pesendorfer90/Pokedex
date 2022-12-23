let height;
let weight;
let abilities;
let baseExperience;
var loadFullInfo = false;



async function showFullInfo(infoId) {
    if (loading == false, loadJSON == false) {
        loadFullInfo = true;
        let url = `https://pokeapi.co/api/v2/pokemon/${infoId}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        document.body.style = "overflow: hidden"
        collectMainData();
        collectType();
        collectBodyProperties();
        getAbilities();
        renderFullInfo(infoId);
        checkForsecendType();
        getEvolution(infoId);
        loadFullInfo = false;
    }// else {
    //     setTimeout(function () { showFullInfo(); }, 3000);
    // }
}


function collectBodyProperties() {
    height = currentPokemon['height'];
    weight = currentPokemon['weight'];
    baseExperience = currentPokemon['base_experience'];

    console.log('height', height);
    console.log('weight', weight);
    console.log('baseExperience', baseExperience);
}


function getAbilities() {
    abilities = '';
    for (i = 0; i < currentPokemon.abilities.length; i++) {
        ability = currentPokemon['abilities'][i]['ability']['name'];
        abilities += `${ability.charAt(0).toUpperCase() + ability.slice(1)}, `;
    }
    abilities = abilities.slice(0, -2); 
    console.log('abilities', abilities);
}


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
            evolutionSteps.innerHTML += renderEvolutionStep(firstEvoStepNameFormatted, firstEvoPokemonImage);
        }
    }
}


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
            evolutionSteps.innerHTML += renderEvolutionStep(secondEvoStepNameFormatted, secondEvoPokemonImage);
        }
    }
}


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
            evolutionSteps.innerHTML += renderEvolutionStep(thirdEvoStepNameFormatted, thirdEvoPokemonImage);
        }
    }
}


function renderEvolutionStep(evoStepNameFormatted, evoPokemonImage) {
    return /*html*/ `
        <div class="evo-steps">
            <img src="${evoPokemonImage}">
            <p>${evoStepNameFormatted}</p>
        </div>
        `;
}


// if there is no evolution
function noEvolutionChain() {
    document.getElementById('evoChain').innerHTML += `No evolutions available`
}


// create an info card with all the details about the selected pokemeon
function renderFullInfo(infoId) {
    document.getElementById('fullInfoCard').classList.remove("d-none");
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
            <img class="bg-img-full-info" src="img/pokeball.png">
        </div>
        <div class="detail">
            <div class="detail-nav">
                <p onclick="switchToAbout()">About</p>
                <p onclick="switchToStats()">Base Stats</p>
                <p onclick="switchToMoves()">Moves</p>
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

                <div class="base-stats-container z-index-1" id="baseStats">
                <canvas class="stats-chart" id="baseStatsChart"></canvas>
                </div>

                <div class="moves-container d-none" id="moves">Moves</div>
            </div>
        </div>
    </div>
    <div onclick="closeFullInfo()" class="invisible-div" id="closeInfo"></div>
    `

}


function closeFullInfo() {
    document.getElementById('fullInfoCard').innerHTML = ''
    document.getElementById('fullInfoCard').classList.add("d-none");
    document.body.style = "overflow: auto"
}


function switchToAbout(){
    document.getElementById('about').classList.remove("d-none");
    document.getElementById('baseStats').classList.add("d-none");
    document.getElementById('moves').classList.add("d-none");
}


function switchToStats(){
    document.getElementById('about').classList.add("d-none");
    document.getElementById('baseStats').classList.remove("d-none");
    document.getElementById('moves').classList.add("d-none");
    drawChart();
}


function switchToMoves(){
    document.getElementById('about').classList.add("d-none");
    document.getElementById('baseStats').classList.add("d-none");
    document.getElementById('moves').classList.remove("d-none");
}