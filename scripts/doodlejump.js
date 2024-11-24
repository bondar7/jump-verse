import Board from "../classes/Board.js";
import Doodler from "../classes/Doodler.js";

//board
const board = new Board();
let boardHTML
let context;

//doodler
const doodler = new Doodler();

window.onload = () => {
  boardHTML = document.getElementById("board");
  boardHTML.width = board.getWidth();
  boardHTML.height = board.getHeight();
  context = boardHTML.getContext("2d"); // used for drawing on the board
}