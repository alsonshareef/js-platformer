export default class Game {
  constructor() {
    this.world = {
      height: 180,
      width: 320,
      background_color: '#202020',
      player: new Player()
    };
  }
}

class Player {
  constructor() {
    this.color = 'ff0000';
    this.height = 32;
    this.width = 32;
    this.jumping = true;
    this.x = 144; // center of the canvas
    this.y = 0;
    this.x_velocity = 0;
    this.y_velocity = 0;
  }

  moveLeft = () => {};

  moveRight = () => {};

  jump = () => {
    this.y_velocity -= 20;
    this.jumping = true;
  };

  update = () => {};
}
