import { board, canvas, context } from "./boardModule.js";
import { movePlatformsUp, platformArray } from "./platformModule.js";

const gameOverImage = new Image();
gameOverImage.src = "./assets/game-over.png";
const gameOverWidth = 300; 
const gameOverHeight = 100;

const playAgainImage = new Image();
playAgainImage.src = "./assets/buttons/playagain.png";
const restartBtnWidth = 150;
const restartBtnHeight = 50;

let gameOverY = board.getHeight();
let targetY = board.getHeight() / 2 - 100;
let animSpeed = 850;
let restartBtnY;
let restartBtnX = canvas.width / 2 - restartBtnWidth / 2;

export function gameOver(deltaTime) {
  movePlatformsUp(deltaTime);
  if (platformArray.length == 0) {
    if (gameOverY > targetY) {
      gameOverY -= animSpeed * deltaTime;
      restartBtnY = gameOverY + 190;
      canvas.addEventListener("click", handleRestartClick)
    }
    displayGameOver(gameOverY);
  } else {
    context.clearRect(0, 0, board.getWidth(), board.getHeight());
  }
}

function displayGameOver(gameOverY) {
  const centerX = canvas.width / 2;
  const fontSize = 24;
  const fontColor = "black";

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Load and draw "Game Over" image
  context.drawImage(gameOverImage, centerX - gameOverWidth / 2, gameOverY, gameOverWidth, gameOverHeight);

  // Score Texts
  drawCenteredText("your score: 319", centerX, gameOverY + 120, fontSize, fontColor);
  drawCenteredText("your high score: 17556", centerX, gameOverY + 140, fontSize, fontColor);
  drawCenteredText("your name: Doodler", centerX, gameOverY + 160, fontSize, fontColor);

  context.drawImage(playAgainImage, restartBtnX, restartBtnY, restartBtnWidth, restartBtnHeight);
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
    clickX >= restartBtnX &&
    clickX <= restartBtnX + restartBtnWidth &&
    clickY >= restartBtnY &&
    clickY <= restartBtnY + restartBtnHeight
  ) {
    restartGame();
  }
}

function restartGame() {
  location.reload();  
}