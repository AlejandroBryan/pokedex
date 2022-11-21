import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import '../css/style.css';

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

  function addListItem(pokemon) {
    const button = document.createElement('button');
    button.classList.add('detail__button');
    button.innerText = pokemon.name;
    button.addEventListener('click', (e) => showDetails(pokemon));

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
    loadDetails(pokemon).then(() => showModal(pokemon));
  }

  // verify the inputs before pushing to the
  function addVerification(pokemon) {
    if (!pokemon.name && !pokemon.height && !pokemon.imgUrl) {
      return print(`Please make sure you are adding all the properties to the object `);
    } else {
      return pokemonList.push(pokemon);
    }
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal__container');

    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal__close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', () => hideModal());

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let typesList = document.createElement('div');
    typesList.classList.add('types-list');
    renderElements('types-list', pokemon.types);

    let contentElement = document.createElement('span');
    contentElement.innerText = pokemon.height;

    let modalBody = document.createElement('div');
    modalBody.classList.add('modal__body');

    let imageElement = document.createElement('span');
    imageElement.style.cssText = `background-repeat: no-repeat;background-size:100%;background-position:center`;
    imageElement.style.backgroundImage = `url('${pokemon.imgUrl}')`;
    imageElement.classList.add('avatar');
    modalBody.appendChild(imageElement);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(modalBody);
    modalContainer.appendChild(modal);

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    modalContainer.classList.add('is__visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal__container');
    return modalContainer.classList.remove('is__visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal__container');
    if (e.key === 'Escape' || modalContainer.classList.contains('is__visible')) {
      hideModal();
    }
  });

  function renderElements(className, elements) {
    return ` ${elements
      .map((element) => `<div class="${className}"> *${element} </div>`)
      .join(' ')} `;
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
