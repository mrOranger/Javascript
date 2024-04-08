const paperIcon = document.getElementById('paper');
const rockIcon = document.getElementById('rock');
const scissorsIcon = document.getElementById('scissors');
const choice = document.getElementById('choice');

const PAPER_CHOICE = 'paper';
const ROCK_CHOICE = 'rock';
const SCISSORS_CHOICE = 'scissors';

let currentChoice = null;
let finalChoice = null;

paperIcon.addEventListener('mouseover', function onPaperIconHover() {
      if (currentChoice != PAPER_CHOICE && !finalChoice) {
            choice.innerText = `Choose you weapon ... ${PAPER_CHOICE}!`;
            currentChoice = PAPER_CHOICE;
      }
});

rockIcon.addEventListener('mouseover', function onRockIconHover() {
      if (currentChoice != ROCK_CHOICE && !finalChoice) {
            choice.innerText = `Choose you weapon ... ${ROCK_CHOICE}!`;
            currentChoice = ROCK_CHOICE;
      }
});

scissorsIcon.addEventListener('mouseover', function onScissorsIconHover() {
      if (currentChoice != SCISSORS_CHOICE && !finalChoice) {
            choice.innerText = `Choose you weapon ... ${SCISSORS_CHOICE}!`;
            currentChoice = SCISSORS_CHOICE;
      }
});

paperIcon.addEventListener('click', function onPaperIconHover() {
      if (finalChoice != PAPER_CHOICE) {
            choice.innerText = `Choose you weapon ... ${PAPER_CHOICE}!`;
            finalChoice = PAPER_CHOICE;
      }
});

rockIcon.addEventListener('click', function onRockIconHover() {
      if (finalChoice != ROCK_CHOICE) {
            choice.innerText = `Choose you weapon ... ${ROCK_CHOICE}!`;
            finalChoice = ROCK_CHOICE;
      }
});

scissorsIcon.addEventListener('click', function onScissorsIconHover() {
      if (finalChoice != SCISSORS_CHOICE) {
            choice.innerText = `Choose you weapon ... ${SCISSORS_CHOICE}!`;
            finalChoice = SCISSORS_CHOICE;
      }
});
