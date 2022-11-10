//#region Declarations
//Setting the variables to html
const lettersContainer = document.getElementById("letter-cont");
const topicsContainer = document.getElementById("topics-cont");
const userInputSection = document.getElementById("user-input-sec");
const newGameContainer = document.getElementById("newgame-cont");
const newGameButton = document.getElementById("newgame-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("results");
const guessTracker = document.getElementById("guess-tracker");

//Topic options for the game
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
  //   holiday: []
};

//other declarations
let chosenWord = "";
let guessedLetters = [];
let wrongLetters = [];
let displayWord = null;
let winCount = 0;
let maxWrong = null
//#endregion

//#region Display topics and blocker
const displayTopicButtons = () => {
  topicsContainer.innerHTML += `<p>Please Select a Topic</p>`;
  let topicCont = document.createElement("div");
  for (let topic in topics) {
    topicCont.innerHTML += `<button id="${topic}"class="topics" onclick="chooseWord('${topic}')">${topic}</button>`;
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
  newGameContainer.classList.remove("hide");
};
//#endregion

//#region Show win, loss, and number of wrong guess
const showLoss = () => {
    console.log("You Lose!");
    resultText.innerHTML = `<h2 class="lose-msg"> You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
    blocker();
  };
  const showWin = () => {
    console.log("You Win!");
    resultText.innerHTML = `<h2 class="win-msg"> You win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
    blocker();
  };
const displayGuessTracker = () => {
    guessTracker.innerHTML = `<p><strong>Wrong Guesses:</strong> <span>${wrongLetters.length}</span> of ${maxWrong}</p>`
}
//#endregion

//#region Generate word 
//generate word for topic selected
const chooseWord = (topicValue) => {
  let topicButtons = document.querySelectorAll(".topics");
  topicButtons.forEach(function (button) {
    if (button.innerText.toLowerCase() === topicValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  //unhide all letters once the topic is chosen
  lettersContainer.classList.remove("hide");
  guessTracker.classList.remove('hide');
  userInputSection.innerText = "";

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
  guessTracker.innerHTML = '';
  newGameContainer.classList.add("hide");
  lettersContainer.classList.add("hide");
  guessTracker.classList.add('hide');
  //creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", function (e) {
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
      //set win condition
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
      //make lose case
      if (!chosenWord.includes(e.target.innerText)) {
        wrongLetters.push(button.innerText);
      }
      if(displayWord.replace(/\s/g, "").length <= 6){
        maxWrong = 3
        displayGuessTracker()
      }else if(displayWord.replace(/\s/g, "").length > 6 && displayWord.replace(/\s/g, "").length <= 15){
        maxWrong = 5
        displayGuessTracker()
      }else{
        maxWrong = 7
        displayGuessTracker()
      }
      if(wrongLetters.length == maxWrong){
        showLoss()
      }
      userInputSection.innerHTML = displayWord;
      button.disabled = true;
    });
    lettersContainer.append(button);
  }
  displayTopicButtons();
};
//#endregion
newGameButton.addEventListener("click", initiateGame);
window.onload = initiateGame;