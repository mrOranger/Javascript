const increaseButton = document.getElementsByClassName('increase')[0];
const decreaseButton = document.getElementsByClassName('decrease')[0];
const counterLabel = document.getElementById('counter');

let counter = 0;

increaseButton.addEventListener('click', () => {
      counter++;
      counterLabel.textContent = `Current count : ${counter}`;
      if (counter > 0 && decreaseButton.classList.contains('disabled')) {
            decreaseButton.classList.remove('disabled');
      }
});

decreaseButton.addEventListener('click', () => {
      if (counter > 0) {
            counter--;
            counterLabel.textContent = `Current count : ${counter}`;
            if (counter == 0) {
                  decreaseButton.classList.add('disabled');
            }
      }
});
