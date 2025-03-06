import { board } from "./boardModule.js";
import { 
  platformArray, 
  platfromsToBreak,
  updateBreakPlatformArray, 
  updatePlatformArray 
  } from "./platformModule.js";

//jumpster falling
const fallingSprites = [];
let fallingSpriteCount = 0;

//platform breaking
const breakingSprites  = [];
let breakingSpriteCount = 0;

//jumpster falling
let jumpsterFalling = new Image();
jumpsterFalling.src = "../assets/jumpster/jumpster-falling.png";
fallingSprites.push(jumpsterFalling);

//platform breaking
for (let i = 1; i < 11; i++) {
  let img = new Image();
  img.src = `../assets/platforms/breaking-anim/break_${i}.png`;
  breakingSprites.push(img); 
}

//main
function animate(object, spriteList, spriteCount, frameSpeed) {
  // (frameSpeed): визначає, скільки кадрів анімація буде залишатися
  // на одному спрайті перед переключенням на наступний.
  if (spriteCount >= spriteList.length * frameSpeed) {
    spriteCount = 0;
  }
  const spriteIndex = Math.floor(spriteCount / frameSpeed);
  const currentSprite = spriteList[spriteIndex];
  object.setImg(currentSprite); 
  return spriteCount + 1;
}

//falling anim
export function falling(jumpster, velocityY) {
  if (velocityY > 120) {
   fallingSpriteCount = animate(jumpster, fallingSprites, fallingSpriteCount, 25)
  }
}

//breaking platform anim
export function breakPlatform(platform, deltaTime) {
    if (platform.getImg() !== breakingSprites[breakingSprites.length - 1]) {
    breakingSpriteCount = animate(platform, breakingSprites, breakingSpriteCount, 1);
    }
    if (platform.getImg() == breakingSprites[breakingSprites.length - 1]) {
      platform.setY(platform.getY() + 100 * deltaTime);
    }
    if (platform.getY() > board.getHeight()) {
      updatePlatformArray(platformArray.filter(p => p !== platform));
      updateBreakPlatformArray(platfromsToBreak.filter(p => p !== platform));
    }
}