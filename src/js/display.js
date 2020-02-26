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

  // Clear canvas before draw or redraw
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  // Fill in the world.
  fillWorld(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  // Draw all moving elements based on their state.
  drawMovingElements() {
    this.level.movingElements.forEach(el => {
      // PLAYER
      if (el.type === 'player') {
        this.ctx.fillStyle = el.color;
        this.ctx.fillRect(
          Math.round(el.position.x),
          Math.round(el.position.y),
          el.width,
          el.height
        );
      }

      // COIN
      if (el.type === 'coin') {
        this.ctx.fillStyle = el.color;
        this.ctx.fillRect(
          el.position.x + 12.5,
          el.position.y,
          this.level.scale / 2,
          this.level.scale / 2
        );
      }
    });
  }

  // Draw all stationary elements that have no state.
  drawStationaryElements() {
    this.level.stationaryElements.forEach(row => {
      return row.forEach(el => {
        // console.log(el.type);
        switch (el.type) {
          case 'wall':
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(
              Math.round(el.x),
              Math.round(el.y),
              this.level.scale,
              this.level.scale
            );
            break;

          case 'lava':
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(
              Math.round(el.x),
              Math.round(el.y),
              this.level.scale,
              this.level.scale
            );
            break;
        }
      });
    });
  }
}
