
# ❌🔵 Tic-Tac-Toe WebSockets 🔵❌
  

A **Tic-Tac-Toe** game playable in **real-time** between two players via the browser.

This project uses **Node.js, Express, and Socket.IO** to manage player connections and game state.


# Install

**Run**:


```bash

# Clone the repository
git clone https://github.com/mlangumier/websocket-client/tree/test-separation-logic-ameliah

# Navigate to the project folder
cd test-separation-logic-ameliah

# Install dependencies
npm install -g express http nodemon socket.io 

# Start the server
nodemon server.cjs

# Ouvrir 2 fenêtres sur :
# http://localhost:8080

```

---


## 🔗 Features

  

- **Simple  interface** using HTML + CSS

-  **Real-time connection** with Socket.IO

-  **Automatic role assignment** (X and O)

-  **Instant updates** on the game board for both players

-  **Automatic check** for victory or draw

-  **Automatic game reset** after a match

  

---

  

## ▶️ Ressources

**Websocket**
https://www.youtube.com/watch?v=1BfCnjr_Vjg

**Tic-Tac-Toe**
https://www.youtube.com/watch?v=LpSvzaPsnVI
https://www.youtube.com/watch?v=wR8GSFHJ330

**Documentation**
https://developer.mozilla.org/fr/docs/Web/JavaScript
https://socket.io/docs/v4/
https://stackoverflow.com/
et le cours


## 🛠️ Tech Stack



| Component       | Role                                           |
|-----------------|-----------------------------------------------|
| HTML / CSS      | User interface                                |
| JavaScript      | Game logic on the client side                 |
| Node.js         | Backend server                                |
| Express         | Serves/send static files (HTML/CSS/JS)            |
| Socket.IO       | Handles real-time communication between players |


---

  

## 🎮 Game Logic

  

```mermaid

flowchart TD

START([START])

HTML[/"HTML + CSS page displayed to player"/]

ENTER[/"Player enters name and clicks 'Search'"/]

SERVER["Server receives request and stores the player"]

CHECK_CONN{"Two players connected?"}

CREATE["Create a game (Player X / Player O)"]

DISPLAY["Display board to both players"]

TURN_X["Player X's turn<br>Clicks a cell"]

UPDATE["Server updates game state for both players"]

CHECK_WIN{"Check for win or draw"}

WIN["Show result"]

TURN_O["Player O's turn"]

  

END([END])

  

START --> HTML --> ENTER --> SERVER --> CHECK_CONN

CHECK_CONN -->|Yes| CREATE --> DISPLAY --> TURN_X --> UPDATE --> CHECK_WIN

CHECK_WIN -->|Win/Draw| WIN --> END

CHECK_WIN -->|No| TURN_O --> TURN_X
```
  
  

## ⚡ Express

  

**What is it?** A light framework for Node.js.

  

**Role in this project:**

  

Serves/send static files (HTML, CSS, JS) to the browser.

  

Creates simple routes, to display the game page.

  

**Connection to WebSockets:** Express doesn’t handle real-time communication by itself, but it provides the server base for Socket.IO to run on.

  

## 🔃 Socket.IO

  

**What is it?** A Node.js library that enables real-time communication between the server and browsers.

  

**Role in this project:**

  

Lets both players see moves instantly.

  

Manages events like “player joined”, “move played”, “game over”.

  

**How it works:** Uses WebSockets (with fallback if the browser doesn’t support them) to send and receive data continuously.



**Screenshots**

![image](public\img\Interface1.png)
![image](public\img\Interface2.png) 
![image](public\img\Interface3.png) 
![image](public\img\Interface4.png) 
![image](public\img\Interface5.png) 
![image](public\img\Interface6.png) 
![image](public\img\Interface7.png) 
