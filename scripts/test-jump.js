let velocityY = 0; // doodler 
let initialVelocityY = -4.5; // starting velocity Y
let gravity = 0.06;
let initialGravity = 0.06;
let maxJumpHeight = 0; // To track the highest point of the jump
let jumping = false; // Flag to know if the doodler is in the air
let isFalling = false; // Flag to track if the doodler is falling

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.getWidth(), board.getHeight());

  //handle slowly stop
  if (!doodler.isMovingLeft && velocityX < 0) {
      velocityX = Math.min(0, velocityX + friction); // Gradually reduce leftward velocity
    } else if (!doodler.isMovingRight && velocityX > 0) {
      velocityX = Math.max(0, velocityX - friction); // Gradually reduce rightward velocity
    }
    
    //doodler
    doodler.setX(doodler.getX() + velocityX);
    if (doodler.getX() > board.getWidth()) {
      doodler.setX(0 - doodler.getWidth());
    } else if (doodler.getX() < 0 - doodler.getWidth()) {
      doodler.setX(board.getWidth());
    }
    
    //jump physics
// Jump physics
if (velocityY < 0 && !isFalling) {
  // Increase upward velocity gradually to simulate a smooth jump
  velocityY -= gravity; // Increase negative velocity for upward movement
  if (velocityY <= -9.5) {
      velocityY = -9.5; // Cap the maximum upward speed
  }
}

// When reaching the peak of the jump, apply a small delay (hover effect)
if (velocityY <= 0 && !jumping) {
  maxJumpHeight = doodler.getY(); // Track the highest point of the jump
  jumping = true; // Mark that the peak has been reached
  gravity = 0; // Minimize gravity to simulate hover
}

// Delay gravity after reaching peak for a short time
if (jumping && doodler.getY() === maxJumpHeight) {
  setTimeout(() => {
      gravity = 0.1; // Reapply gravity for falling
      isFalling = true; // Start falling after hover
  }, 200); // Hover for 200ms before starting to fall
}

// Falling physics (after reaching the peak)
if (isFalling) {
  velocityY += gravity; // Accelerate downward with gravity
  if (velocityY > 9.5) {
      velocityY = 9.5; // Limit falling speed
  }
}

doodler.setY(doodler.getY() + velocityY);
    
    //draw platforms
    platformArray.forEach((p) => {
      context.drawImage(p.getImg(), p.getX(), p.getY(), p.getWidth(), p.getHeight());
      if (detectCollision(doodler, p) && velocityY >= 1) {
        velocityY = initialVelocityY;
        gravity = initialGravity;
        jumping = false;
        isFalling = false;
      }
    })
    
    // draw doodler after platforms
    drawDoodler();
  }