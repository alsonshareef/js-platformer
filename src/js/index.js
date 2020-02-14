/**
 * This file combines all the classes and their public methods into 'main game functions'
 * for modularity purposes and passes them to the Engine class instance which will run
 * these functions within the game loop to run the game.
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

// Resize canvas based on browser viewport dimensions.
const RESIZE = () => {
  // Store updated canvas dimensions.
  let newDimensions = display.resize(
    window.innerWidth - 32,
    window.innerHeight - 32,
    0.5
  );

  // Update the game world dimensions in proportion to canvas dimensions.
  game.world.updateSize(newDimensions.width, newDimensions.height);

  // Update Player class properties in proportion to canvas dimension changes. (New height can be passed instead of new width as well.)
  game.world.player.updateSize(newDimensions.width);
  // game.world.player.updateJumpHeight(worldSize.width);
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
  if (controller.active.up && game.world.player.jumping === false) {
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

RESIZE();
window.addEventListener('resize', RESIZE);

window.requestAnimationFrame(engine.loop);
