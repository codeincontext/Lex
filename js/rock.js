Rock = {
  COLOR: "0F0"
}

// Constructor for each instance
Rock.instance = function(x, y, minerals) {
  this.type = Rock;
  this.x = x;
  this.y = y;
  this.radius = 5+(minerals/50);
  this.minerals = minerals;
}

Rock.instance.prototype.drawOnContext = function(context) {
  context.beginPath();
  context.fillStyle=Rock.COLOR;
  context.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
  context.closePath();
  context.fill();
}