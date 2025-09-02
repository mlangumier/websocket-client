const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname)));

let waitingPlayer = null;
const games = new Map();

function createBoard() {
  return Array(9).fill("");
}

function checkWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes("") ? null : "draw";
}

io.on("connection", (socket) => {
  socket.on("find", ({ name }) => {
    socket.data.name = name;

    if (!waitingPlayer) {
      waitingPlayer = socket;
    } else {
      const player1 = waitingPlayer;
      const player2 = socket;
      waitingPlayer = null;

      const board = createBoard();
      const game = {
        board,
        players: [player1, player2],
        symbols: { [player1.id]: "X", [player2.id]: "O" },
        turn: player1.id
      };
      games.set(player1.id, game);
      games.set(player2.id, game);

      player1.emit("gameStart", { opponent: name, symbol: "X", turn: true });
      player2.emit("gameStart", { opponent: player1.data.name, symbol: "O", turn: false });
    }
  });

  socket.on("play", ({ cell }) => {
    const game = games.get(socket.id);
    if (!game || game.turn !== socket.id) return;

    const index = parseInt(cell.replace("btn", "")) - 1;
    if (game.board[index]) return;

    game.board[index] = game.symbols[socket.id];
    game.turn = game.players.find((p) => p.id !== socket.id).id;

    const winner = checkWinner(game.board);

    game.players.forEach((p) => {
      p.emit("update", { board: game.board, turn: game.turn === p.id });
    });

    if (winner) {
      game.players.forEach((p) => p.emit("gameOver", {
        winner: winner === "draw" ? null : winner
      }));
      games.delete(game.players[0].id);
      games.delete(game.players[1].id);
    }
  });

  socket.on("disconnect", () => {
    if (waitingPlayer && waitingPlayer.id === socket.id) {
      waitingPlayer = null;
    }
    const game = games.get(socket.id);
    if (game) {
      game.players.forEach((p) => {
        if (p.id !== socket.id) p.emit("gameOver", { winner: "Opponent left" });
        games.delete(p.id);
      });
    }
  });
});

server.listen(8080, () => console.log("Server running on http://localhost:8080"));
