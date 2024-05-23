let gameBoard = []; //maybe 2D
let snakePlaceholder = "X";
let snakeSize = 1;
let snakePosition = [];
let twoDimarray = [];
let applePosition = "";

let snakeDirection = "right";
let snakeState = "Alive";

let gameStart = false;
let timer = "";

const squareEls = document.querySelectorAll(".sqr");

const handleControls = (event) => {
  if (
    (event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft") &&
    gameStart === false
  ) {
    gameStart = true;
    start();
  }

  if (event.key === "ArrowUp") {
    snakeDirection = "up";
    console.log("up");
  }
  if (event.key === "ArrowDown") {
    snakeDirection = "down";
    console.log("down");
  }
  if (event.key === "ArrowRight") {
    snakeDirection = "right";
    console.log("right");
  }
  if (event.key === "ArrowLeft") {
    snakeDirection = "left";
    console.log("left");
  }
};

//Event Listeners
window.addEventListener("load", init());

document.addEventListener("keydown", handleControls);

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
  ];

  gameBoard[5][7] = "O";
  snakePosition = [
    [5, 1],
    [5, 2],
  ];
  snakeSize = 0;

  snakeState = "Alive";
  gameStart = false;
  twoDimarray = [];
  render();
}

function render() {
  updateBoard();
}

function updateMessage() {
  const message = document.querySelector(".message");
  if (snakeState === "Dead") {
    message.textContent = "You dead, son";
  } else {
    message.textContent = "Grab the apple";
  }
}
//console.log(snakePosition);
function updateBoard() {
  for (let i = 0; i < snakePosition.length; i++) {
    gameBoard[snakePosition[i][0]][snakePosition[i][1]] = "X";
  }

  squareEls.forEach((square) => {
    let coordinates = square.getAttribute("data-coord");
    let coordinatesArray = coordinates.split(",");

    square.textContent = gameBoard[coordinatesArray[0]][coordinatesArray[1]];

    //converts coordinate array into number data type instead of string
    if (square.textContent === "X") {
      let containerArray = [];
      for (let i = 0; i < coordinatesArray.length; i++) {
        containerArray.push(parseInt(coordinatesArray[i]));
      }
      //pushes container array into a 2-D array
    twoDimarray.push(containerArray);
    }
  });


  
}

function emptyTwodimarray(){
  return twoDimarray = [];
}



function start() {
  console.log("game start");
  updateMessage();
  time();
}

function time() {
  //this will execute on a time basis
  timer = setInterval(move, 500);
}

function placeRandomapple() {
  snakeSize += 1;
  //used MDN for math.random
  function randomNum(maxNum) {
    return Math.floor(Math.random() * maxNum);
  }

  gameBoard[randomNum(10)][randomNum(10)] = "O";
  //snakeTrail();
  updateBoard();
}

function isAppleSpawned() {
  let appleOnboard = false;
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] == "O") {
        appleOnboard = true;
      }
    }
  }
  if (appleOnboard == false) {
    placeRandomapple();
  }
  return appleOnboard;
}
// I need a way to track if the X's on the board are not equal to the coords in snake position
// firstly, make an array that maps outs the indexes of the X's

console.log(snakePosition)
const move = () => {
  if (snakeDirection === "right") {
    let newElement = "";
    for (let i = 0; i < snakePosition.length; i++) {
      snakePosition[i][1] += 1;
      newElement = snakePosition[i];
    }

    snakePosition.pop();
    snakePosition.unshift(newElement);

    //console.log(snakePosition);
    //console.log(twoDimarray);
  }
  if (snakeDirection === "left") {
    let newElement = "";
    for (let i = 0; i < snakePosition.length; i++) {
      snakePosition[i][1] -= 1;
      newElement = snakePosition[i];
    }
    snakePosition.pop();
    snakePosition.unshift(newElement);
  }
  if (snakeDirection === "up") {
    let newElement = "";
    
    for (let i = 0; i < snakePosition.length; i++) {
      let trackingArray= [];
      
      trackingArray.push(snakePosition[1])
      newElement = trackingArray[0];
      
      
      console.log(trackingArray)
    }
    snakePosition.shift();
    snakePosition.unshift(newElement);
    snakePosition[1][0] -= 1;
    console.log(snakePosition)
    
    
  }

  if (snakeDirection === "down") {
    for (let i = 0; i < snakePosition.length; i++) {
      snakePosition[i][0] += 1;
    }
  }

  hitWall(snakePosition);
  isAppleSpawned();
  emptyTwodimarray();
  updateBoard();
  
};
//make an array of indexes of the snakes location
// the array for each move will pop and unshift indexes based on the snakeSize

function hitWall(snakeIndex) {
  for (let i = 0; i < snakePosition.length; i++) {
    if (
      snakeIndex[0][0] >= 0 &&
      snakeIndex[0][0] <= 9 &&
      snakeIndex[0][1] >= 0 &&
      snakeIndex[0][1] <= 9
    ) {
      snakeState = "Alive";
    } else {
      snakeState = "Dead";

      console.log(snakeState);
    }
  }

  isSnakeDead();
}

function isSnakeDead() {
  if (snakeState === "Dead") {
    clearInterval(timer);
    updateMessage();
    init();
  } else {
    return;
  }
}
