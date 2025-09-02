import "./style.css";
import { onMessage, sendMessage } from "./websocket";
import { handleGameMessage } from "./game";

const confirmBtn = document.getElementById("confirmBtn");
const nameInputElement = document.getElementById("playerName");

confirmBtn?.addEventListener("click", () => {
  if (!nameInputElement) {
    throw new Error("Couldn't input player name");
  }
  const playerName: string = (
    nameInputElement as HTMLInputElement
  ).value.trim();

  sendMessage({ type: "ADD_PLAYER", content: playerName });
});

onMessage(msg => {
  handleGameMessage(msg);
});
