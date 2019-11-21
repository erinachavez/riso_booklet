const SCALE = 1;

var orangeImg, cornflowerImg;

function preload() {
  orangeImg = loadImage("ORANGE.png");
  cornflowerImg = loadImage("CORNFLOWER.png");
}

function setup() {
  let imgWidth = orangeImg.width*SCALE;
  let imgHeight = orangeImg.height*SCALE;

  var canvas = createCanvas(imgWidth, imgHeight);
  canvas.parent("original");

  let orangeLayer = new Riso("ORANGE");
  let cornflowerLayer = new Riso("CORNFLOWER");

  orangeLayer.image(orangeImg, 0, 0, imgWidth, imgHeight);
  cornflowerLayer.image(cornflowerImg, 0, 0, imgWidth, imgHeight);

  drawRiso();
}

function keyPressed() {
  // Press "s" to save riso layers
  if (keyCode === 83) {
    exportRiso();
  }

  // Press "i" to save whole image
  if (keyCode === 73) {
    saveCanvas("ORIGINAL", "png");
  }
}
