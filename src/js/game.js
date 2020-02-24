/**
 * This file stores the Game class which is responsible for storing data and methods related
 * to world of the game and it's state. Within the Game class is an instance of the Level class
 * which is given the level data passed in from the JSON file. The Level class will then build
 * the level out as an array of arrays of elements of the game as well as store other data about
 * the level such as height and width of the grid. The built out level array will store instances
 * of dynamic elements such as the Player, Coins and Lava and these instances store extra
 * functionality for updating their state based on user input.
 */

export default class Game {
  constructor(levelData) {
    this.level = new Level(levelData);
    this.world = {
      height: 180,
      width: 320,
      background_color: '#202020',
      gravity: 1.5,
      friction: 0.9,

      handleCollision: player => {
        // if character is falling below floor line
        if (player.y > this.world.height - player.height) {
          player.jumping = false;
          player.y = this.world.height - player.height;
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

      update: () => {
        this.level.player[0].y_velocity += this.world.gravity; // gravity
        this.level.player[0].x_velocity *= this.world.friction; // friction
        this.level.player[0].y_velocity *= this.world.friction; // friction
        this.level.player[0].update();
        this.world.handleCollision(this.level.player[0]);
      }
    };
  }
}

class Level {
  constructor(levelData) {
    this.levelData = levelData.test;
    this.height = this.levelData.length;
    this.width = this.levelData[0].length;
    this.elementTypes = {
      '@': Player,
      '=': Lava,
      '0': Coin,
      '#': 'wall',
      '+': 'lava',
      '.': 'empty'
    };
    this.movingElements = [];
    this.stationaryElements = this.levelData.map((row, y) => {
      return row.map((element, x) => {
        // Filter out stationary elements
        let elementClass = this.elementTypes[element];
        if (typeof elementClass === 'string') {
          return elementClass;
        }
        // Remaining moving elements are instantiated and pushed into moving elements array.
        this.movingElements.push(new elementClass(new Element(x, y), element));
        return 'empty';
      });
    });
    this.player = this.movingElements.filter(element => {
      return element.type === 'player';
    });
  }
}

/**
 * DYNAMIC ELEMENT CLASSES
 */

class Element {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player {
  constructor(position) {
    this.type = 'player';
    this.position = position;
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

class Coin {
  constructor(position) {
    this.type = 'coin';
    this.position = position;
  }
}

class Lava {
  constructor(position, element) {
    this.type = 'lava';
    this.position = position;
    this.element = element;
  }
}
