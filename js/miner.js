// Constants
Miner = {
  RADIUS: 8,
  COLOR: "rgba(230,0,0,1)",
  COST: 80,
  RADIUS: 8,
/*   SELECTED_COLOR: "800", */
  INACTIVE_COLOR: "rgba(230,0,0,0.5)",
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
  this.pulseStateOffset = Math.random() * 100;

  
  this.energySource = this.nearestEnergySource();
}

// Methods for each instance
Miner.instance.prototype.tick = function() {
  if (!this.target || this.target.exhausted) {
    this.target = this.nearestRock();
  }

  if (this.target && this.energySource && lex.energy >= Miner.ENERGY_USAGE) {
    lex.minerals += 0.01;
    this.target.minerals -= 0.01;
    lex.energy -= Miner.ENERGY_USAGE;
    this.active = true;
  } else {
    this.active = false;
  }
};

Miner.instance.prototype.nearestEnergySource = function() {
  var closestSource = lex.baseStation;
  var smallestDist = Solar.RANGE;
  
  var that = this;
  $.each(lex.buildings, function(_, building){
    if (!building.type.IS_ENERGY_SOURCE) return true;
    
    var dist = distObj(that, building);
    if (dist < smallestDist) {
      closestSource = building;
      smallestDist = dist;
    }
  });
  
  return closestSource;
}

Miner.instance.prototype.nearestRock = function() {
  var closestRock;
  var smallestDist = Miner.RANGE;
  
  var that = this;
  $.each(lex.rocks, function(_, rock){
    if (rock.exhausted()) return true;
    var dist = distObj(that, rock);

    if (dist < smallestDist) {
      closestRock = rock;
      smallestDist = dist;
    }
  });
  
  return closestRock;
}

Miner.instance.prototype.drawOnContext = Solar.instance.prototype.drawOnContext
Miner.instance.prototype.linkAlpha = Solar.instance.prototype.linkAlpha