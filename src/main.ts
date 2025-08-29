import "./style.css";
// import { setupCounter } from "./counter.ts";
const socket = new WebSocket("ws://localhost:8080");

const cells = document.querySelectorAll<HTMLButtonElement>("#smallcont .btn");
let board: string[] = ["", "", "", "", "", "", "", "", ""];
let mySymbol = "X" ;
let currentPlayer;



cells.forEach((cell, index)=>{
  console.log("case cliqué : ", index)
})
socket.onopen = () => {
  console.log("✅ Connecté au serveur WebSocket");
}

socket.onerror = (err) => {
    console.error("❌ Erreur WebSocket :", err);
};

socket.onclose = () => {
    console.warn("⚠️ Connexion fermée");
};


