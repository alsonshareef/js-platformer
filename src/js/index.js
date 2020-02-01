/**
 * This file instantiates all logic classes, combines their logic within the Engine class
 * which will then run to start the game.
 */

import '../styles/index.css';

import Display from './display';
import Controller from './controller';
import Engine from './engine';
import Game from './game';

/* INSTANCES */

// Handles UI related logic
const display = new Display(document.querySelector('canvas'));

// Handles user-input logic
const controller = new Controller();

// Handles the game loop
const engine = new Engine();

// Handles all in-game functionality
const game = new Game();
console.log(game);

// Character properties
let CHARACTER = {
  height: 32,
  jumping: true,
  width: 32,
  x: 144, // center of the canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0
};

// Game Loop
let LOOP = function() {
  if (controller.up && CHARACTER.jumping == false) {
    CHARACTER.y_velocity -= 20;
    CHARACTER.jumping = true;
  }

  if (controller.left) {
    CHARACTER.x_velocity -= 0.5;
  }

  if (controller.right) {
    CHARACTER.x_velocity += 0.5;
  }

  // Pseudo physics
  CHARACTER.y_velocity += 1.5; // gravity
  CHARACTER.x += CHARACTER.x_velocity;
  CHARACTER.y += CHARACTER.y_velocity;
  CHARACTER.x_velocity *= 0.9; // friction
  CHARACTER.y_velocity *= 0.9; // friction

  // if character is falling below floor line
  if (CHARACTER.y > 180 - 16 - 32) {
    CHARACTER.jumping = false;
    CHARACTER.y = 180 - 16 - 32;
    CHARACTER.y_velocity = 0;
  }

  // if character is going off the left of the screen
  if (CHARACTER.x < -32) {
    CHARACTER.x = 320;
  } else if (CHARACTER.x > 320) {
    // if character goes past right boundary

    CHARACTER.x = -32;
  }

  // Context creation and dimensions
  display.ctx.canvas.height = 180;
  display.ctx.canvas.width = 320;

  display.ctx.fillStyle = '#202020';
  display.ctx.fillRect(0, 0, 320, 180); // x, y, width, height
  display.ctx.fillStyle = '#ff0000'; // hex for red
  display.ctx.beginPath();
  display.ctx.rect(CHARACTER.x, CHARACTER.y, CHARACTER.width, CHARACTER.height);
  display.ctx.fill();
  display.ctx.strokeStyle = '#202830';
  display.ctx.lineWidth = 4;
  display.ctx.beginPath();
  display.ctx.moveTo(0, 164);
  display.ctx.lineTo(320, 164);
  display.ctx.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(LOOP);
};

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(LOOP);
