Rock = {
  COLOR: "rgba(0,230,0,1)",
  INACTIVE_COLOR: "rgba(0,230,0,0.5)"
}

// Constructor for each instance
Rock.instance = function(x, y, minerals) {
  this.type = Rock;
  this.x = x;
  this.y = y;
  this.radius = 5 + (minerals / 100);
  this.minerals = minerals;
}

Rock.instance.prototype.drawOnContext = function() {
  lex.context.beginPath();
  if (this.exhausted()) {
    lex.context.fillStyle = Rock.INACTIVE_COLOR;
  } else {
    lex.context.fillStyle = Rock.COLOR;
  }
  lex.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  lex.context.closePath();
  lex.context.fill();
}

Rock.instance.prototype.exhausted = function() {
  return this.minerals <= 0;
}