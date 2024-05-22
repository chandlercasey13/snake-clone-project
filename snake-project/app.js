

let gameBoard = []; //maybe 2D
let snakePlaceholder = "X";
let snakeSize = 1;
let snakePosition = findSnakeposition()
let snakeTrailarray = [];
let applePosition = '';

let snakeDirection = "right";
let snakeState = 'Alive'

let gameStart = false;
let timer = '';



const squareEls = document.querySelectorAll(".sqr");

const handleControls = (event) => {
  if ((event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "ArrowLeft")  && gameStart === false) {
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
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    
  ];

  gameBoard[5][1] = snakePlaceholder;
  gameBoard[5][7] = 'O'
  snakePosition = findSnakeposition()
  snakeSize= 0;
  
  snakeState = 'Alive'
  gameStart = false;
  
  
  render();
}

function render() {
 
  
  updateBoard();
}

function findSnakeposition () {
  let coordinates = [];

  for (let i=0;i<gameBoard.length; i++){
    for (let j=0; j<gameBoard[i].length; j++){
    if (gameBoard[i][j]==='X'){
      
      coordinates.push(i)
      coordinates.push(gameBoard[i].indexOf('X'))
    }
  }
  }
  return coordinates
  
}


function updateMessage() {
  const message = document.querySelector('.message');
  if (snakeState==='Dead'){
  
  message.textContent = 'You dead, son'
  
}
else {
  message.textContent = 'Grab the apple'
}
}

function updateBoard() {
  


  squareEls.forEach((square) => {
    let coordinates = square.getAttribute('data-coord')
    let coordinatesArray = coordinates.split(',')

    
    square.textContent = gameBoard[coordinatesArray[0]][coordinatesArray[1]]
    

    
    }


    
)}

function start() {
  console.log("game start");
  updateMessage();
  time()
}

function time() {
  //this will execute on a time basis
timer = setInterval(move,500)
findSnakeposition()
}


function placeRandomapple () {
  snakeSize+=1;
  //used MDN for math.random
  function randomNum (maxNum) {
   return Math.floor(Math.random()*maxNum)
  }
  
  gameBoard[randomNum(10)][randomNum(10)] = 'O';
  snakeTrail()
  updateBoard()
   
  
}

function isAppleSpawned(){
  let appleOnboard = false;
  for (let i=0; i<gameBoard.length; i++){
    for ( let j = 0; j<gameBoard[i].length;j++){
      if (gameBoard[i][j]=='O'){
      appleOnboard= true
    } 
      
    }
    
  }
  if (appleOnboard==false) {
    placeRandomapple()
  }
  return appleOnboard
  }

  



const move = () => {


  if (snakeDirection=== 'right'){
  snakePosition[1] +=1;
  gameBoard[snakePosition[0]].splice(snakePosition[1], 1, 'X')
  gameBoard[snakePosition[0]][snakePosition[1]-1] = '';
  
  
}
 else if (snakeDirection === 'left'){
    snakePosition[1] -=1;
    gameBoard[snakePosition[0]].splice(snakePosition[1], 1, 'X')
    gameBoard[snakePosition[0]][snakePosition[1]+1] = '';
  }
if (snakeDirection === 'up'){
    snakePosition[0] -=1;
    if (snakePosition[0] >= 0){
      
    
    gameBoard[snakePosition[0]].splice(snakePosition[1], 1, 'X')
    gameBoard[snakePosition[0]+1][snakePosition[1]] = '';
  }
  }
  
  
if (snakeDirection === 'down'){
    snakePosition[0] +=1;
    
    if (snakePosition[0] <= 9){
    gameBoard[snakePosition[0]].splice(snakePosition[1], 1, 'X')
    gameBoard[snakePosition[0]-1][snakePosition[1]] = '';
  }
}

  hitWall(snakePosition)
  isAppleSpawned()
  snakeTrail()
  updateBoard();
}
//make an array of indexes of the snakes location
// the array for each move will pop and unshift indexes based on the snakeSize

function snakeTrail () {
  for (let i=0; i<gameBoard.length; i++){
    for (let j = 0; gameBoard[i].length; j++){
      if (gameBoard[i][j]==='X'){
      snakeTrailarray.unshift(gameBoard[i][j])
    }
    }
  }


  snakeTrailarray.length = snakeSize
  
  snakeTrailarray.pop()
  console.log(snakeTrailarray)
  console.log(snakePosition)
}


function hitWall (snakeIndex) {
  
  if ((snakeIndex[1]>=0 && snakeIndex[1] <= 9) && (snakeIndex[0]>=0 && snakeIndex[0]<=9) ){
    snakeState = 'Alive'
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
    updateMessage()
    init()
  }
  else {return}
}



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
