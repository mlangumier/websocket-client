// import des dépendances
const express = require("express"); // librairie JS pour la création d'un serveur web (définition des routes, gestion des réponses, etc)
const http = require("http"); // comment on transmet les données => protocole HTTP
const path = require("path");
const { Server } = require("socket.io"); // Librairie de communication en temps réel, c'est la partie websocket

// On crée le serveur HTTP avec Express pour envoyer les données au client front.
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname)));

let waitingPlayer = null; // stockera le 1er joueur en attente de son adversaire
const games = new Map(); // mapping (= associe une clé à une valeur d'un tableau) de la partie en cours pour un historique des coups joués

// Crée un tableau de 9 case (correspondant à nos 9 boutons) qui sont vides au départ puis seront remplis par les "move" des joueurs
function createBoard() {
  return Array(9).fill("");
}

// conditions de victoire de la partie
function checkWinner(board) {
  //toutes les possibilités de victoire
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonales
  ];

  // on boucle pour déterminer si 3 valeurs à la suite selon le patern lines existent. C'est la condition de victoire. (faire un dessin)
  for (let [a, b, c] of lines) {
    // board[a] verifie que la case n'est pas vide et la compare aux autre de la "line" testée 
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Si c'est vrai on renvoie la valeur de la case, X ou O pour déterminer le gagnant.
    }
  }
  //verifie les cases vides
  return board.includes("") ? null : "draw"; // null = personne n'a gagné, on continue la partie, sinon "draw" board complet mais pas de gagnant.
}

// mise en relation des joueurs via le serveur quand on a entré son nom et cliqué sur "Search"
io.on("connection", (socket) => {
  socket.on("find", ({ name }) => {
    socket.data.name = name;

    // si y'a pas de joueur en attente on crée la liste d'attente
    if (!waitingPlayer) {
      waitingPlayer = socket;

    //sinon ça veut dire qu'un joueur attend donc on associe les deux joueurs
    } else {
      const player1 = waitingPlayer; //celui qui attend, le  1er.
      const player2 = socket; // celui qui rejoins en second.
      waitingPlayer = null; // on passe waiting player en null puisque on attend plus, on joue.

      // on crée la grille de jeu
      const board = createBoard();
      // Lancement de la partie 
      // on fait un objet game qui contient la grille de jeu, les joueurs, leur symbol, et le tour en cours
      const game = {
        board,
        players: [player1, player2],
        symbols: { [player1.id]: "X", [player2.id]: "O" }, // X toujours pour le 1er joueur, et O pour le second.
        turn: player1.id
      };
      games.set(player1.id, game);
      games.set(player2.id, game);

      // On transmet au client le statut de chaque joueur et son attribution dans le tour de jeu
      player1.emit("gameStart", { opponent: name, symbol: "X", turn: true });
      player2.emit("gameStart", { opponent: player1.data.name, symbol: "O", turn: false });
    }
  });

  // On receptionne le click d'un joueur sur un bouton c'est le "play" dont l'identifiant sera "cell"
  socket.on("play", ({ cell }) => {
    const game = games.get(socket.id); // on récupère l'id du joueur (son socket.id)
    if (!game || game.turn !== socket.id) return; // pas de partie => Stop ou alors ce n'est pas ton tour => stop. On empeche la triche

    // on associe le bouton à son index avec -1 car bouton 1 sera en index 0
    const index = parseInt(cell.replace("btn", "")) - 1;
    if (game.board[index]) return; // si l'association existe déjà = on stop, on ne veut pas remplacer un coup déjà jouer.

    game.board[index] = game.symbols[socket.id]; // dans le board de la partie identifiée, on place le symbol du joueur (X ou O)
    game.turn = game.players.find((p) => p.id !== socket.id).id; // dans game.players on cherche l'autre joueur d'un id différent pour lui passer le tour

    const winner = checkWinner(game.board); // check si y'a victoire

    // on synchronise les plateaux de jeu des deux joueurs/clients pour tenir compte du coup joué
    game.players.forEach((p) => { 
      p.emit("update", { board: game.board, turn: game.turn === p.id });
    });

    if (winner) { // si un vainqueur rempli les conditions de victoire on envoie au client le vainqueur
      game.players.forEach((p) => p.emit("gameOver", {
        winner: winner === "draw" ? null : winner // Soit winner possede une valeur donc on l'affiche, soit c'est null donc un draw
      }));

      //on efface le tableau de partie de la mémoire du serveur
      games.delete(game.players[0].id);
      games.delete(game.players[1].id);
    }
  });

  //gestion si le joueur quitte la partie
  socket.on("disconnect", () => {
    if (waitingPlayer && waitingPlayer.id === socket.id) { // si la déconnexion a lieu pendant qu'un seul joueur est en waiting => on vide
      waitingPlayer = null;
    }
    const game = games.get(socket.id); // on regarde si le joueur était attribué à une partie en cours
    if (game) {
      game.players.forEach((p) => {
        if (p.id !== socket.id) p.emit("gameOver", { winner: "Opponent left" }); // le joueur qui a quitté offre la victoire à l'autre
        games.delete(p.id); // on supprime la partie pour les 2 joueurs
      });
    }
  });
});


server.listen(8080, () => console.log("Server running on http://localhost:8080")); // on écoute le serveur sur le port 8080 et on console.log pour être sur que la connexion s'est faite
