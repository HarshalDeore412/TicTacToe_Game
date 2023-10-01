const gameInfo = document.querySelector(".gameInfo");
const boxex = document.querySelectorAll(".box");
const newGame = document.querySelector(".btn");
const winnerCard = document.querySelector('.card');
const playerWin = document.querySelector('.playerWin');


let CurrentPlayer;
let gameGrid;

const winingPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// lets create a function to initialize the gameGrid;

function initGame() {
  CurrentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  newGame.classList.remove("active");
  gameInfo.innerText = `Current Player - ${CurrentPlayer}`;
  boxex.forEach((box, index) => {
    box.innerText = "";
    boxex[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });
  winnerCard.classList.remove("winner")
}

function swapTurn() {
  if (CurrentPlayer === "X") {
    CurrentPlayer = "O";
  } else {
    CurrentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${CurrentPlayer}`;
}

initGame();

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxex[index].innerText = CurrentPlayer;
    gameGrid[index] = CurrentPlayer;
    boxex[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxex.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function checkGameOver() {
  let answer = "";

  winingPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }
      playerWin.innerText = `${answer}`
      winnerCard.classList.add("winner")


      boxex.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxex[position[0]].classList.add("win");
      boxex[position[1]].classList.add("win");
      boxex[position[2]].classList.add("win");

      if (answer !== "") {
        gameInfo.innerText = `winner player is ${answer}`;
        newGame.classList.add("active");
        return;
      }



    }
  });



  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  if (fillCount === 9) {
    gameInfo.innerText = " game Tied !";
    newGame.classList.add("active");
  }
}

newGame.addEventListener("click", initGame);
