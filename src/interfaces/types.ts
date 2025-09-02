export interface IMessage {
  type: "ADD_PLAYER" | "MOVE";
  content?: string;
}

export interface IPlayer {
  name: string;
  symbol: "X" | "O";
}

export interface IServerMessage {
  type: "GAME_START" | "PLAYER_INFO" | "UPDATE" | "GAME_OVER" | "ERROR";
  players: {
    player1: IPlayer | null;
    player2: IPlayer | null;
  };
  board?: (string | null)[]; // état du plateau (9 cases, "X" | "O" | "")
  winner?: string | null;
  currentTurn: string | null;
  message?: any;
}
