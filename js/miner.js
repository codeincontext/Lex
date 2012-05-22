// Constants
Miner = {
  RADIUS: 8,
  COLOR: "F00",
  COST: 80,
  RADIUS: 8,
  SELECTED_COLOR: "800",
  START_HEALTH: 100,
  RECYCLE: 40,
  RANGE: 50,
  ENERGY_USAGE: 0.05,
  CHARGE_NEEDED: 10
}

// Constructor for each instance
Miner.instance = function(x, y) {
  this.type = Miner;
  this.x = x;
  this.y = y;

  this.health = Miner.START_HEALTH;
  this.charge = 0;

  this.mining = false;
  this.target = null;
}

// Methods for each instance
Miner.instance.prototype.tick = function() {
  var a = energy - Miner.ENERGY_USAGE;
  minerals += 0.01;

  if (a < 0){
    energy = 0;
  }
  else {
    energy = a;
  }
};

Miner.instance.prototype.drawOnContext = Solar.instance.prototype.drawOnContext