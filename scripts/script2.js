const gameboard = (function () {
  const topleft = tileFactory(".board--top-left");
  const topcenter = tileFactory(".board--top-center");
  const topright = tileFactory(".board--top-right");
  const middleleft = tileFactory(".board--middle-left");
  const middlecenter = tileFactory(".board--middle-center");
  const middleright = tileFactory(".board--middle-right");
  const bottomleft = tileFactory(".board--bottom-left");
  const bottomcenter = tileFactory(".board--bottom-center");
  const bottomright = tileFactory(".board--bottom-right");

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

const player1 = playerFactory("human", false, "../assets/circle.svg", 1);
const player2 = playerFactory("human", true, "../assets/x.svg", 2);

function tileFactory(classname) {
  const element = document.querySelector(classname);
  let isMarked = null;

  const handleEvent = function (event) {
    placeMarker();
  };

  function placeMarker() {
    if (isMarked) {
      console.log("Already Marked");
      return;
    }
    const currentPlayer = player1.turn ? player1 : player2;
    const nextPlayer = !player2.turn ? player2 : player1;
    element.style.setProperty(
      "background",
      `no-repeat center/80% url(${currentPlayer.marker})`
    );
    isMarked = currentPlayer.number;
    checkWinner();

    currentPlayer.turn = false;
    nextPlayer.turn = true;
    console.log(currentPlayer, nextPlayer, isMarked, getIsMarked());
  }

  function getIsMarked() {
    return isMarked;
  }

  function clearIsMarked() {
    isMarked = null;
  }

  const tile = {
    element,
    handleEvent,
    getIsMarked,
    clearIsMarked,
  };

  element.addEventListener("click", tile, false);

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
    updateScoreBoard(currentPlayer);
    openContinueModal();
    console.log("winner!");
  }
}

function displayRoundWinner(player) {
//   const display = document.querySelector(".display");
  const display_text = document.querySelector(".display__text");

  const currentPlayer = player;

  display_text.textContent = `Player ${currentPlayer.number} won the round!`;

  
}

function closeDisplay(){
    const display_text = document.querySelector(".display__text");
    display_text.textContent = "";
}

function updateScoreBoard(player) {
  const scoreboard_text = document.querySelector(
    `.scoreboard__text--player${player.number === 1 ? "one" : "two"}`
  );
  scoreboard_text.textContent = player.getScore();
}

function nextRound() {
  resetBoard();
}

function resetBoard() {
  const tiles = Object.keys(gameboard);
  tiles.forEach((tile) => {
    gameboard[tile].clearIsMarked();
    gameboard[tile].element.style.setProperty("background", "");
  });
}

function openContinueModal() {
  const continueModal = document.querySelector(".continueModal");
  const continueModal_button = document.querySelector(
    ".continueModal__ok-button"
  );

  continueModal_button.addEventListener(
    "click",
    () => {
      continueModal.close();
      closeDisplay();
      nextRound();
    },
    { once: true }
  );

  continueModal.showModal();
}

function checkGameWinner() {}

function checkTie() {
    const tiles = Object.keys(gameboard);
  const isTie = tiles.every((tile) => {
    !(gameboard[tile].isMarked);
  });

  if (isTie) {
    
  }
}

function annouceTie(){
    
}

// var tileTest = tileFactory(".board--top-left");
