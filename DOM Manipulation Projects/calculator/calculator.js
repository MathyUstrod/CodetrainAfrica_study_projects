// get calculator keys and results fields
const results = document.getElementById("results");
const entryArea = document.getElementById("entry-area");
const btnBackspace = document.getElementById("backspace");
const btnClear = document.getElementById("clear");
const btnPercent = document.getElementById("percent");
const btnDivide = document.getElementById("divide");
const keySeven = document.getElementById("key-seven");
const keyEight = document.getElementById("key-eight");
const keyNine = document.getElementById("key-nine");
const btnMultiply = document.getElementById("multiply");
const keyFour = document.getElementById("key-four");
const keyFive = document.getElementById("key-five");
const keySix = document.getElementById("key-six");
const btnMinus = document.getElementById("minus");
const keyOne = document.getElementById("key-one");
const keyTwo = document.getElementById("key-two");
const keyThree = document.getElementById("key-three");
const btnPlus = document.getElementById("plus");
const btnTogglePlusMinus = document.getElementById("toggle-plus-minus");
const keyZero = document.getElementById("key-zero");
const btnDecimal = document.getElementById("decimal");
const btnEquals = document.getElementById("equals");
const btnAll = document.getElementById("calc-btn");

// function to make entry
btnAll.addEventListener("click", (e) => {
  let value;
  let entry = entryArea.innerText;
  entryArea.innerText = "";
  if (e.target.classList.contains("key-number")) {
    value = e.target.innerText.trim();
    entryArea.innerText = entry + value;
  } else {
    entryArea.innerText = entry;
  }
});

// function for text sizing

function textSize(field){
    let fieldSizes = {
        result: 'text-3xl',
        entry: 'text-5xl',
    };

    let textLength = field.innerText.length;

    if(textLength > 9) {
        field.classList.remo
    }
}
