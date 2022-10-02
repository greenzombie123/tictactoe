# Features

- Can play tic-tact-toe
- Can choose to play with another person or with a computer
- Can choose a marker to use
- Can choose who goes first
- Can let the program decide who goes first
- Can reset the game

# Needs

- [x] Need a ttt board
- [x] Need to ask player what mode of play they want to play (human vs human or human vs computer)
- [x] Ask players to choose a marker
- [x] Ask who will go first
- [x] User can click and place a marker on the board
- [x] The computer knows whose turn it is
- [x] The computer switches turns when a player places a marker
- [x] Keep score and display it
- [x] A button to reset the game
- [x] A modal screen
- [x] Annouce winner when there is a 3 in a row
- [x] Annouce a tie when the entire board is filled yet no winner
- [x] Display a button after a win or tie to allow the players to go the next round.
  - [x] If the game is finished, the button should take the user to the starting scene to play a new game
- [x] Let loser or other player play first in the next round
- [x] Annouce winner when someone whens 2 out of 3 games.
- [x] Know what marker a payer is using
- [x] Dont allow anyone to place a marker on a spot that already has one
- [x] If computer is playing, it must play after the player has made a move
- [x] Computer (for now) makes random moves

## ttt board

1. Make a ttt board with HTML and CSS
2. Create an object that has title objects that represent each tile of the board
3. Get references of all tiles
4. Create 9 tile objects, put refernnce of tile in them, and put them in the board object

### Mode of play

1. Make a modal with a backdrop
2. Give it two button
3. When the human vs human button is clicked, assign a human string value to player1 variable and and player2 variable
4. If click human vs computer, assign the player1 variable a human string value and player2 variable a computer string value

### Marker Selection

1. Make a modal with a backdrop
2. Give it as many buttons as the number of markers
3. When press a button, assign marker to player1 and player2 variables

### Going first

1. Make a modal with a backdrop
2. Give it three buttons: player one, player two, and random
3. If user presses player button, the playerturn variable is assined true and the other false
4. If press random button, a random playerturn variable is given a value of true

### Order of events

1. When app is loaded, call `selectMode()`
2. When a mode is clicked, call `selectMarker()`
3. When a marker is chosen for player two, call `selectFirst()`
4. When button is clicked, call `startGame()`

### Placing markers

1. After the game has began and when you click on a tile, call `placeMarker()`
   1. Check if there is already a marker there.
   2. If not, check whose turn it is.
   3. Place marker of that player on the board
   4. Switch turns

### Keep and displaying score

1. Create two playerScore variables
2. Create an element that displays the values of those variables

### Reset Game

1. Render a button
2. When pressed, call `newGame()`
   1. Reset the game
   2. Render start screen

### Annouce winner

1. When a player places a marker, call `checkWinner()`
   1. Check ttt board if there is a three in a row
   2. Update playerScore
   3. Display text on the screen
   4. Render a button
   5. When press, call `nextRound()`
      1. Start the next round and let the other player go first

### Annouce tie

1. When a player places a marker, call `checkWinner()`
2. If no winner, call `checkTie()`
   1. Check if all tiles are filled with markers.
   2. Display text on the screen that it was a tie
   3. Render a button
   4. When press, call `nextRound()`
      1. Start the next round and let the other player go first

### Annouce game winner

1. When `checkWinner()` is called, call `checkGameWinner()`
   1. Check if a playerscore has 2 points
   2. If yes, display text on the screen that a player has won the game
   3. Render a button
   4. When press, call `newGame()`
      1. Return to starting screen and begin a new game

### What marker the player is using

1. When `placeMarker()` is called, check whose turn it is by seeing which `playerturn` is true
2. Get player object
3. Check the value of `playermarker` variable
4. Depending on the value of `placeMarker()`, assign value to element's `background-image` property

### Placing a marker on a ttt board

1. When `placeMarker()` is called, check whose turn it is by seeing which `playerturn` is true
2. Get `player` object
3. Assign 1 if `player1` or 2 if `player2` to ttt board object array

### Checking 3 in a row

1. If ttt.topleft & ttt.topcenter & ttt.topright
2. If true (truthy), check if each one has a 1, call a function
3. If false (there are 2s instead of 1s), call a function

### Marker is already there

1. Call `placeMarker()`
2. If a marker is already there, return.

### Computer Takes an Action

1. player places a marker `placeMarker()`
2. Change playerturn to true and the other false.
3. CHeck if playertype is `computer`
4. IF true, call `computerActs()`
   1. Computer places a marker.
   2. Change playerTurn

### Computer makes random placement

1. `computerActs()` is called
2. Find all empty tiles
3. Place marker on random empty tiles

# Order Of Events

1. When webpage is uploaded, the tic tac toe board appears.
2. Immediately afterwards, the mode selection modal appears.
   1. Call `newGame()`
   2. Store `mode` value to a variable
3. After a button is pressed, show marker selection modal.
   1. Stoe `marker` values to a variable
4. After a button is pressed, show turn selection modal.
   1. Store `true` in a playerturn var
5. After a button is pressed, start game (`startGame()`).
   1. Player objects are created
   2. gameboard object is created
   3. Attach eventhandler `placeMarker()` to tiles.
   4. Get references to scoreboards, announcement board, reset button, etc
   5. Attach `resetGame()` to reset button
6. If a tile is pressed,
   1. Call `placeMarker()`
   2. Check `playerturn` vars if one of them is true
   3. Place marker.
   4. Call `checkWinner()`
      1. Call `checkGameWinner`
         1. Call `newGame()`
      2. Call `newRound()`
   5. Call `checkTie()`
      1. Call `newRound()`
   6. Call `changeTurns()`
      1, If player is computer 2. Call `computerActs()`

---

```javascript

newGame()
//Render 3 modals
//Press buttons

newGame(){
    const player1type
    const player2type
    const player1turn
    const player2turn
    const player1marker
    const player2marker

    const humanVsHumanButton
    const humanVsComputerButton

    const markerbuttons // X O Triangle Square buttons
    const turnsbuttons // player1 player2 random buttons

    button.addEventListener()
    //Attach chooseMode() to mode buttons
    //Attach AddchooseMarker()
    //Attach chooseFirstTurn()
    // Logic based off element's values

    chooseMode(){}
    chooseMarker(){}
    chooseFirstTurn(){
        startGame()
    }

    chooseMode() //Open marker modal when pressed
    chooseMarker() //Open FirstTurn modal when pressed
    chooseFirstTurn() //Close modal and start game

    startGame(){
        const player1 = playerFunction(player1type, player1turn, player1marker, 1)
        const player2 = playerFunction(player2type, player2turn, player2marker, 2)

        const gameBoard = function(){

        const topleft = tileFactory()
        const topcenter = tileFactory()
        const topright = tileFactory()
        const middleleft = tileFactory()
        const middlecenter = tileFactory()
        const middleright = tileFactory()
        const bottomleft = tileFactory()
        const bottomcenter = tileFactory()
        const bottomright = tileFactory()

        const tiles = [topleft, ...];

        function eraseTiles(){
            tiles.foreach(tile=>tile.eraseMarker())
        }

        return {topleft, ..., eraseTiles} 
        }

        const resetButton = button;
        button.addEventListener('click', ()=>{resetGame(gameboard)})
    }

    function playerfactory(type, turn, marker, number){
        let score = 0;
        
        return {type, turn, marker, number}
    }
    
    function tileFactory(){
        element = div // Find element
        marker = null;
        div.addEventListener('click', this)
        handleEvent = () => placeMarker();
        // function placeMarker(player){
        //     marker = player.playernumber
        //     element.background-image = player.marker;
        // }
        function eraseMarker(){
            div.removeEventListener('click', this)
        }

        return {placeMarker, marker, eraseMarker}
    }

    function placeMarker(){
        const currentplayer = player1.turn ? player1 : player2;

    }

    function resetGame(gameboard){
        gameboard.eraseTile();
    }

}


```
