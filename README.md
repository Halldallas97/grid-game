## Grid-Game 

Welcome, to my 2D based game. The objective of this game is to get from point A to point B on a 50x50 board using arrow keys

### Getting Started 

To run the frontend locally: 
npm install 
npm run dev 

App will launch on http://localhost:3000

### Backend API (Optional) 
This game has an optional backend api which ensures that the user always plays the same board for the day. 
Lint to repository: https://github.com/Halldallas97/dallas-grid-game-backend

### Objective
You start with 200 Health and 450 Moves.
Each grid tile affects your health and movement differently:
“Blank”: {“Health”: 0, “Moves”: -1},
“Speeder”: {“Health”: -5, “Moves”: 0},
“Lava”: {“Health”: -50, “Moves”: -10},
“Mud”: {“Health”: -10, “Moves”: -5},

###Requirements
Built using a modern front-end framework (e.g., React).
Arrow key controls for user input.
Ensure that the game is winnable

###Submission notes: 
Hey, thanks for making it this far. I hope you enjoy playing my game! 
Some current limitations and known issues:
User login and user data retrieval are not yet implemented.
Win screen has not yet been rendered.
Known bug: Once a tile is traversed, it should no longer deal damage and should be treated as a “Blank” tile this is a work in progress.
