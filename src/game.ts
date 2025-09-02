
import type { IServerMessage } from "./interfaces/types";

const cells = document.querySelectorAll<HTMLAnchorElement>(".btn")

export function renderBoard(board: string[]){
  board.forEach((symbol,index ) => {
    cells[index].textContent = symbol || ""; // met "X", "O" ou vide
  });
}

export function handleGameMessage(msg: IServerMessage){
  if(msg.content.board) renderBoard(msg.content.board);

  switch (msg.type){
    case "GAME_START":
      console.log("Game Start !")
      break;
      case "UPDATE":
      console.log("Update board")
      break;
      case "GAME_OVER":
      console.log(msg.content.winner ? `Winner : ${msg.content.winner}` : "Draw")
      break;
      case "ERROR":
      console.error("Server Error : ", msg.content.message);
      break;
  }
}
