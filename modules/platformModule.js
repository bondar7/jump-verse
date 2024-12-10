import {context, board} from "../modules/boardModule.js";
import { detectCollision } from "./utils/collision.js";
import { reset } from "./doodlerModule.js";
import * as animModule from "./animationModule.js"
import Platform from "../models/platform/Platform.js";
import { doodler, velocityY } from "./doodlerModule.js";

export let platformArray;
export let movePlatforms = false;
let lastPlatform;
let standartPlatform;
let brokenPlatform;
let startBreakPlatform = false;
export let platfromsToBreak = [];

//load sprites
standartPlatform = new Image();
standartPlatform.src = "../assets/platforms/standart-platform.png";
brokenPlatform = new Image();
brokenPlatform.src = "../assets/platforms/broken-platform.png";

export function createPlatforms() {
  platformArray = [];

  platformArray.push(new Platform(board.getWidth()/2, board.getHeight() - 70, standartPlatform));

  // space between platforms should be random (#TODO)

  for (let i = 0; i < 14; i++) {
    let randomX = Math.floor(Math.random() * board.getWidth()*3/4); // (0-1) * boardWidth * 3/4
    if (Math.random() < 0.18) {
      platformArray.push(new Platform(
        randomX,
        board.getHeight() - 50*i - 185, 
        brokenPlatform,
        true
      ));
    } else {
      platformArray.push(new Platform(
        randomX,
        board.getHeight() - 50*i - 185, 
        standartPlatform,
        false
    ));
  }
 }
  lastPlatform = platformArray[platformArray.length - 1];
}

export function checkCollision() {
  platformArray.forEach((p) => {
    if (detectCollision(doodler, p) && velocityY >= 1 && !p.isBroken()) {
      reset(); // set default doodler image and reset velocityY;
      movePlatforms = true; // enable platform movement
    } else if (detectCollision(doodler, p) && p.isBroken() && velocityY >= 1) {
      //if detects collision and platform is broken - break it.
      startBreakPlatform = true;
      platfromsToBreak.push(p);
      }
    //draw each platform from array
    context.drawImage(p.getImg(), p.getX(), p.getY(), p.getImg().naturalWidth, p.getImg().naturalHeight);
  })
}

export function breakSelectedPlatforms(deltaTime) {
  if (startBreakPlatform && platfromsToBreak.length > 0) {
    platfromsToBreak.forEach(p => animModule.breakPlatform(p, deltaTime));
  }
}

export function movePlatformsDown(score, deltaTime) {
  if (movePlatforms) {
    if (velocityY < 0 && doodler.getY() < board.getHeight() / 2) {
    // move platforms downward as the doodler rises above the screen's midpoint
    platformArray.forEach(p => {
      p.setY(p.getY() + Math.abs(velocityY) * deltaTime);
    })
    // update score
    score.innerHTML = parseInt(score.innerHTML) + 1;
  } else if (velocityY > 0) {
    // stop moving platforms when the doodler starts falling
      movePlatforms = false;
    }
  }
}

export function newPlatform() {
  // space between platforms should be random (#TODO)
  
  let randomX = Math.floor(Math.random() * board.getWidth()*3/4); // (0-1) * boardWidth * 3/4
  if (Math.random() < 0.18 && !lastPlatform.isBroken()) {
    platformArray.push(new Platform(
      randomX,
      -17, // needs fix
      brokenPlatform,
      true
    ));
  } else {
    platformArray.push(new Platform(
      randomX,
      -17, // needs fix
      standartPlatform,
      false
    ));
  }
  lastPlatform = platformArray[platformArray.length - 1];
}

export function updatePlatformArray(newArray) {
  platformArray = newArray;
}
export function updateBreakPlatformArray(newArray) {
  platfromsToBreak = newArray;
}