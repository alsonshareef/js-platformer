export default class Display {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.canvas.height = 180;
    this.ctx.canvas.width = 320;
  }

  // Fill in the world.
  fill(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, 320, 180);
  }

  // Draw the player
  draw(x, y, width, height, color) {
    // Player
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.floor(x), Math.floor(y), width, height);
  }
}
