const NUM_OF_COLUMNS = 12;

const ORIGIN = 0;
const X_BORDER = -100;
const Y_BORDER = -100;

const GAP_WEIGHT = 10;
const STROKE_WEIGHT = 5;

var orangeImg, cornflowerImg;

function preload() {
  orangeImg = loadImage("../original/ORANGE.png");
  cornflowerImg = loadImage("../original/CORNFLOWER.png");
}

function setup() {
  let imgWidth = orangeImg.width;
  let imgHeight = orangeImg.height;

  const BOX_SIZE = (imgWidth - (X_BORDER*2))/NUM_OF_COLUMNS;
  const HALF_BOX_SIZE = BOX_SIZE/2;

  const NUM_OF_ROWS = round((imgHeight - Y_BORDER*2)/BOX_SIZE);

  const MIN_COORD = ORIGIN;
  const MAX_COORD = ORIGIN + BOX_SIZE;

  const MIN_INCREASE = MIN_COORD + HALF_BOX_SIZE;
  const MAX_DECREASE = MAX_COORD - HALF_BOX_SIZE;

  const MIN_BOUND = ORIGIN + 2;
  const MAX_BOUND = (ORIGIN + BOX_SIZE) - 2;

  let canvas = createCanvas(imgWidth, imgHeight);
  canvas.parent("tesselations");

  background(255);
  noFill();

  let knockoutLayer = new Riso("BLACK");
  let orangeLayer = new Riso("ORANGE");
  let cornflowerLayer = new Riso("CORNFLOWER");

  orangeLayer.image(orangeImg, 0, 0);
  cornflowerLayer.image(cornflowerImg, 0, 0);

  let layers = [orangeLayer, cornflowerLayer];

  for (let l = 0; l < layers.length; l++) {
    let layer = layers[l];

    let topPoint = random(MIN_BOUND, MAX_BOUND);
    let rightPoint = random(MIN_BOUND, MAX_BOUND);
    let bottomPoint = random(MIN_BOUND, MAX_BOUND);
    let leftPoint = random(MIN_BOUND, MAX_BOUND);

    let intersection = math.intersect([topPoint, MIN_COORD], [bottomPoint, MAX_COORD], [MIN_COORD, leftPoint], [MAX_COORD, rightPoint]);

    let basePoints = [
      [topPoint + HALF_BOX_SIZE, MIN_INCREASE],
      [intersection[0] + HALF_BOX_SIZE, intersection[1] + HALF_BOX_SIZE],
      [MIN_INCREASE, leftPoint + HALF_BOX_SIZE],
      [MIN_INCREASE, rightPoint + HALF_BOX_SIZE],
      [intersection[0] - HALF_BOX_SIZE, intersection[1] + HALF_BOX_SIZE],
      [topPoint - HALF_BOX_SIZE, MIN_INCREASE],
      [bottomPoint - HALF_BOX_SIZE, MIN_INCREASE],
      [intersection[0] - HALF_BOX_SIZE, intersection[1] - HALF_BOX_SIZE],
      [MAX_DECREASE, rightPoint - HALF_BOX_SIZE],
      [MAX_DECREASE, leftPoint - HALF_BOX_SIZE],
      [intersection[0] + HALF_BOX_SIZE, intersection[1] - HALF_BOX_SIZE],
      [bottomPoint + HALF_BOX_SIZE, MAX_DECREASE],
    ];

    let xOriginOffset = getSmallerValue(basePoints[5][0], basePoints[6][0]) - X_BORDER;
    let yOriginOffset = getSmallerValue(basePoints[8][1], basePoints[9][1]) - Y_BORDER;

    for (let i = 0; i < NUM_OF_ROWS; i++) {
      let box_offset_y = BOX_SIZE * i;

      for (let j = 0; j < NUM_OF_COLUMNS; j++) {
        let box_offset_x = BOX_SIZE * j;

        let points = deepCopy(basePoints);

        for (let k = 0; k < points.length; k++) {
          points[k][0] += (box_offset_x - xOriginOffset);
          points[k][1] += (box_offset_y - yOriginOffset);
        }

        if (random() < 0.8) {
          knockoutLayer.fill(0);
          knockoutLayer.strokeWeight(STROKE_WEIGHT);
          knockoutLayer.stroke(255);
        }
        else {
          knockoutLayer.fill(255);
          knockoutLayer.stroke(0);
        }

        knockoutLayer.beginShape();

        if (points[11][0] <= points[0][0]) {
          knockoutLayer.vertex(points[11][0] - GAP_WEIGHT, points[11][1] + GAP_WEIGHT);
          knockoutLayer.vertex(points[0][0] - GAP_WEIGHT, points[0][1] + GAP_WEIGHT);
        }
        else {
          knockoutLayer.vertex(points[11][0] - GAP_WEIGHT, points[11][1] - GAP_WEIGHT);
          knockoutLayer.vertex(points[0][0] - GAP_WEIGHT, points[0][1] - GAP_WEIGHT);
        }

        knockoutLayer.vertex(points[1][0] - GAP_WEIGHT, points[1][1] - GAP_WEIGHT);

        if (points[3][1] <= points[2][1]) {
          knockoutLayer.vertex(points[2][0] + GAP_WEIGHT, points[2][1] - GAP_WEIGHT);
          knockoutLayer.vertex(points[3][0] + GAP_WEIGHT, points[3][1] - GAP_WEIGHT);
        }
        else {
          knockoutLayer.vertex(points[2][0] - GAP_WEIGHT, points[2][1] - GAP_WEIGHT);
          knockoutLayer.vertex(points[3][0] - GAP_WEIGHT, points[3][1] - GAP_WEIGHT);
        }

        knockoutLayer.vertex(points[4][0] + GAP_WEIGHT, points[4][1] - GAP_WEIGHT);

        if (points[6][0] <= points[5][0]) {
          knockoutLayer.vertex(points[5][0] + GAP_WEIGHT, points[5][1] - GAP_WEIGHT);
          knockoutLayer.vertex(points[6][0] + GAP_WEIGHT, points[6][1] - GAP_WEIGHT);
        }
        else {
          knockoutLayer.vertex(points[5][0] + GAP_WEIGHT, points[5][1] + GAP_WEIGHT);
          knockoutLayer.vertex(points[6][0] + GAP_WEIGHT, points[6][1] + GAP_WEIGHT);
        }

        knockoutLayer.vertex(points[7][0] + GAP_WEIGHT, points[7][1] + GAP_WEIGHT);

        if (points[9][1] <= points[8][1]) {
          knockoutLayer.vertex(points[8][0] + GAP_WEIGHT, points[8][1] + GAP_WEIGHT);
          knockoutLayer.vertex(points[9][0] + GAP_WEIGHT, points[9][1] + GAP_WEIGHT);
        }
        else {
          knockoutLayer.vertex(points[8][0] - GAP_WEIGHT, points[8][1] + GAP_WEIGHT);
          knockoutLayer.vertex(points[9][0] - GAP_WEIGHT, points[9][1] + GAP_WEIGHT);
        }

        knockoutLayer.vertex(points[10][0] - GAP_WEIGHT, points[10][1] + GAP_WEIGHT);

        knockoutLayer.endShape(CLOSE);
      }
    }

    layer.cutout(knockoutLayer);
    knockoutLayer.clear();
  }

  drawRiso();
}

function keyPressed() {
  // Press "s" to save riso layers
  if (keyCode === 83) {
    exportRiso();
  }

  // Press "i" to save whole image
  if (keyCode === 73) {
    saveCanvas("TESSELATIONS", "png");
  }
}

function getSmallerValue(a, b) {
  if (a <= b) {
    return a;
  }
  else if (b < a) {
    return b;
  }
}

// Helper function for deep copying javascript objects.
// Credit: https://www.codementor.io/avijitgupta/deep-copying-in-js-7x6q8vh5d
function deepCopy(object) {
   let output, value, key;

   output = Array.isArray(object) ? [] : {};

   for (key in object) {
       value = object[key];
       output[key] = (typeof value === "object") ? deepCopy(value) : value;
   }

   return output;
}
