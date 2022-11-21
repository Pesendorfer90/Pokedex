let names = ['Alex', 'Berta', 'Christian', 'David', 'Erwin', 'Frederik', 'Gerald'];


function showNames() {
    let list = document.getElementById('list');

    list.innerHTML = '';

    for (let index = 0; index < names.length; index++) {
        const name = names[index];
        list.innerHTML += `<li>${name}</li>`
        
    }
}


function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    let list = document.getElementById('search-result'); // anzeigemenü unter der suchleiste hinzufügen
    list.innerHTML = '';

    for (let index = 0; index < names.length; index++) {
        let name = names[index];
        if(name.toLocaleLowerCase().includes(search)) {
        list.innerHTML += `<li>${pokemon}</li>`;
        } // else hinzufügen falls nichts gefunden wird
    }
}