const NUM_OF_TILES = 20;
const TILE_BORDER = 10;

var orangeImg, cornflowerImg;
var imgWidth, imgHeight;
var invertedLayer;
var orangeLayer, cornflowerLayer;

function preload() {
  orangeImg = loadImage("../original/ORANGE.png");
  cornflowerImg = loadImage("../original/CORNFLOWER.png");
}

function setup() {
  imgWidth = orangeImg.width;
  imgHeight = orangeImg.height;

  let canvas = createCanvas(imgWidth, imgHeight);
  canvas.parent("color_grid");

  noStroke();

  let layers = [];
  layers.push(new Riso("CORNFLOWER"));
  layers.push(new Riso("ORANGE"));

  cornflowerLayer = new Riso("CORNFLOWER");
  orangeLayer = new Riso("ORANGE");

  cornflowerLayer.image(cornflowerImg, 0, 0);
  orangeLayer.image(orangeImg, 0, 0);

  for (var i = 0; i < layers.length; i++) {
    colorGrid(layers[i], (i*45)*(i+1));
  }

  drawRiso();
}

function colorGrid(layer, angle) {
  deg = angle * (PI/180);

  layer.push();
  layer.translate((imgWidth/2)-1, (imgWidth/2)-1);
  layer.rotate(deg);
  layer.translate(-(imgWidth/2)-1, -(imgWidth/2)-1);
  layer.noStroke();

  let tileSize = (imgWidth/20)-TILE_BORDER;

  for (let x = 0; x < NUM_OF_TILES; x++) {
    for (let y = 0; y < NUM_OF_TILES; y++) {
      let a = map(y, 0, NUM_OF_TILES-1, 255, 85);
      let w = map(x, 0, NUM_OF_TILES, 0, imgWidth+TILE_BORDER);
      let h = map(y, 0, NUM_OF_TILES, 0, imgWidth+TILE_BORDER);

      layer.fill(a);
      layer.rect(w, h, tileSize, tileSize);
    }
  }

  layer.pop();

  invertedLayer = new Riso("BLACK");

  invertedLayer.fill(255);
  invertedLayer.rect(0, 0, imgWidth, imgHeight);
  invertedLayer.cutout(layer);

  if (layer.channelName == "CORNFLOWER") {
    cornflowerLayer.cutout(invertedLayer);
  }
  else if (layer.channelName == "ORANGE") {
    orangeLayer.cutout(invertedLayer);
  }

  layer.clear();
  invertedLayer.clear();
}

function keyPressed() {
  // Press "s" to save riso layers
  if (keyCode === 83) {
    exportRiso();
  }

  // Press "i" to save whole image
  if (keyCode === 73) {
    saveCanvas("COLOR_GRID", "png");
  }
}
