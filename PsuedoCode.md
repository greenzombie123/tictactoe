# New Game Set Up

```javascript
function newGame(){
    const playerOneType = "human"
    const playerTwoType = "human"
    const modeSelectModal = document.querySelector('.modeSelect');
    const vsHumanButton = modeSelectModal.querySelector('.vsHuman');
    const vsComputerButton = modeSelectModal.querySelector('.vsComputer');

    vsHumanButton.addEventListener('click', chooseMode, false);
    vsComputerButton.addEventListener('click', chooeMode, false);
    // add 'open' class to modeSelectModal

    function chooseMode(event){
        const mode = event.target.getAttribute('class');
        switch(mode){
            case 'vsHuman':
                console.log(playerOneType + " " + playerTwoType);
                break;
            case 'vsComputer':
                playerTwoType = "computer";
                console.log(playerOneType + " " + playerTwoType);
                break;
            
            default:
        }
        vsHumanButton.removeEventListener('click', chooseMode, false);
        vsComputerButton.removeEventListener('click', chooeMode, false);
        openMarkerModel();
    }

}
```