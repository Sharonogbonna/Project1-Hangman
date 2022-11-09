//Setting the variables to html
const lettersContainer = document.getElementById('letter-cont');
const topicsContainer = document.getElementById('topics-cont');
const userInputSection = document.getElementById('user-input-sec');
const newGameContain = document.getElementById('newgame-cont');
const newGameButton = document.getElementById('newgame-button');
const canvas = document.getElementById('canvas');
const resultText = document.getElementById('results');


//Topic options for the game
let topics = {
    neuroanatomy: [
        'Dendron',
        'Neuron', 
        'Synapse',
        'nodes of Ranvier',
        'Axon',
        'Cerebral Cortex',
        'Central Nervous System',
        'Brain',
        'Pia Mater',
        'Amygdala',
        'Soma',
        'Blood Brain Barrier',
        'Myelin Sheath'
    ],
    kitchenUtensils: [
        'Spatula',
        'Sauce Pan',
        'Pot',
        'Tongs',
        'Ladle',
        "Chef's Knife",
        'Cutting Board', 
        'Cheese Grater', 
        'Peeler', 
        'Tenderizer',
        'Pizza Cutter',
        'Mezzaluna',
        'Bench Scraper',
        'Sifter'
    ]
}


const displayOptionButtons = () => {
    topicsContainer.innerHTML += `<p>Please Select a Topic</p>`;
    let topicCont = document.createElement('div');
    for(let topic in topics){
        topicCont.innerHTML += `<button class="topics" onclick="chooseWord('${topic}')">${topic}</button>`;
    }
topicsContainer.appendChild(topicCont);
}

const chooseWord = (chosenTopicWord) => {
    let topicButtons = document.querySelectorAll('.topics');
    topicButtons.forEach(function (button) {
        if(button.innerText.toLowerCase() === chosenTopicWord){
            button.classList.add('active');
        }button.disabled = true;
    })
}



displayOptionButtons()