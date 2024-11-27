export default class Platform {
  #width;
  #height;
  #x;
  #y;
  #img;
  constructor(x, y, img) {
    this.#width = 100;
    this.#height = 30;
    this.#x = x;
    this.#y = y; 
    this.#img = img;
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
    
    // Image
    setImg(img) {
      this.#img = img;
    }
    getImg() {
      return this.#img;
    }
}