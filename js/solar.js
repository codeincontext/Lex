function Solar(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.color="FF0";
  this.health = 100;
  this.startHealth = 100;
  this.recycle = 50;
  this.range = 50;
  this.energyProduced = 0.5;
  this.storage = 25;
  maxEnergy += this.storage;
  this.tick = solarTick;
}

var solarCost = 200;
var solarRadius = 10;
var solarSelectedColor = "880";

function solarTick() {
  var a = energy + this.energyProduced;
  if (a > maxEnergy){
    energy = maxEnergy;
  }
  else {
    energy = a;
  }
}