import type { IPlayer, IServerMessage } from "./interfaces/types";
import { sendMessage } from "./websocket";

const cells = document.querySelectorAll<HTMLAnchorElement>(".btn");
let player: IPlayer | null;
let gameData: IServerMessage = {
  type: "ERROR",
  players: {
    player1: null,
    player2: null,
  },
  board: new Array<string | null>(9).fill(null),
  currentTurn: null,
};

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    sendMessage({ type: "MOVE", content: index.toString() });
  });
});

export function handleGameMessage(msg: IServerMessage) {
  gameData = { ...msg };

  // Get & render game board
  if (msg.board) renderBoard(msg.board); //ERROR: always same symbol, fix SERVER!!

  switch (msg.type) {
    case "PLAYER_INFO": {
      // Only the player who entered their name receives msg.message -> Keep in `player` variable
      if (msg.message?.symbol) {
        player = msg.message; // Player's name & symbol
      }
      break;
    }
    case "GAME_START":
      if (msg.message?.symbol) {
        player = msg.message;
      }
      // Disable buttons except if `player.name` === `msg.currentPlayer`
      break;
    case "UPDATE":
      console.log("Update board");
      break;
    case "GAME_OVER":
      console.log(msg.winner ? `Winner : ${msg.winner}` : "Draw");
      // Display alert (game over + info)
      break;
    case "ERROR":
      console.error("Server Error : ", msg.message);
      break;
  }
}

export function renderBoard(board: (string | null)[]) {
  board.forEach((symbol, index) => {
    cells[index].textContent = symbol || ""; // met "X", "O" ou vide
  });
}
