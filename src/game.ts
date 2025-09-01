import { socket } from "./websocket";
const cells = document.querySelectorAll<HTMLButtonElement>("#smallcont .btn");
let board: string[] = ["", "", "", "", "", "", "", "", ""];
let mySymbol: string = "X";

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "") return;

    socket.send(
    JSON.stringify({
        type: "move",
        index: index,
        Symbol: mySymbol,
    })
    );
  });
});

socket.addEventListener("message", event => {
  const data = JSON.parse(event.data);

  if (data.type === "move") {
    board[data.index] = data.Symbol;
    cells[data.index].textContent = data.Symbol;
  }
});
//recup toutes les cases

// condition : pendant une partie on ne peut cliqué qu'une seule fois

//
