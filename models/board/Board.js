export default class Board {
  #width;
  #height;
  constructor(width = 550, height = 700) {
    this.#width = width;
    this.#height = height;
  }

  getWidth() {
    return this.#width;
  }
  setWidth(width) {
    this.#width = width;
  }

  getHeight() {
    return this.#height;
  }
  setHeight(height) {
    this.#height = height;
  } 
}