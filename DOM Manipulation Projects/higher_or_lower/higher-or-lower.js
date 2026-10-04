const result = document.getElementById("result");
const numberInput = document.getElementById("numberInput");

let randomNumber = Math.floor(Math.random() * 10);
console.log(randomNumber);
function compareNumber() {
  // console.log(result.textContent + ' ' + numberInput.value);
  if (numberInput.value == randomNumber) {
    //check and add or remove tailwind class
    if (result.classList.contains("text-red-600")) {
      result.classList.replace("text-red-600", "text-green-600");
    } else {
      result.classList.add("text-green-600");
    }

    result.textContent = "Yay!";
    //animation
    result.classList.add("zoom-130", "animate-bounce");

    //reload the page after 2.5s
    setInterval(() => {
      window.location.reload();
    }, 2500);
  }

  if (numberInput.value < randomNumber) {
    result.textContent = "Guess higher...";
    result.classList.replace("text-blue-600", "text-red-600");
  }

  if (numberInput.value > randomNumber) {
    result.textContent = "Guess lower...";
    result.classList.replace("text-blue-600", "text-red-600");
  }

  if (numberInput.value == "") {
    result.textContent = "Make a guess!";
    result.classList.replace("text-blue-600", "text-red-600");
  }

  numberInput.value = "";
}
