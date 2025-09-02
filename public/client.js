const socket = io();
let playerName = "";

// Initial UI : montre juste les champs entrer un nom et le bouton pour chercher un adversaire, desactive le reste
document.getElementById("loading").style.display = "none";
document.getElementById("bigCont").style.display = "none";
document.getElementById("userCont").style.display = "none";
document.getElementById("oppNameCont").style.display = "none";
document.getElementById("valueCont").style.display = "none";
document.getElementById("whosTurn").style.display = "none";

// Au clic sur la recherhce : On verifie qu'un nom a été entré et on affiche le gif de chargement signifiant qu'on attend un 2e joueur.
document.getElementById("find").addEventListener("click", () => {
  const nameInput = document.getElementById("name").value.trim(); //trim retire les éventuels espaces aux extrémités
  if (!nameInput) return alert("Enter a name");
  playerName = nameInput;
  socket.emit("find", { name: playerName });
  document.getElementById("user").innerText = playerName;
  document.getElementById("loading").style.display = "block";
  document.getElementById("find").disabled = true;
});

// On récupère le nom de l’adversaire
// puis on initialise la partie avec les attributions de role à chaque joueur et si c 'est ou non son tour
socket.on("gameStart", (data) => {
  const { opponent, symbol, turn } = data;

  document.getElementById("oppName").innerText = opponent;
  document.getElementById("value").innerText = symbol;
  document.getElementById("whosTurn").innerText = turn ? "Your Turn" : "Opponent's Turn";

  // On cache l'inscription et on affiche l'espace de jeu.
  document.getElementById("loading").style.display = "none";
  document.getElementById("name").style.display = "none";
  document.getElementById("find").style.display = "none";
  document.getElementById("enterName").style.display = "none";
  document.getElementById("bigCont").style.display = "block";
  document.getElementById("userCont").style.display = "block";
  document.getElementById("oppNameCont").style.display = "block";
  document.getElementById("valueCont").style.display = "block";
  document.getElementById("whosTurn").style.display = "block";
});

// Au clic sur une des cases du jeu (un boutton ici) on envoie au serveur que c'est un "play" avec les infos de qui le joue et l'id du btn joué
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    socket.emit("play", { name: playerName, cell: btn.id });
  });
});

// Quand le serveur a envoyé la mise à jour: on l'applique aux deux clients. Board c'est l'état du plateau de jeu et turn c'est à qui le tour
socket.on("update", ({ board, turn }) => {
  document.getElementById("whosTurn").innerText = turn ? "Your Turn" : "Opponent's Turn"; // info si c'est ton tour ou celui de l'adversaire

  // avec les nouvelles infos du plateau on boucle sur les bouttons
  board.forEach((val, i) => {
    const cell = document.getElementById(`btn${i + 1}`); // gestion de la différence entre index et numéro du bouton d'ou le +1
    cell.innerText = val; // on remplit avec la valeur dans la case (x ou o)
    cell.disabled = val !== ""; // si la case n'est pas vide, elle est désactivée
    cell.classList.toggle("btnx", val === "X"); // pour chaque case avec un X on ajoute la classe btnx pour styliser en CSS
    cell.classList.toggle("btno", val === "O"); // pour chaque case avec un O on ajoute la classe btno pour styliser en CSS
  });
});

// Si le serveur envoie un gameOver alors on le récupère et selon le gagnant ou le draw on lance une alert correspondante
socket.on("gameOver", ({ winner }) => {
  setTimeout(() => {
    alert(winner ? `${winner} WON!` : "DRAW!");
    location.reload();
  }, 2000);
});

socket.on("gameOver", ({ winner }) => {
  setTimeout(() => {                  // set un délai laisse le temps de remplir la case (sinon alert pop avant le remplissage)
    alert(winner ? `${winner} WON!` : "DRAW!"); 

    setTimeout(() => {                // set un délai avant le reload
      location.reload();
    }, 2000);                        // 2 secondes avant reload

  }, 100);                            // délai pour s'assurer que la dernière case s'affiche de 100ms
});

