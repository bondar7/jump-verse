import Board from "../models/board/Board.js";

export const board = new Board();

export const canvas = document.getElementById("board");
canvas.width = board.getWidth();
canvas.height = board.getHeight();
export const context = canvas.getContext("2d");