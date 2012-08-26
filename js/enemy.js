Enemy = {
  HEALTH: 100,
  SPEED: 0.25,
  HIT_STRENGTH: 0.2,
  COLOR: "#F06",
  RANGE: 50,
  RADIUS: 5
}

// Constructor for each instance
Enemy.instance = function(x, y) {
  this.type = Enemy;
  this.x = x;
  this.y = y;
  this.health = Enemy.HEALTH;
  this.target = null;
}

// Methods for each instance
Enemy.instance.prototype.tick = function() {
  this.target = this.nearestStructure();
  
	if (this.target) {
    if (this.targetInRange()) {
      this.shooting = true;
      this.shootTarget();
    } else {
      this.shooting = false;
      this.moveToTarget();
    }
  } else {
    this.shooting = false;
  }
}

Enemy.instance.prototype.drawOnContext = function() {
  lex.context.beginPath();
  lex.context.arc(this.x, this.y, Enemy.RADIUS, 0, Math.PI * 2, true);
  
// Border
  if (lex.selectedBuilding == this) {
    lex.context.strokeStyle = "#FFF";
    lex.context.lineWidth = 2;
    lex.context.stroke();
    lex.context.closePath();
    lex.context.lineWidth = 1;
  }
    

  lex.context.fillStyle = Enemy.COLOR;

  lex.context.closePath();
  lex.context.fill();
  
  // Link with target
  if (this.target && this.targetInRange()) {
    lex.context.lineWidth = 2;
    lex.context.beginPath();
    lex.context.moveTo(this.x, this.y);
    lex.context.lineTo(this.target.x, this.target.y);
    lex.context.strokeStyle = "rgba(255,255,255," + Solar.instance.prototype.linkAlpha(100) + ")";
    lex.context.stroke();
    lex.context.lineWidth = 1;
  }
}

Enemy.instance.prototype.nearestStructure = function() {
  var closestStructure;
  var smallestDist = Infinity;
  
  var that = this;
  $.each(lex.buildings, function(_, building){
    var dist = distObj(that, building);

    if (dist < smallestDist) {
      closestStructure = building;
      smallestDist = dist;
    }
  });
  
  return closestStructure;
}

Enemy.instance.prototype.targetInRange = function() {
  return distObj(this, this.target) <= Enemy.RANGE;
}

Enemy.instance.prototype.shootTarget = function() {
  this.target.takeHit(Enemy.HIT_STRENGTH);
}

Enemy.instance.prototype.moveToTarget = function() {
// Distance to the target
  var dx = this.target.x - this.x;
  var dy = this.target.y - this.y;
  var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  
// Bearing
  if (dy < 0)
    angle = (Math.PI * 2) - (Math.acos(dx/dist));
  else
    angle = Math.acos(dx/dist);

// x and y components
	this.x += Enemy.SPEED * Math.cos(angle);
	this.y += Enemy.SPEED * Math.sin(angle);
}