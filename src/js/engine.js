/**
 * This file is responsible for storing logic related to running the game / game loop.
 */

export default class Engine {
  constructor(render, update) {
    this.render = render;
    this.update = update;
    this.lastRender = 0;
    this.FPS = 100;
  }

  loop = timestamp => {
    // Delta keeps track of time passed since last frame render.
    let delta = timestamp - this.lastRender;
    this.lastRender = timestamp;

    // Influencing state changes with delta will create a consistent game experience regardless of FPS.
    this.render();
    this.update(delta);
    window.requestAnimationFrame(this.loop);
  };
}
