export default class Doodler {
    // Private fields
    #width; 
    #height;
    #dirX
    #x;
    #y;
    #img;
    #boardWidth;
    #boardHeight;
    isMovingRight; isMovingLeft;
  constructor(boardWidth, boardHeight) {
    this.#boardWidth = boardWidth;
    this.#boardHeight = boardHeight;
    this.#width = 70; // Doodler's width
    this.#height = 70; // Doodler's height
    // Direction Doodler is moving
    this.#dirX = 1;
    // Calculate initial position
    this.#x = (this.#boardWidth - this.#width) / 2; // Horizontal center
    this.#y = this.#boardHeight - this.#height - 60; // Slightly above bottom
    // Doodler's img
    this.#img = null;
    this.isMovingRight = false;
    this.isMovingLeft = false;
  }

  // Get position
  getX() {
    return this.#x;
  }
  getY() {
    return this.#y;
  }

  // Set position
  setX(x) {
    this.#x = x;
  }
  setY(y) {
    this.#y = y;
  }

  // Width, Height
  getWidth() {
    return this.#width;
  }
  getHeight() {
    return this.#height;
  }
  setWidth(width) {
    this.#width = width;
  }
  setHeight(height) {
    this.#height = height;
  }

  setImg(img) {
    this.#img = img;
  }
  getImg() {
    return this.#img;
  }

  // Set x direction
  setDirX(value) {
    this.#dirX = value;
  }
  getDirX() {
    return this.#dirX;
  }
}