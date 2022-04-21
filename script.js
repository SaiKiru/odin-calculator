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
    case 'DEL':
      func = () => backspace();
      break;
    case 'CLS':
      func = () => clearDisplay();
      break;
    default:
      func = () => handleSymbol(button.textContent);
  }

  button.addEventListener('click', func);
});

document.addEventListener('keydown', event => {
  let key = event.key;
  let buttonId;
  let button;

  if (/\d/.test(key)) { buttonId = `#num-${key}`; }
  else if (key === '/') { buttonId = '#op-div'; }
  else if (key === '*') { buttonId = '#op-mult'; }
  else if (key === '-') { buttonId = '#op-sub'; }
  else if (key === '+') { buttonId = '#op-add'; }
  else if (key === 'Backspace') { buttonId = '#del-btn'; }
  else if (key === 'Enter') { buttonId = '#eq-btn'; }
  else if (key === 'Delete') { buttonId = '#cls-btn'; }
  else { return; }

  button = document.querySelector(buttonId);
  button.classList.add('active');
  button.click();
});

document.addEventListener('keyup', () => {
  calculatorButtons.forEach(button => button.classList.remove('active'));
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
  if (num2 === 0) throw 'ZeroDivisionError';
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
  if (!checkSyntax(displayStr)) throw 'SyntaxError';

  let regex = /(?<=^-?\d+(?:\.\d+)?)(?=[/*\-+])|(?<=[/*\-+])(?=\d+(?:\.\d+)?$)/;
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

function backspace() {
  displayStr = displayStr.slice(0, displayStr.length - 1);
  setDisplay(displayStr);
}

function clearDisplay() {
  displayStr = '';
  setDisplay(displayStr);
}

function handleSymbol(symbol) {
  if (symbol === '=') {
    let result;

    try {
      result = compute();
      displayStr = result.toString();
      setDisplay(displayStr);
    } catch (err) {
      if (err === 'ZeroDivisionError') {
        handleError('Undefined');
      } else if (err === 'SyntaxError') {
        handleError('Syntax Error');
      }
    } finally {
      return;
    }
  }

  if (/[/*\-+]/.test(symbol) && /^-?\d+(?:\.\d+)?[/*\-+]/.test(displayStr)) {
    let result;

    try {
      result = compute();
      displayStr = `${result}${symbol}`;
      setDisplay(displayStr);
    } catch (err) {
      if (err === 'ZeroDivisionError') {
        handleError('Undefined');
      } else if (err === 'SyntaxError') {
        handleError('Syntax Error');
      }
    } finally {
      return;
    }
  }

  if (!displayStr | displayStr === '0') {
    if (/[/*\-+]/.test(symbol)) return;
    displayStr = '';
  }

  displayStr = displayStr.concat(symbol);
  setDisplay(displayStr);
}

function setDisplay(str) {
  if (!str) {
    str = '0';
  }
  display.textContent = str;
  display.scrollLeft = display.scrollWidth;
}

function checkSyntax(equation) {
  let regex = /^-?\d+(?:\.\d+)?[/*\-+]-?\d+(?:\.\d+)?$|^-?\d+(?:\.\d+)?$/;
  return regex.test(equation);
};

function handleError(message = '') {
  clearDisplay();
  setDisplay(message);
}
