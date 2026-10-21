const grid = document.getElementById("grid");
let tile = document.querySelectorAll(".board");
let currentPlayer = "X";
let isGameActive = true;
let playerOneScore = document.getElementById("player-one-score");
let playerTwoScore = document.getElementById("player-two-score");

// Winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], //Row combinations
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], //Column coninations
  [0, 4, 8],
  [2, 4, 6], //Diagonal combinations
];

//player moves
function moves(index) {
  //check that game is not over (not active) or a key is not already taken
  if (!isGameActive || tile[index].innerText !== "") {
    return false;
  }

  tile[index].innerText = currentPlayer;

  //check game status after player move
  checkGameStatus();

  //Switch player if the game is not over
  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  //Move made
  return true;
}

// Game status: win or tie
function checkGameStatus() {
  let roundWon = false;

  // check all winning combinations
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];

    //if the tile is empty skip
    if (
      tile[a].innerText === "" ||
      tile[b].innerText === "" ||
      tile[c].innerText === ""
    ) {
      continue;
    }

    //if all 3 match there is a winner of the round
    if (
      tile[a].innerText === tile[b].innerText &&
      tile[b].innerText === tile[c].innerText
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    if (currentPlayer === "X") {
      playerOneScore.innerText = +playerOneScore.innerText + 1;
      alert("Player 1 wins!!");
    } else {
      playerTwoScore.innerText = +playerTwoScore.innerText + 1;
      alert("Player 2 wins!!");
    }
    isGameActive = false;
    resetGame();
    return;
  }

  //if there isn't a win and there are no empty tiles, it is a tie
  let isTie = true;
  for (let i = 0; i < tile.length; i++) {
    if (tile[i].innerText === "") {
      isTie = false;
      break;
    }
  }

  if (isTie) {
    alert("Game is a tie!");
    isGameActive = false;
    resetGame();
    return;
  }
}

function resetGame() {
  for (let i = 0; i < tile.length; i++) {
    tile[i].innerText = "";
  }
//   Flip the player
  currentPlayer = currentPlayer === "X" ? "X" : "O";
//   console.log(currentPlayer);
  isGameActive = true;
  //   alert("New game. Click to start");
}

grid.addEventListener("click", (event) => {
  for (let i = 0; i < tile.length; i++) {
    if (tile[i] == event.target) {
      moves(i);
    }
  }
});
