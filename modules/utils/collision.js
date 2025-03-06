export function detectCollision(jumpster, platform) {
  const noseWidth = 21; // The width of the jumpster's nose, which we will ignore for collision detection

  let aLeft, aRight;

  // If the jumpster is facing right
  if (jumpster.getDirX() == 1) {
    aLeft = jumpster.getX();  // The left edge of the jumpster
    aRight = jumpster.getX() + jumpster.getWidth() - noseWidth;  // Adjust the right edge by subtracting the nose width
  }
  // If the jumpster is facing left
  else if (jumpster.getDirX() == -1) {
    aLeft = jumpster.getX() + noseWidth;  // Adjust the left edge by adding the nose width
    aRight = jumpster.getX() + jumpster.getWidth();  // The right edge remains unchanged
  }

  const jumpsterBottomY = jumpster.getY() + jumpster.getHeight();  // The bottom edge of the jumpster
  const platformTopY = platform.getY();  // The top edge of the platform
  const platformBottomY = platform.getY() + platform.getHeight();  // The bottom edge of the platform

  // Collision detection check
  return (
    jumpsterBottomY >= platformTopY &&     // The bottom of the jumpster touches the platform
    jumpsterBottomY <= platformBottomY && // The bottom of the jumpster does not go below the platform
    aRight > platform.getX() &&                // The right edge of the jumpster is on the platform
    aLeft < platform.getX() + platform.getWidth()    // The left edge of the jumpster is on the platform
  );
}