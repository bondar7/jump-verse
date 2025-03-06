import { score, highestScore, updateHighestScore } from "../scripts/jumpverse.js";
import { board, canvas, context } from "./boardModule.js";
import { jumpster, drawJumpster, fallingAnim, increaseVelocityY, restart, setJumpsterPositionForStart } from "./jumpsterModule.js";
import { setStart } from "./gameStartModule.js";
import { movePlatformsUp, platformArray, createPlatforms, checkCollision } from "./platformModule.js";
import { hideTopbar, resetScore } from "./utils/topbar.js";

export let isGameOver = false;

const gameOverImage = new Image();
gameOverImage.src = "./assets/game-over.png";
const gameOverWidth = 300; 
const gameOverHeight = 100;

const playAgainImage = new Image();
playAgainImage.src = "./assets/buttons/playagain.png";
const playAgainImageRed = new Image();
playAgainImageRed.src = "./assets/buttons/playagain-red.png";
const playAgainBtn = {
  image: playAgainImage,
  width: 170,
  height: 61,
  x: canvas.width / 2 - 55
}
const menuImage = new Image();
menuImage.src = "./assets/buttons/menu.png";
const menuRedImage = new Image();
menuRedImage.src = "./assets/buttons/menu-red.png";
const menuBtn = {
  image: menuImage,
  width: 170,
  height: 61,
  x: canvas.width / 2 + 50
}

let gameOverY = board.getHeight();
let targetY = board.getHeight() / 2 - 150;
let animSpeed = 850;

export function gameOver(deltaTime) {
  movePlatformsUp(deltaTime);
  
  updateHighestScore();
  if (platformArray.length == 0) {
    if (gameOverY > targetY) {
      gameOverY -= animSpeed * deltaTime;
      playAgainBtn.y = gameOverY + 265;
      menuBtn.y = gameOverY + 350;
      canvas.addEventListener("click", handleClicks);
    }
    displayGameOver();
  } else {
    context.clearRect(0, 0, board.getWidth(), board.getHeight());
  }
}

function displayGameOver() {
  const centerX = canvas.width / 2;
  const fontSize = 35;
  const fontColor = "black";

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Load and draw "Game Over" image
  context.drawImage(gameOverImage, centerX - gameOverWidth / 2, gameOverY, gameOverWidth, gameOverHeight);

  // Score Texts
  drawCenteredText(`your score: ${score.innerHTML}`, centerX, gameOverY + 140, fontSize, fontColor);
  drawCenteredText(`your high score: ${highestScore}`, centerX, gameOverY + 175, fontSize, fontColor);
  drawCenteredText("your name: Jumpster", centerX, gameOverY + 210, fontSize, fontColor);

  context.drawImage(
    playAgainBtn.image, 
    playAgainBtn.x, 
    playAgainBtn.y,
    playAgainBtn.width,
    playAgainBtn.height);
  context.drawImage(
    menuBtn.image, 
    menuBtn.x, 
    menuBtn.y,
    menuBtn.width,
    menuBtn.height);
}

// Draw text with center alignment
function drawCenteredText(text, x, y, fontSize, color) {
  context.font = `${fontSize}px DoodleJumpBold_v2`;
  context.fillStyle = color;
  context.textAlign = "center";
  context.fillText(text, x, y);
}

function handleClicks(event) {
  // Get mouse click coordinates relative to the canvas
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  if (
    clickX >= playAgainBtn.x &&
    clickX <= playAgainBtn.x + playAgainBtn.width &&
    clickY >= playAgainBtn.y &&
    clickY <= playAgainBtn.y + playAgainBtn.height
  ) {
    playAgainBtn.image = playAgainImageRed;
    setTimeout(() => {
      restartGame();
    }, 110);   
  } else {
    playAgainBtn.image = playAgainImage;
  }

  if (
    clickX >= menuBtn.x &&
    clickX <= menuBtn.x + menuBtn.width &&
    clickY >= menuBtn.y &&
    clickY <= menuBtn.y + menuBtn.height
  ) {
    menuBtn.image = menuRedImage;
    setTimeout(() => {
      openMenu();
    }, 110);   
  } else {
    menuBtn.image = menuImage;
  }
}

function restartGame() {
  context.clearRect(0,0,board.getWidth(), board.getHeight()); // clear entire canvas
  playAgainBtn.image = playAgainImage; // set default image for restart btn
  restart(); // reset jumpster's velocity x and y
  jumpster.setY(board.getHeight() - 125); // set default Y
  jumpster.setX(board.getWidth()/2 + 15); // set default X
  gameOverY = board.getHeight(); // reset for an animation
  updateHighestScore(); // update highest score
  resetScore(); // reset score
  setGameOver(false); // game over false for game loop
  createPlatforms(); // create start platforms
}

function openMenu() {
  menuBtn.image = menuRedImage;
  setStart(true);
  setGameOver(false)
  restart();
  setJumpsterPositionForStart();
  hideTopbar();
  resetScore();
  gameOverY = board.getHeight();
}

export function setGameOver(value) {
  isGameOver = value;
}