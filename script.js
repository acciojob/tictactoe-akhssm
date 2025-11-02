const submitBtn = document.getElementById("submit");
const restartBtn = document.getElementById("restart");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const gameSection = document.querySelector(".game");
const messageDiv = document.querySelector(".message");
const cells = Array.from(document.querySelectorAll(".cell"));

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let board = Array(9).fill("");
let gameActive = true;

const winningCombos = [
  [0, 1, 2], 
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], 
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names.");
    return;
  }

  document.querySelector(".player-inputs").style.display = "none";
  gameSection.style.display = "block";

  resetBoard();
  currentPlayer = player1;
  currentSymbol = "X";
  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    const winningCombo = checkWinner();
    if (winningCombo) {
      highlightWinner(winningCombo);
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      restartBtn.style.display = "inline-block";
      return;
    }

    if (board.every((c) => c !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      restartBtn.style.display = "inline-block";
      return;
    }

    currentSymbol = currentSymbol === "X" ? "O" : "X";
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  });
});

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
}

function highlightWinner(combo) {
  combo.forEach((i) => {
    cells[i].classList.add("win");
  });
}

function resetBoard() {
  board = Array(9).fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
  gameActive = true;
  restartBtn.style.display = "none";
}

restartBtn.addEventListener("click", () => {
  resetBoard();
  currentPlayer = player1;
  currentSymbol = "X";
  messageDiv.textContent = `${currentPlayer}, you're up!`;
});
