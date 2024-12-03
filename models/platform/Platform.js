export default class Platform {
  #width;
  #height;
  #x;
  #y;
  #img;
  #isBroken;
  constructor(x, y, img, isBroken) {
    this.#width = 87;
    this.#height = 17;
    this.#x = x;
    this.#y = y; 
    this.#img = img;
    this.#isBroken = isBroken;
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

    // is broken platform
    setIsBroken(value) {
      this.#isBroken = value;
    }
    isBroken() {
      return this.#isBroken;
    }
}