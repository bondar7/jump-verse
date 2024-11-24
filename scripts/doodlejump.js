import Board from "../classes/Board.js";
import Doodler from "../classes/Doodler.js";

//board
const board = new Board();
let boardHTML
let context;

//doodler
const doodler = new Doodler(board.getWidth(), board.getHeight());
let doodlerRightImg;
let doodlerLeftImg;

//physics 
let velocityX = 0;
let velocityY = 0;

window.onload = () => {
  boardHTML = document.getElementById("board");
  boardHTML.width = board.getWidth();
  boardHTML.height = board.getHeight();
  context = boardHTML.getContext("2d"); //used for drawing on the board

  //load images
  doodlerRightImg = new Image();
  doodlerRightImg.src = "../images/doodler-right-1.png";
  doodler.setImg(doodlerRightImg); 
  doodlerRightImg.onload = () => {
    context.drawImage(doodler.getImg(), doodler.getX(), doodler.getY(), doodler.getWidth(), doodler.getHeight());
  }

  doodlerLeftImg = new Image();
  doodlerLeftImg.src = "../images/doodler-left-1.png";

  requestAnimationFrame(update);

  //keylistener to move doodler
  document.addEventListener("keydown", moveDoodler);
}

// GAME LOOP
// When you're playing the game, if you move to the left or to the right - you're changing x and y coordinates.
// So you need to update the canvas by redrawing it. For that reason we need the game loop.
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.getWidth(), board.getHeight());

  //doodler
  doodler.setX(doodler.getX() + velocityX);
  if (doodler.getX() > board.getWidth()) {
    doodler.setX(0 - doodler.getWidth());
  } else if (doodler.getX() < 0 - doodler.getWidth()) {
    doodler.setX(board.getWidth());
  }
  context.drawImage(doodler.getImg(), doodler.getX(), doodler.getY(), doodler.getWidth(), doodler.getHeight());
}

function moveDoodler(event) {
  if (event.code == "ArrowRight" || event.code == "KeyD") { //move right
    velocityX = 4;
    doodler.setImg(doodlerRightImg);
  } else if (event.code == "ArrowLeft" || event.code == "KeyE") { //move left
    velocityX = -4;
    doodler.setImg(doodlerLeftImg);
  }
}