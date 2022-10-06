const game = (function () {
  function setGame() {
    const playerSettings = {
      playerOneType: "human",
      playerTwoType: "human",
      playerOneMarker: null,
      playerTwoMarker: null,
      playerOneTurn: null,
      playerTwoTurn: null,
    };

    let computerDifficulty = null;

    openModeModal();

    function openModeModal() {
      const modeSelectModal = document.querySelector(".modeSelect");
      const vsHumanButton = modeSelectModal.querySelector(
        ".modeSelect__human-button"
      );
      const vsComputerButton = modeSelectModal.querySelector(
        ".modeSelect__computer-button"
      );

      const controller = new AbortController();

      vsHumanButton.addEventListener("click", chooseMode, {
        signal: controller.signal,
      });
      vsComputerButton.addEventListener("click", chooseMode, {
        signal: controller.signal,
      });

      modeSelectModal.showModal();

      function chooseMode(event) {
        const mode = event.target.getAttribute("class");
        switch (mode) {
          case "modeSelect__human-button":
            console.log(
              playerSettings.playerOneType + " " + playerSettings.playerTwoType
            );
            openMarkerModal();
            break;
          case "modeSelect__computer-button":
            playerSettings.playerTwoType = "computer";
            console.log(
              playerSettings.playerOneType + " " + playerSettings.playerTwoType
            );
            openDifficultyModal();
            break;

          default:
            break;
        }
        controller.abort();
        modeSelectModal.close();
      }
    }

    function openDifficultyModal() {
      const difficultyModal = document.querySelector(".difficultySelect");

      const controller = new AbortController();

      const buttons = document.querySelectorAll(
        "button[class^='difficultySelect__']"
      );
      buttons.forEach((button) =>
        button.addEventListener("click", chooseDifficulty, {
          signal: controller.signal,
        })
      );

      difficultyModal.showModal();

      function chooseDifficulty(event) {
        computerDifficulty = event.target.getAttribute("class").slice(18);
        console.log(computerDifficulty);
        difficultyModal.close();
        controller.abort();
        openMarkerModal();
      }
    }

    function openMarkerModal() {
      const markerSelectModal = document.querySelector(".markerSelect");
      const x_button = document.querySelector(".markerSelect__button--x");
      const o_button = document.querySelector(".markerSelect__button--o");
      const triangle_button = document.querySelector(
        ".markerSelect__button--triangle"
      );
      const diamond_button = document.querySelector(
        ".markerSelect__button--diamond"
      );

      const controller = new AbortController();

      x_button.addEventListener("click", chooseMarker, {
        signal: controller.signal,
      });
      o_button.addEventListener("click", chooseMarker, {
        signal: controller.signal,
      });
      triangle_button.addEventListener("click", chooseMarker, {
        signal: controller.signal,
      });
      diamond_button.addEventListener("click", chooseMarker, {
        signal: controller.signal,
      });

      markerSelectModal.showModal();

      function chooseMarker(event) {
        const image = event.target.classList[1].slice(22);

        const currentplayer = !playerSettings.playerOneMarker
          ? "playerOneMarker"
          : "playerTwoMarker";

        switch (image) {
          case "x":
            playerSettings[currentplayer] = "../assets/x.svg";
            x_button.setAttribute("disabled", "");
            break;
          case "o":
            playerSettings[currentplayer] = "../assets/circle.svg";
            o_button.setAttribute("disabled", "");
            break;
          case "triangle":
            playerSettings[currentplayer] = "../assets/triangle.svg";
            triangle_button.setAttribute("disabled", "");
            break;
          case "diamond":
            playerSettings[currentplayer] = "../assets/diamond.svg";
            diamond_button.setAttribute("disabled", "");
            break;

          default:
            break;
        }

        if (playerSettings.playerTwoMarker) {
          controller.abort();
          markerSelectModal.close();
          x_button.removeAttribute("disabled");
          o_button.removeAttribute("disabled");
          triangle_button.removeAttribute("disabled");
          diamond_button.removeAttribute("disabled");

          openFirstTurnModal();

          console.log(
            `${playerSettings.playerOneMarker} and ${playerSettings.playerTwoMarker}`
          );
        }
      }
    }

    function openFirstTurnModal() {
      const firstTurnSelect = document.querySelector(".firstTurnSelect");
      const playerOnebutton = document.querySelector(
        ".firstTurnSelect__button--playerone"
      );
      const playerTwobutton = document.querySelector(
        ".firstTurnSelect__button--playertwo"
      );
      const randomButton = document.querySelector(
        ".firstTurnSelect__button--random"
      );

      const controller = new AbortController();

      playerOnebutton.addEventListener("click", chooseFirstTurn, {
        signal: controller.signal,
      });
      playerTwobutton.addEventListener("click", chooseFirstTurn, {
        signal: controller.signal,
      });
      randomButton.addEventListener("click", chooseFirstTurn, {
        signal: controller.signal,
      });

      firstTurnSelect.showModal();

      function chooseFirstTurn(event) {
        const whoIsFirst = event.target.classList[1].slice(25);
        switch (whoIsFirst) {
          case "playerone":
            playerSettings.playerOneTurn = true;
            playerSettings.playerTwoTurn = false;
            console.log(
              `${playerSettings.playerOneTurn} and ${playerSettings.playerTwoTurn}`
            );
            break;
          case "playertwo":
            playerSettings.playerOneTurn = false;
            playerSettings.playerTwoTurn = true;
            console.log(
              `${playerSettings.playerOneTurn} and ${playerSettings.playerTwoTurn}`
            );
            break;

          case "random":
            chooseRandom();
            break;

          default:
            break;
        }

        controller.abort();
        firstTurnSelect.close();
        createGame(playerSettings, computerDifficulty);
      }

      function chooseRandom() {
        const choice = Math.floor(Math.random() * (101 - 0) + 0);
        if (choice < 50) {
          playerSettings.playerOneTurn = true;
          playerSettings.playerTwoTurn = false;
          console.log(
            `${playerSettings.playerOneTurn} and ${playerSettings.playerTwoTurn}`
          );
        } else {
          playerSettings.playerOneTurn = false;
          playerSettings.playerTwoTurn = true;
          console.log(
            `${playerSettings.playerOneTurn} and ${playerSettings.playerTwoTurn}`
          );
        }
      }
    }
  }

  function createGame(playerinfo, difficulty) {
    const gameboard = (function () {
      const topleft = tileFactory(".board--top-left", 0);
      const topcenter = tileFactory(".board--top-center", 1);
      const topright = tileFactory(".board--top-right", 2);
      const middleleft = tileFactory(".board--middle-left", 3);
      const middlecenter = tileFactory(".board--middle-center", 4);
      const middleright = tileFactory(".board--middle-right", 5);
      const bottomleft = tileFactory(".board--bottom-left", 6);
      const bottomcenter = tileFactory(".board--bottom-center", 7);
      const bottomright = tileFactory(".board--bottom-right", 8);

      return {
        topleft,
        topcenter,
        topright,
        middleleft,
        middlecenter,
        middleright,
        bottomleft,
        bottomcenter,
        bottomright,
      };
    })();
    const player1 = playerFactory(
      playerinfo.playerOneType,
      playerinfo.playerOneTurn,
      playerinfo.playerOneMarker,
      1
    );
    const player2 = playerFactory(
      playerinfo.playerTwoType,
      playerinfo.playerTwoTurn,
      playerinfo.playerTwoMarker,
      2
    );
    // const player1 = playerFactory("human", false, "../assets/circle.svg", 1);
    // const player2 = playerFactory("human", true, "../assets/x.svg", 2);

    console.log(gameboard, player1, player2);
    console.log("Game is created!");


    function playerFactory(type, turn, marker, number) {
      let score = 0;

      function updateScore() {
        score++;
        console.log(score);
      }

      function getScore() {
        console.log(score);
        return score;
      }

      return { type, turn, marker, number, updateScore, getScore };
    }

    const computerDifficulty = (function (difficultyMode) {
      console.log(difficultyMode);
      const difficulty = difficultyMode;
      let counter = 0;

      function computerActs() {
        switch (difficulty) {
          case "easy":
            easyAiMove();
            break;
          case "normal":
            normalAiMove();
            break;
          case "hard":
            hardAiMove();
            break;
          case "impossible":
            impossibleAiMove();
            break;

          default:
            break;
        }
      }

      function easyAiMove() {
        console.log(difficulty);
        let tiles = Object.keys(gameboard);
        let board = [];
        tiles.forEach((tile) => {
          if (gameboard[tile].getIsMarked() === null) {
            board.push(gameboard[tile]);
          }
        });
        const randomNum = Math.floor(Math.random() * (board.length));
        
        board[randomNum].placeComputerMarker();
      }

      function normalAiMove() {
        console.log(difficulty);
        if (counter === 0) {
          smartMove();
          counter++;
        } else if (counter === 1) {
          easyAiMove();
          counter++;
        } else if (counter === 2) {
          easyAiMove();
          counter = 0;
        }
      }

      function hardAiMove() {
        console.log(difficulty);
        if (counter === 0) {
          smartMove();
          counter++;
        } else if (counter === 1) {
          smartMove();
          counter++;
        } else if (counter === 2) {
          easyAiMove();
          counter = 0;
        }
      }

      function impossibleAiMove() {
        console.log(difficulty);
        smartMove();
      }

      function smartMove() {
        const currentboard = makeCurrentBoard();
        const computer = "C";
        const compMove = minimax(currentboard, computer);
        const tile = findTile(compMove.index);
        tile.placeComputerMarker();
      }

      return { computerActs };
    })(difficulty);

    checkComputerFirstTurn();

    function tileFactory(classname, position) {
      const element = document.querySelector(classname);
      let isMarked = null;
      const controller = new AbortController();

      const handleEvent = function (event) {
        placeMarker();
      };

      function placeMarker() {
        if (isMarked) {
          console.log("Already Marked");
          return;
        }
        const currentPlayer = player1.turn ? player1 : player2;
        // const nextPlayer = !player2.turn ? player2 : player1;
        element.style.setProperty(
          "background",
          `no-repeat center/80% url(${currentPlayer.marker})`
        );
        isMarked = currentPlayer.number;
        checkWinner();
      }

      function placeComputerMarker() {
        const currentPlayer = player2;
        element.style.setProperty(
          "background",
          `no-repeat center/80% url(${currentPlayer.marker})`
        );
        isMarked = currentPlayer.number;
        checkWinner();
      }

      function getIsMarked() {
        return isMarked;
      }

      function clearIsMarked() {
        isMarked = null;
      }

      function removePlaceMarker() {
        controller.abort();
      }

      const tile = {
        element,
        handleEvent,
        getIsMarked,
        clearIsMarked,
        removePlaceMarker,
        placeComputerMarker,
        position,
      };

      element.addEventListener("click", tile, { signal: controller.signal });

      return tile;
    }

    function checkWinner() {
      const currentPlayer = player1.turn ? player1 : player2;
      if (
        // Top 3 in a row
        (gameboard.topleft.getIsMarked() === currentPlayer.number &&
          gameboard.topcenter.getIsMarked() === currentPlayer.number &&
          gameboard.topright.getIsMarked() === currentPlayer.number) ||
        // Middle 3 in a row
        (gameboard.middleleft.getIsMarked() === currentPlayer.number &&
          gameboard.middlecenter.getIsMarked() === currentPlayer.number &&
          gameboard.middleright.getIsMarked() === currentPlayer.number) ||
        // Bottom 3 in a row
        (gameboard.bottomleft.getIsMarked() === currentPlayer.number &&
          gameboard.bottomcenter.getIsMarked() === currentPlayer.number &&
          gameboard.bottomright.getIsMarked() === currentPlayer.number) ||
        // Left 3 in a row
        (gameboard.topleft.getIsMarked() === currentPlayer.number &&
          gameboard.middleleft.getIsMarked() === currentPlayer.number &&
          gameboard.bottomleft.getIsMarked() === currentPlayer.number) ||
        // Middle 3 in a row
        (gameboard.topcenter.getIsMarked() === currentPlayer.number &&
          gameboard.middlecenter.getIsMarked() === currentPlayer.number &&
          gameboard.bottomcenter.getIsMarked() === currentPlayer.number) ||
        // Right 3 in a row
        (gameboard.topright.getIsMarked() === currentPlayer.number &&
          gameboard.middleright.getIsMarked() === currentPlayer.number &&
          gameboard.bottomright.getIsMarked() === currentPlayer.number) ||
        // Left to Right Diagonal 3 in a row
        (gameboard.topleft.getIsMarked() === currentPlayer.number &&
          gameboard.middlecenter.getIsMarked() === currentPlayer.number &&
          gameboard.bottomright.getIsMarked() === currentPlayer.number) ||
        // Right to Left Diagonal 3 in a row
        (gameboard.topright.getIsMarked() === currentPlayer.number &&
          gameboard.middlecenter.getIsMarked() === currentPlayer.number &&
          gameboard.bottomleft.getIsMarked() === currentPlayer.number)
      ) {
        currentPlayer.updateScore();
        displayRoundWinner(currentPlayer);
        checkGameWinner();
      } else {
        checkTie();
      }
    }

    function displayRoundWinner(player) {
      //   const display = document.querySelector(".display");
      const display_text = document.querySelector(".display__text");

      const currentPlayer = player;

      display_text.textContent = `Player ${currentPlayer.number} won the round!`;
    }

    function checkGameWinner() {
      const currentPlayer = player1.turn ? player1 : player2;
      if (currentPlayer.getScore() === 2) {
        updateScoreBoard(currentPlayer);
        annouceGameWinner(currentPlayer);
        openContinueModal(resetGame, "Press Ok To Start New Game");
      } else {
        updateScoreBoard(currentPlayer);
        openContinueModal();
        console.log("winner!");
      }
    }

    function updateScoreBoard(player) {
      const scoreboard_text = document.querySelector(
        `.scoreboard__text--player${player.number === 1 ? "one" : "two"}`
      );
      scoreboard_text.textContent = player.getScore();
    }

    function resetScoreBoard() {
      const scoreboards = document.querySelectorAll(".scoreboard__text");
      scoreboards.forEach((scoreboard) => (scoreboard.textContent = ""));
    }

    function annouceGameWinner(player) {
      openDisplay(`Player${player.number} is the winner!`);
    }

    function openContinueModal(callback, string) {
      const continueModal = document.querySelector(".continueModal");
      const continueModal_text = document.querySelector(".continueModal__text");
      const continueModal_button = document.querySelector(
        ".continueModal__ok-button"
      );

      const controller = new AbortController();

      if (callback) {
        continueModal_button.addEventListener(
          "click",
          () => {
            continueModal.close();
            resetTiles();
            callback();
            resetBoard();
            resetScoreBoard();
            closeDisplay();
            controller.abort();
          },
          {
            signal: controller.signal,
          }
        );
        continueModal_text.textContent = string;
      } else {
        continueModal_button.addEventListener(
          "click",
          () => {
            continueModal.close();
            closeDisplay();
            nextRound();
            controller.abort();
          },
          {
            signal: controller.signal,
          }
        );
        continueModal_text.textContent = "Press OK To Continue";
      }

      continueModal.showModal();
    }

    function changeTurns() {
      const currentPlayer = player1.turn ? player1 : player2;
      const nextPlayer = !player2.turn ? player2 : player1;
      currentPlayer.turn = false;
      nextPlayer.turn = true;

      /* Computer's Turn */
      if (nextPlayer.type === "computer") {
        computerDifficulty.computerActs();
      }
    }

    function checkComputerFirstTurn() {
      const currentPlayer = player1.turn ? player1 : player2;
      if (currentPlayer.type === "computer") {
        computerDifficulty.computerActs();
      }
    }

    function openDisplay(string, player) {
      const display_text = document.querySelector(".display__text");

      const currentPlayer = player;

      display_text.textContent = string;
    }

    function closeDisplay() {
      const display_text = document.querySelector(".display__text");
      display_text.textContent = "";
    }

    function nextRound() {
      resetBoard();
      changeTurns();
    }

    function resetBoard() {
      const tiles = Object.keys(gameboard);
      tiles.forEach((tile) => {
        gameboard[tile].clearIsMarked();
        gameboard[tile].element.style.setProperty("background", "");
      });
    }

    function resetTiles() {
      const tiles = Object.keys(gameboard);
      tiles.forEach((tile) => {
        gameboard[tile].removePlaceMarker();
      });
    }

    function checkTie() {
      const tiles = Object.keys(gameboard);
      const isTie = tiles.every(
        (tile) => gameboard[tile].getIsMarked() !== null
      );

      if (isTie) {
        annouceTie();
        openContinueModal();
      } else {
        changeTurns();
      }
    }

    function annouceTie() {
      openDisplay("No winner this round");
    }

    /* Ai Functionality*/

    function minimax(reboard, player) {
      huPlayer = "P";
      aiPlayer = "C";
      let array = avail(reboard);
      if (winning(reboard, huPlayer)) {
        return {
          score: -10,
        };
      } else if (winning(reboard, aiPlayer)) {
        return {
          score: 10,
        };
      } else if (array.length === 0) {
        return {
          score: 0,
        };
      }

      var moves = [];
      for (var i = 0; i < array.length; i++) {
        var move = {};
        move.index = reboard[array[i]];
        reboard[array[i]] = player;

        if (player == aiPlayer) {
          var g = minimax(reboard, huPlayer);
          move.score = g.score;
        } else {
          var g = minimax(reboard, aiPlayer);
          move.score = g.score;
        }
        reboard[array[i]] = move.index;
        moves.push(move);
      }

      var bestMove;
      if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
      return moves[bestMove];
    }

    //available spots
    function avail(reboard) {
      return reboard.filter((s) => s != "P" && s != "C");
    }

    // winning combinations
    function winning(board, player) {
      if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
      ) {
        return true;
      } else {
        return false;
      }
    }

    function makeNewBoard() {
      let newboard;
      const tiles = Object.keys(gameboard);
      newboard = tiles.map((tile) => gameboard[tile]);
      return newboard;
    }

    function makeCurrentBoard() {
      const newboard = makeNewBoard();
      const currentboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      let counter = 0;
      newboard.forEach((tile) => {
        if (tile.getIsMarked()) {
          const marker = tile.getIsMarked() === 1 ? "P" : "C";
          currentboard[counter] = marker;
        }
        counter++;
      });
      return currentboard;
    }

    function findTile(position) {
      let tiles = Object.keys(gameboard);
      tiles = tiles.map((tile) => gameboard[tile]);

      for (let index = 0; index < tiles.length; index++) {
        if (tiles[index].position === position) {
          const computerMove = tiles[index];
          return computerMove;
        }
      }
    }

  }

  function resetGame() {
    setGame();
  }

  return { setGame };
})();

game.setGame();
