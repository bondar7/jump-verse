export default class Board {
  #width;
  #height;
  constructor(width = 635, height = 955) {
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