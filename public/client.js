const socket = io();
let playerName = "";

// Initial UI state
document.getElementById("loading").style.display = "none";
document.getElementById("bigCont").style.display = "none";
document.getElementById("userCont").style.display = "none";
document.getElementById("oppNameCont").style.display = "none";
document.getElementById("valueCont").style.display = "none";
document.getElementById("whosTurn").style.display = "none";

// Search for opponent
document.getElementById("find").addEventListener("click", () => {
  const nameInput = document.getElementById("name").value.trim();
  if (!nameInput) return alert("Enter a name");
  playerName = nameInput;
  socket.emit("find", { name: playerName });
  document.getElementById("user").innerText = playerName;
  document.getElementById("loading").style.display = "block";
  document.getElementById("find").disabled = true;
});

// Handle game start
socket.on("gameStart", (data) => {
  const { opponent, symbol, turn } = data;

  document.getElementById("oppName").innerText = opponent;
  document.getElementById("value").innerText = symbol;
  document.getElementById("whosTurn").innerText = turn ? "Your Turn" : "Opponent's Turn";

  // Show UI
  document.getElementById("loading").style.display = "none";
  document.getElementById("name").style.display = "none";
  document.getElementById("find").style.display = "none";
  document.getElementById("enterName").style.display = "none";
  document.getElementById("bigCont").style.display = "block";
  document.getElementById("userCont").style.display = "block";
  document.getElementById("oppNameCont").style.display = "block";
  document.getElementById("valueCont").style.display = "block";
  document.getElementById("whosTurn").style.display = "block";
});

// Click on a cell
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    socket.emit("play", { name: playerName, cell: btn.id });
  });
});

// Update board
socket.on("update", ({ board, turn }) => {
  document.getElementById("whosTurn").innerText = turn ? "Your Turn" : "Opponent's Turn";

  board.forEach((val, i) => {
    const cell = document.getElementById(`btn${i + 1}`);
    cell.innerText = val;
    cell.disabled = val !== "";
    cell.classList.toggle("btnx", val === "X");
    cell.classList.toggle("btno", val === "O");
  });
});

// Game over
socket.on("gameOver", ({ winner }) => {
  setTimeout(() => {
    alert(winner ? `${winner} WON!` : "DRAW!");
    location.reload();
  }, 200);
});
