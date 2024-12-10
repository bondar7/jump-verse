export function detectCollision(doodler, platform) {
  const noseWidth = 21; // The width of the doodler's nose, which we will ignore for collision detection

  let aLeft, aRight;

  // If the doodler is facing right
  if (doodler.getDirX() == 1) {
    aLeft = doodler.getX();  // The left edge of the doodler
    aRight = doodler.getX() + doodler.getWidth() - noseWidth;  // Adjust the right edge by subtracting the nose width
  }
  // If the doodler is facing left
  else if (doodler.getDirX() == -1) {
    aLeft = doodler.getX() + noseWidth;  // Adjust the left edge by adding the nose width
    aRight = doodler.getX() + doodler.getWidth();  // The right edge remains unchanged
  }

  const doodlerBottomY = doodler.getY() + doodler.getHeight();  // The bottom edge of the doodler
  const platformTopY = platform.getY();  // The top edge of the platform
  const platformBottomY = platform.getY() + platform.getHeight();  // The bottom edge of the platform

  // Collision detection check
  return (
    doodlerBottomY >= platformTopY &&     // The bottom of the doodler touches the platform
    doodlerBottomY <= platformBottomY && // The bottom of the doodler does not go below the platform
    aRight > platform.getX() &&                // The right edge of the doodler is on the platform
    aLeft < platform.getX() + platform.getWidth()    // The left edge of the doodler is on the platform
  );
}