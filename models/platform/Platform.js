class Platform {
  #x;
  #y;
  #img;
  constructor(x, y, img) {
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
}

export class StandartPlatform extends Platform {
  spring;
  constructor(x, y, spring = null) {
    const img = new Image();
    img.src = "../assets/platforms/standart-platform.png";

    super(x, y, img);
    this.spring = spring;
  }
}

export class BrokenPlatform extends Platform {
  constructor(x, y) {
    const img = new Image();
    img.src = "../assets/platforms/broken-platform.png";

    super(x, y, img);
  }
}

export class MovablePlatform extends Platform {
  direction;
  constructor(x, y) {
    const img = new Image();
    img.src = "../assets/platforms/movable-platform.png"

    super(x, y, img);
    this.direction = 1;
  }
}