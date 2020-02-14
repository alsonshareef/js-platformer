/**
 * This file stores the Game class which is responsible for storing data and methods related
 * to world of the game and it's state, as well as the Player class which is responsible for
 * storing data and methods related to the player object drawn to the canvas and it's state.
 */

export default class Game {
  constructor() {
    this.world = {
      height: 180,
      width: 320,
      background_color: '#202020',
      player: new Player(),
      gravity: 1.5,
      friction: 0.9,

      handleCollision: player => {
        // if character is falling below floor line
        if (player.y > this.world.height - this.world.player.height) {
          player.jumping = false;
          player.y = this.world.height - this.world.player.height;
          player.y_velocity = 0;
        }

        // if character is going off the left of the screen
        if (player.x < 0) {
          player.x = 0;
        }

        // if character is going off the right of the screen
        if (player.x + player.width > this.world.width) {
          player.x = this.world.width - player.width;
        }
      },

      updateSize: (width, height) => {
        this.world.width = width;
        this.world.height = height;
      },

      update: function() {
        this.player.y_velocity += this.gravity; // gravity
        this.player.x_velocity *= this.friction; // friction
        this.player.y_velocity *= this.friction; // friction
        this.player.update();
        this.handleCollision(this.player);
      }
    };
  }
}

class Player {
  constructor() {
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

  updateJumpHeight = canvasHeight => {
    this.jumpHeight = -canvasHeight / 30;
    console.log(this.jumpHeight);
  };
}
