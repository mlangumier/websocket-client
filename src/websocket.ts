export 
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  console.log("✅ Connecté au serveur WebSocket");
}

socket.onerror = (err) => {
    console.error("❌ Erreur WebSocket :", err);
};

socket.onclose = () => {
    console.warn("⚠️ Connexion fermée");
};