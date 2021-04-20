// Pixel Mandala | 4x4
// by @sandromiccoli
// 20/04/2021

const creator = new URLSearchParams(window.location.search).get('creator')
let viewer = new URLSearchParams(window.location.search).get('viewer')

if (viewer==null || viewer==false) {viewer='false'}

console.log('NFT created by', creator)
console.log('NFT viewed by', viewer)

let canvas;
let full_size;
let pixel;
let half_size;

let quarter_matrix;
let seed = viewer;

let cnv;

function setup(){
  let s = (window.innerHeight<=window.innerWidth) ? window.innerHeight : window.innerWidth;
  cnv = createCanvas(s, s);

  canvas = s;
  full_size = 4;
  pixel = canvas/full_size;
  half_size = full_size/2;

  quarter_matrix = new Array(half_size).fill(0).map(() => new Array(half_size).fill(0));

  noiseSeed(seed.hashCode());
  for (var row = 0; row < half_size; row++) 
    for (var col = 0; col < half_size; col++){
      quarter_matrix[col][row] = noise(tan(row*col)+row*col/250)*320;
      quarter_matrix[col][row] = (quarter_matrix[col][row]+noise(sin(row*col)+row*col/250)*100)%320;
      quarter_matrix[col][row] = (quarter_matrix[col][row]>140) ? map(quarter_matrix[col][row],0,320,100,240) : map(quarter_matrix[col][row],0,320,25,50);
    }

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

  if(viewer=='false'){
    textSize(width/3.1);
    textAlign(CENTER, CENTER);
    fill(0);
    text('SYNC',width/2,height/2);
  }
}

// source: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
  var hash = 0;
  if (this.length == 0) return hash;
  for (var i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function keyTyped() {
  if (key === 's') {
    saveCanvas(cnv, str(full_size)+"_"+seed, 'png');
  }
}

function windowResized() {
    let s = (window.innerHeight<=window.innerWidth) ? window.innerHeight : window.innerWidth;
      
    canvas = s;
    full_size = 4;
    pixel = canvas/full_size;
    half_size = full_size/2;
    resizeCanvas(s, s);
    console.log('resize');
}