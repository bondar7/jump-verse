import * as doodlerModule from "../modules/doodlerModule.js";
import {doodler} from "../modules/doodlerModule.js";
import {board, context, canvas} from "../modules/boardModule.js";
import * as platformModule from "../modules/platformModule.js";
import {movePlatforms} from "../modules/platformModule.js"
import {platformArray} from "../modules/platformModule.js"

const gameOverImage = new Image();
gameOverImage.src = "./assets/game-over.png";

const playAgainImage = new Image();
playAgainImage.src = "./assets/buttons/playagain.png";

//score
const score = document.getElementById("score");

//the game end
let gameOver = false;

//for different refresh rates
let lastTimestamp = null;

window.onload = () => {
  //load sprites for doodle
  doodlerModule.loadSprites(context);

  //create start platforms
  platformModule.createPlatforms();

  //start gameloop
  requestAnimationFrame(update);  

  //set key listeners to move doodler
  doodlerModule.setKeyListeners();
}

// GAME LOOP
// When you're playing the game, if you move to the left or to the right - you're changing x and y coordinates.
// So you need to update the canvas by redrawing it. For that reason we need the game loop.
function update(timestamp) {
  //start
  requestAnimationFrame(update);
  
  // Initialize the timestamp for the first frame
  if (!lastTimestamp) {
    lastTimestamp = timestamp; // Set the initial timestamp
  }
  
  // Calculate the time difference (deltaTime) between frames in seconds
  let deltaTime = (timestamp - lastTimestamp) / 1000; // Convert milliseconds to seconds
  lastTimestamp = timestamp; // Update the lastTimestamp for the next frame
  
  if(gameOver) {
    platformModule.movePlatformsUp(deltaTime);
    if (platformArray.length == 0) {
      showGameOver();
    } else {
      context.clearRect(0, 0, board.getWidth(), board.getHeight());
    }
  } else {
    //clear canvas
    context.clearRect(0, 0, board.getWidth(), board.getHeight());
  }

  //DOODLER
  doodlerModule.moveByX(deltaTime) //move doodler by x, scaled by deltaTime
  doodlerModule.slowlyStop(); //handle slowly stop
  doodlerModule.controlXPosition(); //get back doodler if it's out of the screen
  doodlerModule.fallingAnim(); //doodler's falling animation
  doodlerModule.increaseVelocityY(deltaTime); //jump physics (move up or down)
    
    //check collision
    platformModule.checkCollision();
    
    //break selected platforms
    platformModule.breakSelectedPlatforms(deltaTime);

    //move platforms
    platformModule.movePlatformsDown(score, deltaTime);

    if ((!movePlatforms || doodler.getY() >= board.getHeight() / 2) && !gameOver) {
      // move the doodler if it's below the screen's midpoint
      doodlerModule.moveDoodlerY(deltaTime) // scaled by deltaTime
    }

    //remove platforms that go off-screen and add new ones
    if(platformArray.length > 0 && platformArray[0].getY() > board.getHeight()) {
      platformArray.splice(0, 1);
      if (!gameOver) platformModule.newPlatform();
    }
    
    //draw doodler after platforms
    doodlerModule.drawDoodler(context);

    if (doodler.getY() >= board.getHeight()) {
      gameOver = true;
    }
  }

  function showGameOver() {
    const centerX = canvas.width / 2;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // "Game Over!" text
      // Load and draw "Game Over" image
    const imgWidth = 300; // Set your desired image width
    const imgHeight = 100; // Set your desired image height
    context.drawImage(gameOverImage, centerX - imgWidth / 2, 100, imgWidth, imgHeight);

  
  // Score Texts
    drawCenteredText("your score: 319", centerX, 250, 24, "black", "DoodleFont");
    drawCenteredText("your high score: 17556", centerX, 300, 24, "black", "DoodleFont");
    drawCenteredText("your name: Doodler", centerX, 350, 24, "black", "DoodleFont");

    const buttonWidth = 150; // Set your desired button width
    const buttonHeight = 50; // Set your desired button height
    context.drawImage(playAgainImage, centerX - buttonWidth / 2, 400, buttonWidth, buttonHeight);
  }
  
  // Draw text with center alignment
  function drawCenteredText(text, x, y, fontSize, color, font) {
    context.font = `${fontSize}px DoodleJumpBold_v2`;
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(text, x, y);
  }
