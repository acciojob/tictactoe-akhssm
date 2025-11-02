
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit");
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");
  const gameSection = document.querySelector(".game");
  const messageDiv = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");

  if (!submitBtn || !player1Input || !player2Input || !messageDiv) {
    console.error("Missing required elements!");
    return;
  }

  let player1 = "";
  let player2 = "";
  let currentPlayer = "";
  let currentSymbol = "X";
  let board = Array(9).fill("");
  let gameActive = true;

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
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

    board = Array(9).fill("");
    cells.forEach(c => {
      c.textContent = "";
      c.classList.remove("win");
    });

    currentPlayer = player1;
    currentSymbol = "X";
    gameActive = true;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  });

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (!gameActive || cell.textContent !== "") return;

      cell.textContent = currentSymbol;
      board[index] = currentSymbol;

      const winCombo = checkWinner();
      if (winCombo) {
        highlightWinner(winCombo);
        messageDiv.textContent = `${currentPlayer} congratulations you won!`;
        gameActive = false;
        return;
      }

      if (board.every(c => c !== "")) {
        messageDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentSymbol = currentSymbol === "X" ? "O" : "X";
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      messageDiv.textContent = `${currentPlayer}, you're up!`;
    });
  });

  function checkWinner() {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return combo;
      }
    }
    return null;
  }

  function highlightWinner(combo) {
    combo.forEach(i => cells[i].classList.add("win"));
  }
});
