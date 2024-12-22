export default class Platform {
  #x;
  #y;
  #img;
  #isBroken;
  #isMovable;
  direction
  constructor(x, y, img, isBroken, isMovable, direction) {
    this.#x = x;
    this.#y = y; 
    this.#img = img;
    this.#isBroken = isBroken;
    this.#isMovable = isMovable
    this.direction = direction;
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
      return this.#img.naturalWidth;
    }
    getHeight() {
      return this.#img.naturalHeight;
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

    // is movable platform
    setIsMovable(value) {
      this.#isMovable = value;
    }
    isMovable() {
      return this.#isMovable;
    }
}