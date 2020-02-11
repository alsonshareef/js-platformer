/**
 * This file is responsible for storing all data and methods related to user input state.
 */

export default class Controller {
  constructor() {
    this.active = {
      left: false,
      right: false,
      up: false
    };
  }

  // Handles state of keypresses for character movement.
  directionHandler = (type, keycode) => {
    let keyDown = type === 'keydown' ? true : false;

    switch (keycode) {
      case 37:
        this.active.left = keyDown;
        break;
      case 38:
        this.active.up = keyDown;
        break;
      case 39:
        this.active.right = keyDown;
        break;
    }
  };
}
