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
    default:
      func = () => handleSymbol(button.textContent);
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
  let result;

  switch (operation) {
    case Operation.ADD:
      result = add(num1, num2);
      break;
    case Operation.SUBTRACT:
      result = subtract(num1, num2);
      break;
    case Operation.MULTIPLY:
      result = multiply(num1, num2);
      break;
    case Operation.DIVIDE:
      result = divide(num1, num2);
      break;
  }

  return Math.round(result * 100) / 100;
}

function compute() {
  let regex = /(?<=^-?\d+)(?=[/*\-+])|(?<=[/*\-+])(?=\d+$)/;
  let [num1, op, num2] = displayStr.split(regex);
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (op) {
    case '+': return operate(Operation.ADD, num1, num2);
    case '-': return operate(Operation.SUBTRACT, num1, num2);
    case '*': return operate(Operation.MULTIPLY, num1, num2);
    case '/': return operate(Operation.DIVIDE, num1, num2);
  }
}

function clearDisplay() {
  displayStr = '';
  setDisplay(displayStr);
}

function handleSymbol(symbol) {
  if (symbol === '=') {
    let result = compute();
    displayStr = result.toString();
    setDisplay(displayStr);
    return;
  }

  if (/[/*\-+]/.test(symbol) && /[/*\-+]/.test(displayStr)) {
    let result = compute();
    displayStr = `${result}${symbol}`;
    setDisplay(displayStr);
    return;
  }

  if (!displayStr | displayStr === '0') {
    if (/[/*\-+]/.test(symbol)) return;
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
