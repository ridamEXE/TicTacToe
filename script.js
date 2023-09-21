function showingHiddenGameBox() {
    headerHeadlineElement[0].textContent = "Play Now!!";
    headerParagraphElements[0].textContent = "";
    headerParagraphElements[1].textContent = "";
    gameBoard.style.display = "block";
    startGameButton.style.display = "none";
}

function showOverlayWindow() {
    overlayWindow.style.visibility = "visible";
}

function hideOverlayWindow() {
    overlayWindow.style.visibility = "hidden";
}

function changePlayerNames() {
    //this method helps to change the default behavior of form submission
    event.preventDefault();

    const newP1Name = playerOneNameInputElement.value;
    const newP2Name = playerTwoNameInputElement.value;

    if (!newP1Name.trim()) {
        playerOneListItemElement.textContent = "Player 1";
        player[0].name = "Player 1";
    }
    else {
        playerOneListItemElement.textContent = newP1Name.trim();
        player[0].name = newP1Name.trim();     
    } 

    if (newP2Name.trim() === '') {
        playerTwoListItemElement.textContent = "Player 2";
        player[1].name = "Player 2";
    }
    else {
        playerTwoListItemElement.textContent = newP2Name.trim();
        player[1].name = newP2Name.trim();
    }
    hideOverlayWindow();
}

function resetGameStats() {
    p1 = +0;
    p2 = +0;
    draw = +0;
    playerOneWinnings.textContent = 0;
    playerTwoWinnings.textContent = 0;
    totalDraws.textContent = 0;
}

function changePlayerChance() {
    if (activeplayer === 0) activeplayer++;
    else activeplayer--;
}

function gameLogic() {
    //for checking rows
    for (let x = 0; x < 3; x++) {
        if (gameData[x][0] > 0 &&
            gameData[x][0] === gameData[x][1] &&
            gameData[x][1] === gameData[x][2]) {
            return gameData[x][0];
        }
    }

    //for checking columns
    for (let x = 0; x < 3; x++) {
        if (gameData[0][x] > 0 &&
            gameData[0][x] === gameData[1][x] &&
            gameData[1][x] === gameData[2][x]) {
            return gameData[0][x];
        }
    }

    //checking diagonal
    if (gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]) {
        return gameData[0][0];
    }
    if (gameData[0][2] > 0 &&
        gameData[0][2] === gameData[1][1] &&
        gameData[1][1] === gameData[2][0]) {
        return gameData[0][2];
    }

    //checking draw case
    if (roundCounter === 9) return -1;

    return 0;
}

function selectedGameField(event) {
    if (winnerPlayer !== 0) {
        event.target.classList.remove("disabled");
        return;
    }

    const selectedRow = event.target.dataset.row - 1;
    const selectedCol = event.target.dataset.col - 1;

    if (gameData[selectedRow][selectedCol] > 0) return;

    event.target.textContent = player[activeplayer].symbol;
    event.target.classList.add("disabled");

    gameData[selectedRow][selectedCol] = activeplayer + 1;
    winnerPlayer = gameLogic();
    if (winnerPlayer == 1 || winnerPlayer == 2) {
        winnerAnnoucement.style.visibility = "visible";
        winnerAnnoucement.textContent = "Congrates, "+player[winnerPlayer - 1].name+" You Won!";
        gameResult(winnerPlayer);
    }
    else if (winnerPlayer == -1) {
        winnerAnnoucement.style.visibility = "visible";
        winnerAnnoucement.textContent = "It\'s a draw";
        gameResult(winnerPlayer);
    }

    roundCounter++;
    changePlayerChance();
}

//game stats updation
function gameResult(winnerPlayer) {
    if (winnerPlayer === 1) {
        p1++;
        playerOneWinnings.innerHTML = p1;
    }
    else if (winnerPlayer === 2) {
        p2++;
        playerTwoWinnings.innerHTML = p2;
    }
    else if(winnerPlayer === -1){
        draw++;
        totalDraws.innerHTML = draw;
    }
}

//starting new game
function restartGame() {
    activeplayer = 0;
    winnerPlayer = 0;
    roundCounter = 1;
    gameData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    winnerAnnoucement.style.visibility = "hidden";
    for (let i = 0; i < 9; i++){
        gameElements[i].innerHTML = "";
        gameElements[i].classList.remove("disabled");
    }
}