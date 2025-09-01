import "./style.css";
// import { setupCounter } from "./counter.ts";
const socket = new WebSocket("ws://localhost:8080");

const cells = document.querySelectorAll<HTMLButtonElement>("#smallcont .btn");
let board: string[] = ["", "", "", "", "", "", "", "", ""];
let mySymbol = "X" ;
let currentPlayer;





