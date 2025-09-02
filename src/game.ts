import type { IServerMessage } from "./interfaces/types";
import { sendMessage } from "./websocket";

const cells = document.querySelectorAll<HTMLAnchorElement>(".btn");

export function renderBoard(board: string[]) {
  board.forEach((symbol, index) => {
    cells[index].textContent = symbol || ""; // met "X", "O" ou vide
  });
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    console.log("Click btn: " + index);
    // sendMessage to server {type, index}
  });
});

export function handleGameMessage(msg: IServerMessage) {
  if (msg.content.board) renderBoard(msg.content.board);
  console.log(msg);

  switch (msg.type) {
    case "GAME_START":
      console.log("Game Start !");
      break;
    case "UPDATE":
      console.log("Update board");
      break;
    case "GAME_OVER":
      console.log(
        msg.content.winner ? `Winner : ${msg.content.winner}` : "Draw"
      );
      break;
    case "ERROR":
      console.error("Server Error : ", msg.content.message);
      break;
  }
}
