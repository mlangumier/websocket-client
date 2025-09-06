# MORPION WEBSOCKETS - CLIENT

**Group members**: Améliah LOUIS, Malak BOUAKER, Mathieu LANGUMIER

**Description**: A small Tic-Tac-Toe (fr: morpion) multiplayer app with real-time communication between browsers thanks to a websocket server using the WebSocket API & 'ws' libraries.

## Setup

This project requires the [Morpion Websocket Server](https://github.com/mlangumier/websocket-server/) to run.

You can also find the hosted project at [websocket-client-app.vercel.app](https://websocket-client-app.vercel.app/), which is connected to the server.

### Start the app

After cloning the project, install the dependencies with `npm install`.  
After that, you can start the development server using `npx vite` or `npm run dev`.

### Other available scripts

- Check code formating (Eslint & Prettier): `npm run format`
- Production build: `npx build`
- Production preview: `npx preview`

## Features

- [x] Frontend/Client (host: Github, Vercel)
- [x] Backend/Server (host: CloudFlare?)
- [x] Player names (prompt)
- [x] Game accepts 2 players -> others are spectator
- [x] Game actions sent to server & sent to other client to be displayed
- [x] Manage victory conditions
- [ ] Game over:
  - [x] display `alert` with won/lost
  - [ ] Disconnect players
  - [ ] Clean up server: clean up connected clients and game
  - [x] Allow 2 players

## WebSockets, JavaScript, Node.js

### Overview (TODO: turn into sections)

- **Why WebSockets**: persistent two-way connection between client & server (!= HTTP) allows for real-time apps (games, chat, notifications...).
- **Tech Stack**: Vite/TS frontend with WebSocket API (hosted on Vercel.io), Node.js/TS backend with 'ws' library (hosted on Render.com)
- **Implementation Highlights**: Setup basic Node.js server handling HTTP for health check & WebSocket for communication between browsers & game logic management. Manage players registration, broadcast game state (server updates) and player moves -> notifies all connected clients to display board.
- **Key Challenges**: Update & broadcast game consistently, handle different message types, manage client connect/disconnect & 2-player registration + spectators, local vs production specificities.
- **Learnings**: WebSockets require server-side state synchronization (game state); WebSocket API, ws & Socket.io very similar setup and basic use; Code structure (helped by using TypeScript)
- **Next steps** (if continued): fix current issues (ex: allows new game / restart or reset game after game-over + 5s), matchmaking system (multiple rooms), game chat, record game scores & history (local storage or database).

### WebSocket API & ws

- Node.js documentation on the [WebSockets API](https://nodejs.org/en/learn/getting-started/websocket)
- `ws` dependency on [GitHub](https://github.com/websockets/ws)

- `WebSocket API` (frontend): Web API to connect browser & server (communication protocol). Contains `WebSocket`: interface that allows the creation of web socket connections.
- `ws` (server): same thing, better data transfer, not necessary -> Node.js server can use the `WebSocket API` as well.

-> Both work the same way

### Following guides & tutorials (+links)

- WebSocket vs ws vs Socket.io
- Node.js vs Express
- Different logics & setups

### Project

Structure: TypeScript to facilitate the structure of objects (especially messages sent/received), and environment variables in a `.env` file for the server URL (allows testing with local or deployed server url without risking pushing the wrong address on GitHub).

Setup:

- WebSockets:
  - Explain WebSocket/ws
  - Create instance to init connection + switch/case on "message" event to get the received message from the client or server -> similar setup with switch cases to easily distinguish and handle different message types defines using TypeScript.

- Description de la base ud projet (tuto Améliah + lien branche)
- Description fonctionnement du projet (ex: browser + server en local) + spécificités (messages, étapes de jeu, extraits de code simplifiés pour illustrer)

### Issues

- Game logic -> using multiple tutorials as a basis
- Structure: where to verify game logic (win/lose/cheating)
- Frontend/Server communication: what to send and what to receive. Solutions:
  - TypeScript
  - Team communication
  - Live coding/testing

### Next steps

Other possible features that could use websockets:

- Reset game after "game over"
- Waiting list
- Game chat
- Game rooms: multiple simulatenous games if there are many visitors
- Gestion des états de jeu du client avec [XState](https://stately.ai/docs/xstate)

### Deployment

- Frontend: `Vercel.com`
- Server: `Render.com`

### Additional notes
