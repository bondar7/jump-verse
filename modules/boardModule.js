import Board from "../models/board/Board.js";

export const board = new Board();

const boardHTML = document.getElementById("board");
boardHTML.width = board.getWidth();
boardHTML.height = board.getHeight();
export const context = boardHTML.getContext("2d");