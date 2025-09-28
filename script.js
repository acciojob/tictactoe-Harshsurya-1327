let player1, player2;
let currentPlayer;
let currentSymbol = "X";
let board = Array(9).fill(null);
const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Start Game
document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (!player1 || !player2) {
    alert("Please enter both player names!");
    return;
  }

  currentPlayer = player1;
  document.getElementById("player-inputs").style.display = "none";
  document.getElementById("game-board").style.display = "block";
  document.querySelector(".message").innerText = `${currentPlayer}, you're up`;
});

// Handle cell click
document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.innerText !== "" || checkWinner()) return;

    cell.innerText = currentSymbol;
    board[index] = currentSymbol;

    let winningCombo = checkWinner();
    if (winningCombo) {
      document.querySelector(".message").innerText = `${currentPlayer}, congratulations you won!`;
      highlightWinner(winningCombo);
      return;
    }

    // Switch turns
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "O";
    } else {
      currentPlayer = player1;
      currentSymbol = "X";
    }

    document.querySelector(".message").innerText = `${currentPlayer}, you're up`;
  });
});

// Check winner
function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo; // return winning cells
    }
  }
  return null;
}

// Highlight winner cells in purple
function highlightWinner(combo) {
  combo.forEach(index => {
    document.getElementById(index + 1).style.backgroundColor = "purple";
    document.getElementById(index + 1).style.color = "white"; // text stands out
  });
}
