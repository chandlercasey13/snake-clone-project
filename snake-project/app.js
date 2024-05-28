// Variables ----------------------------------------------------------------------------------------------
let gameBoard = []; //maybe 2D
let snakePlaceholder = "X";
let snakeSize = 0;
let snakePosition = [];
let twoDimarray = [];
let applePosition = "";

let snakeDirection = "right";
let snakeState = "Alive";

let gameStart = false;
let timer = "";

const squareEls = document.querySelectorAll(".sqr");
const score = document.querySelector("#Score");

//takes keyboard input -------------------------------------------------------------------------------------

const handleControls = (event) => {
  if (
    (event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft") &&
    gameStart === false
  ) {
    gameStart = true;
    startSnake();
  }

  if (event.key === "ArrowUp") {
    if (snakeDirection != "down") {
      snakeDirection = "up";
      console.log("up");
    }
  }
  if (event.key === "ArrowDown") {
    if (snakeDirection != "up") {
      snakeDirection = "down";
      console.log("down");
    }
  }
  if (event.key === "ArrowRight") {
    if (snakeDirection != "left") {
      snakeDirection = "right";
      console.log("right");
    }
  }
  if (event.key === "ArrowLeft") {
    if (snakeDirection != "right") {
      snakeDirection = "left";
      console.log("left");
    }
  }
};

//Event Listeners -----------------------------------------------------------------------------------------------
window.addEventListener("load", init());

document.addEventListener("keydown", handleControls);

//runs on webpage load
function init() {
  gameBoard = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];
  gameBoard[5][1] = "X";
  gameBoard[5][2] = "X";
  gameBoard[5][7] = "o";

  snakePosition = [
    [5, 1],
    [5, 2],
  ];

  snakeSize = 0;
  snakeDirection = "";
  snakeState = "Alive";
  gameStart = false;
  twoDimarray = [];
  updateBoard();
}

//the function executed when the first arrow key is pressed -----------------------------------------------
function startSnake() {
  console.log("game start");
  updateMessage();
  time();
}

//this is the message displayed above board
function updateMessage() {
  const message = document.querySelector("#message");
  if (snakeState === "Dead") {
    message.textContent = "You dead, son";
  } else {
    message.textContent = "Grab the apple";
  }
}

//this will execute move() on a time basis
function time() {
  timer = setInterval(move, 150);
}

//check if head position equals any body position
const move = () => {
  if (snakeDirection === "right") {
    for (let i = 0; i < snakePosition.length; i++) {
      if (i === snakePosition.length - 1) {
        snakePosition[i][1] += 1;
      } else {
        snakePosition[i] = Array.from(snakePosition[i + 1]);
      }
    }
  }
  if (snakeDirection === "left") {
    for (let i = 0; i < snakePosition.length; i++) {
      if (i === snakePosition.length - 1) {
        snakePosition[i][1] -= 1;
      } else {
        snakePosition[i] = Array.from(snakePosition[i + 1]);
      }
    }
  }
  if (snakeDirection === "up") {
    for (let i = 0; i < snakePosition.length; i++) {
      if (i === snakePosition.length - 1) {
        snakePosition[i][0] -= 1;
      } else {
        snakePosition[i] = Array.from(snakePosition[i + 1]);
      }
    }
  }

  if (snakeDirection === "down") {
    for (let i = 0; i < snakePosition.length; i++) {
      if (i === snakePosition.length - 1) {
        snakePosition[i][0] += 1;
      } else {
        snakePosition[i] = Array.from(snakePosition[i + 1]);
      }
    }
  }

  isAppleSpawned();
  hitWall();
  hitSelf();
  updateBoard();
};

//checks the gameboard for an 'O', if false, executes place random apple
function isAppleSpawned() {
  let appleOnboard = false;
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] == "o") {
        appleOnboard = true;
      }
    }
  }
  if (appleOnboard == false) {
    placeRandomapple();
    growSnake();
  }
  return appleOnboard;
}

//places an apple on a random index on board
function placeRandomapple() {
  snakeSize += 1;
  changeScore();

  //used MDN for math.random
  function randomNum(maxNum) {
    return Math.floor(Math.random() * maxNum);
  }

  gameBoard[randomNum(10)][randomNum(10)] = "o";
}

function growSnake() {
  if (snakeDirection === "right") {
    snakePosition.unshift([snakePosition[0][0], snakePosition[0][1] - 1]);
  }
  if (snakeDirection === "left") {
    snakePosition.unshift([snakePosition[0][0], snakePosition[0][1] + 1]);
  }
  if (snakeDirection === "up") {
    snakePosition.unshift([snakePosition[0][0] + 1, snakePosition[0][1]]);
  }
  if (snakeDirection === "down") {
    snakePosition.unshift([snakePosition[0][0] - 1, snakePosition[0][1]]);
  }
}

function changeScore() {
  score.textContent = `Score: ${snakeSize}`;
}

//checks if snakePosition has exceeded the bounds of the gameboard
function hitWall() {
  if (
    snakePosition[snakePosition.length - 1][0] < 0 ||
    snakePosition[snakePosition.length - 1][0] > 10 ||
    snakePosition[snakePosition.length - 1][1] < 0 ||
    snakePosition[snakePosition.length - 1][1] > 10
  ) {
    snakeState = "Dead";
    isSnakeDead();
  }
}

function hitSelf() {
  let counter = 0;

  //using the toString() method to allow for the snakePosition indicies to be equal to each other

  for (let i = 0; i < snakePosition.length; i++) {
    let snakePositionstring = snakePosition[i].toString();

    //this code represents the snakes head: snakePosition[snakePosition[i].length-1])

    //loop that determines if the snake head specifically hits it's own body
    if (snakePosition[i] === snakePosition[snakePosition[i].length - 1]) {
      for (let j = i + 1; j < snakePosition.length; j++) {
        //if this counter is ever greater than zero, a collision has happened
        if (snakePositionstring === snakePosition[j].toString()) {
          counter += 1;

          if (counter > 0) {
            snakeState = "Dead";

            isSnakeDead();
          }
        }
      }
    }
  }
}

//checks if snake is dead, if true, clears gameBoard
function isSnakeDead() {
  if (snakeState === "Dead") {
    clearInterval(timer);
    updateMessage();

    console.log(snakeState);
    init();
    changeScore();
  } else {
    return;
  }
}

function updateBoard() {
  //emptys gameboard
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] != "o") {
        gameBoard[i][j] = "";
      }
    }
  }
  //places 'X' at snake position
  for (let i = 0; i < snakePosition.length; i++) {
    gameBoard[snakePosition[i][0]][snakePosition[i][1]] = "X";
  }
  //updates the elements at snakePosition
  squareEls.forEach((square) => {
    let coordinates = square.getAttribute("data-coord");
    let coordinatesArray = coordinates.split(",");
    square.textContent = gameBoard[coordinatesArray[0]][coordinatesArray[1]];
    //
    if (square.textContent === "") {
      square.classList.remove("Snake", "Apple", "Head");
    }
    if (square.textContent === "X") {
      for (let i = 0; i < snakePosition.length; i++) {
        if (snakePosition[i] === snakePosition[snakePosition[i].length - 1]) {
          square.classList.add("Head");
        }
      }
      square.classList.add("Snake");
      square.classList.replace("Apple", "Snake");
      square.style.color = "rgba(245, 40, 145, 0)";
    }
    if (square.textContent === "o") {
      square.classList.add("Apple");
      square.style.color = "rgba(245, 40, 145, 0)";
    }
  });
}
