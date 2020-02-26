/**
 * This file stores the Display class which is responsible for storing all data and
 * methods which handle the canvas that the game is drawn onto.
 */

export default class Display {
  constructor(canvas, level) {
    this.ctx = canvas.getContext('2d');
    this.ctx.canvas.width = level.width;
    this.ctx.canvas.height = level.height;
  }

  // Fill in the world.
  fillWorld(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  // Draw the player
  drawPlayer({ x, y }, { width, height, color }) {
    // Player
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.round(x), Math.round(y), width, height);
  }
}
