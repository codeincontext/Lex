var context;
var mx;
var my;
var width = 500;
var height = 500;
var offset = $('canvas').offset();
var maxEnergy = 50;
var energy = 50;
var minerals = 400;
var time = 0;
var linkRange = 150;
var action = true;

var selectedStructureType;
var selectedStructureCost;
var selectedStructureClass;
var selectedStructureColor;

var baseStation;
var buildings = new Array();
var rocks = new Array();

function init(){
  context = myCanvas.getContext('2d');
  baseStation = new Solar(250, 250);
  for (i=0;i<=15;i++){
    var x = 100 + Math.floor(Math.random()*301);
    var y = 100 + Math.floor(Math.random()*301);
    var randomMinerals = 20 + Math.floor(Math.random()*101);

    rocks.push(new Rock(x, y, randomMinerals));
  }
  setSelectedStructure('Miner')
  setInterval(tick,20);
}
function tick(){
  draw();
  $('.energy').text(energy);
  $('.minerals').text(minerals);
  $.each(buildings, function(index, building) {
     building.tick();
  });
}
function draw(){
  context.fillStyle="555"
  context.fillRect(0,0, width,height);

  $.each(buildings, function(){
    var building = this;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(baseStation.x, baseStation.y);
    context.strokeStyle = "#00F";
    context.stroke();
    context.beginPath();
    context.fillStyle=building.color;
    context.arc(building.x,building.y,building.radius,0,Math.PI*2,true);
    context.strokeStyle = "#000";
    context.stroke();
    context.closePath();
    context.fill();
  });
  
  context.beginPath();
  context.fillStyle=baseStation.color;
  context.arc(baseStation.x,baseStation.y,baseStation.radius,0,Math.PI*2,true);
  context.strokeStyle = "#000";
  context.stroke();
  context.closePath();
  context.fill();
  
  $.each(rocks, function(){
    rock = this;
    context.beginPath();
    context.fillStyle=rock.color;
    context.arc(rock.x,rock.y,rock.radius,0,Math.PI*2,true);
    context.closePath();
    context.fill();
  });

  context.beginPath();
  context.fillStyle=selectedStructureColor;
  context.arc(mx,my,selectedStructureRadius,0,Math.PI*2,true);
  context.closePath();
  context.fill();
}
function dist(x, y, X, Y){
  x_diff = Math.pow( (x-X), 2 );
  y_diff = Math.pow( (y-Y), 2 );
  dist1 = Math.sqrt( x_diff + y_diff );
  if (dist1<0) {dist1 = -dist1;}
  return dist1;
}

$('#structureButtons').find('input').click(function(){
  setSelectedStructure($(this).attr('value'));
});

function setSelectedStructure(name){
  selectedStructureType = name
  if (selectedStructureType == 'Miner'){
    selectedStructureCost = minerCost;
    selectedStructureClass = Miner;
    selectedStructureRadius = minerRadius;
    selectedStructureColor = minerSelectedColor;
  } else if (selectedStructureType == 'Solar'){
    selectedStructureCost = solarCost;
    selectedStructureClass = Solar;
    selectedStructureRadius = solarRadius;
    selectedStructureColor = solarSelectedColor;
  }
}

$(myCanvas).mousedown(function(e){
  if (minerals >= selectedStructureCost){
    minerals = minerals - selectedStructureCost;
    buildings.push(new selectedStructureClass(e.pageX, e.pageY));
  }
  
  // mx = e.pageX - offset.left - 10
  // my = e.pageY - offset.top - 10
});
$(myCanvas).mousemove(function(e){
  mx = e.pageX - offset.left
  my = e.pageY - offset.top
});

window.onload += init();