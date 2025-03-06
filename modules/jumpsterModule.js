import Jumpster from "../models/jumpster/Jumpster.js";
import {board, context} from "./boardModule.js"
import * as animModule from "./animationModule.js"

export const jumpster = new Jumpster(
  board.getWidth(),
  board.getHeight(),
);

//jump
let initialVelocityY = -800; //starting velocity Y
export let velocityY = initialVelocityY; // jumpster's velocity
let gravity = 1250;

//physics 
let velocityX = 0;
let friction = 7.5;

//sprites
let jumpsterDefault;

loadSprites();

export function drawJumpster(context) {
  context.save(); // Save the current canvas state
  
  // Translate the canvas origin to the center of the jumpster
  context.translate(
    jumpster.getX() + jumpster.getWidth() / 2,  // X-coordinate of the jumpster's center
    jumpster.getY() + jumpster.getHeight() / 2  // Y-coordinate of the jumpster's center
  );
  
  // Flip the jumpster horizontally if needed (based on direction)
  context.scale(jumpster.getDirX(), 1); // If DirX is -1, flip horizontally
  
  // Draw the jumpster at the translated position (centered)
  context.drawImage(
    jumpster.getImg(), // The image of the jumpster
    -jumpster.getWidth() / 2, // Shift left by half the width to center the image
    -jumpster.getHeight() / 2, // Shift up by half the height to center the image
    jumpster.getWidth(),  // Width of the jumpster image
    jumpster.getHeight()  // Height of the jumpster image
  );
  
  context.restore(); // Restore the canvas state to undo the translation and scaling
}

export function loadSprites() {
  jumpsterDefault = new Image();
  jumpsterDefault.src = "../assets/jumpster/jumpster-right-1.png";
  jumpster.setImg(jumpsterDefault); 
  jumpsterDefault.onload = () => {
    context.drawImage(jumpster.getImg(), jumpster.getX(), jumpster.getY(), jumpster.getWidth(), jumpster.getHeight());
  }
}

export function slowlyStop() {
  if (!jumpster.isMovingLeft && velocityX < 0) {
    velocityX = Math.min(0, velocityX + friction); // Gradually reduce leftward velocity
  } else if (!jumpster.isMovingRight && velocityX > 0) {
    velocityX = Math.max(0, velocityX - friction); // Gradually reduce rightward velocity
  }
}

export function increaseVelocityY(deltaTime) {
  velocityY += gravity * deltaTime;
}

export function moveJumpsterY(deltaTime) {
  jumpster.setY(jumpster.getY() + velocityY * deltaTime);
}

export function reset() {
  velocityY = initialVelocityY;
  jumpster.setImg(jumpsterDefault);
}

export function setJumpsterPositionForStart() {
  jumpster.setX(75);
  jumpster.setY(720);
}
export function setJumpsterPositionForGame() {
  jumpster.setX((board.getWidth() - jumpster.getWidth()) / 2);
  jumpster.setY(board.getHeight() - jumpster.getHeight() - 60);
}

export function resetForSpring() {
  velocityY = -1200;
  jumpster.setImg(jumpsterDefault);
}

//set key listeners to move jumpster
export function setKeyListeners() {
  document.addEventListener("keydown", moveJumpsterX);
  document.addEventListener("keyup", stopJumpsterX);
}

//handle doodle's moving
function moveJumpsterX(event) {
  if (event.code == "ArrowRight" || event.code == "KeyD") { //move right
    velocityX = 300;
    jumpster.setDirX(1);
    jumpster.isMovingRight = true;
  } else if (event.code == "ArrowLeft" || event.code == "KeyE") { //move left
    velocityX = -300;
    jumpster.setDirX(-1);
    jumpster.isMovingLeft = true;
  }
}
//handle doodle's stopping
function stopJumpsterX(event) {
    if (event.code == "ArrowRight" || event.code == "KeyD") { // stop move right
      jumpster.isMovingRight = false;
    } else if (event.code == "ArrowLeft" || event.code == "KeyE") { // stop move left
      jumpster.isMovingLeft = false;
  }
}

export function moveByX(deltaTime) {
  jumpster.setX(jumpster.getX() + velocityX * deltaTime);
}

export function controlXPosition() {
  if (jumpster.getX() > board.getWidth()) {
    jumpster.setX(0 - jumpster.getWidth());
  } else if (jumpster.getX() < 0 - jumpster.getWidth()) {
    jumpster.setX(board.getWidth());
  }
}

export function fallingAnim() {
  animModule.falling(jumpster, velocityY);
}

export function restart() {
  reset();
  velocityX = 0;
}
