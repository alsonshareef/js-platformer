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

import levelData from '../levels.json';

/* MAIN GAME FUNCTIONS */

// Listens for any user input and manipulates the state of player.
const KEYLISTENER = event => {
  controller.directionHandler(event.type, event.keyCode);
};

// Resize canvas based on browser viewport dimensions.
const RESIZE = () => {
  // Store updated canvas dimensions.
  let newDimensions = display.resize(
    window.innerWidth,
    window.innerHeight,
    0.5
  );

  // Update the game world dimensions in proportion to canvas dimensions.
  game.world.updateSize(newDimensions.width, newDimensions.height);

  // Update Player class properties in proportion to canvas dimension changes. (New height can be passed instead of new width as well.)
  game.level.player[0].updateSize(newDimensions.width);
};

// Renders out the world and player on every new frame within Engine loop method.
const RENDER = () => {
  display.fill(game.world.background_color);
  display.draw(
    game.level.player[0].x,
    game.level.player[0].y,
    game.level.player[0].width,
    game.level.player[0].height,
    game.level.player[0].color
  );
};

// Syncs up the Player with the world state and potentially new player state on every new frame.
const UPDATE = () => {
  if (controller.active.up && game.level.player[0].jumping === false) {
    game.level.player[0].jump();
  }

  if (controller.active.left) {
    game.level.player[0].moveLeft();
  }

  if (controller.active.right) {
    game.level.player[0].moveRight();
  }

  game.world.update();
};

/* CLASS INSTANCES */

const game = new Game(levelData);
const display = new Display(document.querySelector('canvas'));
const controller = new Controller();
const engine = new Engine(RENDER, UPDATE);

/* INIT */

window.addEventListener('keydown', KEYLISTENER);
window.addEventListener('keyup', KEYLISTENER);

RESIZE();
window.addEventListener('resize', RESIZE);

/* START */
window.requestAnimationFrame(engine.loop);
