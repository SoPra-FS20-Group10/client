## Introduction

![Game](/readme_images/Introduction.png?raw=true "Optional Title")

This Scrabble game is a project for the course "SoPra" from the spring semester 2020 at the University of Zurich. Our aim was to create a functionning Scrabble game which can be played with two up to four people. The application provides other useful functionality such as account creating, leaderboard, chat, lobbies, etc.

## Technologies used

The game is implemented with:
* React in the frontend - [React](https://www.reactjs.com).
* Using a RESTful API - [REST](https://restfulapi.net/).
* The server is implemented in Java - [Java](https://www.java.com).
* Gradle as our Build-Management-Automation-Tool - [Gradle](https://www.Gradle.com).
* For code quality analysis, we use SonarQube - [SonarQube](https://www.sonarQube.org).

## High-level components

### GamePage [GamePage.js](src/components/game/GamePage.js)

The GamePage Class is where the main functionality for the game is implemented in the frontend. The board is obtained from the backend through the getBoard() and initBoard() functions.

### Lobbylist [Lobbylist.js](src/components/overview/Lobbylist.js)

The Lobbylist class offers the Lobby join functionality. For all existing Lobbies, it lists a corresponding LobbylistEntry, where the user has to type the Lobby password (if it exists) in order to join an existing Lobby. The Lobby can only be joined if it's not already running.

### LobbyPage [Lobbypage.js](src/components/lobby/LobbyPage.js)

The LobbyPage class is used for the Lobby functionality. All the players in the lobby are listed. The players can set their own readystatus, which is also shown to the other players in the lobby. When 2-4 players are in the lobby and all players are ready, the lobbyleader can start the game and all players will be redirected to the GamePage.

## Launch & Deployment

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

Also, make sure you have started the server and installed all dependencies correctly.


### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).



## Illustrations

This is the login screen of the game. It shows up when you open the game for the first time. You have two options:
1. Login as a guest. If you do so, your stats wont be persisted.
2. Register an account or login with an existing account.

![Login](/readme_images/login.png?raw=true "Optional Title")


After logging in as either guest or with an existing account, you are able to do the following things:
1. Chat with other players in the lobby
2. Join existing lobbies (where the game is not already running)
3. Create your own lobby
4. Switch to the Profile page (to update your account and see your statistics) or the Leaderboard (to see the global Leaderboard)
5. Watch the rules of Scrabble
6. Log out

![overview](/readme_images/overview.png?raw=true "Optional Title")


After entering a lobby or creating a lobby, you can do the following things:
1. Chat with other players in the lobby
2. Set your own readystatus
3. Kick other players (lobbyleader only)
4. Leave lobby
5. Start the game

![lobby](/readme_images/lobby.png?raw=true "Optional Title")

When the lobbyleader starts the game, you will enter the GamePage. Here the game itself takes place.
You can do the following actions:

### Left UI:

* See the remaining stones
* See the played words
* See if it's your turn

### Middle UI:

* See the board
* See the placed stones
* See your own stones (bottom)

### Right UI:

* See the Scores of each player in the game
* End game prematurely
* Reset your placed stones (if you havent ended your turn yet)
* Swap your Letters (Only if it's your turn)
* End your turn
* Chat with other players in the game

![game](/readme_images/game.png?raw=true "Optional Title")


## Roadmap

Some additional features which would be nice to have would be:

### Spectator Mode

With the spectator mode, players would be able to join a running game / lobby to be able to watch the whole game without participating. This would bee useful for tournaments.

### Password Recovery System

With the password recovery system, players would be able to recover their password. This can be done either through mail (see next) or some kind of personal question like "What's the name of your first friend?"

### Registering with Email

If the user can register with the mail (which he would have to confirm), he could reset his password. Also, he can be notified about changes.


## Authors and acknowledgement

* [Patrick Looser](https://github.com/ploose)
* [Pascal Marty](https://github.com/Wassermalone)
* [Jan Schnyder](https://github.com/shnippi)
* [Tim Brunner](https://github.com/Tannebaum007)


##  License
Copyright 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

