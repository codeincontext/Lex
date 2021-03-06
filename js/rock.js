Rock = {
  COLOR: "rgba(0,230,0,1)",
  INACTIVE_COLOR: "rgba(0,230,0,0.5)",
  DESCRIPTION: "Rocks contain minerals that can be mined by Miner structures. Rocks only contain a limited supply of minerals."
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
  lex.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  
// Border
  if (lex.selectedBuilding == this) {
    lex.context.strokeStyle = "#FFF";
    lex.context.lineWidth = 2;
    lex.context.stroke();
    lex.context.closePath();
    lex.context.lineWidth = 1;
  }
    
  if (this.exhausted()) {
    lex.context.fillStyle = Rock.INACTIVE_COLOR;
  } else {
    lex.context.fillStyle = Rock.COLOR;
  }

  lex.context.closePath();
  lex.context.fill();

}

Rock.instance.prototype.exhausted = function() {
  return this.minerals <= 0;
}