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

  // starting platform
  platformArray.push(new Platform(board.getWidth()/2, board.getHeight() - 70, standartPlatform, false));

  let lastPlatformY = board.getHeight() - 70;

  const minGap = 25;
  const maxGap = 70;

  for (let i = 0; i < 14; i++) {
    let randomX = Math.floor(Math.random() * board.getWidth()*3/4); // (0-1) * boardWidth * 3/4
    let randomGap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
    let randomY = lastPlatformY - randomGap;

    if (Math.random() < 0.18) {
      platformArray.push(new Platform(
        randomX,
        // board.getHeight() - 50*i - 185, 
        randomY,
        brokenPlatform,
        true
      ));
    } else {
      platformArray.push(new Platform(
        randomX,
        // board.getHeight() - 50*i - 185, 
        randomY,
        standartPlatform,
        false
    ));
  }
  lastPlatform = platformArray.at(-1);
  lastPlatformY = lastPlatform.getY();
 }
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

export function movePlatformsUp(deltaTime) {
  platformArray.forEach((p,i) => {
    p.setY(p.getY() - Math.abs(velocityY) * deltaTime);
    if (p.getY() < 0) {
      platformArray.splice(i, 1);
    }
  })
  if (doodler.getY() > board.getHeight() / 2 && platformArray.length > 0) {
    doodler.setY(doodler.getY() - 700 * deltaTime);
  } else {
    doodler.setY(doodler.getY() + 700 * deltaTime);
  }
}

export function newPlatform() {
  const minGap = 30;
  const maxGap = 80;
  
  let randomX = Math.floor(Math.random() * board.getWidth()*3/4); // (0-1) * boardWidth * 3/4
  let randomGap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
  let randomY = lastPlatform.getY() - randomGap;

  if (Math.random() < 0.18 && !lastPlatform.isBroken()) {
    platformArray.push(new Platform(
      randomX,
      randomY,
      brokenPlatform,
      true
    ));
  } else {
    platformArray.push(new Platform(
      randomX,
      randomY,
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