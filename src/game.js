import { WIDTH, HEIGHT, PI } from './config';
// console.log(WIDTH, HEIGHT, PI);

var UPARROW    = false;
var DOWNARROW  = false;
var RIGHTARROW = false;
var LEFTARROW  = false;

/**
 * Game elements
 */
var canvas;
var ctx;
var keystate;
var gameRunning = true;
/**
 * The Player1 paddle
 *
 * @type {Object}
 */
var Player1 = {
  x: 10,
  y: 10,
  width: 20,
  height: 100,
  vel: {
    x: 0,
    y: 0
  },
  /**
   * Update the position depending on pressed keys
   */
  update: function() {
    if (UPARROW) this.vel.y = -7;
    else if (DOWNARROW) this.vel.y = 7;
    else
      this.vel.y = 0;

    if (RIGHTARROW) this.vel.x = 7;
    else if (LEFTARROW) this.vel.x = -7;
    else
      this.vel.x = 0;
    // keep the paddle inside of the canvas
    this.y = Math.max(Math.min(this.y + this.vel.y, HEIGHT - this.height), 0);
    this.x = Math.max(Math.min(this.x + this.vel.x, WIDTH/2 - this.width), 0);
  },
  draw: function() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

var ball = {
  x: Player1.x + Player1.width + 10,
  y: Player1.y + Player1.height / 2,
  vel: null,
  side: 20,
  speed: 5,
  /**
   * Serves the ball towards the specified side
   *
   * @param  {number} side 1 right
   *                       -1 left
   */
  init: function() {
    var r = Math.random() - 0.5;
    var angle = PI * r;
    this.vel = {
      x: this.speed * Math.cos(angle),
      y: this.speed * Math.sin(angle)
    }
  },
  /**
   * Update the ball position and keep it within the canvas
   */
  update: function() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    if (this.y < 0 || this.y > HEIGHT - this.side) {
      this.vel.y *= -1;
    }
    if (this.x + this.side >= WIDTH) {
      this.vel.x *= -1;
    }

    if (this.x < Player1.x + Player1.width) {
      if (this.y < Player1.y + Player1.height &&
        this.y > Player1.y) {
        //in here, it bounced against the Player1
        this.vel.x *= -1;
        this.vel.x += Player1.vel.x;
        this.vel.y += Player1.vel.y;
      }
    }

    // if (this.x < 0 && this.vel.x < 0) {
    //   gameRunning = false;
    // }

  },
  /**
   * Draw the ball to the canvas
   */
  draw: function() {
    ctx.fillRect(this.x, this.y, this.side, this.side);
  }
};
/**
 * Starts the game
 */
function main() {
  var game = document.createElement("div");
  game.classList.add('game');

  canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  ctx = canvas.getContext("2d");

  game.appendChild(canvas);
  document.body.appendChild(game);

  document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 38) UPARROW = true;
    else if (evt.keyCode === 40) DOWNARROW = true;
    if (evt.keyCode === 39) RIGHTARROW = true;
    else if (evt.keyCode === 37) LEFTARROW = true;
  });

  document.addEventListener("keyup", function(evt) {
    if (evt.keyCode === 38) UPARROW = false;
    else if (evt.keyCode === 40) DOWNARROW = false;
    if (evt.keyCode === 39) RIGHTARROW = false;
    else if (evt.keyCode === 37) LEFTARROW = false;
  });
  ball.init();

  var loop = function() {
    update();
    draw();
    window.requestAnimationFrame(loop, canvas);
  };
  window.requestAnimationFrame(loop, canvas);
}
/**
 * Update all game objects
 */
function update() {
  if (gameRunning) {
    ball.update();
    Player1.update();
  }
}
/**
 * Clear canvas and draw all game objects and net
 */
function draw() {
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.save();
  ctx.fillStyle = "#fff";
  ball.draw();
  Player1.draw();


  //ai.draw();
  // draw the net
  var w = 4;
  var x = (WIDTH - w) * 0.5;
  var y = 0;
  var step = HEIGHT / 20; // how many net segments
  while (y < HEIGHT) {
    ctx.fillRect(x, y + step * 0.25, w, step * 0.5);
    y += step;
  }
  ctx.restore();
}

export default main;
