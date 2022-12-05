let height;
let weight;
let abilities;
let baseExperience;
var loadFullInfo = false;



async function showFullInfo(infoId) {
    if (loading == false) {
        loadFullInfo = true;
        let url = `https://pokeapi.co/api/v2/pokemon/${infoId}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        collectMainData();
        collectType();
        collectBodyProperties();
        getAbilities();
        getEvolution(infoId);
        renderFullInfo(infoId);
        checkForsecendType();
        loadFullInfo = false;
    } else {
        setTimeout(function () { showFullInfo(); }, 3000);
    }
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
        abilities += `${ability}, `;
    }
    abilities = abilities.slice(0, -2); 
    console.log('abilities', abilities);
}


async function getEvolution(infoId) {
        let url = `https://pokeapi.co/api/v2/evolution-chain/${infoId}/`;
        let responseEvo = await fetch(url);
        currentEvo = await responseEvo.json();
}


// ADD STOP SCROLL + STOP SCROLL IN SEARCH
function renderFullInfo(infoId) {
    document.getElementById('fullInfoCard').classList.remove("d-none");
    document.getElementById('closeInfo').classList.remove("d-none");
    document.getElementById('fullInfoCard').innerHTML = `
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
            <div class="detail-nav"><p>About</p><p>Base Stats</p><p>Moves</p></div>
            <div class="about-container">
                <table>
                    <tr>
                        <td>Height</td>
                        <td>${height}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>Height</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td>${abilities}</td>
                    </tr>
                </table>
                <div class="evolution">
                    <h3>Evolution</h3>
                </div>
            </div>

            <div class="base-stats-container">Base Stats</div>

            <div class="moves-container">Moves</div>
        </div>
    </div>
    
    `
}


function closeFullInfo() {
    document.getElementById('fullInfoCard').innerHTML = ''
    document.getElementById('closeInfo').classList.add("d-none");
    document.getElementById('fullInfoCard').classList.add("d-none");
}