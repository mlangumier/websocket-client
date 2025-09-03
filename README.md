# WEBSOCKETS CLIENT

A small Tic-Tac-Toe multiplayer game that works with websockets and vanilla JavaScript.

## Setup

This project requires the [websocket-server](https://github.com/mlangumier/websocket-server/) to run.

You can also find the hosted project at [websocket-client-app.vercel.app](https://websocket-client-app.vercel.app/), which is connected to the server.

### Start the app

After cloning the project, install the dependencies with `npm install`.  
After that, you can start the development server using `npx vite` or `npm run dev`.

### Other available scripts

- Code formating (Eslint & Prettier): `npm run format`
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

### WebSocket API & ws

- `WebSocket API` (frontend): Web API to connect browser & server (communication protocol). Contains `WebSocket`: interface that allows the creation of web socket connections.
- `ws` (server): same thing, better data transfer, not necessary -> Node.js server can use the `WebSocket API` as well.

-> Both work the same way

### Following guides

- WebSocket vs ws vs Socket.io
- Node.js vs Express
- Different logics & setups

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

### Deployment

- Frontend: `Vercel.com`
- Server: `Render.com`
