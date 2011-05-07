function Rock(x, y, minerals) {
  this.x = x;
  this.y = y;
  this.radius = 5+(minerals/50);
  this.color="0F0";
  this.minerals = minerals;
}