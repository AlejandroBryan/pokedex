const app = document.querySelector('#app');
let markUp = ' ';


let item1 =     {
    name: "Bulbasaur",
    index: 1,
    height: .7,
    weight: 6.9,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison'],
    abilities:['chlorophyll', 'overgrow']
    

}

let item2 =   {
    name: "Charmander",
    index: 4,
    height: 0.6,
    weight: 8.5,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    types: [
      "fire"
    ],
    abilities: [
      "blaze",
      "solar-power"
    ]
  }

  let item3 = {
    name: "Butterfree",
    index: 12,
    height: 1.1,
    weight: 32,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    types: [
      "bug",
      "flying"
    ],
    abilities: [
      "compoundeyes",
      "tinted-EVs: lens"
    ]
  }

  let item4 = {
    name: "Picachu",
    index: 25,
    height: 0.4,
    weight: 6,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    types: ["electric"],
    abilities: [
      "static",
      "lightinngrod"
    ]
  }
   

let pokemonRepository = (function(){

    let pokemonList = [];
    let filteredPokemon = [];

// add items to the 

    function add ( item ) {
       if(item !== undefined){
        return addVerification(item)

       }   
       return `Please add you the parameter type of object`      
    }

 // display to the cosonle

    function  getAll() {
        return pokemonList;
       
    }

 // verify the inputs before pushing to the 
    function addVerification( item ) {

        if ( !item.name && !item.types
             && !item.height && !item.weight 
             && !item.image &&  !item.abilities && !item.index ) {
            return print(`Plesse make sure you are adding all the properties to the object `)
        }
         else if( Object.keys(item).length < 7 ) {
            return print(`Please make sure ${item} contain a least 7 properties`) 
        }  
         else {
            return pokemonList.push(item)  
            
        }

    }


    return{
        add: add,
        getAll: getAll
        
    }

})();






pokemonRepository.add(item1)
pokemonRepository.add(item2)
pokemonRepository.add(item3)
pokemonRepository.add(item4)

const pokemonList = pokemonRepository.getAll()
 

pokemonList.forEach(displayUI);
pokemonList.forEach(print);

function displayUI (item){
 
    const {image, types, index, name, abilities, height, weight } = item;

    markUp += `
    <div class="card">
        <span class="avatar" style="background-image: url(${image}); background-repeat: no-repeat;background-size: cover; background-position: center center"></span>

        <span class="index">#${index}</span>
        <div class="types-list"> 
        ${renderElements('types', types)}
        </div>
        <div class="card-body">
            <h2>${name} Height: ${height >= 1 ? height  + ' - Wow that\'s big!' : height  + ' '}</h2>
            <div>Weight: ${weight}</div>
            <h4>Abilities</h4>
            <div class="label-list">
            ${renderElements('label', abilities)}
            </div>
        </div>

    </div> 
`;
 app.innerHTML = markUp;

}


function renderElements(className, elements) {
    return ` ${elements.map(element => `<div class="${className}"> *${element} </div>`).join(' ')} `;
}

function print( arg){
 console.log(arg);
 }

