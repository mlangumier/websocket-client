
const socket = new WebSocket(import.meta.env.SERVER_URL);


socket.onopen = () => {
  console.log("✅ Connecté au serveur WebSocket");
}

socket.onerror = (err) => {
    console.error("❌ Erreur WebSocket :", err);
};

socket.onclose = () => {
    console.warn("⚠️ Connexion fermée");
};