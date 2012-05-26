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
  ENERGY_USAGE: 0.5
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
  this.active = null;
  
  this.energySource = nearestSolar();
  if (!this.energySource) debugger;
/*   this.energySource = baseStation; */
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
    this.target = nearestRock();
  }
};

function nearestSolar() {
  var closestSolar = lex.baseStation;
  var smallestDist = Infinity;
  
  $.each(lex.buildings, function(){
    var building = this;
    if (building.type != Solar) return true;
    
    var dist = distObj(this, building);
    if (dist < smallestDist) {
      closestSolar = building;
      smallestDist = dist;
    }
  });
  
  return closestSolar;
}

function nearestRock() {
  var closestRock;
  var smallestDist = Infinity;
  
  $.each(lex.rocks, function(){
    var rock = this;
    
    var dist = distObj(this, rock);
    if (dist < smallestDist) {
      closestSolar = rock;
      smallestDist = dist;
    }
  });
  
  return closestRock;
}

Miner.instance.prototype.drawOnContext = Solar.instance.prototype.drawOnContext