import type { IMessage, IServerMessage } from "./interfaces/types";

export const socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

socket.onopen = () => {
  console.log("✅ Connecté au serveur WebSocket");
};

socket.onerror = err => {
  console.error("❌ Erreur WebSocket :", err);
};

socket.onclose = () => {
  console.warn("⚠️ Connexion fermée");
};

//  Fonction pour envoyer un message
export function sendMessage(msg: IMessage) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg));
  } else {
    console.warn("⏳ WebSocket not ready, message ignored :", msg);
  }
}

//  Callback typé pour écouter les messages serveur
type ServerCallback = (msg: IServerMessage) => void;
let messageCallback: ServerCallback | null = null;

export function onMessage(callback: ServerCallback) {
  messageCallback = callback;
}

//  Réception des messages
socket.onmessage = event => {
  console.log(JSON.parse(event.data));
  try {
    const data: IServerMessage = JSON.parse(event.data);
    if (messageCallback) messageCallback(data);
  } catch (err) {
    console.error("❌ Error parsing WebSocket:", err);
  }
};
