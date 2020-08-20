import Snake from "./snake.js";
import Food from "./food.js";
 
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scalar = 20;
const rows = canvas.height / scalar;
const columns = canvas.width / scalar;
var snake;
var food;
var interval;
 
//sets different difficulty levels by changing
//refresh rate, making the snake faster
function startEasyDifficulty() {
  setRefreshRate(250);
  startGame();
}
 
function startMedDifficulty() {
  setRefreshRate(150);
  startGame();
}
 
function startHardDifficulty() {
  setRefreshRate(75);
  startGame();
}
 
function startGame() {
  gameRunning = true;
  highScoreSaved = false;
  snake.reset();
}
 
function setRefreshRate(refreshRate) {
  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }
 
  //creates a 'pause screen' with press any... message when snake dies
  interval = window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!gameRunning) {
      var textString = "Press any movement key\nto play";
      ctx.font = "25px sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "black";
      const textWidth = ctx.measureText(textString).width;
      ctx.fillText(
        textString,
        canvas.width / 2 - textWidth / 2,
        canvas.height / 2 - 10
      );
      if (!highScoreSaved) {
        saveHighscore(snake.score);
      }
      return;
    }
    food.draw();
    snake.update();
    snake.draw();
 
    if (snake.eat(food)) {
      food.pickLocation();
    }
 
    snake.checkCollision();
 
    document.querySelector(".food-eaten").innerText = snake.total;
 
    document.querySelector(".snakes-killed").innerText = snake.kills;
  }, refreshRate);
}
 
(function setup() {
  snake = new Snake(scalar, columns, rows, ctx, canvas);
  food = new Food(scalar, columns, rows, ctx, canvas);
  food.pickLocation();
  startEasyDifficulty();
})();
 
window.addEventListener("keydown", (evt) => {
  if (!gameRunning) {
    startGame();
  } else {
    const direction = evt.key.replace("Arrow", "");
    snake.changeDirection(direction);
  }
});
 
document.getElementById("ez_btn").onclick = startEasyDifficulty;
document.getElementById("med_btn").onclick = startMedDifficulty;
document.getElementById("hard_btn").onclick = startHardDifficulty;