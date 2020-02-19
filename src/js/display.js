/**
 * This file stores the Display class which is responsible for storing all data and
 * methods which handle the canvas that the game is drawn onto.
 */

export default class Display {
  constructor(canvas, levelData) {
    this.ctx = canvas.getContext('2d');
    this.ctx.canvas.height = 180;
    this.ctx.canvas.width = 320;
    this.level = new Level(levelData);
  }

  // Resize game canvas on viewport size changes to dimensions with game world aspect ratio.
  resize = (canvasWidth, canvasHeight, aspectRatio) => {
    if (canvasHeight / canvasWidth > aspectRatio) {
      // Max width scenario
      this.ctx.canvas.height = canvasWidth * aspectRatio * 0.9;
      this.ctx.canvas.width = canvasWidth * 0.9;
    } else {
      // Max height scenario
      this.ctx.canvas.height = canvasHeight * 0.9;
      this.ctx.canvas.width = (canvasHeight / aspectRatio) * 0.9;
    }

    return {
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height
    };
  };

  // Fill in the world.
  fill(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  // Draw the player
  draw(x, y, width, height, color) {
    // Player
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.floor(x), Math.floor(y), width, height);
  }
}

class Level {
  constructor(levelData) {
    this.levelData = levelData;
  }
}
