export default class Spring {
  #img;
  #width;
  #height;
  #x;
  #y;
  constructor(x, y) {
    const spring_comp = new Image();
    spring_comp.src = "../assets/spring/spring-comp.png";
    this.#x = x;
    this.#y = y;
    this.#img = spring_comp;
    this.#width = 30;
    this.#height = 23;
  }

  getWidth() {
    return this.#width;
  }
  getHeight() {
    return this.#height;
  }
  getY() {
    return this.#y;
  }
  getX() {
    return this.#x;
  }
  getImg() {
    return this.#img;
  }

  setY(newY) {
    this.#y = newY;
  }
  setX(newX) {
    this.#x = newX;
  }

  useSpring(platform) {
    const used_spring = new Image();
    used_spring.src = "../assets/spring/spring.png"
    this.#img = used_spring;
    this.#height = 45;
    this.setY(platform.getY() - 40); 
  }
}