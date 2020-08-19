function Food() {
    this.x;
    this.y;

// creates a random location for the food to appear at
    this.pickLocation = function() {
      this.x = (Math.floor(Math.random() *
        columns - 1) + 1) * scalar;
      this.y = (Math.floor(Math.random() *
        rows - 1) + 1) * scalar;
    };

// draws the food onto the canvas
    this.draw = function() {
      ctx.fillStyle = "#E65637";
      ctx.fillRect(this.x, this.y, scalar, scalar)
    };
  }