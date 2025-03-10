import * as jumpsterModule from "../modules/jumpsterModule.js";
import {jumpster} from "../modules/jumpsterModule.js";
import {board, canvas, context} from "../modules/boardModule.js";
import * as platformModule from "../modules/platformModule.js";
import {movePlatforms} from "../modules/platformModule.js"
import {platformArray} from "../modules/platformModule.js"
import { gameOver, isGameOver, setGameOver } from "../modules/gameOverModule.js";
import { drawStart, isStart, playBtnListener } from "../modules/gameStartModule.js";

//score
export const score = document.getElementById("score");
export let highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;

//for different refresh rates
let lastTimestamp = null;

window.onload = () => {
  //load sprites for doodle
  jumpsterModule.loadSprites(context);

  //start gameloop
  requestAnimationFrame(update);  

  //set key listeners to move jumpster
  jumpsterModule.setKeyListeners();

  //set jumpster's position for preview
  jumpsterModule.setJumpsterPositionForStart();
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
  
  deltaTime = Math.min(deltaTime, 0.0085);
  lastTimestamp = timestamp; // Update the lastTimestamp for the next frame
  
  if (isStart) {
    canvas.addEventListener("click", playBtnListener);
    drawStart(deltaTime); 
  } else if(isGameOver) { 
    //if it's game over display needed elements
    gameOver(deltaTime);
  } else {
    //clear canvas
    context.clearRect(0, 0, board.getWidth(), board.getHeight());

    //DOODLER
    jumpsterModule.moveByX(deltaTime) //move jumpster by x, scaled by deltaTime
    jumpsterModule.slowlyStop(); //handle slowly stop
    jumpsterModule.controlXPosition(); //get back jumpster if it's out of the screen
    
    //break selected platforms
    platformModule.breakSelectedPlatforms(deltaTime);

    //move platforms
    platformModule.movePlatformsDown(score, deltaTime);

    //move only movable platforms by x
    platformModule.moveMovablePlatforms(deltaTime);

    if ((!movePlatforms || jumpster.getY() >= board.getHeight() / 2) && !isGameOver) {
      // move the jumpster if it's below the screen's midpoint
      jumpsterModule.moveJumpsterY(deltaTime) // scaled by deltaTime
    }

    //remove platforms that go off-screen and add new ones
    if (platformArray.length > 0 && platformArray[0].getY() > board.getHeight()) {
      platformArray.splice(0, 1);
    }
    if (!isGameOver && platformArray.length < 35) {
      platformModule.newPlatform();
    }
  }
  
  if (!isStart) {
    jumpsterModule.fallingAnim(); //jumpster's falling animation
    jumpsterModule.increaseVelocityY(deltaTime); //jump physics (move up or down)
    platformModule.checkCollision(); //check collision and draw all platforms at the same time
    jumpsterModule.drawJumpster(context);
    if (jumpster.getY() >= board.getHeight()) {
      setGameOver(true);
      }
    }
  }

  export function updateHighestScore() {
    if (parseInt(score.innerHTML) > highestScore) {
      highestScore = parseInt(score.innerHTML);
      localStorage.setItem("highestScore", JSON.stringify(highestScore));
    }
  }