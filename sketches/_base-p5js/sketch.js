function setup(){
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0,0);
  cnv.style('position', 'fixed');
  cnv.style('display', 'block');
  cnv.style('z-index','-1'); // thanks Shiffman: https://www.youtube.com/watch?v=OIfEHD3KqCg
}

function draw(){
  background(244);
  fill(0);
  stroke(255,0,0)
  ellipse(mouseX,mouseY,50,50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}