# Procedure

Starting Game
1. The tic tac toe board appears on the screen along with the player scoreboards.
2. A mode selection modal appears with 2 buttons. 

    1. `newGame()` is called
    2. A reference of mode selection modal and its buttons are retrieved 
    3. The modal appears on the screen.
    4. `chooseMode()` is attached to the buttons.
    5. When a button is pressed, depending on the value of buttons, a `human` string value is assigned to both `player1turn`
        and `player2turn` varables or player1turn is given `human` and the other is given `computer`.
    6. The modal disappears
    6. `openMarkerModal()` is called

3. When one of them is pressed, a game mode is selected.
4. The modal disppears after pressing a button. 
5. A marker selection modal appears with 4 butttons.

    1. A reference of marker selection modal and its 4 buttons are retrieved
    2. Attach `chooseMarker()` function to each button.
    3. If a button is pressed, find value of the button.
    4. Assign an image file name to `player1marker` variable.
    5. Change text of modal
    6. Make pressed button grey and get rid of its event handler.
    7. If a button is pressed, find the value of the button.
    8. Assigna an image file name to `player2marker` variable.
    9. Modal disappears.
    10. Call `openFirstTurnModal()`

6. When a button is pressed, the marker on te button is chosen for player one.
7. The text changes (Choose for player two).
8. The previously pressed button is greyed out and made unavailable.
9. When a button is pressed, the marker on the button is chosen for playe two.
10. The modal disappears after pressing the button.
11. A first turn modal appears with three buttons.

    1. References of first turn modal and its 3 buttons are retrieved
    2. Attach `chooseFirstTurn()` to each button.
    3. If a button is pressed, assign `true` to either the `player1turn` var or `player2turn` var
    4. If the random button is chosen, call `chooseRandomly()` to assign `true` to random var.
    5. Modal disappears
    6. Call `startGame()`

12. If either player one button or player two button is pressed, that player gets to go first.
13. If random is pressed, a random player goes first.
14. The modal disappears.
15. The tic tac toe board is now clickable.
16. If a tile is clicked, check if there is already a marker there.

    1. Make a gameboard object (module)
    2. Give it 9 vars (top, center, bottom, left, middle, right)
    3. Assign each var a tile object.
    4. Get reference of tile div and assign it to tile object as a property.
    5. When tile object is pressed, call `placeMarker()`
        1. Check if tile property marked is `null`.
        2. If not, check if it is `1` or `2`.
        3. If either, assign the value to `tile.marked`
        4. Assign `tile.element.background-image` property value of `player.marker` property.
        5. Check if there is a 3 in a row (`checkWinner()`)
            1. If winner, update text on display.
            2. Give winner a point and display the points on the scoreboard
            3. Call `nextRound()`
                1. Reset board
                2. Change `playerturn` property
                3. Clear display. 
        6. Check if winner has 2 points (`checkGameWinner()`)
            1. Update text on display
            2. Open new game modal.
            3. Reset stuff
            4. When press button, call `newGame()`
        7. Check if there is a tie (`checkTie()`)
            1.  Call `nextRound()`
            2. Reset board
            3. Change `playerturn` property
            4. Clear display. 
        8. If no winner or tie, change `playerturn` to `false` and the other `true`

17. If not, check whose turn it is.
18. Once learned, place marker on the tile of the current player.
19. Check if there is a winner.
    1. Check if there is a 3 in a row.
    2. If there is, check whose marker is it.
    3. Announce winner on the display.
    4. Give the player a point and display the score on the scoreboard.
    5. Clear board.
    6. Loser goes first in next round.
    7. Start next round.
20. Check if there is a tie.
    1. Check if all tiles are filled with no 3 in a row.
    2. Annouce there is a tie on the display.
    3. Clear board.
    4. Next peson goes first in next round.
    5. Start next round.
21. If there is a winner, check if the winner has 2 points.
    1. If they do, a modal with a button appears and it announces a winner.
    2. When button is pressed, clear board and points.
    3. Reset game configurations
    4. Open mode selection modal

Reset Button
If you press the reset button during a game, open reset modal that has two button.
1. If press yes button, modal disppears.

    1. Reset game configurations and open mode selection modal.
    2. If press no button, modal disappaers.

    1. Attach resetGame() to reset button.
    2. When pressed, open new game modal
    3. Reset stuff
    4. When press button, call newGame()

    ---
    game
        game.setGame
            open mode modal
            open marker modal
            open first turn modal
            call game.startGame
        game.startGame
            make player1 and player2
            make gameboard
            make tiles and add to gameboard
            add eventHandler to tiles

            call placeMarker
                check if tile is empty
            checkerWinner
            checkTie
            checkGameWinner
            OpenContinueModal
            nextRound
            resetBoard
            changeTurns
        game.newGame
            remove settings
            reset board
            call game.setGame
            