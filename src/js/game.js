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
        /**
         * WORLD COLLISION
         */

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

        /**
         * LEVEL COLLISION
         */

        //  Wall Collision
        this.level.wallElements.forEach(row => {
          return row.forEach(el => {
            if (el !== undefined) {
              let direction = this.level.collisionCheck(player, el);

              // Player collides from left or right
              if (direction === 'left' || direction === 'right') {
                player.x_velocity = 0;
                player.jumping = false;
              } else if (direction === 'bottom') {
                // Player's bottom collides
                player.y_velocity = 0;
                player.jumping = false;
              } else if (direction === 'top') {
                // Player's top collides
                player.y_velocity *= -1;
              }
            }
          });
        });

        // Lava Collision
        this.level.lavaElements.forEach(row => {
          return row.forEach(el => {
            if (el !== undefined) {
              let direction = this.level.collisionCheck(player, el);

              if (
                direction === 'left' ||
                direction === 'right' ||
                direction === 'top' ||
                direction === 'bottom'
              ) {
                player.x = 200;
                player.y = 218;
                player.x_velocity = 0;
                player.y_velocity = 0;
              }
            }
          });
        });
      },

      update: () => {
        let player = this.level.player[0];

        player.y_velocity += this.world.gravity; // gravity
        player.x_velocity *= this.world.friction; // friction
        player.y_velocity *= this.world.friction;

        this.world.handleCollision(player);

        player.update();
      }
    };
  }
}

class Level {
  constructor(levelData) {
    /**
     * this.scale controls how much the level dimensions and element position coordinates are increased by for the purpose of ensuring
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
          return {
            type: elementClass,
            x: x * this.scale,
            y: y * this.scale,
            width: this.scale,
            height: this.scale
          };
        }
        // Remaining moving elements are instantiated and pushed into moving elements array.
        this.movingElements.push(
          new elementClass(x * this.scale, y * this.scale, element)
        );
        return 'empty';
      });
    });

    this.wallElements = this.levelData.map((row, y) => {
      return row.map((el, x) => {
        if (this.elementTypes[el] === 'wall') {
          return {
            type: this.elementTypes[el],
            x: x * this.scale,
            y: y * this.scale,
            width: this.scale,
            height: this.scale
          };
        }
      });
    });

    this.lavaElements = this.levelData.map((row, y) => {
      return row.map((el, x) => {
        if (this.elementTypes[el] === 'lava') {
          return {
            type: this.elementTypes[el],
            x: x * this.scale,
            y: y * this.scale,
            width: this.scale,
            height: this.scale
          };
        }
      });
    });

    this.player = this.movingElements.filter(element => {
      return element.type === 'player';
    });
  }

  collisionCheck = (el1, el2) => {
    let vX = el1.x + el1.width / 2 - (el2.x + el2.width / 2),
      vY = el1.y + el1.height / 2 - (el2.y + el2.height / 2),
      halfWidths = el1.width / 2 + el2.width / 2,
      halfHeights = el1.height / 2 + el2.height / 2,
      direction = null;

    if (Math.abs(vX) < halfWidths && Math.abs(vY) < halfHeights) {
      let oX = halfWidths - Math.abs(vX),
        oY = halfHeights - Math.abs(vY);
      if (oX >= oY) {
        if (vY > 0) {
          direction = 'top';
          el1.y += oY;
        } else {
          direction = 'bottom';
          el1.y -= oY;
        }
      } else {
        if (vX > 0) {
          direction = 'left';
          el1.x += oX;
        } else {
          direction = 'right';
          el1.x -= oX;
        }
      }
    }
    return direction;
  };
}

/**
 *  **** DYNAMIC ELEMENT CLASSES ****
 */

class Player {
  constructor(x, y) {
    this.type = 'player';
    this.x = x;
    this.y = y;
    this.color = 'violet';
    this.height = 32;
    this.width = 32;
    this.jumping = false;
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
    this.y_velocity = -30;
  };

  update = () => {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  };
}

class Coin {
  constructor(x, y) {
    this.type = 'coin';
    this.color = 'yellow';
    this.x = x;
    this.y = y;
    this.height = 25;
    this.width = 25;
  }
}

class Lava {
  constructor(x, y, lavaType) {
    this.type = 'lava';
    this.x = x;
    this.y = y;
    this.lavaType = lavaType;
    this.height = 30;
    this.width = 30;
  }
}
