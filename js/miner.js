// Constants
Miner = {
  RADIUS: 8,
  COLOR: "F00",
  COST: 80,
  RADIUS: 8,
  SELECTED_COLOR: "800",
  INACTIVE_COLOR: "999",
  START_HEALTH: 100,
  RECYCLE: 40,
  RANGE: 50,
  ENERGY_USAGE: 0.05
}

// Constructor for each instance
Miner.instance = function(x, y) {
  this.type = Miner;
  this.x = x;
  this.y = y;

  this.health = Miner.START_HEALTH;
  this.charge = 0;

  this.target = null;
  this.active = null;
  
  this.energySource = this.nearestSolar();
}

// Methods for each instance
Miner.instance.prototype.tick = function() {
  if (lex.energy >= Miner.ENERGY_USAGE) {
    lex.minerals += 0.01;
    lex.energy -= Miner.ENERGY_USAGE;
    this.active = true;
  } else {
    this.active = false;
  }
  
  if (!this.target || this.target.exhausted) {
    this.target = this.nearestRock();
  }
};

Miner.instance.prototype.nearestSolar = function() {
  var closestSolar = lex.baseStation;
  var smallestDist = Infinity;
  
  var that = this;
  $.each(lex.buildings, function(){
    var building = this;
    if (building.type != Solar) return true;
    
    var dist = distObj(that, building);
    if (dist < smallestDist) {
      closestSolar = building;
      smallestDist = dist;
    }
  });
  
  return closestSolar;
}

Miner.instance.prototype.nearestRock = function() {
  var closestRock;
  var smallestDist = Infinity;
  
  var that = this;
  $.each(lex.rocks, function(){
    var rock = this;
    
    var dist = distObj(that, rock);
    if (dist < smallestDist) {
      closestRock = rock;
      smallestDist = dist;
    }
  });
  
  return closestRock;
}

Miner.instance.prototype.drawOnContext = Solar.instance.prototype.drawOnContext