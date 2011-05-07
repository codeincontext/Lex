function Miner(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 8;
  this.color="F00";
  this.health = 100;
  this.startHealth = 100;
  this.recycle = 40;
  this.range = 50;
  this.energyUsage = 0.05;
  this.charge = 0;
  this.chargeNeeded = 10;
  this.mining = false;
  this.target = null;
  this.tick = minerTick;
}

var minerCost = 80;
var minerRadius = 8;
var minerSelectedColor = "800";

function minerTick() {
  var a = energy - this.energyUsage;
  minerals += 0.01;
  
  if (a < 0){
    energy = 0;
  }
  else {
    energy = a;
  }
}