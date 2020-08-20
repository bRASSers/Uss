import Ajax from "./ajax.js";
 
function Snake(scalar, columns, rows, ctx, canvas) {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scalar * 1;
    this.ySpeed = 0;
    this.score = 0;
    this.total = 0;
    this.kills = 0;
    this.tail = [];
 
//creates the snake
    this.draw = function() {
      ctx.fillStyle = "#05B016";
      for (let i=0; i<this.tail.length; i++) {
        ctx.fillRect(this.tail[i].x,
          this.tail[i].y, scalar, scalar);
      }
 
      ctx.fillRect(this.x, this.y, scalar, scalar);
    }
 
//sets what happens when snake dies (is reset)
    this.reset = function() {
      this.x = 0;
      this.y = 0;
      this.xSpeed = scalar * 1;
      this.ySpeed = 0;
      this.total = 0;
      this.tail = [];
    }
 
    this.update = function() {
      for (let i=0; i<this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i+1];
      }
 
      this.tail[this.total - 1] =
        { x: this.x, y: this.y };
 
      this.x += this.xSpeed;
      this.y += this.ySpeed;
 
//makes snake return to the other side of the map, if it exits on one side
      if (this.x >= canvas.width) {
        this.x = 0;
      }
 
      if (this.y >= canvas.height) {
        this.y = 0;
      }
 
      if (this.x <= -1) {
        this.x = canvas.width;
      }
 
      if (this.y <= -1) {
        this.y = canvas.height;
      }
    }
 
//gives certain keyboard keys movement functionality
    this.changeDirection = function(direction) {
      switch(direction) {
        case "Up":
          if (this.xSpeed == 0 && this.ySpeed == scalar * 1 && this.total > 0) {
            this.xSpeed = 0
            this.ySpeed = scalar * 1
          }
          else {
          this.xSpeed = 0;
          this.ySpeed = -scalar * 1;
          }
          break;
        case "Down":
          if (this.xSpeed == 0 && this.ySpeed == -scalar * 1 && this.total > 0) {
            this.xSpeed = 0
            this.ySpeed = -scalar * 1
          }
          else {
            this.xSpeed = 0;
            this.ySpeed = scalar * 1;
          }
          break;
        case "Left":
          if (this.xSpeed == scalar * 1 && this.ySpeed == 0 && this.total > 0) {
            this.xSpeed = scalar * 1
            this.ySpeed = 0
          }
          else {
          this.xSpeed = -scalar * 1;
          this.ySpeed = 0;
          }
          break;
        case "Right":
          if (this.xSpeed == -scalar * 1 && this.ySpeed == 0 && this.total > 0) {
            this.xSpeed = -scalar * 1
            this.ySpeed = 0
          }
          else {
          this.xSpeed = scalar * 1;
          this.ySpeed = 0;
          }
          break;
        case "w":
          if (this.xSpeed == 0 && this.ySpeed == scalar * 1 && this.total > 0) {
            this.xSpeed = 0
            this.ySpeed = scalar * 1
          }
          else {
          this.xSpeed = 0;
          this.ySpeed = -scalar * 1;
          }
          break;
        case "s":
          if (this.xSpeed == 0 && this.ySpeed == -scalar * 1 && this.total > 0) {
            this.xSpeed = 0
            this.ySpeed = -scalar * 1
          }
          else {
            this.xSpeed = 0;
            this.ySpeed = scalar * 1;
          }
          break;
        case "a":
          if (this.xSpeed == scalar * 1 && this.ySpeed == 0 && this.total > 0) {
            this.xSpeed = scalar * 1
            this.ySpeed = 0
          }
          else {
          this.xSpeed = -scalar * 1;
          this.ySpeed = 0;
          }
          break;
        case "d":
          if (this.xSpeed == -scalar * 1 && this.ySpeed == 0 && this.total > 0) {
            this.xSpeed = -scalar * 1
            this.ySpeed = 0
          }
          else {
          this.xSpeed = scalar * 1;
          this.ySpeed = 0;
          }
          break;
      }
    }
 
//checks if the snake hits the food and adds to the length, if true
    this.eat = function(food) {
      if (this.x === food.x &&
        this.y === food.y) {
        this.total++;
        return true;
      }
 
      return false;
    }
 
    function createHighscoreHtml(highscores) {
      const list = document.createElement('ul');
      for (let i = 0; i < highscores.length; i++) {
        const item = document.createElement('li');
        item.appendChild(document.createTextNode(highscores[i].highscore))
        list.appendChild(item);
      }
 
      return list;
    }
 
    function saveHighscore(totalEaten) {
      document.getElementById("highscores").innerHTML = "";
      const data = { highscore: totalEaten };
    
      fetch("/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(() => {
          fetch("/scores")
            .then((response) => response.json())
            .then((data) => {
              document.getElementById('highscores').appendChild(createHighscoreHtml(data.reverse()));
            });
        });
      highScoreSaved = true;
    }
 
//checks if the snake hits its own tail, and removes it, if true
    this.checkCollision = function() {
      for (var i=0; i<this.tail.length; i++) {
        if (this.x === this.tail[i].x &&
          this.y === this.tail[i].y) {
          this.score = this.total;
          saveHighscore(this.total)
          this.total = 0;
          this.tail = [];
          this.kills++;
          gameRunning = false;
        }
      }
    }
  }
 
  export default Snake;