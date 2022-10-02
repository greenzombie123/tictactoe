//

function setGame() {
  let playerOneType = "human";
  let playerTwoType = "human";
  const modeSelectModal = document.querySelector(".modeSelect");
  const vsHumanButton = modeSelectModal.querySelector(
    ".modeSelect__human-button"
  );
  const vsComputerButton = modeSelectModal.querySelector(
    ".modeSelect__computer-button"
  );

  vsHumanButton.addEventListener("click", chooseMode, false);
  vsComputerButton.addEventListener("click", chooseMode, false);
  modeSelectModal.showModal();

  function chooseMode(event) {
    const mode = event.target.getAttribute("class");
    switch (mode) {
      case "modeSelect__human-button":
        console.log(playerOneType + " " + playerTwoType);
        break;
      case "modeSelect__computer-button":
        playerTwoType = "computer";
        console.log(playerOneType + " " + playerTwoType);
        break;

      default:
        break;
    }

    vsHumanButton.removeEventListener("click", chooseMode, false);
    vsComputerButton.removeEventListener("click", chooseMode, false);
    modeSelectModal.close();
    openMarkerModal();
  }

  let playerOneMarker;
  let playerTwoMarker;

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

    x_button.addEventListener("click", chooseMarker, false);
    o_button.addEventListener("click", chooseMarker, false);
    triangle_button.addEventListener("click", chooseMarker, false);
    diamond_button.addEventListener("click", chooseMarker, false);

    markerSelectModal.showModal();

    function chooseMarker(event) {
      const image = event.target.classList[1];
      if (!playerOneMarker) {
        switch (image) {
          case "markerSelect__button--x":
            playerOneMarker =
              "/home/gunmadude/repos/OdinProjects/tictactoe/assets/x.svg";
            x_button.setAttribute("disabled", "");
            break;
          case "markerSelect__button--o":
            playerOneMarker =
              "/home/gunmadude/repos/OdinProjects/tictactoe/assets/cirlce.svg";
            o_button.setAttribute("disabled", "");
            break;
          case "markerSelect__button--triangle":
            playerOneMarker =
              "/home/gunmadude/repos/OdinProjects/tictactoe/assets/triangle.svg";
            triangle_button.setAttribute("disabled", "");
            break;
          case "markerSelect__button--diamond":
            playerOneMarker =
              "/home/gunmadude/repos/OdinProjects/tictactoe/assets/diamond.svg";
            diamond_button.setAttribute("disabled", "");
            break;

          default:
            break;
        }
      } else {
        switch (image) {
          case "markerSelect__button--x":
            playerTwoMarker =
              "/home/gunmadude/repos/OdinProjects/tictactoe/assets/x.svg";
            x_button.removeAttribute("disabled");
            break;
          case "markerSelect__button--o":
            playerTwoMarker =
              "/home/gunmadude/repos/OdinProjects/tictactoe/assets/circle.svg";
            o_button.removeAttribute("disabled");
            break;
          case "markerSelect__button--triangle":
            playerTwoMarker =
              "/home/gunmadude/repos/OdinProjects/tictactoe/assets/triangle.svg";
            triangle_button.removeAttribute("disabled");
            break;
          case "markerSelect__button--diamond":
            playerTwoMarker =
              "/home/gunmadude/repos/OdinProjects/tictactoe/assets/diamond.svg";
            diamond_button.removeAttribute("disabled");
            break;

          default:
            break;
        }
        x_button.removeEventListener("click", chooseMarker, false);
        o_button.removeEventListener("click", chooseMarker, false);
        triangle_button.removeEventListener("click", chooseMarker, false);
        diamond_button.removeEventListener("click", chooseMarker, false);

        markerSelectModal.close();
        openFirstTurnModal();
      }
      console.log(`${playerOneMarker} and ${playerTwoMarker}`);
    }
  }

  let playerOneTurn;
  let playerTwoTurn;

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

    playerOnebutton.addEventListener("click", chooseFirstTurn, false);
    playerTwobutton.addEventListener("click", chooseFirstTurn, false);
    randomButton.addEventListener("click", chooseFirstTurn, false);

    firstTurnSelect.showModal();

    function chooseFirstTurn(event) {
      const whoIsFirst = event.target.classList[1];
      switch (whoIsFirst) {
        case "firstTurnSelect__button--playerone":
          playerOneTurn = true;
          playerTwoTurn = false;
          console.log(`${playerOneTurn} and ${playerTwoTurn}`);
          break;
        case "firstTurnSelect__button--playertwo":
          playerOneTurn = false;
          playerTwoTurn = true;
          console.log(`${playerOneTurn} and ${playerTwoTurn}`);
          break;

        case "firstTurnSelect__button--random":
          chooseRandom();
          break;

        default:
          break;
      }
      playerOnebutton.removeEventListener("click", chooseFirstTurn, false);
      playerTwobutton.removeEventListener("click", chooseFirstTurn, false);
      randomButton.removeEventListener("click", chooseFirstTurn, false);
      firstTurnSelect.close();
    }

    function chooseRandom() {
      const choice = Math.floor(Math.random() * (101 - 0) + 0);
      if (choice < 50) {
        playerOneTurn = true;
        playerTwoTurn = false;
        console.log(`${playerOneTurn} and ${playerTwoTurn}`);
      } else {
        playerOneTurn = false;
        playerTwoTurn = true;
        console.log(`${playerOneTurn} and ${playerTwoTurn}`);
      }
    }
  }
}

setGame();
