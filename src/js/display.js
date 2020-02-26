/**
 * This file stores the Display class which is responsible for storing all data and
 * methods which handle the canvas that the game is drawn onto.
 */

export default class Display {
  constructor(canvas, level) {
    this.ctx = canvas.getContext('2d');
    this.ctx.canvas.width = level.width;
    this.ctx.canvas.height = level.height;
    this.level = level;
  }

  // Fill in the world.
  fillWorld(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  // Draw the player
  drawPlayer() {
    let { x, y } = this.level.player[0].position;
    let { width, height } = this.level.player[0];

    this.ctx.fillStyle = this.level.player[0].color;
    this.ctx.fillRect(Math.round(x), Math.round(y), width, height);
  }
}
