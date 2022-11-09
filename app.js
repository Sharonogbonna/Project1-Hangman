//Setting the variables to html
const lettersContainer = document.getElementById('letter-cont');
const topicsContainer = document.getElementById('topics-cont');
const userInputSection = document.getElementById('user-input-sec');
const newGameContainer = document.getElementById('newgame-cont');
const newGameButton = document.getElementById('newgame-button');
const canvas = document.getElementById('canvas');
const resultText = document.getElementById('results');


//Topic options for the game
let topics = {
    neuroanatomy: [
        'Dendron',
        'Neuron', 
        'Synapse',
        'nodes  of  Ranvier',
        'Axon',
        'Cerebral  Cortex',
        'Central  Nervous  System',
        'Brain',
        'Pia  Mater',
        'Amygdala',
        'Soma',
        'Blood  Brain  Barrier',
        'Myelin Sheath'
    ],
    cooking: [
        'Spatula',
        'Sauce  Pan',
        'Pot',
        'Tongs',
        'Ladle',
        "Chef's  Knife",
        'Cutting  Board', 
        'Cheese  Grater', 
        'Peeler', 
        'Tenderizer',
        'Pizza  Cutter',
        'Mezzaluna',
        'Bench  Scraper',
        'Sifter'
    ]
}

//other declarations
let chosenWord = '';
let maxWrong = 7;
let guessedLetters = [];
let displayWord = null;
let winCount = 0;
let count = 0;

const displayTopicButtons = () => {
    topicsContainer.innerHTML += `<p>Please Select a Topic</p>`;
    let topicCont = document.createElement('div');
    for(let topic in topics){
        topicCont.innerHTML += `<button class="topics" onclick="chooseWord('${topic}')">${topic}</button>`;
    }
topicsContainer.appendChild(topicCont);
}

//Block all of the buttons
const blocker = () => {
    let topicButtons = document.querySelectorAll('.topics');
    let letterButtons = querySelectorAll('.letters');
    //disable topics
    topicButtons.forEach(function (button){
        button.disabled = true;
    });
    //disable letters
    letterButtons.forEach(function (button){
        button.disabled.true;
    });
    newGameContainer.classList.remove('hide');
};
 
//generate word for topic selected
const chooseWord = (topicValue) => {
    let topicButtons = document.querySelectorAll('.topics');
    topicButtons.forEach(function (button) {
        if(button.innerText.toLowerCase() === topicValue){
            button.classList.add('active');
        }button.disabled = true;
    });
    //unhide all letters once the topic is chosen
    lettersContainer.classList.remove('hide');
    userInputSection.innerText = '';

    let topicArray = topics[topicValue];
    //randomly select word
    chosenWord = topicArray[Math.floor(Math.random() *topicArray.length)]
    chosenWord = chosenWord.toUpperCase()
    console.log(chosenWord)
    //replace letters with dashes 
    updateWord()
    // displayWord = chosenWord.replace(/[^ ]/g, '_');
    //may need to alter because of <span class="dashes">_</span>
//display as dashes
userInputSection.innerHTML = displayWord

};
const updateWord = () => {
    displayWord = '';
    for(let i = 0; i < chosenWord.length; i++){
        if(guessedLetters.includes(chosenWord[i])){
            displayWord += chosenWord[i];
        }else if (chosenWord[i]=== ' '){
            displayWord += ' ';
        }else{
            displayWord += '_'
        }
    }
    userInputSection.innerHTML = displayWord
    console.log(displayWord)
    return displayWord
}
//runs when page is loaded and when player clicks new game
const initiateGame = () => {
    winCount = 0;
    count = 0;
    //remove previously chosen word, content and hide new game button and letters
    userInputSection.innerHTML = '';
    topicsContainer.innerHTML = '';
    lettersContainer.innerHTML = '';
    newGameContainer.classList.add('hide');
    lettersContainer.classList.add('hide');

    //creating letter buttons
    for(let i = 65; i <91; i++){
      let button = document.createElement('button');
      button.classList.add("letters");  
      button.innerText = String.fromCharCode(i);
      button.addEventListener('click', function(e){
        guessedLetters.push(button.innerText)
        console.log(guessedLetters)
        updateWord()
      })
      lettersContainer.append(button);
    };

    displayTopicButtons();
};
newGameButton.addEventListener("click", initiateGame);
window.onload = initiateGame;




