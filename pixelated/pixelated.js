const SCALE = 1;

const ORANGE_SHAPES_COUNT = {
  circles: 1,
  triangles: 1,
  rectangles: 0,
};

const CORNFLOWER_SHAPES_COUNT = {
  circles: 1,
  triangles: 1,
  rectangles: 0,
};

var orangeImg, cornflowerImg;

function preload() {
  orangeImg = loadImage("pixelated_orange.png");
  cornflowerImg = loadImage("pixelated_cornflower.png");
}

function setup() {
  let imgWidth = orangeImg.width*SCALE;
  let imgHeight = orangeImg.height*SCALE;

  var canvas = createCanvas(imgWidth, imgHeight);
  canvas.parent("pixelated");

  background(255);

  let orangeLayer = new Riso("ORANGE");
  let cornflowerLayer = new Riso("CORNFLOWER");

  let knockoutLayer = new Riso("BLACK");
  let invertedLayer = new Riso("CHARCOAL");

  risoNoStroke();

  cornflowerLayer.image(cornflowerImg, 0, 0, imgWidth, imgHeight);
  orangeLayer.image(orangeImg, 0, 0, imgWidth, imgHeight);

  invertedLayer.rect(0, 0, imgWidth, imgHeight);

  for (let i = 0; i < ORANGE_SHAPES_COUNT.circles; i++){
    knockoutLayer.ellipse(random(imgWidth), random(imgHeight), random(500, 3000));
  }

  for (let i = 0; i < ORANGE_SHAPES_COUNT.triangles; i++){
    knockoutLayer.triangle(
      random(imgWidth), 0,
      random(imgWidth), imgHeight,
      0, random(imgHeight)
    );
  }

  for (let i = 0; i < ORANGE_SHAPES_COUNT.rectangles; i++){
    knockoutLayer.beginShape();
    knockoutLayer.vertex(random(imgWidth), 0);
    knockoutLayer.vertex(imgWidth, random(imgHeight));
    knockoutLayer.vertex(random(imgWidth), imgHeight);
    knockoutLayer.vertex(0, random(imgHeight));
    knockoutLayer.endShape();
  }

  invertedLayer.cutout(knockoutLayer);
  orangeLayer.cutout(invertedLayer);

  knockoutLayer.clear();
  invertedLayer.clear();

  invertedLayer.rect(0, 0, imgWidth, imgHeight);

  for (let i = 0; i < CORNFLOWER_SHAPES_COUNT.circles; i++){
    knockoutLayer.ellipse(random(imgWidth), random(imgHeight), random(500, 3000));
  }

  for (let i = 0; i < CORNFLOWER_SHAPES_COUNT.triangles; i++){
    knockoutLayer.triangle(
      random(imgWidth), 0,
      random(imgWidth), imgHeight,
      imgWidth, random(imgHeight)
    );
  }

  for (let i = 0; i < CORNFLOWER_SHAPES_COUNT.rectangles; i++){
    knockoutLayer.beginShape();
    knockoutLayer.vertex(random(imgWidth), 0);
    knockoutLayer.vertex(0, random(imgHeight));
    knockoutLayer.vertex(random(imgWidth), imgHeight);
    knockoutLayer.vertex(imgWidth, random(imgHeight));
    knockoutLayer.endShape();
  }

  invertedLayer.cutout(knockoutLayer);
  cornflowerLayer.cutout(invertedLayer);

  knockoutLayer.clear();
  invertedLayer.clear();

  drawRiso();
}

function keyPressed() {
  // Press "s" to save riso layers
  if (keyCode === 83) {
    exportRiso();
  }

  // Press "i" to save whole image
  if (keyCode === 73) {
    saveCanvas("PIXELATED", "png");
  }
}
