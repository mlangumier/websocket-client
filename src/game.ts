import type { IPlayer, IServerMessage } from "./interfaces/types";
import { sendMessage } from "./websocket";


const cells = document.querySelectorAll<HTMLButtonElement>(".btn");

const youNameEl = document.getElementById("youName");
const oppNameEl = document.getElementById("oppName");
const yourSymbolEl = document.getElementById("value");
const whosTurnEl = document.getElementById("whosTurn");

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


  if (msg.board) renderBoard(msg.board); 

  switch (msg.type) {
    case "PLAYER_INFO": {
      // Only the players who entered their name receives msg.message -> Keep in `player` variable
      if (msg.message?.symbol) {
        player = msg.message; // Player's name & symbol
        updateNamesAndSymbolsUI(); //  : affiche "You", "Opponent", symbole
        setCellsInteractivity();   //  : (dés)active les cases selon le tour
      }
      break;
    }
    case "GAME_START":
      if (msg.message?.symbol) {
        player = msg.message;
        updateNamesAndSymbolsUI(); 
        setCellsInteractivity();  
      }
      // Disable buttons except if `player.name` === `msg.currentPlayer`
      break;
    case "UPDATE":
      console.log("Update board");

      setCellsInteractivity(); // 
      break;
    case "GAME_OVER":
      console.log(msg.winner ? `Winner : ${msg.winner}` : "Draw");
      // Display alert (game over + info)
      // En fin de partie on bloque toutes les cases .
      cells.forEach(btn => (btn.disabled = true)); 
      // Indicateur de tour : plus personne ne joue
      if (whosTurnEl) whosTurnEl.textContent = "Game Over";
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

  //  : après mise à jour visuelle, on (dés)active les cases correctement
  setCellsInteractivity();
}

/**
 * Récupère le nom de l'adversaire par rapport au joueur local.
 * (Micro-fix : toujours retourner une string ou null pour éviter un warning TS)
 */
function getOpponentName(): string | null {
  if (!player) return null;

  const { player1, player2 } = gameData.players;
  if (player1 && player1.name !== player.name) return player1.name;
  if (player2 && player2.name !== player.name) return player2.name;
  return null; 
}


function isMyTurn(): boolean {
  return !!player && gameData.currentTurn === player?.name;
}

/**
 * Met à jour l'affichage "You / Opponent / symbole".
 * (N'affiche que ce qui est disponible à l'instant T.)
 */
function updateNamesAndSymbolsUI(): void {
  if (player && youNameEl) youNameEl.textContent = player.name;
  const opp = getOpponentName();
  if (oppNameEl) oppNameEl.textContent = opp ?? "";
  if (player && yourSymbolEl) yourSymbolEl.textContent = player.symbol;
}

/**
 * (Dés)active les cases selon le tour + met à jour l'indicateur de tour.
 * Règle : une case est cliquable UNIQUEMENT si :
 * - c'est mon tour, ET
 * - la case est vide.
 */
function setCellsInteractivity() {
  const myTurn = isMyTurn();

  gameData.board?.forEach((symbol, index) => {
    const btn = cells[index];
    const isEmpty = !symbol;

    // Autoriser le clic seulement si c'est mon tour ET que la case est vide.
    btn.disabled = !(myTurn && isEmpty);
  });

  // Indicateur de tour 
  if (whosTurnEl) {
    const label = gameData.currentTurn ? `Turn: ${gameData.currentTurn}` : "Waiting…";
    whosTurnEl.textContent = label;
  }
}
