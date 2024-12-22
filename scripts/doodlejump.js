import * as doodlerModule from "../modules/doodlerModule.js";
import {doodler} from "../modules/doodlerModule.js";
import {board, context} from "../modules/boardModule.js";
import * as platformModule from "../modules/platformModule.js";
import {movePlatforms} from "../modules/platformModule.js"
import {platformArray} from "../modules/platformModule.js"
import { gameOver, isGameOver, setGameOver } from "../modules/gameOverModule.js";

//score
export const score = document.getElementById("score");

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
  
  if(isGameOver) { 
    //if it's game over display needed elements
    gameOver(deltaTime, score.innerHTML);
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

    if ((!movePlatforms || doodler.getY() >= board.getHeight() / 2) && !isGameOver) {
      // move the doodler if it's below the screen's midpoint
      doodlerModule.moveDoodlerY(deltaTime) // scaled by deltaTime
    }

    //remove platforms that go off-screen and add new ones
    if (platformArray.length > 0 && platformArray[0].getY() > board.getHeight()) {
      platformArray.splice(0, 1);
    }
    if (!isGameOver && platformArray.length < 35 && platformArray[0].getY() > board.getHeight() - 50) {
      platformModule.newPlatform();
    }
    
    //draw doodler after platforms
    doodlerModule.drawDoodler(context);

    if (doodler.getY() >= board.getHeight()) {
      setGameOver(true);
    }
  }