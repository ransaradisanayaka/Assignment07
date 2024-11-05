let currentInput = "";
let previousInput = "";
let operation = null;
let shouldResetScreen = false;

const display = document.getElementById("result");
display.value = "0";

// Add event listeners to all buttons
document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      inputNumber(button.textContent);
    } else if (button.classList.contains("operator")) {
      inputOperator(button.textContent);
    } else if (button.classList.contains("equals")) {
      calculate();
    } else if (button.classList.contains("decimal")) {
      inputDecimal();
    } else if (button.classList.contains("clear")) {
      clear();
    } else if (button.classList.contains("delete")) {
      deleteNumber();
    }
  });
});

function inputNumber(number) {
  if (shouldResetScreen) {
    display.value = number;
    shouldResetScreen = false;
  } else {
    display.value = display.value === "0" ? number : display.value + number;
  }
  currentInput = display.value;
}

function inputOperator(op) {
  if (operation !== null) calculate();
  previousInput = display.value;
  operation = op;
  shouldResetScreen = true;
}

function calculate() {
  if (operation === null || shouldResetScreen) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  display.value = Math.round(result * 1000000) / 1000000;
  operation = null;
  currentInput = display.value;
  shouldResetScreen = true;
}

function inputDecimal() {
  if (shouldResetScreen) {
    display.value = "0.";
    shouldResetScreen = false;
  } else if (!display.value.includes(".")) {
    display.value += ".";
  }
  currentInput = display.value;
}

function clear() {
  display.value = "0";
  currentInput = "";
  previousInput = "";
  operation = null;
}

function deleteNumber() {
  display.value = display.value.slice(0, -1);
  currentInput = display.value;
}
