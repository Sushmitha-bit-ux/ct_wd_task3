const boardElement = document.getElementById("game-board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.setAttribute("data-index", index);
    cellDiv.textContent = cell;
    boardElement.appendChild(cellDiv);
  });
}

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusText.textContent = `Player ${board[a]} wins!`;
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
  }
}

function handleClick(e) {
  const index = e.target.getAttribute("data-index");

  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  renderBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "Y" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

// Event listeners
boardElement.addEventListener("click", handleClick);
resetButton.addEventListener("click", resetGame);

// Initial render
renderBoard();
