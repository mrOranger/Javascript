const paperIcon = document.getElementById('paper');
const rockIcon = document.getElementById('rock');
const scissorsIcon = document.getElementById('scissors');
const choice = document.getElementById('choice');
const playButton = document.getElementById('play');
const resultText = document.getElementById('result');

const PAPER_CHOICE = 'paper';
const ROCK_CHOICE = 'rock';
const SCISSORS_CHOICE = 'scissors';
const CHOICES = [PAPER_CHOICE, ROCK_CHOICE, SCISSORS_CHOICE];

const VICTORY = 'won!';
const DEFEAT = 'lost!';
const DRAW = 'Draw!';

let countDownValue = 3;
let currentChoice = null;
let finalChoice = null;
let gameStarting = false;

paperIcon.addEventListener('mouseover', function onPaperIconHover() {
      onIconHover(PAPER_CHOICE);
});

rockIcon.addEventListener('mouseover', function onRockIconHover() {
      onIconHover(ROCK_CHOICE);
});

scissorsIcon.addEventListener('mouseover', function onScissorsIconHover() {
      onIconHover(SCISSORS_CHOICE);
});

function onIconHover(iconChoice) {
      if (!gameStarting) {
            if (currentChoice != iconChoice && !finalChoice) {
                  choice.innerText = `Choose your weapon ... ${iconChoice}!`;
                  currentChoice = iconChoice;
            }
      }
}

paperIcon.addEventListener('click', function onPaperIconClick() {
      onIconClick(PAPER_CHOICE);
});

rockIcon.addEventListener('click', function onRockIconClick() {
      onIconClick(ROCK_CHOICE);
});

scissorsIcon.addEventListener('click', function onScissorsIconClick() {
      onIconClick(SCISSORS_CHOICE);
});

function onIconClick(playerChoice) {
      if (!gameStarting) {
            if (playButton.classList.contains('disabled')) {
                  playButton.classList.remove('disabled');
            }
            if (finalChoice != playerChoice) {
                  choice.innerText = `Choose your weapon ... ${playerChoice}!`;
                  finalChoice = playerChoice;
            }
      }
}

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
            if (result !== DRAW) {
                  resultText.innerText = `You ... ${result}`;
            } else {
                  resultText.innerText = `${result}`;
            }
            resetGame();
      }
}

function getResult() {
      const randomValue = Math.round(Math.random() * 2);
      const computerValue = CHOICES[randomValue];

      if (
            (computerValue === ROCK_CHOICE && finalChoice === PAPER_CHOICE) ||
            (computerValue === PAPER_CHOICE && finalChoice === SCISSORS_CHOICE)
      ) {
            return VICTORY;
      } else if (
            (computerValue === PAPER_CHOICE && finalChoice === ROCK_CHOICE) ||
            (computerValue === ROCK_CHOICE && finalChoice === SCISSORS_CHOICE)
      ) {
            return DEFEAT;
      } else {
            return DRAW;
      }
}

function resetGame() {
      countDownValue = 3;
      finalChoice = null;
      currentChoice = null;
      gameStarting = false;
      playButton.classList.add('disabled');
}
