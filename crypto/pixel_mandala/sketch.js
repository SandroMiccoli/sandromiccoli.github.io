// Pixel Mandala | 64x64
// by @sandromiccoli
// 21/03/2021

let canvas;
let full_size;
let pixel;
let half_size;

let quarter_matrix;
let quarter_matrix_from;
let quarter_matrix_to;
let seed;

let lerp = 0;
let inc = 0.05;
let lerp_color = false;
let cnv;

let s;

function changeCanvasResolution(res){
  canvas = s*0.75;
  full_size = res;
  pixel = canvas/full_size;
  half_size = full_size/2;

  quarter_matrix = new Array(half_size).fill(random(0,255)).map(() => new Array(half_size).fill(random(0,255)));
  quarter_matrix_from = new Array(half_size).fill(random(0,255)).map(() => new Array(half_size).fill(random(0,255)));
  quarter_matrix_to = new Array(half_size).fill(random(0,255)).map(() => new Array(half_size).fill(random(0,255)));

  generateNextColor();
}

function setup(){
  s = (window.innerHeight<=window.innerWidth) ? window.innerHeight : window.innerWidth;
  cnv = createCanvas(s*0.75, s*0.75);
  cnv.parent("live");

  button = createButton('64x64');
  button.class("style3 space");
  button.parent("live_btns");
  button.mousePressed(()=>{changeCanvasResolution(64);});

  button = createButton('32x32');
  button.class("style3 space");
  button.parent("live_btns");
  button.mousePressed(()=>{changeCanvasResolution(32);});

  button = createButton('16x16');
  button.class("style3 space");
  button.parent("live_btns");
  button.mousePressed(()=>{changeCanvasResolution(16);});

  button = createButton('8x8');
  button.class("style3 space");
  button.parent("live_btns");
  button.mousePressed(()=>{changeCanvasResolution(8);});

  button = createButton('4x4');
  button.class("style3 space");
  button.parent("live_btns");
  button.mousePressed(()=>{changeCanvasResolution(4);});


  canvas = s*0.75;
  full_size = 64;
  pixel = canvas/full_size;
  half_size = full_size/2;

  quarter_matrix = new Array(half_size).fill(0).map(() => new Array(half_size).fill(0));
  quarter_matrix_from = new Array(half_size).fill(0).map(() => new Array(half_size).fill(0));
  quarter_matrix_to = new Array(half_size).fill(0).map(() => new Array(half_size).fill(0));
  seed = 'tz1Q4r6CMMNRvvQBZUFU5za4aTFZpC43rX8G'

  noiseSeed(seed.hashCode());
  for (var row = 0; row < half_size; row++) 
    for (var col = 0; col < half_size; col++){
      quarter_matrix[col][row] = noise(tan(row*col)+row*col/250)*320;
      quarter_matrix[col][row] = (quarter_matrix[col][row]+noise(sin(row*col)+row*col/250)*100)%320;
      quarter_matrix[col][row] = (quarter_matrix[col][row]>140) ? map(quarter_matrix[col][row],0,320,100,240) : map(quarter_matrix[col][row],0,320,25,50);
    }

  generateNextColor();

  colorMode(HSB,255);
  smooth();
  noStroke();    
}

function draw(){
  for (var row = 0; row < full_size; row++) {
    for (var col = 0; col < full_size; col++) {
      if (row < half_size && col < half_size)
        fill(quarter_matrix[col][row],255,220);
      else if (row < half_size && col >= half_size)
        fill(quarter_matrix[(full_size-1)-col][row],255,220);
      else if (row >= half_size && col < half_size)
        fill(quarter_matrix[col][(full_size-1)-row],255,220);
      else if (row >= half_size && col >= half_size)
        fill(quarter_matrix[(full_size-1)-col][(full_size-1)-row],255,220);

      rect(pixel*col,pixel*row,pixel,pixel);
    }
  }
  lerpColors();
}

function generateNextColor(){
  quarter_matrix_from = quarter_matrix;
  
  seed = random(999999999);
  noiseSeed(seed);
  for (var row = 0; row < half_size; row++) 
    for (var col = 0; col < half_size; col++){
      quarter_matrix_to[col][row] = noise(tan(row*col)+row*col/250)*320;
      quarter_matrix_to[col][row] = (quarter_matrix_to[col][row]+noise(sin(row*col)+row*col/250)*100)%320;
      quarter_matrix_to[col][row] = (quarter_matrix_to[col][row]>140) ? map(quarter_matrix_to[col][row],0,320,100,240) : map(quarter_matrix_to[col][row],0,320,25,50);
    }
}

function lerpColors(){
  if(lerp_color){

    quarter_matrix_from = quarter_matrix;

    for (var row = 0; row < half_size; row++) {
      for (var col = 0; col < half_size; col++) {
        quarter_matrix[col][row] = lerpColor(color(quarter_matrix_from[col][row],255,220),color(quarter_matrix_to[col][row],255,220),lerp);
      }
    }
  
  
    lerp+=inc;
    if (lerp > 1){
      lerp_color = false;
      generateNextColor();
      lerp=0;
      console.log("Lerp finished");
    }
  }
}

function mouseClicked(){
  lerp_color = true;
}

// source: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
  var hash = 0;
  if (this.length == 0) return hash;
  for (i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}


window.onresize = function() {
  canvas.size(windowWidth, windowHeight);
  changeCanvasResolution(full_size);
};

function keyTyped() {
  if (key === 's') {
    saveCanvas(cnv, full_size+'_'+seed, 'png');
  }
}

