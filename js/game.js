var lex = {
  maxEnergy: 50,
  energy: 50,
  minerals: 400,
  linkRange: 150,
  baseStation: null,
  buildings: new Array(),
  rocks: new Array(),
  context: myCanvas.getContext('2d')
};

var mx;
var my;
var width = 500;
var height = 500;
var offset = $('canvas').offset();

var selectedStructureType;

function init(){
  baseStation = new Solar.instance(250, 250);
  lex.buildings.push(baseStation);
  for ( i = 0; i <= 15; i++){
    var x = 100 + Math.floor(Math.random()*301);
    var y = 100 + Math.floor(Math.random()*301);
    var randomMinerals = 20 + Math.floor(Math.random()*101);

    lex.rocks.push(new Rock.instance(x, y, randomMinerals));
  }
  setSelectedStructure('Miner')
  setInterval(tick,1000/60);
}
function tick(){
  draw();
  $('.energy').text(Math.round(lex.energy));
  $('.minerals').text(Math.round(lex.minerals));
  $.each(lex.buildings, function(index, building) {
     building.tick();
  });
}
function draw(){
  lex.context.fillStyle="555"
  lex.context.fillRect(0,0, width,height);

  $.each(lex.buildings, function(){
    var building = this;
    building.drawOnContext();
  });
  
  $.each(lex.rocks, function(){
    rock = this;
    rock.drawOnContext();
  });
  
  // Move this somewhere
  if (selectedStructureType) {
    var temporaryStructure = new selectedStructureType.instance(mx, my);
    
    var nearestSolar = temporaryStructure.nearestSolar && temporaryStructure.nearestSolar();
    if (nearestSolar) {
      lex.context.beginPath();
      lex.context.moveTo(temporaryStructure.x, temporaryStructure.y);
      lex.context.lineTo(nearestSolar.x, nearestSolar.y);
      lex.context.strokeStyle = "#00F";
      lex.context.stroke();
    }
  
    lex.context.beginPath();
    lex.context.fillStyle=selectedStructureType.COLOR;
    lex.context.arc(mx,my,selectedStructureType.RADIUS,0,Math.PI*2,true);
    lex.context.closePath();
    lex.context.fill();
    
    temporaryStructure = null; // Don't know if I need this, meh.
  }
}
function dist(x, y, X, Y){
  x_diff = Math.pow( (x-X), 2 );
  y_diff = Math.pow( (y-Y), 2 );
  dist1 = Math.sqrt( x_diff + y_diff );
  if (dist1 < 0) dist1 = -dist1;
  return dist1;
}

function distObj(a, b){
  return dist(a.x, a.y, b.x, b.y);
}

$('#structureButtons').find('input').click(function(){
  setSelectedStructure($(this).attr('value'));
});

function setSelectedStructure(name){
  if (name == 'None')
    selectedStructureType = null;
  if (name == 'Miner')
    selectedStructureType = Miner;
  if (name == 'Solar')
    selectedStructureType = Solar;
}

$(myCanvas).mousedown(function(e){
  if (!selectedStructureType) return;
  
  if (lex.minerals >= selectedStructureType.COST){
    lex.minerals = lex.minerals - selectedStructureType.COST;
    lex.buildings.push(new selectedStructureType.instance(e.pageX, e.pageY));
  }
});
$(myCanvas).mousemove(function(e){
  mx = e.pageX - offset.left
  my = e.pageY - offset.top
});

// window.onload += init();