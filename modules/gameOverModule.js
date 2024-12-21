import { score } from "../scripts/doodlejump.js";
import { board, canvas, context } from "./boardModule.js";
import { doodler, restart } from "./doodlerModule.js";
import { movePlatformsUp, platformArray, createPlatforms } from "./platformModule.js";

export let isGameOver = false;

const gameOverImage = new Image();
gameOverImage.src = "./assets/game-over.png";
const gameOverWidth = 300; 
const gameOverHeight = 100;

const playAgainImage = new Image();
playAgainImage.src = "./assets/buttons/playagain.png";
const playAgainBtn = {
  image: playAgainImage,
  width: 150,
  height: 50,
  y: null,
  x: canvas.width / 2 - 150 / 2
}

let gameOverY = board.getHeight();
let targetY = board.getHeight() / 2 - 150;
let animSpeed = 850;

export function gameOver(deltaTime, score ) {
  movePlatformsUp(deltaTime);
  if (platformArray.length == 0) {
    if (gameOverY > targetY) {
      gameOverY -= animSpeed * deltaTime;
      playAgainBtn.y = gameOverY + 190;
      canvas.addEventListener("click", handleRestartClick)
    }
    displayGameOver(score);
  } else {
    context.clearRect(0, 0, board.getWidth(), board.getHeight());
  }
}

function displayGameOver(score) {
  const centerX = canvas.width / 2;
  const fontSize = 24;
  const fontColor = "black";

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Load and draw "Game Over" image
  context.drawImage(gameOverImage, centerX - gameOverWidth / 2, gameOverY, gameOverWidth, gameOverHeight);

  // Score Texts
  drawCenteredText(`your score: ${score}`, centerX, gameOverY + 120, fontSize, fontColor);
  drawCenteredText("your high score: 17556", centerX, gameOverY + 140, fontSize, fontColor);
  drawCenteredText("your name: Doodler", centerX, gameOverY + 160, fontSize, fontColor);

  context.drawImage(
    playAgainBtn.image, 
    playAgainBtn.x, 
    playAgainBtn.y,
    playAgainBtn.width,
    playAgainBtn.height);
}

// Draw text with center alignment
function drawCenteredText(text, x, y, fontSize, color) {
  context.font = `${fontSize}px DoodleJumpBold_v2`;
  context.fillStyle = color;
  context.textAlign = "center";
  context.fillText(text, x, y);
}

function handleRestartClick(event) {
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
    restartGame();
  }
}

function restartGame() {
  context.clearRect(0,0,board.getWidth(), board.getHeight()); // clear entire canvas
  restart(); // reset doodler's velocity x and y
  doodler.setY(board.getHeight() - 125); // set default Y
  doodler.setX(board.getWidth()/2 + 15); // set default X
  gameOverY = board.getHeight(); // reset for an animation
  score.innerHTML = 0; // reset score
  setGameOver(false); // game over false for game loop
  createPlatforms(); // create start platforms
}

export function setGameOver(value) {
  isGameOver = value;
}