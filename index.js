import createCharacterCard from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 1;
let searchQuery = "";

async function fetchCaracters() {
  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  const response = await fetch(url);
  const apiData = await response.json();
  updatePagination();

  console.log(apiData);

  apiData.results.forEach((character) => {
    // cardContainer.innerHTML = "";
    const characterCard = createCharacterCard(character);
    cardContainer.append(characterCard);
  });
}

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    fetchCaracters(page++);
  }
});

prevButton.addEventListener("click", () => {
  if (1 < page) {
    fetchCaracters(page--);
  }
});

function updatePagination() {
  pagination.textContent = `${page}/${maxPage}`;
}

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.value;
  fetchCaracters(searchQuery);
})