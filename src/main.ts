import "./style.css";
import { onMessage,  sendMessage } from "./websocket";
import { handleGameMessage } from "./game";

const playerName = document.getElementById("playerName")?.innerText;

const confirmBtn = document.getElementById("sendMessage");

confirmBtn?.addEventListener("click" ,() => {
  sendMessage({type : "ADD_PLAYER", content: playerName});
});

onMessage(msg => {
  handleGameMessage(msg);
});
