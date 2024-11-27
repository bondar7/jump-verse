import Board from "../models/board/Board.js";
import Doodler from "../models/doodler/Doodler.js";
import Platform from "../models/platform/Platform.js";
// import platformArray from "../models/platform/platformArray.js";

//board
const board = new Board();
let boardHTML
let context;

//doodler
const doodler = new Doodler(board.getWidth(), board.getHeight());
let doodlerRightImg;
let doodlerLeftImg;

//physics 
let velocityX = 0;
let friction = 0.1;
let isMovingRight = false;
let isMovingLeft = false;
let isRightImg = true;

//jump
let velocityY = 0; // doodler 
let initialVelocityY = -9.5 ; //starting velocity Y
let gravity = 0.2;

//platforms
let platformArray;
let platformImg;

window.onload = () => {
  boardHTML = document.getElementById("board");
  boardHTML.width = board.getWidth();
  boardHTML.height = board.getHeight();
  context = boardHTML.getContext("2d"); //used for drawing on the board

  //load images
  doodlerRightImg = new Image();
  doodlerRightImg.src = "../images/doodler-right-1.png";
  doodler.setImg(doodlerRightImg); 
  doodlerRightImg.onload = () => {
    context.drawImage(doodler.getImg(), doodler.getX(), doodler.getY(), doodler.getWidth(), doodler.getHeight());
  }

  doodlerLeftImg = new Image();
  doodlerLeftImg.src = "../images/doodler-left-1.png";

  platformImg = new Image();
  platformImg.src = "../images/platform.png";

  velocityY = initialVelocityY;
  placePlatforms();
  requestAnimationFrame(update);

  //keylistener to move doodler
  document.addEventListener("keydown", moveDoodler);
  document.addEventListener("keyup", stopDoodler);
}

// GAME LOOP
// When you're playing the game, if you move to the left or to the right - you're changing x and y coordinates.
// So you need to update the canvas by redrawing it. For that reason we need the game loop.
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.getWidth(), board.getHeight());

  //handle slowly stop
    if (!isMovingLeft && velocityX < 0) {
      velocityX = Math.min(0, velocityX + friction); // Gradually reduce leftward velocity
    } else if (!isMovingRight && velocityX > 0) {
      velocityX = Math.max(0, velocityX - friction); // Gradually reduce rightward velocity
    }

  //doodler
  doodler.setX(doodler.getX() + velocityX);
  if (doodler.getX() > board.getWidth()) {
    doodler.setX(0 - doodler.getWidth());
  } else if (doodler.getX() < 0 - doodler.getWidth()) {
    doodler.setX(board.getWidth());
  }
  context.drawImage(doodler.getImg(), doodler.getX(), doodler.getY(), doodler.getWidth(), doodler.getHeight());

  //jump
  velocityY += gravity;
  doodler.setY(doodler.getY() + velocityY);

  //platforms
  platformArray.forEach((p) => {
    context.drawImage(p.getImg(), p.getX(), p.getY(), p.getWidth(), p.getHeight());
    if (detectCollision(doodler, p) && velocityY >= 1) {
      velocityY = initialVelocityY;
    }
  })
}

//handle doodle's moving
function moveDoodler(event) {
  if (event.code == "ArrowRight" || event.code == "KeyD") { //move right
    velocityX = 4;
    doodler.setImg(doodlerRightImg);
    isMovingRight = true;
    isRightImg = true;
  } else if (event.code == "ArrowLeft" || event.code == "KeyE") { //move left
    velocityX = -4;
    doodler.setImg(doodlerLeftImg);
    isMovingLeft = true;
    isRightImg = false;
  }
}
//handle doodle's stopping
function stopDoodler(event) {
    if (event.code == "ArrowRight" || event.code == "KeyD") { // stop move right
      isMovingRight = false;
    } else if (event.code == "ArrowLeft" || event.code == "KeyE") { // stop move left
      isMovingLeft = false;
  }
}

function placePlatforms() {
  platformArray = [];

  platformArray.push(new Platform(board.getWidth()/2, board.getHeight() - 70, platformImg));

  for (let i = 0; i < 2; i++) {
    let randomX = Math.floor(Math.random() * board.getWidth()*3/4); // (0-1) * boardWidth * 3/4
    platformArray.push(new Platform(
      randomX,
      board.getHeight() - 75*i - 300, 
      platformImg));
  }
}

// function detectCollision(a, b) {
//   const noseWidth = 15; // Ширина носа (припустимо 10 пікселів)

//   // Перевірка колізії для правої картинки (ніс з правого боку)
//   if (isRightImg) {
//     const aRight = a.getX() + a.getWidth() - noseWidth; // Віднімаємо ширину носа з правого боку
//     return a.getX() < b.getX() + b.getWidth() &&
//            aRight > b.getX() &&
//            a.getY() < b.getY() + b.getHeight() &&
//            a.getY() + a.getHeight() > b.getY();
//   } 
//   // Перевірка колізії для лівої картинки (ніс з лівого боку)
//   else {
//     const aLeft = a.getX() + noseWidth; // Віднімаємо ширину носа з лівого боку
//     return aLeft < b.getX() + b.getWidth() &&
//            a.getX() + a.getWidth() > b.getX() &&
//            a.getY() < b.getY() + b.getHeight() &&
//            a.getY() + a.getHeight() > b.getY();
//   }
// }

function detectCollision(a, b) {
  const noseWidth = 30; // Ширина носа, яку ми не будемо враховувати для перевірки

  let aLeft, aRight;

  // Якщо дудлер повернутий вправо
  if (isRightImg) {
    aLeft = a.getX();  // Лівий край дудлера
    aRight = a.getX() + a.getWidth() - noseWidth;  // Коригуємо правий край, зменшуючи на ширину носа
  }
  // Якщо дудлер повернутий вліво
  else {
    aLeft = a.getX() + noseWidth;  // Коригуємо лівий край, додаючи ширину носа
    aRight = a.getX() + a.getWidth();  // Правий край не змінюється
  }

  const doodlerBottomY = a.getY() + a.getHeight();  // Нижня частина дудлера
  const platformTopY = b.getY();  // Верхня частина платформи
  const platformBottomY = b.getY() + b.getHeight();  // Нижня частина платформи

  // Перевірка на колізію
  return (
    doodlerBottomY >= platformTopY &&                // Ноги дудлера торкаються платформи
    doodlerBottomY <= platformBottomY &&             // Ноги не заходять нижче платформи
    aRight > b.getX() &&                             // Правий край дудлера на платформі
    aLeft < b.getX() + b.getWidth()                  // Лівий край дудлера на платформі
  );
}