const wordsList = [
  "the",
  "name",
  "of",
  "very",
  "to",
  "through",
  "and",
  "just",
  "form",
  "in",
  "is",
  "it",
  "you",
  "that",
  "he",
  "was",
  "for",
  "on",
  "are",
  "with",
  "as",
  "his",
  "they",
  "be",
  "at",
  "one",
  "have",
  "this",
  "from",
  "or",
  "had",
  "by",
  "not",
  "word",
  "but",
  "what",
  "some",
  "we",
  "can",
  "out",
  "other",
  "were",
  "all",
  "there",
  "when",
  "up",
  "use",
  "your",
  "how",
  "said",
  "an",
  "each",
  "she",
  "which",
  "do",
  "their",
  "time",
  "if",
  "will",
  "way",
  "about",
  "many",
  "then",
  "them",
  "write",
  "would",
  "like",
  "so",
  "these",
  "her",
  "long",
  "make",
  "thing",
  "see",
  "him",
  "two",
  "has",
  "look",
  "more",
  "day",
  "could",
  "go",
  "come",
  "did",
  "number",
  "sound",
  "no",
  "most",
  "people",
  "my",
  "over",
  "know",
  "water",
  "than",
];

const textDisplay = document.getElementById("textDisplay");
const input = document.getElementById("typeInput");
const timerDisplay = document.getElementById("timer");
let timeLeft = 60;
let timer = null;
let isTyping = false;
let currentWord = 0;
let correctWords = 0;

function displayWords(words) {
  textDisplay.innerHTML = "";
  words.forEach((word, index) => {
    let wordSpan = document.createElement("span");
    wordSpan.classList.add("word");
    wordSpan.id = "word-" + index;
    word.split("").forEach((char) => {
      let charSpan = document.createElement("span");
      charSpan.innerText = char;
      wordSpan.appendChild(charSpan);
    });
    textDisplay.appendChild(wordSpan);
  });
}

function startTimer() {
  timer = setInterval(() => {
    --timeLeft;
    timerDisplay.innerText = timeLeft + "s";
    if (timeLeft <= 10) {
      timerDisplay.style.color = "red";
    }
    if (timeLeft <= 0) {
      gameOver();
    }
  }, 1000);
}

function updateColors(typed, currentWordSpan) {
  let letters = currentWordSpan.querySelectorAll("span");
  letters.forEach((letter) => {
    letter.style.color = "";
    letter.style.backgroundColor = "";
  });
  for (let i = 0; i < typed.length; ++i) {
    if (i < letters.length) {
      if (typed[i] === letters[i].innerText) {
        letters[i].style.color = "green";
      } else {
        letters[i].style.color = "red";
        letters[i].style.backgroundColor = "#f8d7da";
      }
    }
  }
}

function wordInput(typedWord, targetWord, currentWordSpan) {
  if (typedWord === targetWord) {
    ++correctWords;
  } else {
    currentWordSpan.style.textDecoration = "underline red 3px";
  }
  ++currentWord;
  input.value = "";
  let nextWordSpan = document.getElementById("word-" + currentWord);
  if (!nextWordSpan) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(timer);
  input.disabled = true;
  timerDisplay.style.color = "green";
  timerDisplay.innerText = correctWords + " words correct!";
}

function gameLoop() {
  displayWords(wordsList);
  input.focus();
}
input.addEventListener("input", () => {
  if (!isTyping) {
    isTyping = true;
    startTimer();
  }
  let typed = input.value;
  let currentWordSpan = document.getElementById("word-" + currentWord);
  let targetWord = wordsList[currentWord];
  if (typed.endsWith(" ")) {
    wordInput(typed.trim(), targetWord, currentWordSpan);
  } else {
    updateColors(typed, currentWordSpan);
  }
});

gameLoop();
