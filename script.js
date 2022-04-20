const Operation = {
  ADD: 0,
  SUBTRACT: 1,
  MULTIPLY: 2,
  DIVIDE: 3,
};

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
