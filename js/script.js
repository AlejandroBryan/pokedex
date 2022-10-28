const app = document.querySelector('#app');
let markUp = ' ';

let pokemonList = [
    {
        name: "Bulbasaur",
        index: 1,
        height: .7,
        weight: 6.9,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        types: ['grass, poison'],
        abilities:['chlorophyll', 'overgrow']
        

    },
    {
        name: 'Charmander',
        index: 4,
        height: .6,
        weight: 8.5,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        types: ['fire'],
        abilities: ['blaze', 'solar-power']
    },
    {
        name: 'Butterfree',
        index: 12,
        height: 1.1,
        weight: 32,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png',
        types: ['bug', 'flying'],
        abilities: ['compoundeyes', 'tinted-EVs: lens']
    }


];



for(let i = 0; i < pokemonList.length; i++){
    print(pokemonList[i])

    
    markUp += `
            <div class="card">
                <span class="avatar" style="background-image: url(${pokemonList[i].image}); background-repeat: no-repeat;background-size: cover; background-position: center center"></span>

                <span class="index">#${pokemonList[i].index}</span>
                ${renderElements('types', pokemonList[i].types)}
                <div class="card-body">
                    <h2>${pokemonList[i].name} Height: ${pokemonList[i].height >= 1 ? pokemonList[i].height + ' - Wow that\'s big!' : pokemonList[i].height + ' '}</h2>
                    <div>Weight: ${pokemonList[i].weight}</div>
                    <h4>Abilities</h4>
                    <div class="label-list">
                    ${renderElements('label', pokemonList[i].abilities)}
                    </div>
                </div>

            </div> 
`;
app.innerHTML = markUp;
}


function renderElements(atribute, elements) {
    return ` ${elements.map(element => `<div class="${atribute}">  ${element} </div>`).join('')} `;
}


function print( arg){
 console.log(arg);
 }