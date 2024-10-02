let height;
let weight;
let abilities;
let baseExperience;
var loadFullInfo = false;


// The showFullInfo function loads and displays detailed information about a Pokémon
// when the loading is complete. It sets currentPokemon from the pokemonJSON array using infoId,
// and calls several functions to collect and display the Pokémon’s main data, types, body properties,
// abilities, evolution chain, moves, and stats. It also adjusts the layout for different
// screen sizes and checks the number of evolution stages.
// Finally, it sets loadFullInfo to false after completing the process.
function showFullInfo(infoId) {
    if (loading == false) {
        loadFullInfo = true;
        currentPokemon = pokemonJSON[infoId - 1];
        checkWidth();
        collectMainData();
        collectType();
        collectBodyProperties();
        getAbilities();
        renderFullInfo(infoId);
        checkForsecendType();
        getEvolutionChain(infoId - 1)
        getMoves();
        getStats();
        checkNumberOfEvolutions();
        loadFullInfo = false;
    }
}


// The collectBodyProperties function retrieves and assigns the current Pokémon's body properties,
// including its height, weight, and base_experience, from the currentPokemon object for later use in the application.
function collectBodyProperties() {
    height = currentPokemon['height'];
    weight = currentPokemon['weight'];
    baseExperience = currentPokemon['base_experience'];
}


// The getAbilities function collects the names of a Pokémon's abilities, capitalizes the first letter of each,
// and concatenates them into a single string. It iterates over the abilities array of currentPokemon,
// formats each ability's name, and appends it to the abilities string, separated by commas.
// Finally, it removes the trailing comma and space from the string.
function getAbilities() {
    abilities = '';
    for (i = 0; i < currentPokemon.abilities.length; i++) {
        ability = currentPokemon['abilities'][i]['ability']['name'];
        abilities += `${ability.charAt(0).toUpperCase() + ability.slice(1)}, `;
    }
    abilities = abilities.slice(0, -2); 
}


// The getEvolutionChain function retrieves and processes the evolution chain of a Pokémon.
// It checks the evolution chain from pokemonJSON at the given JSONId.
// If there are no evolutions, it calls noEvolutionChain().
// If there's only one or two stages of evolution, it calls getFirstEvolutionStep() and getSecondEvolutionStep().
// If a third evolution stage exists, it additionally calls getThirdEvolutionStep() to handle the complete evolution chain.
function getEvolutionChain(JSONId) {
    let evolutionChain = pokemonJSON[JSONId]['chain']['evolves_to'];
    if (evolutionChain.length < 1) {
        noEvolutionChain();
    } else if (evolutionChain[0]['evolves_to'].length == 0) {
        getFirstEvolutionStep(JSONId);
        getSecondEvolutionStep(JSONId);
    } else if (evolutionChain[0]['evolves_to'].length > 0) {
        getFirstEvolutionStep(JSONId);
        getSecondEvolutionStep(JSONId);
        getThirdEvolutionStep(JSONId);
    }
}


// The getFirstEvolutionStep function identifies and displays the first stage of a Pokémon's evolution chain.
// It retrieves the name of the first evolution step from the Pokémon's evolution chain in pokemonJSON,
// formats it with an uppercase first letter, and then iterates through the pokemonJSON array to find the corresponding Pokémon by name.
// When a match is found, it retrieves the Pokémon's image and appends the formatted name and image to the evolution chain section
// (evoChain) by calling renderEvolutionStep().
function getFirstEvolutionStep(JSONId) {
    let evolutionSteps = document.getElementById('evoChain');
    let firstEvoStepName = pokemonJSON[JSONId]['chain']['species']['name'];
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


// The getSecondEvolutionStep function retrieves and displays the second stage of a Pokémon's evolution chain.
// It fetches the name of the second evolution step from the Pokémon's evolution chain in pokemonJSON,
// formats the name by capitalizing the first letter, and iterates through the pokemonJSON array to find the matching Pokémon by name.
// When a match is found, the Pokémon's image is retrieved and the formatted name and image are appended to the evolution chain section
// (evoChain) by calling renderEvolutionStep().
function getSecondEvolutionStep(JSONId) {
    let evolutionSteps = document.getElementById('evoChain');
    let secondEvoStepName = pokemonJSON[JSONId]['chain']['evolves_to'][0]['species']['name'];
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


// The getThirdEvolutionStep function retrieves and displays the third stage of a Pokémon's evolution chain.
// It extracts the name of the third evolution stage from the Pokémon's evolution chain in pokemonJSON,
// formats the name by capitalizing the first letter, and iterates through the pokemonJSON array to find the corresponding Pokémon by name.
// When a match is found, the Pokémon's image is retrieved, and the formatted name and image are appended to the evolution chain section
// (evoChain) using renderEvolutionStep().
function getThirdEvolutionStep(JSONId) {
    let evolutionSteps = document.getElementById('evoChain');
    let thirdEvoStepName = pokemonJSON[JSONId]['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
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


// The renderEvolutionStep function generates the HTML structure for a single evolution step.
// It takes the formatted evolution step name (evoStepNameFormatted), the Pokémon's image (evoPokemonImage) and
// its index (i). It returns a clickable <div> containing the image and name of the Pokémon.
// When clicked, it triggers the showFullInfo() function to display detailed information for that Pokémon based on its index.
function renderEvolutionStep(evoStepNameFormatted, evoPokemonImage, i) {
    return /*html*/ `
        <div class="evo-steps" onclick="showFullInfo(${i + 1})">
            <img src="${evoPokemonImage}">
            <p>${evoStepNameFormatted}</p>
        </div>
        `;
}


// The noEvolutionChain function updates the evolution chain section by appending the text "No evolutions available"
// when a Pokémon has no evolution chain. It adds this message to the evoChain element in the HTML.
function noEvolutionChain() {
    document.getElementById('evoChain').innerHTML += `No evolutions available`
}


// The getMoves function retrieves and displays the list of moves for the current Pokémon.
// It iterates through the moves array in the currentPokemon object, extracting each move's name.
// For each move, it appends an <li> element containing the move name to the moves container in the HTML,
// creating a list of moves.
function getMoves() {
    movesContainer = document.getElementById('moves');
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        move = currentPokemon['moves'][i]['move']['name'];
        movesContainer.innerHTML += `
        <li>${move}</li>&nbsp; 
        `
    }
}


// The renderFullInfo function displays detailed information about a Pokémon when a user clicks on it.
// It updates the fullInfoCard element by removing the d-none class to make it visible and
// changes the z-index of the header for proper layering.
// The function generates a structured HTML template that includes the Pokémon's
// ID, name, types, image, height, weight, abilities, and evolution chain.
// It also includes navigation for switching between
// "About," "Base Stats," and "Moves" sections, dynamically filling these sections with the relevant Pokémon data.
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


// The closeFullInfo function hides the detailed Pokémon information.
// It clears the content inside the fullInfoCard element, adds the d-none class to hide it,
// and restores the visibility and normal stacking order of the header and card container.
// It also resets the body's overflow style to allow scrolling again.
function closeFullInfo() {
    document.getElementById('fullInfoCard').innerHTML = ''
    document.getElementById('fullInfoCard').classList.add("d-none");
    document.getElementById('header').classList.remove("d-none");
    document.getElementById('header').classList.remove("z-index2");
    document.getElementById('cardContainer').classList.remove("d-none");
    document.body.style = "overflow: auto"
}


// The switchToAbout function switches the detailed Pokémon view to the "About" section.
// It makes the "About" section visible by removing the d-none class and hides the
// "Base Stats" and "Moves" sections by adding the d-none class to them.
// Additionally, it highlights the "About" navigation tab by adding a
// font-weight class and removes this highlight from the other tabs.
function switchToAbout(){
    document.getElementById('about').classList.remove("d-none");
    document.getElementById('baseStats').classList.add("d-none");
    document.getElementById('moves').classList.add("d-none");
    document.getElementById('about-nav').classList.add("font-weight");
    document.getElementById('stats-nav').classList.remove("font-weight");
    document.getElementById('moves-nav').classList.remove("font-weight");
}


// The switchToStats function displays the "Base Stats" section in the Pokémon detail view.
// It hides the "About" and "Moves" sections by adding the d-none class,
// highlights the "Base Stats" navigation tab by adding the font-weight class,
// removes the highlight from the other tabs, and calls drawChart() to render the stats chart.
function switchToStats(){
    document.getElementById('about').classList.add("d-none");
    document.getElementById('baseStats').classList.remove("d-none");
    document.getElementById('moves').classList.add("d-none");
    document.getElementById('about-nav').classList.remove("font-weight");
    document.getElementById('stats-nav').classList.add("font-weight");
    document.getElementById('moves-nav').classList.remove("font-weight");
    drawChart();
}


// The switchToMoves function displays the "Moves" section in the Pokémon detail view.
// It hides the "About" and "Base Stats" sections by adding the d-none class,
// highlights the "Moves" navigation tab by adding the font-weight class,
// and removes the highlight from the other tabs.
function switchToMoves(){
    document.getElementById('about').classList.add("d-none");
    document.getElementById('baseStats').classList.add("d-none");
    document.getElementById('moves').classList.remove("d-none");
    document.getElementById('about-nav').classList.remove("font-weight");
    document.getElementById('stats-nav').classList.remove("font-weight");
    document.getElementById('moves-nav').classList.add("font-weight");
}