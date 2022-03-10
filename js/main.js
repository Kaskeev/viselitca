const wordE1 = document.getElementById("word");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const descName = document.getElementById("desc__name");
let rightContent = document.querySelector(".right__content");
let startBtn = document.getElementById("start__btn");
let start = document.querySelector(".start");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["лодка", "телефон", "камень"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

startBtn.addEventListener("click", function () {
  rightContent.style.display = "block";
  startBtn.style.display = "none";
  start.style.display = "none";
});
function displayWord() {
  wordE1.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `
      )
      .join("")}
    `;
  const innerWord = wordE1.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Поздравляю! Ты выиграл!";
    popup.style.display = "flex";
  }
  if (selectedWord == "лодка") {
    descName.innerText = "Что то плавающее";
  } else if (selectedWord == "телефон") {
    descName.innerText = "Чем мы пользуемся каждый день";
  } else if (selectedWord == "камень") {
    descName.innerText = "Что то твердое";
  }
}

function updateWrongLetterE1() {
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "ТЫ проиграл.";
    popup.style.display = "flex";
  }
}
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterE1();
      } else {
        showNotification();
      }
    }
  }
});

playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetterE1();

  popup.style.display = "none";
});

displayWord();
