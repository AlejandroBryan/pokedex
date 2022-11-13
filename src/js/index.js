import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  // printing to the console
  const print = (arg) => console.log(arg);

  // add items to the

  function add(pokemon) {
    if (pokemon) {
      return addVerification(pokemon);
    }
    return `Please add you the parameter type of object`;
  }

  // display to the console
  function getAll() {
    return pokemonList;
  }

  //fetch the data from the pokemon`s api
  function loadPokemon() {
    return fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((pokemons) => {
          let pokemon = {
            name: pokemons.name,
            url: pokemons.url,
          };

          this.add(pokemon);
        });
      });
  }

  // the printPokemonEvent function
  function printPokemonEvent(element, pokemon) {
    return element.addEventListener('click', () => showDetails(pokemon));
  }

  function addListItem(pokemon) {
    const button = document.createElement('button');
    button.classList.add('detail__button');
    button.innerText = pokemon.name;
    // invoke the printPokemonEvent function
    printPokemonEvent(button, pokemon);

    let listItem = document.createElement('li');
    listItem.appendChild(button);

    const pokeList = document.querySelector('.pokemon__list');
    pokeList.appendChild(listItem);
  }
  function loadDetails(pokemon) {
    return fetch(pokemon.url)
      .then((res) => res.json())
      .then((details) => {
        pokemon.imgUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      })
      .catch((e) => print(e));
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => print(pokemon));
  }

  // verify the inputs before pushing to the
  function addVerification(pokemon) {
    if (!pokemon.name && !pokemon.height && !pokemon.imgUrl) {
      return print(`Please make sure you are adding all the properties to the object `);
    } else {
      return pokemonList.push(pokemon);
    }
  }

  return {
    add: add,
    getAll: getAll,
    loadPokemon: loadPokemon,
    addListItem: addListItem,
  };
})();

const pokemonList = pokemonRepository;

pokemonList.loadPokemon().then(() => {
  pokemonList.getAll().forEach((pokemon) => {
    pokemonList.addListItem(pokemon);
  });
});
