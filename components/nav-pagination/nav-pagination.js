const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = ButtonPrev();
const nextButton = ButtonNext();
const pagination = paginationDisplay();

// States
let maxPage = 42;
let page = 1;

function createButton() {
  const button = document.createElement("button");
  button.classList.add("button");
  return button;
}

export function ButtonPrev() {
  const prevButton = createButton();
  prevButton.textContent = "previous";
  prevButton.classList.add("button--prev");
  prevButton.setAttribute("data-js", "button-prev");
  return prevButton;
}

export function paginationDisplay() {
  const display = document.createElement("span");
  display.classList.add("navigation__pagination");
  display.setAttribute("data-js", "pagination");
  display.textContent = `1/42`;
  return display;
}

export function ButtonNext() {
  const nextButton = createButton();
  nextButton.textContent = "next";
  nextButton.classList.add("button--next");
  nextButton.setAttribute("data-js", "button-next");
  return nextButton;
}

navigation.append(prevButton, pagination, nextButton);
