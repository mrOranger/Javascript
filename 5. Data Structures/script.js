const initialList = document.getElementById('initial-list');
const greaterThanThreeList = document.getElementById('greater-than-3');
const powerOfTwoList = document.getElementById('power-of-two');
const sumList = document.getElementById('sum');
const greatestElement = document.getElementById('greatest-element');

const list = [1, 3, 2, 4, 5, 1, 5, 6, 7];

function initialize() {
      list.forEach((number) => {
            const node = document.createElement('li');
            node.textContent = number.toString();
            initialList.appendChild(node);
      });
}

function getNumbersGreaterThanThree() {
      list.filter((number) => number > 3).forEach((number) => {
            const node = document.createElement('li');
            node.classList.add('greater-than-3-list-item');
            node.textContent = number.toString();
            greaterThanThreeList.appendChild(node);
      });
}

function getPowersOfTwo() {
      list.map((number) => number * number).forEach((number) => {
            const node = document.createElement('li');
            node.classList.add('power-of-2-list-item');
            node.textContent = number.toString();
            powerOfTwoList.appendChild(node);
      });
}

function reduceToSum() {
      const sum = list.reduce((currentNumber, prevNumber) => currentNumber + prevNumber, 0);
      const node = document.createElement('li');
      node.classList.add('sum');
      node.textContent = sum.toString();
      sumList.appendChild(node);
}

function getGreatestElement() {
      let greatestElementIndex = 0;
      list.forEach((number, index) => {
            if (number > list[greatestElementIndex]) {
                  greatestElementIndex = index;
            }
      });
      const node = document.createElement('li');
      node.classList.add('greatest-element');
      node.textContent = list[greatestElementIndex].toString();
      greatestElement.appendChild(node);
}

initialize();
getNumbersGreaterThanThree();
getPowersOfTwo();
reduceToSum();
getGreatestElement();
