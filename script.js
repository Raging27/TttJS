const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = [
  "", "", "",
  "", "", "",
  "", "", ""
];
let go = "circle";
let moveCount = 0; // Initialize move counter
infoDisplay.textContent = "Circle goes first";

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}
createBoard();

function addGo(e) {
  if (!e.target.firstChild) { // Only act if the square is empty
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    moveCount++; // Increment the move count with each valid move
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "It is now " + go + "'s turn";
    e.target.removeEventListener("click", addGo);
    checkScore();
  }
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  let winnerDeclared = false;
  winningCombos.forEach(array => {
    if (array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"))) {
      infoDisplay.textContent = "Circle wins!";
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
      winnerDeclared = true;
    } else if (array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"))) {
      infoDisplay.textContent = "Cross wins!";
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
      winnerDeclared = true;
    }
  });

  if (!winnerDeclared && moveCount === 9) { // Check if all moves are made and no winner
    infoDisplay.textContent = "Game finished! It's a draw.";
    allSquares.forEach(square => square.replaceWith(square.cloneNode(true))); // Reset the board
  }
}
