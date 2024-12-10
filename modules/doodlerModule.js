import Doodler from "../models/doodler/Doodler.js";
import {board, context} from "./boardModule.js"
import * as animModule from "./animationModule.js"

export const doodler = new Doodler(board.getWidth(), board.getHeight());

//jump
let initialVelocityY = -800; //starting velocity Y
export let velocityY = initialVelocityY; // doodler's velocity
let gravity = 1250;

//physics 
let velocityX = 0;
let friction = 7.5;

//sprites
let doodlerDefault;

loadSprites();

export function drawDoodler(context) {
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

export function loadSprites() {
  doodlerDefault = new Image();
  doodlerDefault.src = "../assets/doodler/doodler-right-1.png";
  doodler.setImg(doodlerDefault); 
  doodlerDefault.onload = () => {
    context.drawImage(doodler.getImg(), doodler.getX(), doodler.getY(), doodler.getWidth(), doodler.getHeight());
  }
}

export function slowlyStop() {
  if (!doodler.isMovingLeft && velocityX < 0) {
    velocityX = Math.min(0, velocityX + friction); // Gradually reduce leftward velocity
  } else if (!doodler.isMovingRight && velocityX > 0) {
    velocityX = Math.max(0, velocityX - friction); // Gradually reduce rightward velocity
  }
}

export function increaseVelocityY(deltaTime) {
  velocityY += gravity * deltaTime;
}

export function moveDoodlerY(deltaTime) {
  doodler.setY(doodler.getY() + velocityY * deltaTime);
}

export function reset() {
  velocityY = initialVelocityY;
  doodler.setImg(doodlerDefault);
}

//set key listeners to move doodler
export function setKeyListeners() {
  document.addEventListener("keydown", moveDoodlerX);
  document.addEventListener("keyup", stopDoodlerX);
}

//handle doodle's moving
function moveDoodlerX(event) {
  if (event.code == "ArrowRight" || event.code == "KeyD") { //move right
    velocityX = 300;
    doodler.setDirX(1);
    doodler.isMovingRight = true;
  } else if (event.code == "ArrowLeft" || event.code == "KeyE") { //move left
    velocityX = -300;
    doodler.setDirX(-1);
    doodler.isMovingLeft = true;
  }
}
//handle doodle's stopping
function stopDoodlerX(event) {
    if (event.code == "ArrowRight" || event.code == "KeyD") { // stop move right
      doodler.isMovingRight = false;
    } else if (event.code == "ArrowLeft" || event.code == "KeyE") { // stop move left
      doodler.isMovingLeft = false;
  }
}

export function moveByX(deltaTime) {
  doodler.setX(doodler.getX() + velocityX * deltaTime);
}

export function controlXPosition() {
  if (doodler.getX() > board.getWidth()) {
    doodler.setX(0 - doodler.getWidth());
  } else if (doodler.getX() < 0 - doodler.getWidth()) {
    doodler.setX(board.getWidth());
  }
}

export function fallingAnim() {
  animModule.falling(doodler, velocityY);
}