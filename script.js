//~ Simple Calculator:

const screen = document.querySelector("#screen");

// Digit buttons
const digits = {
  one: "1", two: "2", three: "3", four: "4", five: "5",
  six: "6", seven: "7", eight: "8", nine: "9", zero: "0", point: "."
};

// Operator buttons
const operatorsMap = {
  plus: "+", minus: "-", mul: "*", divi: "/"
};

// Variables
let values = [];
let operators = [];
let screenText = "";
let str = "";  // current number being typed

// Set digit
const setValue = (digit) => {
  str += digit;
  screenText += digit;
  screen.innerText = screenText;
};

// Set operator
const setOperator = (op) => {
  if (str === "") return; // prevent operators before number
  values.push(parseFloat(str));
  operators.push(op);
  str = "";
  screenText += op;
  screen.innerText = screenText;
};

// Perform calculation (no eval)
const calculate = () => {
  if (str !== "") {
    values.push(parseFloat(str));
    str = "";
  }

  let result = values[0];

  for (let i = 0; i < operators.length; i++) {
    const nextValue = values[i + 1];
    const operator = operators[i];

    if (operator === "+") result += nextValue;
    else if (operator === "-") result -= nextValue;
    else if (operator === "*") result *= nextValue;
    else if (operator === "/") result /= nextValue;
  }

  screen.innerText = result;
  screenText = result.toString();

  // Reset for further calculations
  values = [];
  operators = [];
  str = result;

};

// Clear All
const clearAll = () => {
  screenText = "";
  str = "";
  values = [];
  operators = [];
  screen.innerText = "0";
};

// Percent
const applyPercent = () => {
  if (str === "") return;

  const currentNumber = parseFloat(str);

  if (operators.length > 0 && values.length > 0) {
    const base = values[values.length - 1]; // last entered number before this one
    const percentOfBase = (base * currentNumber) / 100;
    str = percentOfBase.toString();
  } else {
    // no operator before, just turn into 0.1 of itself
    str = (currentNumber / 100).toString();
  }

  // update screenText
  // remove the last number and replace with new str
  screenText = screenText.replace(/(\d+\.?\d*)$/, str);
  screen.innerText = screenText;
};

// Clear 
const clearLast = () => {
  if (screenText === "") return;

  const lastChar = screenText.slice(-1);
  screenText = screenText.slice(0, -1);

  if ("+-*/".includes(lastChar)) {
    operators.pop();
  } else if (str.length > 0) {
    str = str.slice(0, -1);
  }

  screen.innerText = screenText || "0";
};

// Event Listeners
// Digits
for (let id in digits) {
  document.querySelector(`#${id}`).addEventListener("click", () => setValue(digits[id]));
}

// Operators
for (let id in operatorsMap) {
  document.querySelector(`#${id}`).addEventListener("click", () => setOperator(operatorsMap[id]));
}

// Equal (=)
document.querySelector("#equal").addEventListener("click", calculate);

// All Clear (AC)
document.querySelector("#AC").addEventListener("click", clearAll);

// Optional: Backspace (Clear)
document.querySelector("#clear").addEventListener("click", clearLast);

// Percent (%)
document.querySelector("#percent").addEventListener("click", applyPercent);
