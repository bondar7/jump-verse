import { board } from "./boardModule.js";
import { 
  platformArray, 
  platfromsToBreak,
  updateBreakPlatformArray, 
  updatePlatformArray 
  } from "./platformModule.js";

//doodler falling
const fallingSprites = [];
let fallingSpriteCount = 0;

//platform breaking
const breakingSprites  = [];
let breakingSpriteCount = 0;

//doodler falling
let doodlerFalling = new Image();
doodlerFalling.src = "../assets/doodler/doodler-falling.png";
fallingSprites.push(doodlerFalling);

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
export function falling(doodler, velocityY) {
  if (velocityY > 120) {
   fallingSpriteCount = animate(doodler, fallingSprites, fallingSpriteCount, 25)
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