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
  this.pulseStateOffset = Math.random() * 100;

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
    lex.context.lineWidth = 2;
    lex.context.beginPath();
    lex.context.moveTo(this.x, this.y);
    lex.context.lineTo(this.energySource.x, this.energySource.y);
    lex.context.strokeStyle = "rgba(75,75,255," + this.linkAlpha(75) + ")";
    lex.context.stroke();
    lex.context.lineWidth = 1;
  }
  if (this.target && this.active) {
    lex.context.lineWidth = 2;
    lex.context.beginPath();
    lex.context.moveTo(this.x, this.y);
    lex.context.lineTo(this.target.x, this.target.y);
    lex.context.strokeStyle = "rgba(255,255,255," + this.linkAlpha(100) + ")";
    lex.context.stroke();
    lex.context.lineWidth = 1;
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

Solar.instance.prototype.linkAlpha = function(speed) {
  var pulseState = (lex.pulseState + this.pulseStateOffset) % speed;
  
  var alpha = (pulseState / speed);
  if (alpha > 0.5) {
    alpha = 1-alpha;
  }
  
  var normalisedAlpha = (0.75 + alpha) / 1.75;
  return normalisedAlpha;
}