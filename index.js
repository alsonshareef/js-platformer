var CONTEXT, CONTROLLER, CHARACTER, LOOP;

// Context creation and dimensions
CONTEXT = document.querySelector('canvas').getContext('2d');
CONTEXT.canvas.height = 180;
CONTEXT.canvas.width = 320;

// Character properties
CHARACTER = {
  height: 32,
  jumping: true,
  width: 32,
  x: 144, // center of the canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0
};

// Handler for character state
CONTROLLER = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    var key_state = event.type == 'keydown' ? true : false;

    switch (event.keyCode) {
      case 37: // left key
        CONTROLLER.left = key_state;
        break;
      case 38: // up key
        CONTROLLER.up = key_state;
        break;
      case 39: // right key
        CONTROLLER.right = key_state;
        break;
    }
  }
};

// Game Loop
LOOP = function() {
  if (CONTROLLER.up && CHARACTER.jumping == false) {
    CHARACTER.y_velocity -= 20;
    CHARACTER.jumping = true;
  }

  if (CONTROLLER.left) {
    CHARACTER.x_velocity -= 0.5;
  }

  if (CONTROLLER.right) {
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

  CONTEXT.fillStyle = '#202020';
  CONTEXT.fillRect(0, 0, 320, 180); // x, y, width, height
  CONTEXT.fillStyle = '#ff0000'; // hex for red
  CONTEXT.beginPath();
  CONTEXT.rect(CHARACTER.x, CHARACTER.y, CHARACTER.width, CHARACTER.height);
  CONTEXT.fill();
  CONTEXT.strokeStyle = '#202830';
  CONTEXT.lineWidth = 4;
  CONTEXT.beginPath();
  CONTEXT.moveTo(0, 164);
  CONTEXT.lineTo(320, 164);
  CONTEXT.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(LOOP);
};

window.addEventListener('keydown', CONTROLLER.keyListener);
window.addEventListener('keyup', CONTROLLER.keyListener);
window.requestAnimationFrame(LOOP);
