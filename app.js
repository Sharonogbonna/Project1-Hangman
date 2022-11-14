//#region Setting the variables to html
const lettersContainer = document.getElementById("letter-cont");
const topicsContainer = document.getElementById("topics-cont");
const userInputSection = document.getElementById("user-input-sec");
const newGameContainer = document.getElementById("newgame-cont");
const newGameButton = document.getElementById("newgame-button");
const resultText = document.getElementById("results");
const guessTracker = document.getElementById("guess-tracker");
const body = document.getElementsByTagName("BODY");
const modalContainer = document.getElementById("modal-cont");
let modal = document.getElementById("myModal");
let btn = document.getElementById("guess-button");
let span = document.getElementsByClassName("close")[0];
let submitButton = document.getElementById("submit");
let typedGuess = document.getElementById("typed-guess")
//#endregion

//#region //Topic options for the game
let topics = {
  neuroanatomy: [
    "Dendron",
    "Neuron",
    "Synapse",
    "nodes  of  Ranvier",
    "Axon",
    "Cerebral  Cortex",
    "Central  Nervous  System",
    "Brain",
    "Pia  Mater",
    "Amygdala",
    "Soma",
    "Blood  Brain  Barrier",
    "Myelin Sheath",
  ],
  cooking: [
    "Spatula",
    "Sauce  Pan",
    "Pot",
    "Tongs",
    "Ladle",
    "Chefs  Knife",
    "Cutting  Board",
    "Cheese  Grater",
    "Peeler",
    "Tenderizer",
    "Pizza  Cutter",
    "Mezzaluna",
    "Bench  Scraper",
    "Sifter",
  ],
  christmas: [
    "christmas",
    "candy  canes",
    "thanksgiving",
    "chimney",
    "cookies",
    "santa",
    "kwanza",
    "hanukkah",
    "bells",
    "bethlehem",
    "angels",
    "egg  nog",
    "mistletoe",
    "New  Year",
    "turkey",
    "snowflakes",
    "winter",
    "wrapping  paper",
  ],
};
//#endregion

//#region //other declarations
let chosenWord = "";
let guessedLetters = [];
let wrongLetters = [];
let displayWord = null;
let winCount = 0;
let maxWrong = null;
let backgroundMusic = null

//audio things
let defaultMusic = new Audio('./audio/lofi-study-112191.mp3');
let christmasMusic = new Audio('./audio/christmas-knocking-to-the-door.mp3')
let cheersSound = new Audio('./audio/cheering.wav')
let laughSound = new Audio('./audio/laughter.wav')
let volume = document.querySelector("#volume-control");
volume.addEventListener("input", function(e) {
defaultMusic.volume = e.currentTarget.value / 100;
christmasMusic.volume = e.currentTarget.value / 100;
cheersSound.volume = e.currentTarget.value / 100;
laughSound.volume = e.currentTarget.value / 100;
})
//#endregion

//#region Display topics and blocker
const displayTopicButtons = () => {
  topicsContainer.innerHTML += `<p>Please Select a Topic</p>`;
  let topicCont = document.createElement("div");
  for (let topic in topics) {
    topicCont.innerHTML += `<button class="topics" id="${topic}" onclick="chooseWord('${topic}')">${topic}</button>`;
  }
  topicsContainer.appendChild(topicCont);
};

//Block all of the buttons
const blocker = () => {
  let topicButtons = document.querySelectorAll(".topics");
  let letterButtons = document.querySelectorAll(".letters");
  //disable topics
  topicButtons.forEach(function (button) {
    button.disabled = true;
  });
  //disable letters
  letterButtons.forEach(function (button) {
    button.disabled.true;
  });
  btn.disabled.true;
  newGameContainer.classList.remove("hide");
};
//#endregion

//#region Show win, loss, and number of wrong guess
const showLoss = () => {
  if (wrongLetters.length == maxWrong) {
  console.log("You Lose!");
  resultText.innerHTML = `<h2 class="lose-msg"> You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
  laughSound.play()
  blocker();
  }
};
const showWin = () => {
  console.log("You Win!");
  resultText.innerHTML = `<h2 class="win-msg"> You win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
  cheersSound.play()
  blocker();
};
const displayGuessTracker = () => {
  if (chosenWord.replace(/\s/g, "").length <= 6) {
    maxWrong = 3;
  } else if (
    chosenWord.replace(/\s/g, "").length > 6 &&
    chosenWord.replace(/\s/g, "").length <= 15
  ) {
    maxWrong = 5;
  } else {
    maxWrong = 7;
  }
  guessTracker.innerHTML = `<p><strong>Wrong Guesses:</strong> <span>${wrongLetters.length}</span> of ${maxWrong}</p>`;
};
//#endregion

//#region Themes
const convertHolidayTheme = () => {
  document.body.style.backgroundImage = "url('./images/candycanes.png')";
  document.body.style.backgroundSize = "100px 100px";
  let title = document.querySelector(".title");
  title.style.color = "#eb3543";
  let container = document.querySelector(".container");
  container.style.background = "#ffffff";
  container.style.borderColor = "#eb3543";
  volume.style.color = "#eb3543";
  const letterCollection = lettersContainer.children;
  for (let i = 0; i < letterCollection.length; i++) {
    letterCollection[i].style.backgroundColor = "#549a3f";
  }
  backgroundMusic.pause()
  christmasMusic.play()
};
const resetTheme = () => {
  document.body.style.backgroundImage = "";
  document.body.style.backgroundSize = "";
  let title = document.querySelector(".title");
  title.style.color = "";
  let container = document.querySelector(".container");
  container.style.background = "";
  container.style.borderColor = "";
  volume.style.color= "";
  const letterCollection = lettersContainer.children;
  for (let i = 0; i < letterCollection.length; i++) {
    letterCollection[i].style.backgroundColor = "";
  }
  backgroundMusic = defaultMusic;
};
//#endregion

//#region modal
// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
submitButton.onclick = function (e) {
  let filteredGuess = typedGuess.value.replace(/\s/g, "").toUpperCase();
  let filteredWord = chosenWord.replace(/\s/g, "");
  modal.style.display = "none";
  if (filteredWord == filteredGuess) {
    showWin();
  } else {
    wrongLetters.push(filteredGuess);
    displayGuessTracker();
    typedGuess.value = ''
  }
};
//#endregion

//#region Generate word for topic selected
const chooseWord = (topicValue) => {
  let topicButtons = document.querySelectorAll(".topics");
  topicButtons.forEach(function (button) {
    if (button.innerText.toLowerCase() === topicValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  //unhide all letters once the topic is chosen
  topicsContainer.children[0].innerText = '';
  lettersContainer.classList.remove("hide");
  guessTracker.classList.remove("hide");
  modalContainer.classList.remove("hide");
  volume.classList.remove("hide")
  userInputSection.innerText = "";
  displayGuessTracker();
  backgroundMusic.play()
  


  let topicArray = topics[topicValue];
  //randomly select word
  chosenWord = topicArray[Math.floor(Math.random() * topicArray.length)];
  chosenWord = chosenWord.toUpperCase();
  console.log(chosenWord);
  //replace letters with dashes
  displayWord = chosenWord.replace(/[^ ]/g, "_");
  //display as dashes
  userInputSection.innerHTML = displayWord;
};
//#endregion

//#region create letter buttons function
const updateWord = (button) => {
  guessedLetters.push(button.innerText);
      //updating word as letter are correctly guessed
      displayWord = "";
      winCount = 0;
      for (let i = 0; i < chosenWord.length; i++) {
        if (guessedLetters.includes(chosenWord[i])) {
          displayWord += chosenWord[i];
          winCount += 1;
          if (chosenWord.includes(guessedLetters[guessedLetters.length - 1])) {
            button.classList.add("inWord");
          }
        } else if (chosenWord[i] === " ") {
          displayWord += " ";
        } else {
          displayWord += "_";
        }
      }
      userInputSection.innerHTML = displayWord;
      button.disabled = true;
}
const setWinCondition = () => {
  let filteredWord = displayWord
        .split("")
        .filter((letter) => letter != " " && letter != "_");
      filteredWord = filteredWord.join("");
      if (displayWord.includes(" ")) {
        if (displayWord.replace(/\s/g, "").length == winCount) {
          showWin();
        }
      } else if (filteredWord.length == displayWord.length) {
        showWin();
      }
}
//#endregion

//#region Initiate Game
//runs when page is loaded and when player clicks new game
const initiateGame = () => {
  winCount = 0;
  guessedLetters = [];
  wrongLetters = [];
  //remove previously chosen word, content and hide new game button and letters
  userInputSection.innerHTML = "";
  topicsContainer.innerHTML = "";
  lettersContainer.innerHTML = "";
  guessTracker.innerHTML = "";
  typedGuess.value = ''
  newGameContainer.classList.add("hide");
  lettersContainer.classList.add("hide");
  guessTracker.classList.add("hide");
  modalContainer.classList.add("hide");
  volume.classList.add('hide');
  resetTheme();
  backgroundMusic.pause();
  christmasMusic.pause();
  //creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    char = String.fromCharCode(i);
    button.innerText = char
    //button.key = char
    button.addEventListener("click", function (e) {
      updateWord(button);
      setWinCondition();
      if (!chosenWord.includes(e.target.innerText)) {
        wrongLetters.push(button.innerText);
      }
      displayGuessTracker();
      showLoss();
      });
    lettersContainer.append(button);
  }
  document.addEventListener('keyup', function(e){
    char = String.fromCharCode(`${e.which}`);
    e.letter = `${char}`;
    console.log(e)
    guessedLetters.push(e.letter);
      //updating word as letter are correctly guessed
      displayWord = "";
      winCount = 0;
      for (let i = 0; i < chosenWord.length; i++) {
        if (guessedLetters.includes(chosenWord[i])) {
          displayWord += chosenWord[i];
          winCount += 1;
        } else if (chosenWord[i] === " ") {
          displayWord += " ";
        } else {
          displayWord += "_";
        }
      }
      userInputSection.innerHTML = displayWord;
    setWinCondition();
    if (!chosenWord.includes(e.letter)) {
      wrongLetters.push(e.letter);
    }
    console.log(wrongLetters)
    displayGuessTracker();
    showLoss();
  })
  displayTopicButtons();
  let holidayButton = document.getElementById("christmas");
  holidayButton.addEventListener("click", convertHolidayTheme);
};
//#endregion
newGameButton.addEventListener("click", initiateGame);
window.onload = initiateGame;
