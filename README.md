# WEBSOCKETS CLIENT

A small Tic-Tac-Toe multiplayer game that works with websockets and vanilla JavaScript.

## Setup

### Start the app

After cloning the project, install the dependencies with `npm install`.  
After that, you can start the development server using `npx vite` or `npm run dev`.

### Other available scripts

- Code formating (Eslint & Prettier): `npm run format`
- Production build: `npx build`
- Production preview: `npx preview`

## Goals

### MVP

- [ ] Frontend/Client (host: Github, Vercel)
- [ ] Backend/Server (host: CloudFlare?)
- [ ] Server with 2 players max -> other visitors will get an error
- [ ] Game actions sent to server & sent to other client to be displayed
- [ ] Manage victory conditions
- [ ] Game over: display `alert` with won/lost
  - [ ] Disconnect players
  - [ ] Clean up server: clean up connected clients and game
  - [ ] -> Allow 2 new players

### V1.0

- [ ] Player names (prompt)
- [ ] Live chat
- [ ] Display action history (current game)
- [ ] Replay game: option to replay game against same opponent

### V2.0

- [ ] Database (SQLite, Rxdb): actions, games, scores
- [ ] Game rooms: multiple game rooms that scale with the number of players
  - [ ] Step 1: auto-matchmaking
  - [ ] Step 2: display & join available game rooms, or create one
