/**
 * This file instantiates all logic classes, combines their logic within the Engine class
 * which will then run to start the game.
 */

import '../styles/index.css';

import Display from './display';
import Controller from './controller';
import Engine from './engine';
import Game from './game';

/* MAIN GAME FUNCTIONS */

// Listens for any user input and manipulates the state of player.
const KEYLISTENER = event => {
  controller.directionHandler(event.type, event.keyCode);
};

// Renders out the world and player on every new frame within Engine loop method.
const RENDER = () => {
  display.fill(game.world.background_color);
  display.draw(
    game.world.player.x,
    game.world.player.y,
    game.world.player.width,
    game.world.player.height,
    game.world.player.color
  );
};

// Syncs up the Player with the world state and potentially new player state on every new frame.
const UPDATE = () => {
  if (controller.active.up && game.world.player.jumping == false) {
    game.world.player.jump();
  }

  if (controller.active.left) {
    game.world.player.moveLeft();
  }

  if (controller.active.right) {
    game.world.player.moveRight();
  }

  game.world.update();
};

/* CLASS INSTANCES */

const display = new Display(document.querySelector('canvas'));
const controller = new Controller();
const engine = new Engine(RENDER, UPDATE);
const game = new Game();

/* INIT */

window.addEventListener('keydown', KEYLISTENER);
window.addEventListener('keyup', KEYLISTENER);
window.requestAnimationFrame(engine.loop);
