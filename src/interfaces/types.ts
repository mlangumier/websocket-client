export interface IMessage {
  type: "ADD_PLAYER" | "MOVE";
  content?: string;
}

export interface IPlayer {
  player: string;
  symbol: "X" | "O";
}

export interface IServerMessage {
  type: "GAME_START" | "UPDATE" | "GAME_OVER" | "ERROR";
  content : {
    players?: IPlayer[];
    board?: string[]; // état du plateau (9 cases, "X" | "O" | "")
    winner?: string | null;
    currentTurn: string | null;
    message?: string;
  }
}
