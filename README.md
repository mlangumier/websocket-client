# MORPION WEBSOCKETS - CLIENT

**Group members**: Améliah LOUIS, Malak BOUAKER, Mathieu LANGUMIER

**Description**: A small Tic-Tac-Toe (fr: morpion) multiplayer app with real-time communication between browsers thanks to a websocket server using the WebSocket API & 'ws' libraries.

---

**Table of content**

- [MORPION WEBSOCKETS - CLIENT](#morpion-websockets---client)
  - [1. Setup](#1-setup)
    - [1.1. Start the app](#11-start-the-app)
    - [1.2. Other available scripts](#12-other-available-scripts)
  - [2. Features](#2-features)
  - [3. WebSockets, JavaScript, Node.js](#3-websockets-javascript-nodejs)
    - [3.1. WebSocket API \& ws](#31-websocket-api--ws)
    - [3.2. Following guides \& tutorials (+links)](#32-following-guides--tutorials-links)
    - [3.3. Implementation](#33-implementation)
      - [Server](#server)
      - [Handling players](#handling-players)
      - [Messages](#messages)
      - [Game](#game)
    - [3.4. Deployment](#34-deployment)
    - [3.5. Challenges](#35-challenges)
    - [3.6. Next steps](#36-next-steps)

---

## 1. Setup

This project requires the [Morpion Websocket Server](https://github.com/mlangumier/websocket-server/) to run.

You can also find the hosted project at [websocket-client-app.vercel.app](https://websocket-client-app.vercel.app/), which is connected to the server.

### 1.1. Start the app

After cloning the project, install the dependencies with `npm install`.  
After that, you can start the development server using `npx vite` or `npm run dev`.

### 1.2. Other available scripts

- Check code formating (Eslint & Prettier): `npm run format`
- Production build: `npx build`
- Production preview: `npx preview`

## 2. Features

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

## 3. WebSockets, JavaScript, Node.js

### 3.1. WebSocket API & ws

**WebSocket API** (frontend)  
Persistent two-way connection between browser & server (communication protocol), meaning that both the client or the server can send data to the other (!= HTTP where the client has to send a request in order to receive a response). Contains `WebSocket`: interface that allows the creation of web socket connections for real-time apps such as multiplayer games, chat, notifications...

**ws** (server)  
Same thing, better data transfer, not necessary -> Node.js server can use the `WebSocket API` as well.

-> They both work the same way, but while `WebSocket API` is built into the browser and used for client applications, `ws` is a package mainly for Node.js to setup a websocket server (but `ws` can be used on both server and client).

**Documentation**:

- Mdn documentation on the [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- Node.js documentation on the [WebSocket API](https://nodejs.org/en/learn/getting-started/websocket)
- `ws` dependency on [GitHub](https://github.com/websockets/ws)

### 3.2. Following guides & tutorials (+links)

- Tutorial 1: [Building a Node.js WebSocket Server: A Practical Guide](https://medium.com/@leomofthings/building-a-node-js-websocket-server-a-practical-guide-b164902a0c99)
- Tutorial 2: [Build a Real-Time Multiplayer Tic-Tac-Toe Game Using WebSockets and Microservices](https://www.freecodecamp.org/news/build-a-real-time-multiplayer-tic-tac-toe-game-using-websockets-and-microservices/)
- Branch with Express.js & Socket.io tutorial: [test-branch-ameliah](https://github.com/mlangumier/websocket-client/tree/test-separation-logic-ameliah)

After reading the documentation and understanding a bit better how websockets work, we looked for guides and tutorials to see it the websockets in practice. Whether they were tutorials for `chat room`, `tic-tac-toe` (morpion), or other interactions, and whatever tools they used (Node.js vs Express.js, WebSocket API vs ws vs Socket.io), they worked very similarly for what we wanted to do. We decided to keep JavaScript/Vite & WebSocket API for the client, and Node.js & ws for the server. Add to that TypeScript to better organise the data we'll be managing, and that's it.

We took inspiration from all the tutorial we've seen in order to build this project, some having more DOM interaction, others a better structure for managing websockets.

### 3.3. Implementation

#### Server

The `ws` WebSocket server is initialized using a HTTP as a base (persistent connection). On the client-side, a connection from the client's browser to the websocket server starts as soon as the client lands on the project's home page, connecting them to the websocket server and allowing them to receive game information managed from the server.

#### Handling players

In the game info, the server manages two players. Once a user enters their name in the prompt, they're added as one of the two players (unless both players already exist, in which case they're only visitors). The server receives the player's name, gives them a symbol ("X" or "O"), sends this user their player info (to immediatly display their own move instead of waiting for the server to validate it) and to other users the name of this players to be displays (ex: `Player1 vs Player 2`). If a player disconnects, the server will detect it and send a `Game Over` message to stop the game.

#### Messages

A message is the communicated data sent between the client and the server. We've defined that each messages has at least a `type` and a `content`, this allows us to use a `switch/case` statement and create functions that can each handle a type of message:

```js
switch (message.type) {
  case "ADD_PLAYER": {
    addPlayerToGame(message.playerName);
    break;
  }
}
```

Also, using TypeScript helped us understand and type the data and message types would be sending between the client and the server.

#### Game

The game's state is managed on the server side of the application, which allows us to check that the actions / messages are relevant to the current state of the game (wrong move, win/lose/draw, etc.) and immediatly broadcast the move or the new state of the game to everyone who is watching. The client-side of the app only registers user events (entering their name, clicking on a tile to play their move) but it should not handle game logic, otherwise that would false the server's data and cheating would be easy.

### 3.4. Deployment

In order to go a bit further, we've decided to try and deploy the app and see what additional setup is necessary for websockets to work properly. In order to not complicate things, we wanted hosts that allow **automated deployment** from a **GitHub** repository.
Having used [Vercel](https://vercel.com/) before, we're started setting up the client side of the app with this host. However, Vercel does not support websocket servers, so after looking at what host allowed backend server with **native websocket** support (hence eliminating Cloudflare since they require additional setup with their own tool), we settled on [Render.com](https://render.com/), a **free** host that pause the server after 15mins of inactivity and restarts it when the next request is sent: perfect for us!

Now for the setup. As it turns out, it was pretty easy. Both hosts are link to the repository they'll be hosting, and when changes pushed on the `main` branch, it triggers a new deployment on the host. The only setup required was to add environment variables, since the deployed websited are secured and the websocket url becomes `wss//<server-url>` instead of `ws//<server-url>`. And that's it!

Note: The idea regarding hosting the app was to do it simply and for **free**. When choosing a hosting provider, make sure you know and understand **what features are free, what their limits are** (number of projects, computed/activity hours, free trials, etc.). And when in doubt: if the provider asks for your credit card, there is a very high chance that you will be charged at some point!

### 3.5. Challenges

- **Game logic**: this kind of application required server-side state synchronization to manage the game's state and relay the information to all browers. Example: if a user (spectator) joins while the game is being played, the server detects the newly connected client and sends the current game information. That also allows us to verify that the different types of actions are valid, process the data (win/lose/draw/errors) and send the relevant data (game's data or errors) to the players and visitors.
- **Frontend/Server communication**: what to send and what to receive. Solutions:
  - **TypeScript**: define in advance the type of objects we'll send/receive and how to manage that kind of data.
  - **Team communication**: we had to adapt and change the ways we handled some features multiple times because of unexpected problems. Regularly communicating these changes, and deciding on what to do next was very important to advance and make sure we were on the same page.
  - **Live coding/testing**: when problems occured or we needed to try something but didn't have all the information yet, we did some live-coding, allowing everyone to share their ideas and see how it would go, and what it would impact.

### 3.6. Next steps

Other that fixes, here are possible features that could use websockets:

- **Reset** game after "game over" (with setTimeOut or 'New Game' button)
- **Matchmaking** system: multiple game rooms that either allow players to join a new room when they enter the app (play with random people) or allow players to create their own games and invite other players.
- Game **chat**: either full chat on the side or simply reactions with emote (much more friendly that chat).
- Manage **game state** with [XState](https://stately.ai/docs/xstate): organize the game's progression and define the order in which the states can follow eachother (help with structure, prevents cheating)
- Keep trace of game scores & game **history** (local storage or database)
