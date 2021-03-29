
var c = ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"];
let cnv;
function setup(){
  cnv = createCanvas(720, 720);
  cnv.position(0,0);
  cnv.style('position', 'fixed');
  cnv.style('display', 'block');
  cnv.style('z-index','-1'); // thanks Shiffman: https://www.youtube.com/watch?v=OIfEHD3KqCg
  noLoop();
}

function draw(){
  background(22);
  noiseSeed(int(random(10)));

  for (var j=0; j<height; j+=3) {
    push();
    var ran = noise(j)*width/2+width/20;
    var x1 = 0;
    var y1 = j;
    var x2 = x1+ran;
    var y2 = y1;
    var r = int(random(5));
    strokeWeight(height*0.002);
    stroke(c[int(r)]);
	  strokeCap(SQUARE);
    line(x1, y1, x2, y2);
    line(width,y1,width-ran,y2);
    pop();
  }
}

window.onresize = function() {
  canvas.size(windowWidth, windowHeight);
};

function keyTyped() {
  if (key === 's') {
    saveCanvas(cnv, 'horizontalLines', 'png');
  }
}