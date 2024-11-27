import Board from "../models/board/Board.js";
import Doodler from "../models/doodler/Doodler.js";
import Platform from "../models/platform/Platform.js";

//board
const board = new Board();
let boardHTML
let context;

//doodler
const doodler = new Doodler(board.getWidth(), board.getHeight());
//doodler's sprites
let doodlerRight;

//physics 
let velocityX = 0;
let friction = 0.1;

//jump
let velocityY = 0; // doodler 
let initialVelocityY = -9.5 ; //starting velocity Y
let gravity = 0.2;

//platforms
let platformArray;
let platformImg;

window.onload = () => {
  boardHTML = document.getElementById("board");
  boardHTML.width = board.getWidth();
  boardHTML.height = board.getHeight();
  context = boardHTML.getContext("2d"); //used for drawing on the board

  //load sprites for doodle
  doodlerRight = new Image();
  doodlerRight.src = "../images/doodler-right-1.png";
  doodler.setImg(doodlerRight); 
  doodlerRight.onload = () => {
    context.drawImage(doodler.getImg(), doodler.getX(), doodler.getY(), doodler.getWidth(), doodler.getHeight());
  }

  //load sprites for platforms
  platformImg = new Image();
  platformImg.src = "../images/platform.png";

  velocityY = initialVelocityY;
  placePlatforms();
  requestAnimationFrame(update);

  //keylisteners to move doodler
  document.addEventListener("keydown", moveDoodler);
  document.addEventListener("keyup", stopDoodler);
}

// GAME LOOP
// When you're playing the game, if you move to the left or to the right - you're changing x and y coordinates.
// So you need to update the canvas by redrawing it. For that reason we need the game loop.
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.getWidth(), board.getHeight());

  //handle slowly stop
  if (!doodler.isMovingLeft && velocityX < 0) {
      velocityX = Math.min(0, velocityX + friction); // Gradually reduce leftward velocity
    } else if (!doodler.isMovingRight && velocityX > 0) {
      velocityX = Math.max(0, velocityX - friction); // Gradually reduce rightward velocity
    }
    
    //doodler
    doodler.setX(doodler.getX() + velocityX);
    if (doodler.getX() > board.getWidth()) {
      doodler.setX(0 - doodler.getWidth());
    } else if (doodler.getX() < 0 - doodler.getWidth()) {
      doodler.setX(board.getWidth());
    }
    
    //jump physics
    velocityY += gravity;
    doodler.setY(doodler.getY() + velocityY);
    
    //draw platforms
    platformArray.forEach((p) => {
      context.drawImage(p.getImg(), p.getX(), p.getY(), p.getWidth(), p.getHeight());
      if (detectCollision(doodler, p) && velocityY >= 1) {
        velocityY = initialVelocityY;
      }
    })
    
    // draw doodler after platforms
    drawDoodler();
  }

  //draw doodler
  function drawDoodler() {
    context.save(); // Save the current canvas state
    
    // Translate the canvas origin to the center of the doodler
    context.translate(
      doodler.getX() + doodler.getWidth() / 2,  // X-coordinate of the doodler's center
      doodler.getY() + doodler.getHeight() / 2  // Y-coordinate of the doodler's center
    );
    
    // Flip the doodler horizontally if needed (based on direction)
    context.scale(doodler.getDirX(), 1); // If DirX is -1, flip horizontally
    
    // Draw the doodler at the translated position (centered)
    context.drawImage(
      doodler.getImg(), // The image of the doodler
      -doodler.getWidth() / 2, // Shift left by half the width to center the image
      -doodler.getHeight() / 2, // Shift up by half the height to center the image
      doodler.getWidth(),  // Width of the doodler image
      doodler.getHeight()  // Height of the doodler image
    );
    
    context.restore(); // Restore the canvas state to undo the translation and scaling
  }

//handle doodle's moving
function moveDoodler(event) {
  if (event.code == "ArrowRight" || event.code == "KeyD") { //move right
    velocityX = 4;
    doodler.setDirX(1);
    doodler.isMovingRight = true;
  } else if (event.code == "ArrowLeft" || event.code == "KeyE") { //move left
    velocityX = -4;
    doodler.setDirX(-1);
    doodler.isMovingLeft = true;
  }
}
//handle doodle's stopping
function stopDoodler(event) {
    if (event.code == "ArrowRight" || event.code == "KeyD") { // stop move right
      doodler.isMovingRight = false;
    } else if (event.code == "ArrowLeft" || event.code == "KeyE") { // stop move left
      doodler.isMovingLeft = false;
  }
}

function placePlatforms() {
  platformArray = [];

  platformArray.push(new Platform(board.getWidth()/2, board.getHeight() - 70, platformImg));

  for (let i = 0; i < 4; i++) {
    let randomX = Math.floor(Math.random() * board.getWidth()*3/4); // (0-1) * boardWidth * 3/4
    platformArray.push(new Platform(
      randomX,
      board.getHeight() - 75*i - 300, 
      platformImg));
  }
}

function detectCollision(a, b) {
  const noseWidth = 24; // The width of the doodler's nose, which we will ignore for collision detection

  let aLeft, aRight;

  // If the doodler is facing right
  if (doodler.getDirX() == 1) {
    aLeft = a.getX();  // The left edge of the doodler
    aRight = a.getX() + a.getWidth() - noseWidth;  // Adjust the right edge by subtracting the nose width
  }
  // If the doodler is facing left
  else if (doodler.getDirX() == -1) {
    aLeft = a.getX() + noseWidth;  // Adjust the left edge by adding the nose width
    aRight = a.getX() + a.getWidth();  // The right edge remains unchanged
  }

  const doodlerBottomY = a.getY() + a.getHeight();  // The bottom edge of the doodler
  const platformTopY = b.getY();  // The top edge of the platform
  const platformBottomY = b.getY() + b.getHeight();  // The bottom edge of the platform

  // Collision detection check
  return (
    doodlerBottomY >= platformTopY &&     // The bottom of the doodler touches the platform
    doodlerBottomY <= platformBottomY && // The bottom of the doodler does not go below the platform
    aRight > b.getX() &&                // The right edge of the doodler is on the platform
    aLeft < b.getX() + b.getWidth()    // The left edge of the doodler is on the platform
  );
}
