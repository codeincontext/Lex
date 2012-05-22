// Constants
Solar = {
  START_HEALTH: 100,
  RADIUS: 10,
  COLOR: "FF0",
  RECYCLE: 50,
  RANGE: 50,
  ENERGY_PRODUCED: 0.5,
  STORAGE: 25,
  COST: 200,
  RADIUS: 10,
  SELECTED_COLOR: "880"
}

// Constructor for each instance
Solar.instance = function(x, y) {
  this.type = Solar;
  this.x = x;
  this.y = y;

  this.health = Solar.START_HEALTH;
  lex.maxEnergy += Solar.STORAGE;
}

// Methods for each instance
Solar.instance.prototype.tick = function() {
  var a = lex.energy + this.ENERGY_PRODUCED;
  if (a > lex.maxEnergy) {
    lex.energy = lex.maxEnergy;
  }
  else {
    lex.energy = a;
  }
};

Solar.instance.prototype.drawOnContext = function(context, baseStation) {
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(baseStation.x, baseStation.y);
  context.strokeStyle = "#00F";
  context.stroke();
  context.beginPath();
  context.fillStyle=this.type.COLOR;
  context.arc(this.x,this.y,this.type.RADIUS,0,Math.PI*2,true);
  context.strokeStyle = "#000";
  context.stroke();
  context.closePath();
  context.fill();
}