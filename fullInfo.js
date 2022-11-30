let height;
let weight;
let abilities;
let baseExperience



async function showFullInfo(infoId) {
    if (loading == false) {
        let url = `https://pokeapi.co/api/v2/pokemon/${infoId}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        collectMainData();
        collectType();
        collectBodyProperties();


        renderFullInfo(infoId);
    } else {
        setTimeout(function () { showFullInfo(); }, 3000);
    }
}


function collectBodyProperties() {
    let height = "";
    let weight = "";
    let baseExperience = "";
    height = currentPokemon['height'];
    weight = currentPokemon['weight'];
    baseExperience = currentPokemon['base_experience'];
    // getAbilities();

    console.log('height', height);
    console.log('weight', weight);
    console.log('baseExperience', baseExperience);
    console.log('abilities', getAbilities());
}


function getAbilities() {
    let abilities = "";
    for (i = 0; i < currentPokemon.abilities.length; i++) {
        ability = currentPokemon['abilities'][i]['ability']['name'];
        abilities += `${ability}, `;
    }
    // console.log('abilities', abilities);
    return abilities;
}









// ADD STOP SCROLL + STOP SCROLL IN SEARCH
function renderFullInfo(infoId) {
    document.getElementById('closeInfo').classList.remove("d-none");
    document.getElementById('fullInfoCard').innerHTML = `
    <div class="info-container">
        <div class="pokedex-main-info" style="background-color: var(--c-${currentPokemon['types'][0]['type']['name']})">
            <div class="info-ID">
                <img class="back" src="">
                <div class="ID-container">#${infoId}</div>
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
            <img class="bg-img-full-info" src="img/pokeball.png">
        </div>
        <div class="detail">
            <div class="detail-nav"><p>About</p><p>Base Stats</p><p>Moves</p></div>
            <div>About</div>
            <div>Base Stats</div>
            <div>Moves</div>
        </div>
    </div>
    
    `
}


function closeFullInfo() {
    document.getElementById('fullInfoCard').innerHTML = ''
    document.getElementById('closeInfo').classList.add("d-none");
}