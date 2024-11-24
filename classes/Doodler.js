export default class Doodler {
    // Private fields
    #width; 
    #height;
    #x;
    #y;
    #img;
    #boardWidth;
    #boardHeight;
  constructor(boardWidth, boardHeight) {
    this.#boardWidth = boardWidth;
    this.#boardHeight = boardHeight;
    this.#width = 60; // Doodler's width
    this.#height = 60; // Doodler's height
    // Calculate initial position
    this.#x = (board.width - this.#width) / 2; // Horizontal center
    this.#y = board.height - this.#height - 50; // Slightly above bottom
    // Doodler's img
    this.#img = null;
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

  setImg(imageSrc) {
    const newImg = new Image();
    newImg.src = imageSrc;
    this.img = newImg;
  }
  getImg() {
    return this.#img;
  }
}