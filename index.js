import createCharacterCard from "./components/card/card.js";
import { ButtonPrev } from "./components/nav-pagination/nav-pagination.js";
import { ButtonNext } from "./components/nav-pagination/nav-pagination.js";
import { paginationDisplay } from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

//dark mode
const switchBtn = document.querySelector('[data-js="switch"]');
const body = document.getElementsByTagName("body");

const settings = document.querySelector('[data-js="settings"]');

switchBtn.addEventListener("click", ()=> {
    document.body.classList.toggle("dark-mode");

    body.classList.toggle("dark-mode");
    settings.classList.toggle("dark-mode");
});


// States
let maxPage = 42;
let page = 1;
let searchQuery = "";
fetchCharacters();
// maxPage();
export async function fetchCharacters() {
  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;

  const response = await fetch(url);
  const apiData = await response.json();

  updatePagination();

  console.log(apiData);

  cardContainer.innerHTML = "";

  apiData.results.forEach((character) => {
    const characterCard = createCharacterCard(character);
    cardContainer.append(characterCard);
  });

  // Set maxPage based on the number of pages in the API response
  if (searchQuery === "") {
    page = 1;
  }
  if (apiData.info && apiData.info.pages) {
    maxPage = apiData.info.pages;
  }
}

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    fetchCharacters(page++);
  }
});

prevButton.addEventListener("click", () => {
  if (1 < page) {
    fetchCharacters(page--);
  }
});

function updatePagination() {
  pagination.textContent = `${page}/${maxPage}`;
}

searchBar.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  fetchCharacters();
});



