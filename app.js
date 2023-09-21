//starting game configuration
const startGameButton = document.getElementById("start-game-button");
const gameBoard = document.getElementById("game-board");
const headerHeadlineElement = document.getElementsByClassName("header-h1");
const headerParagraphElements = document.getElementsByClassName("header-p");

startGameButton.addEventListener("click", showingHiddenGameBox);

//overlay window toggle
const editNameButton = document.getElementById("edit-name-button");
const overlayWindow = document.getElementById("overlay");
const cancelNameButton = document.getElementById("cancel-name-btn");

cancelNameButton.addEventListener("click", hideOverlayWindow);
editNameButton.addEventListener("click", showOverlayWindow);

//changing player name
const playerOneNameInputElement = document.getElementById("player-one");
const playerOneListItemElement = document.getElementById("pOne");
const playerTwoNameInputElement = document.getElementById("player-two");
const playerTwoListItemElement = document.getElementById("pTwo");
const saveNameButton = document.getElementById("save-name-btn");
// const formElement = document.querySelector("form");

saveNameButton.addEventListener("click", changePlayerNames);

//resetting score card
const resetButton = document.getElementById("reset-button");
const playerOneWinnings = document.getElementById("p1-count");
const playerTwoWinnings = document.getElementById("p2-count");
const totalDraws = document.getElementById("draw-count");

resetButton.addEventListener("click", resetGameStats);

//adding game logic
let p1 = +0;
let p2 = +0;
let draw = +0;

let activeplayer = 0;
let winnerPlayer = +0;
let roundCounter = 1;

let gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let player = [
    {
        name: 'Player 1',
        symbol: 'X'
    },
    {
        name: 'Player 2',
        symbol: 'O'
    }
];


const gameElements = document.querySelectorAll("ol li");

for (const gameElement of gameElements) {
    gameElement.addEventListener("click", selectedGameField);
}

//starting next game round 
const restartGameButton = document.getElementById("restart-button");

restartGameButton.addEventListener("click", restartGame);

//declaring winner
const winnerAnnoucement = document.querySelector("#game-board p");
const winnerName = document.querySelector("#game-board span");