// random hex generator
const getRanHex = size => { // https://stackoverflow.com/a/58326357
  let result = ['0x'];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
}

// let tokenData = {"hashes":["0x722899b10c66da3b72fb60a8e71df442ee1c004547ba2227d76bed357469b4ea",],"tokenId":"0"}
let tokenData = {"hashes":[getRanHex(64)],"tokenId":"0"}
let numHashes = tokenData.hashes.length;

// hex pairs
let hashPairs = [];
for (let i = 0; i < numHashes; i++) {
     for (let j = 0; j < 32; j++) {
          hashPairs.push(tokenData.hashes[i].slice(2 + (j * 2), 4 + (j * 2)));
     }
}

// 0-255 pairs
let decPairs = hashPairs.map(x => {
     return parseInt(x, 16);
});

let seed = parseInt(tokenData.hashes[0].slice(0, 16), 16);

let gridSize;

function setup() {
     var cnv = createCanvas(displayWidth, displayHeight);
     cnv.position(0,0);
     cnv.style('position', 'fixed');
     cnv.style('display', 'block');
     cnv.style('z-index','-1'); // thanks Shiffman: https://www.youtube.com/watch?v=OIfEHD3KqCg

     gridSize = createVector(16,16);
}

function draw() {
     background(44);
     for (var i = 0; i < decPairs.length; i++) {
          push();
          translate(gridSize.x*i/2,0);
          fill(decPairs[i]);
          noStroke();
          rect(0,0,gridSize.x/2,gridSize.y/2);
          pop();
     }

     push();
     translate(0,50);
     for (var i = 0; i < decPairs.length/2; i++) {
          for (var j = 0; j < decPairs.length/2; j++) {
               push();
               translate(gridSize.x*i,gridSize.y*j);
               fill(decPairs[i+j]);
               noStroke();
               rect(0,0,gridSize.x,gridSize.y);
               pop();
          }
     }
     pop();

     push();
     translate(gridSize.x*decPairs.length/2+50,50);
     for (var i = 0; i < decPairs.length/2; i++) {
          for (var j = 0; j < decPairs.length/2; j++) {
               push();
               translate(gridSize.x*i,gridSize.y*j);
               fill(decPairs[i]);
               noStroke();
               rect(0,0,gridSize.x,gridSize.y);
               pop();
          }
     }
     pop();

}

// seed 
function rnd() {
     seed ^= seed << 13;

     seed ^= seed >> 17;

     seed ^= seed << 5;

     return (((seed < 0) ? ~seed + 1 : seed) % 1000) / 1000;
}
