let gameBoard = []; //maybe 2D
let snakePlaceholder = "X";
let snakeSize = 2;
let snakePosition = gameBoard.indexOf(snakePlaceholder);
let snakeDirection = "right";
let snakeState = ''

let gameStart = false;
let timer = '';



const squareEls = document.querySelectorAll(".sqr");

const handleControls = (event) => {
  if (gameStart === false) {
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
    ["","","","","","","","","",""]
    ["","","","","","","","","",""]
    ["","","","","","","","","",""]
    ["","","","","","","","","",""]
    ["","","","","","","","","",""]
    ["","","","","","","","","",""]
    ["","","","","","","","","",""]
    ["","","","","","","","","",""]
    ["","","","","","","","","",""]
    ["","","","","","","","","",""]
    
  ];

  gameBoard[51] = snakePlaceholder;
  snakePosition = gameBoard.indexOf(snakePlaceholder)
  snakeState = 'Alive'
  gameStart = false;
  
  render();
}

function render() {
  updateBoard();
}

function updateBoard() {
  
  squareEls.forEach((square, idx) => {
    square.textContent = gameBoard[idx];
  });

  
}

function start() {
  console.log("game start");
  time()
}

function time() {
  //this will execute on a time basis
timer = setInterval(move,500)
  
}



const move = () => {
  if (snakeDirection=== 'right'){
  snakePosition +=1;
  gameBoard[snakePosition-1] = '';
  gameBoard.splice(snakePosition, 1, 'X')
}
 if (snakeDirection === 'left'){
    snakePosition -=1;
    gameBoard[snakePosition+1]= ''
    gameBoard.splice(snakePosition, 1, 'X');
  }
  if (snakeDirection === 'up'){
    snakePosition -=10;
    gameBoard[snakePosition+10]= ''
    gameBoard.splice(snakePosition, 1, 'X');
  }
  if (snakeDirection === 'down'){
    snakePosition +=10;
    gameBoard[snakePosition-10]= ''
    gameBoard.splice(snakePosition, 1, 'X');
  }

  
  
  console.log(snakePosition)
  //console.log(snakePlaceholder)
  
  hitWall(snakePosition)
  updateBoard();
}


function hitWall (snakeIndex) {
  if (snakeIndex>=0 && snakeIndex <= 101){
    snakeState = 'Alive'
    console.log(snakeState)
    return
  } 
  else {

    snakeState = 'Dead';
    console.log(snakeState)
  }
  isSnakeDead()
}


function isSnakeDead(){
  if ( snakeState === 'Dead'){
    clearInterval(timer)
    init()
  }
  else {return}
}

function snakeTracking() {}

//firstly, print the snakes position on the proper element

/*function apple() {
  let apple = gameBoard at random index
    if (snakeposition = apple[])
     {snakeSize()}
}

function snakeSizegrow() {
  snakeSize += 1; //at some index at end of snake
  //
}

function snakeTrail() {
  //this will have to track the movement of the snake block that is one move ahead of it. linked list.
}

function hitWall() {
  //this will trigger if the snake tries to move to an unavailable index in gameBoard
}
function hitSelf() {
  //this will trigger true if an index on gameboard is already taken by the snake
}
*/
