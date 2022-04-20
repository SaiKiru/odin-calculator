const Operation = {
  ADD: 0,
  SUBTRACT: 1,
  MULTIPLY: 2,
  DIVIDE: 3,
};

let calculatorButtons = document.querySelectorAll('button');
let display = document.querySelector('#calculator-display');
let displayStr = '';

calculatorButtons.forEach(button => {
  let func;

  switch (button.textContent) {
    case 'CLS':
      func = () => clearDisplay();
      break;
    case '=':
      func = () => compute();
      break;
    default:
      func = () => addToDisplay(button.textContent);
  }

  button.addEventListener('click', func);
});

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operation, num1, num2) {
  switch (operation) {
    case Operation.ADD: return add(num1, num2);
    case Operation.SUBTRACT: return subtract(num1, num2);
    case Operation.MULTIPLY: return multiply(num1, num2);
    case Operation.DIVIDE: return divide(num1, num2);
  }
}

function compute() {

}

function clearDisplay() {
  displayStr = '';
  setDisplay(displayStr);
}

function addToDisplay(symbol) {
  if (!displayStr) {
    displayStr = '';
  }
  displayStr = displayStr.concat(symbol);
  setDisplay(displayStr);
}

function setDisplay(str) {
  if (!displayStr) {
    str = '0';
  }
  display.textContent = str;
}
