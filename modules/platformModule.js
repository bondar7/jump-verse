import {context, board} from "../modules/boardModule.js";
import { detectCollision } from "./utils/collision.js";
import { reset, resetForSpring } from "./doodlerModule.js";
import * as animModule from "./animationModule.js"
import {StandartPlatform, BrokenPlatform, MovablePlatform} from "../models/platform/Platform.js";
import { doodler, velocityY } from "./doodlerModule.js";
import Spring from "../models/spring/Spring.js";

export let platformArray;
export let movePlatforms = false;
let lastPlatform;
let startBreakPlatform = false;
export let platfromsToBreak = [];

//springs
let springImg = new Image();
let springCompImg = new Image();
springImg.src = "../assets/spring/spring.png";
springCompImg.src = "../assets/spring/spring-comp.png";

export function createPlatforms() {
  platformArray = [];

  // starting platform
  platformArray.push(new StandartPlatform(board.getWidth()/2, board.getHeight() - 70));

  let lastPlatformY = board.getHeight() - 70;

  const minGap = 25;
  const maxGap = 70;

  for (let i = 0; i < 14; i++) {
    let randomX = Math.floor(Math.random() * board.getWidth()*3/4); // (0-1) * boardWidth * 3/4
    let randomGap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
    let randomY = lastPlatformY - randomGap;

    if (Math.random() < 0.18) {
      platformArray.push(new BrokenPlatform(
        randomX,
        randomY,
      ));
    } else {
      platformArray.push(new StandartPlatform(
        randomX,
        randomY,
    ));
  }
  lastPlatform = platformArray.at(-1);
  lastPlatformY = lastPlatform.getY();
 }
}

export function checkCollision() {
  platformArray.forEach((p) => {
    if (p.spring
       && detectCollision(doodler, p.spring) 
       && velocityY >= 1 
       && !(p instanceof BrokenPlatform)) 
       {
        p.spring.useSpring(p);
        resetForSpring();
        movePlatforms = true;
      } else {

    if (detectCollision(doodler, p) && velocityY >= 1 && !(p instanceof BrokenPlatform)) {
      reset(); // set default doodler image and reset velocityY;
      movePlatforms = true; // enable platform movement
    } else if (detectCollision(doodler, p) && p instanceof BrokenPlatform && velocityY >= 1) {
      //if detects collision and platform is broken - break it.
      startBreakPlatform = true;
      platfromsToBreak.push(p);
      }
    //draw each platform from array
    context.drawImage(p.getImg(), p.getX(), p.getY(), p.getWidth(), p.getHeight());
    //draw springs
    if (p instanceof StandartPlatform && p.spring) {
      context.drawImage(p.spring.getImg(), p.spring.getX(), p.spring.getY(), p.spring.getWidth(), p.spring.getHeight());
    }
  }
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
      if (p.spring) {
        if (p.spring.getImg().src === springCompImg.src) {
            p.spring.setY(p.getY() - 21); // Keep relative offset
        } else if (p.spring.getImg().src === springImg.src) {
            p.spring.setY(p.getY() - 40); // Keep relative offset
        }
    }
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
    
    if (p.spring) {
      if (p.spring.getImg().src === springCompImg.src) {
          p.spring.setY(p.getY() - 21); // Keep relative offset
      } else if (p.spring.getImg().src === springImg.src) {
          p.spring.setY(p.getY() - 40); // Keep relative offset
      }
  }
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

export function moveMovablePlatforms(deltaTime) {
  platformArray.forEach(p => {
    if (p instanceof MovablePlatform) {
      p.setX(p.getX() + p.direction * 85 * deltaTime)
      if (p.getX() >= board.getWidth() - p.getWidth()) {
        p.direction = -1;
      } 
      if (p.getX() <= 0){
        p.direction = 1;
      }
    }
  })
}

export function newPlatform() {
  const minGap = 30;
  const maxGap = 80;
  
  let randomX = Math.floor(Math.random() * board.getWidth()*3/4); // (0-1) * boardWidth * 3/4
  let randomGap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
  let randomY = lastPlatform.getY() - randomGap;
  
  if (Math.random() < 0.18 && !(lastPlatform instanceof BrokenPlatform)) {
    platformArray.push(new BrokenPlatform(
      randomX,
      randomY
    ));
  } else if (Math.random() > 0.90) {
    platformArray.push(new MovablePlatform(
      randomX,
      randomY
    ));
  } else {
    if(Math.random() < 0.11) {
      const maxSpringX = randomX + 55;
      const randomSpringX = Math.floor(Math.random() * (maxSpringX - randomX + 1)) + randomX;
      const springY = randomY - 21;
      
      platformArray.push(new StandartPlatform(
        randomX,
        randomY,
        new Spring(randomSpringX, springY)
      ))
    } 
    else {
      platformArray.push(new StandartPlatform(
        randomX,
        randomY
      ));
    }
  }
  lastPlatform = platformArray[platformArray.length - 1];
}

export function updatePlatformArray(newArray) {
  platformArray = newArray;
}
export function updateBreakPlatformArray(newArray) {
  platfromsToBreak = newArray;
}