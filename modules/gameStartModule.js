import { StandartPlatform } from "../models/platform/Platform.js";
import { detectCollision } from "../modules/utils/collision.js";
import { context, canvas, board } from "./boardModule.js";
import * as jumpsterModule from "./jumpsterModule.js"
import { jumpster } from "./jumpsterModule.js";
import { createPlatforms } from "./platformModule.js";
import { showTopbar } from "./utils/topbar.js";

export let isStart = true;

const bg = new Image();
const darkHole = new Image();
const gameName = new Image();
const saucer = new Image();
const playBtnImg = new Image();
const playBtnClickedImg = new Image();
const monster1 = new Image();
const monster2 = new Image();
const monster3 = new Image();
const monster4 = new Image();
const monster5 = new Image();

bg.src = "../assets/gamebg2.png";
darkHole.src = "../assets/start-screen/dark_hole.png";
gameName.src = "../assets/start-screen/game_name.png";
saucer.src = "../assets/start-screen/saucer.png"
playBtnImg.src = "../assets/start-screen/play_btn.png";
playBtnClickedImg.src = "../assets/start-screen/play_btn_clicked.png";
monster1.src = "../assets/start-screen/monster1.png";
monster2.src = "../assets/start-screen/monster2.png";
monster3.src = "../assets/start-screen/monster3.png";
monster4.src = "../assets/start-screen/monster4.png";
monster5.src = "../assets/start-screen/monster5.png";

const playBtn = {
  x: 120, 
  y: 200,
  width: 180,
  height: 65,
  img: playBtnImg
}

export function drawStart(deltaTime) {
  context.clearRect(0, 0, board.getWidth(), board.getHeight());

  context.drawImage(bg, 0, 0, board.getWidth(), board.getHeight());

  context.drawImage(monster5, 80, 50, 38, 33);
  context.drawImage(gameName, 20, 80, 340, 78);
  context.drawImage(playBtn.img, playBtn.x, playBtn.y, playBtn.width, playBtn.height);
  context.drawImage(monster4, 320, 260, 37, 41);
  context.drawImage(monster3, 50, 335, 40, 36);
  context.drawImage(darkHole, 350, 370, 120, 110);
  context.drawImage(monster2, 200, 440, 45, 30);
  context.drawImage(monster1, 230, 550, 59, 33);

  const platform = new StandartPlatform(60, 610);
  context.drawImage(platform.getImg(), platform.getX(), platform.getY(), platform.getWidth(), platform.getHeight());
  
  context.drawImage(saucer, 370, 20, 120, 60);

  context.drawImage(
    jumpster.getImg(), 
    jumpster.getX(), 
    jumpster.getY(), 
    jumpster.getWidth(), 
    jumpster.getHeight() 
  );

  jumpsterModule.increaseVelocityY(deltaTime);
  jumpsterModule.moveJumpsterY(deltaTime);
  jumpsterModule.fallingAnim();
  if(detectCollision(jumpster, platform)) {
    jumpsterModule.reset()
  }
}

export function playBtnListener(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (
      clickX >= playBtn.x &&
      clickX <= playBtn.x + playBtn.width &&
      clickY >= playBtn.y &&
      clickY <= playBtn.y + playBtn.height
    ) {
      playBtn.img = playBtnClickedImg;
      setTimeout(() => {
        isStart = false;
        jumpsterModule.setJumpsterPositionForGame();
        jumpsterModule.reset();
        showTopbar();
        createPlatforms(); // create start platforms
      }, 110);   
    } else {
      playBtn.img = playBtnImg;
    }
}

export function setStart(value) {
  isStart = value;
}