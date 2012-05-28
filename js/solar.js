// Constants
Solar = {
  START_HEALTH: 100,
  RADIUS: 10,
  COLOR: "rgba(230,230,0,1)",
  RECYCLE: 50,
  RANGE: 100,
  ENERGY_PRODUCED: 0.3,
  STORAGE: 25,
  COST: 200,
  RADIUS: 10,
/*   SELECTED_COLOR: "880", */
  INACTIVE_COLOR: "rgba(230,230,0,0.5)"
}

// Constructor for each instance
Solar.instance = function(x, y) {
  this.type = Solar;
  this.x = x;
  this.y = y;
  
  this.active = true;

  this.health = Solar.START_HEALTH;
  lex.maxEnergy += Solar.STORAGE;
}

// Methods for each instance
Solar.instance.prototype.tick = function() {
  var newEnergy = lex.energy + Solar.ENERGY_PRODUCED;
  lex.energy = Math.min(newEnergy, lex.maxEnergy);
};

Solar.instance.prototype.drawOnContext = function() {
  if (this.energySource) {
    lex.context.beginPath();
    lex.context.moveTo(this.x, this.y);
    lex.context.lineTo(this.energySource.x, this.energySource.y);
    lex.context.strokeStyle = "rgba(0,0,230,1)";
    lex.context.stroke();
  }
  if (this.target && this.active) {
    lex.context.beginPath();
    lex.context.moveTo(this.x, this.y);
    lex.context.lineTo(this.target.x, this.target.y);
    lex.context.strokeStyle = "#AFA";
    lex.context.stroke();
  }
  
  lex.context.beginPath();
  if (this.active) {
    lex.context.fillStyle = this.type.COLOR;
  } else {
    lex.context.fillStyle = this.type.INACTIVE_COLOR;
  }
  
  lex.context.arc(this.x, this.y, this.type.RADIUS, 0, Math.PI * 2, true);
  lex.context.strokeStyle = "#000";
  lex.context.stroke();
  lex.context.closePath();
  lex.context.fill();
}