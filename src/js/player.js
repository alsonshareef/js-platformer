/**
 *  This file stores the Player class which is responsible for storing data and methods
 *  related to the player object drawn to the canvas and it's state.
 */

export default class Player {
  constructor(element) {
    this.element = element;
    this.color = 'red';
    this.height = 32;
    this.width = 32;
    this.jumping = false;
    this.jumpHeight = -30;
    this.x = 144; // center of the canvas
    this.y = 0;
    this.x_velocity = 0;
    this.y_velocity = 0;
  }

  moveLeft = () => {
    this.x_velocity -= 0.5;
  };

  moveRight = () => {
    this.x_velocity += 0.5;
  };

  jump = () => {
    this.jumping = true;
    this.y_velocity = this.jumpHeight;
  };

  update = () => {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  };

  updateSize = canvasWidth => {
    this.width = canvasWidth / 32;
    this.height = canvasWidth / 32;
  };
}
