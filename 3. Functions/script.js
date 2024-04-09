const paperIcon = document.getElementById('paper');
const rockIcon = document.getElementById('rock');
const scissorsIcon = document.getElementById('scissors');
const choice = document.getElementById('choice');
const playButton = document.getElementById('play');
const resultText = document.getElementById('result');

const PAPER_CHOICE = 'paper';
const ROCK_CHOICE = 'rock';
const SCISSORS_CHOICE = 'scissors';
const RESULT = [PAPER_CHOICE, ROCK_CHOICE, SCISSORS_CHOICE];

let countDownValue = 3;
let currentChoice = null;
let finalChoice = null;
let gameStarting = false;

paperIcon.addEventListener('mouseover', function onPaperIconHover() {
      if (!gameStarting) {
            if (currentChoice != PAPER_CHOICE && !finalChoice) {
                  choice.innerText = `Choose your weapon ... ${PAPER_CHOICE}!`;
                  currentChoice = PAPER_CHOICE;
            }
      }
});

rockIcon.addEventListener('mouseover', function onRockIconHover() {
      if (!gameStarting) {
            if (currentChoice != ROCK_CHOICE && !finalChoice) {
                  choice.innerText = `Choose your weapon ... ${ROCK_CHOICE}!`;
                  currentChoice = ROCK_CHOICE;
            }
      }
});

scissorsIcon.addEventListener('mouseover', function onScissorsIconHover() {
      if (!gameStarting) {
            if (currentChoice != SCISSORS_CHOICE && !finalChoice) {
                  choice.innerText = `Choose your weapon ... ${SCISSORS_CHOICE}!`;
                  currentChoice = SCISSORS_CHOICE;
            }
      }
});

paperIcon.addEventListener('click', function onPaperIconHover() {
      if (!gameStarting) {
            if (playButton.classList.contains('disabled')) {
                  playButton.classList.remove('disabled');
            }
            if (finalChoice != PAPER_CHOICE) {
                  choice.innerText = `Choose your weapon ... ${PAPER_CHOICE}!`;
                  finalChoice = PAPER_CHOICE;
            }
      }
});

rockIcon.addEventListener('click', function onRockIconHover() {
      if (!gameStarting) {
            if (playButton.classList.contains('disabled')) {
                  playButton.classList.remove('disabled');
            }
            if (finalChoice != ROCK_CHOICE) {
                  choice.innerText = `Choose your weapon ... ${ROCK_CHOICE}!`;
                  finalChoice = ROCK_CHOICE;
            }
      }
});

scissorsIcon.addEventListener('click', function onScissorsIconHover() {
      if (!gameStarting) {
            if (playButton.classList.contains('disabled')) {
                  playButton.classList.remove('disabled');
            }
            if (finalChoice != SCISSORS_CHOICE) {
                  choice.innerText = `Choose your weapon ... ${SCISSORS_CHOICE}!`;
                  finalChoice = SCISSORS_CHOICE;
            }
      }
});

playButton.addEventListener('click', function onPlayButtonClick() {
      if (!gameStarting) {
            gameStarting = true;
            if (!playButton.classList.contains('disabled')) {
                  playButton.classList.add('disabled');
                  resultText.textContent = `Game starting in ... ${countDownValue}`;
                  startCountdown();
            }
      }
});

function startCountdown() {
      resultText.textContent = `Game starting in ... ${countDownValue}`;
      if (countDownValue > 0) {
            setTimeout(() => {
                  countDownValue--;
                  startCountdown();
            }, 1000);
      } else {
            const result = getResult();
            countDownValue = 3;
            playButton.classList.add('disabled');
            if (result !== 'Draw!') {
                  resultText.innerText = `You ... ${result}`;
            } else {
                  resultText.innerText = `${result}`;
            }
            currentChoice = null;
            finalChoice = null;
            gameStarting = false;
      }
}

function getResult() {
      const randomValue = Math.round(Math.random() * 2);
      const computerValue = RESULT[randomValue];
      if (
            (computerValue === ROCK_CHOICE && finalChoice === PAPER_CHOICE) ||
            (computerValue === PAPER_CHOICE && finalChoice === SCISSORS_CHOICE)
      ) {
            return 'won!';
      } else if (
            (computerValue === PAPER_CHOICE && finalChoice === ROCK_CHOICE) ||
            (computerValue === ROCK_CHOICE && finalChoice === SCISSORS_CHOICE)
      ) {
            return 'lost!';
      } else {
            return 'Draw!';
      }
}
