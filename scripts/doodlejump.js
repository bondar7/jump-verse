import Board from "../classes/Board.js";
import Doodler from "../classes/Doodler.js";

//board
const board = new Board();
let boardHTML
let context;

//doodler
const doodler = new Doodler(board.getWidth(), board.getHeight());
let doodlerRightImg;
let doodlerLeftImg;

window.onload = () => {
  boardHTML = document.getElementById("board");
  boardHTML.width = board.getWidth();
  boardHTML.height = board.getHeight();
  context = boardHTML.getContext("2d"); //used for drawing on the board

  //load images
  doodlerRightImg = new Image();
  doodlerRightImg.src = "../images/doodler-right.png";
  doodler.setImg(doodlerRightImg); 
  doodlerRightImg.onload = () => {
    context.drawImage(doodler.getImg(), doodler.getX(), doodler.getY(), doodler.getWidth(), doodler.getHeight());
  }

  doodlerLeftImg = new Image();
  doodlerLeftImg.src = "../images/doodler-left.png";

}