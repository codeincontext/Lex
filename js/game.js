var lex = {
  maxEnergy: 50
};

var context;
var mx;
var my;
var width = 500;
var height = 500;
var offset = $('canvas').offset();
var energy = 50;
var minerals = 400;
var time = 0;
var linkRange = 150;
var action = true;

var selectedStructureType;

var baseStation;
var buildings = new Array();
var rocks = new Array();

function init(){
  context = myCanvas.getContext('2d');
  baseStation = new Solar.instance(250, 250);
  buildings.push(baseStation);
  for (i=0;i<=15;i++){
    var x = 100 + Math.floor(Math.random()*301);
    var y = 100 + Math.floor(Math.random()*301);
    var randomMinerals = 20 + Math.floor(Math.random()*101);

    rocks.push(new Rock.instance(x, y, randomMinerals));
  }
  setSelectedStructure('Miner')
  setInterval(tick,1000/60);
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
    building.drawOnContext(context, baseStation);
  });
  
  $.each(rocks, function(){
    rock = this;
    rock.drawOnContext(context);
  });

  context.beginPath();
  context.fillStyle=selectedStructureType.COLOR;
  context.arc(mx,my,selectedStructureType.RADIUS,0,Math.PI*2,true);
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
  if (name == 'Miner'){
    selectedStructureType = Miner;
  } else if (name == 'Solar'){
    selectedStructureType = Solar;
  }
}

$(myCanvas).mousedown(function(e){
  if (minerals >= selectedStructureType.COST){
    minerals = minerals - selectedStructureType.COST;
    buildings.push(new selectedStructureType.instance(e.pageX, e.pageY));
  }
});
$(myCanvas).mousemove(function(e){
  mx = e.pageX - offset.left
  my = e.pageY - offset.top
});

// window.onload += init();