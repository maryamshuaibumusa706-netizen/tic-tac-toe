let board = ["","","","","","","","",""];
let current = "X";
let gameOver = false;
let scores = { X: 0, O: 0, draws: 0 };
const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWinner() {
  for (let w of wins) {
    const [a,b,c] = w;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (!board.includes("")) return "Draw";
  return null;
}
function update() {
  document.getElementById("score").textContent = `X: ${scores.X} | O: ${scores.O} | Draws: ${scores.draws}`;
}
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    const i = Number(cell.dataset.index);
    if (board[i] || gameOver) return;
    board[i] = current;
    cell.textContent = current;
    cell.classList.add(current.toLowerCase());
    const winner = checkWinner();
    if (winner) {
      gameOver = true;
      if (winner === "Draw") {
        scores.draws++;
        document.getElementById("status").textContent = "It's a Draw!";
      } else {
        scores[winner]++;
        document.getElementById("status").textContent = `Player ${winner} Wins! 🎉`;
      }
      update();
    } else {
      current = current === "X" ? "O" : "X";
      document.getElementById("status").textContent = `Player ${current}'s turn`;
    }
  });
});
document.getElementById("reset").addEventListener("click", () => {
  board = ["","","","","","","","",""];
  current = "X"; gameOver = false;
  document.querySelectorAll(".cell").forEach(c => { c.textContent = ""; c.className = "cell"; });
  document.getElementById("status").textContent = "Player X's turn";
});
