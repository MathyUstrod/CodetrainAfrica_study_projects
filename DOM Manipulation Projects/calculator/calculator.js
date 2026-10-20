// Get calculator keys and results fields
const results = document.getElementById("results");
const entryArea = document.getElementById("entry-area");
const btnBackspace = document.getElementById("backspace");
const btnClear = document.getElementById("clear");
const btnPercent = document.getElementById("percent");
const btnDivide = document.getElementById("divide");
const btnMultiply = document.getElementById("multiply");
const btnPlus = document.getElementById("plus");
const btnMinus = document.getElementById("minus");
const btnTogglePlusMinus = document.getElementById("toggle-plus-minus");
const btnDecimal = document.getElementById("decimal");
const btnEquals = document.getElementById("equals");
const btnAll = document.getElementById("calc-btn");

let isEvaluationDone = false;

// Helper to append operators safely (prevent duplicated operators)
function appendOperator(op) {
  let entry = entryArea.innerText.trim();

  // If a calculation was just done, continue using the previous result
  if (isEvaluationDone) {
    isEvaluationDone = false;
  }

  // If the last character is already an operator, replace it instead of doubling up
  if (["+", "-", "*", "/"].includes(entry.slice(-1))) {
    entryArea.innerText = entry.slice(0, -1) + op;
  } else if (entry !== "0" && entry !== "") {
    entryArea.innerText += op;
  }
}

// Function to handle number entry
btnAll.addEventListener("click", (e) => {
  if (e.target.classList.contains("key-number")) {
    let value = e.target.innerText.trim();
    let entry = entryArea.innerText;

    // Reset screen if starting a brand new calculation
    if (entry === "0" || isEvaluationDone) {
      entryArea.innerText = value;
      if (isEvaluationDone) {
        results.innerText = "";
        isEvaluationDone = false;
      }
    } else {
      entryArea.innerText += value;
    }
  }
});

// Operator Event Listeners
btnPlus.addEventListener("click", () => appendOperator("+"));
btnMinus.addEventListener("click", () => appendOperator("-"));
btnMultiply.addEventListener("click", () => appendOperator("*"));
btnDivide.addEventListener("click", () => appendOperator("/"));

// Decimal Button
btnDecimal.addEventListener("click", () => {
  let entry = entryArea.innerText;
  // Split by operators to find the current active number group
  let currentNumGroup = entry.split(/[\+\-\*\/]/).pop();

  if (isEvaluationDone) {
    entryArea.innerText = "0.";
    results.innerText = "";
    isEvaluationDone = false;
  } else if (!currentNumGroup.includes(".")) {
    entryArea.innerText += ".";
  }
});

// Backspace Button
btnBackspace.addEventListener("click", () => {
  let entry = entryArea.innerText;
  if (entry.length > 1 && entry !== "0") {
    entryArea.innerText = entry.slice(0, -1);
  } else {
    entryArea.innerText = "0";
  }
});

// Clear Button
btnClear.addEventListener("click", () => {
  entryArea.innerText = "0";
  results.innerText = "";
  isEvaluationDone = false;
});

// Percent Button
btnPercent.addEventListener("click", () => {
  let entry = entryArea.innerText;
  // Safely evaluate current screen first, then divide by 100
  try {
    let currentVal = safeEval(entry);
    let finalResult = currentVal / 100;
    results.innerText = `${entry}%`;
    entryArea.innerText = formatSmartDecimal(finalResult);
    isEvaluationDone = true;
  } catch (err) {
    entryArea.innerText = "Error";
  }
});

// Toggle Plus/Minus Button
btnTogglePlusMinus.addEventListener("click", () => {
  let entry = entryArea.innerText;
  if (entry === "0") return;
  entryArea.innerText = entry.startsWith("-") ? entry.slice(1) : "-" + entry;
});

// Equals Button
btnEquals.addEventListener("click", () => {
  resultEquals();
});

function resultEquals() {
  let expression = entryArea.innerText;

  try {
    let rawResult = safeEval(expression);
    results.innerText = expression;
    entryArea.innerText = formatSmartDecimal(rawResult);
    isEvaluationDone = true;
  } catch (error) {
    entryArea.innerText = "Error";
  }
}

// A smart decimal formatter to keep layout clean (e.g. 1/3 -> 0.333333, but 2*2 -> 4)
function formatSmartDecimal(num) {
  if (Number.isInteger(num)) return num.toString();
  // Rounds floating decimals to max 6 digits, but strips trailing zeros
  return parseFloat(num.toFixed(6)).toString();
}

// A safe mathematical expression evaluator that completely avoids dangerous eval()
function safeEval(str) {
  // Only allow numbers, math operators, and decimals
  if (/[^0-9\+\-\*\/\.]/.test(str)) throw new Error("Invalid Input");

  // Use Function builder as a sandboxed math calculator safely limited to equations
  return Function(`"use strict"; return (${str})`)();
}
