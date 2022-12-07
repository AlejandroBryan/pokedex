import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import 'bootstrap';

const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=90&limit=12';

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

  function addListItem(pokemon) {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-light');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#my__modal');
    button.innerText = pokemon.name;
    button.addEventListener('click', (e) => showDetails(pokemon));

    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.appendChild(button);

    const pokeList = document.querySelector('.list-group');
    pokeList.appendChild(listItem);
  }
  function loadDetails(pokemon) {
    return fetch(pokemon.url)
      .then((res) => res.json())
      .then((details) => {
        pokemon.imgUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map((type) => type.type.name);
        pokemon.abilities = details.abilities.map((ability) => ability.ability.name);
      })
      .catch((e) => print(e));
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => showModal(pokemon));
  }

  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = '';

    let modalHeader = document.querySelector('.modal-title');
    modalHeader.textContent = pokemon.name;

    let typesList = document.createElement('div');
    typesList.classList.add('d-flex', 'my-4');

    let abilityList = document.createElement('div');
    abilityList.classList.add('d-flex');

    let contentElement = document.createElement('span');
    contentElement.textContent = `Height: ${pokemon.height}`;

    let image = document.createElement('img');
    image.src = `${pokemon.imgUrl}`;
    image.classList.add('img-fluid', 'mb-1');

    modalBody.appendChild(image);
    modalBody.appendChild(contentElement);
    modalBody.appendChild(typesList);
    modalBody.appendChild(abilityList);

    displayElements('Types ::', 'badge bg-primary mx-1', typesList, pokemon.types);
    displayElements('Abilities ::', 'badge bg-danger mx-1', abilityList, pokemon.abilities);

    return modalBody;
  }

  // verify the inputs before pushing to the
  function addVerification(pokemon) {
    if (!pokemon.name && !pokemon.height && !pokemon.imgUrl) {
      return print(`Please make sure you are adding all the properties to the object `);
    } else {
      return pokemonList.push(pokemon);
    }
  }

  function displayElements(attribute, className, parentEl, pokemon) {
    let item = ' ';
    return pokemon.map((element) => {
      item += `<span class="${className}"> ${element} </span>`;
      parentEl.innerHTML = `<h6>${attribute}</h6> ${item}`;
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadPokemon: loadPokemon,
    addListItem: addListItem,
    showDetails: showDetails,
    loadDetails: loadDetails,
  };
})();

const pokemonList = pokemonRepository;

pokemonList.loadPokemon().then(() => {
  pokemonList.getAll().forEach((pokemon) => {
    pokemonList.addListItem(pokemon);
  });
});
