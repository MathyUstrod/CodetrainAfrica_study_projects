const grid = document.getElementById("grid");
const tile = document.querySelectorAll(".board");
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
const startBtn = document.getElementById("start-btn");

let score = 0;
let currentTime = 30;
let currentMoleIndex = null;
let moleTimer = null;
let countdownTimer = null;
let isGameActive = false;

// Randomly pop a mole on a tile
function randomMole() {
  // Clear the previous mole visualization
  tile.forEach((t) => {
    t.innerHTML = "";
    // Reset button background color
    t.classList.remove("bg-amber-200");
  });

  if (!isGameActive) return;

  // Pick a random index from 0 to 8
  let randomIndex = Math.floor(Math.random() * tile.length);

  // Prevent the mole from popping up in the exact same spot twice in a row
  while (randomIndex === currentMoleIndex) {
    randomIndex = Math.floor(Math.random() * tile.length);
  }

  currentMoleIndex = randomIndex;

  // Render a mole image on tile
  tile[currentMoleIndex].innerHTML =
    '<img class="board pointer-events-none" src="mole.png">';
  tile[currentMoleIndex].classList.add("bg-amber-200");
}

// whack event
function whack(index) {
  if (!isGameActive) return;

  // Check if player whacked the tile containing the mole
  if (index === currentMoleIndex) {
    score++;
    scoreDisplay.innerText = score;

    // Clear the current mole immediately so player can't double-click it
    tile[index].innerHTML = "";
    tile[index].classList.remove("bg-amber-200");
    currentMoleIndex = null;
  }
}

// Count down the clock
function countDown() {
  currentTime--;
  timeLeftDisplay.innerText = currentTime;

  if (currentTime === 0) {
    clearInterval(moleTimer);
    clearInterval(countdownTimer);
    isGameActive = false;
    alert(`Game Over! Your final score is: ${score}`);
    startBtn.disabled = false;
  }
}

// Reset & Start the Game
function startGame() {
  // Reset variables
  score = 0;
  currentTime = 30;
  isGameActive = true;
  scoreDisplay.innerText = score;
  timeLeftDisplay.innerText = currentTime;
  startBtn.disabled = true;

  // Clear any stray timers
  clearInterval(moleTimer);
  clearInterval(countdownTimer);

  // Set up intervals: move the mole every 800ms, decrease clock every 1000ms (countdown timer)
  randomMole();
  moleTimer = setInterval(randomMole, 800);
  countdownTimer = setInterval(countDown, 1000);
}

// 5. Event Listeners
startBtn.addEventListener("click", startGame);

grid.addEventListener("click", (event) => {
  // Find which button index was clicked inside the grid container
  for (let i = 0; i < tile.length; i++) {
    if (tile[i] === event.target) {
      whack(i);
      break;
    }
  }
});
