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
      width: this.level.width,
      height: this.level.height,
      background_color: '#73deff',
      gravity: 1.2,
      friction: 0.9,

      handleCollision: player => {
        // if character is falling below floor line
        if (player.position.y > this.world.height - player.height) {
          player.jumping = false;
          player.position.y = this.world.height - player.height;
          player.y_velocity = 0;
        }

        // if character is going off the left of the screen
        if (player.position.x < 0) {
          player.position.x = 0;
        }

        // if character is going off the right of the screen
        if (player.position.x + player.width > this.world.width) {
          player.position.x = this.world.width - player.width;
        }
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
    /**
     * this.scale controls how much the level dimensions are increased by for the purpose of ensuring
     * the game is drawn to the canvas at a viewable size.
     */
    this.scale = 50;
    this.levelData = levelData.test;
    this.height = this.levelData.length * this.scale;
    this.width = this.levelData[0].length * this.scale;
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
        // Filter out stationary elements by returning an object storing their type and x,y positions.
        let elementClass = this.elementTypes[element];
        if (typeof elementClass === 'string') {
          return { type: elementClass, x: x * this.scale, y: y * this.scale };
        }
        // Remaining moving elements are instantiated and pushed into moving elements array.
        this.movingElements.push(
          new elementClass(new Element(x * this.scale, y * this.scale), element)
        );
        return 'empty';
      });
    });
    this.player = this.movingElements.filter(element => {
      return element.type === 'player';
    });
  }
}

/**
 *  **** DYNAMIC ELEMENT CLASSES ****
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
    this.color = 'violet';
    this.height = 32;
    this.width = 32;
    this.jumping = false;
    this.jumpHeight = -30;
    this.x_velocity = 0;
    this.y_velocity = 0;
  }

  moveLeft = () => {
    this.x_velocity -= 0.8;
  };

  moveRight = () => {
    this.x_velocity += 0.8;
  };

  jump = () => {
    this.jumping = true;
    this.y_velocity = this.jumpHeight;
  };

  update = () => {
    this.position.x += this.x_velocity;
    this.position.y += this.y_velocity;
  };
}

class Coin {
  constructor(position) {
    this.type = 'coin';
    this.color = 'yellow';
    this.position = position;
    this.height = 25;
    this.width = 25;
  }
}

class Lava {
  constructor(position, lavaType) {
    this.type = 'lava';
    this.position = position;
    this.lavaType = lavaType;
    this.height = 30;
    this.width = 30;
  }
}
