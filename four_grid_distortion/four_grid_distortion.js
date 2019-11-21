const RANDOM_GRID_SIZE = false;
let num_of_x_strips = 72;

// For debugging
const CUT_X = true;
const CUT_Y = true;

var imgLayers = [];
var risoLayers = [];

function preload() {
  imgLayers.push(loadImage("../original/ORANGE.png"));
  imgLayers.push(loadImage("../original/CORNFLOWER.png"));
}

function setup() {
  let img_width = imgLayers[0].width;
  let img_height = imgLayers[0].height;

  let canvas = createCanvas(img_width, img_height);
  canvas.parent("four_grid_distortion");

  background(255);

  risoLayers.push(new Riso("ORANGE"));
  risoLayers.push(new Riso("CORNFLOWER"));

  if (RANDOM_GRID_SIZE) {
    num_of_x_strips = round(random(10, 100));
  }

  let grid_size = img_width/num_of_x_strips;
  let num_of_y_strips = floor(img_height/grid_size);

  for (let j = 0; j < imgLayers.length; j++) {
    image(imgLayers[j], 0, 0, img_width, img_height);

    let x_origin = 0;
    let y_origin = 0;

    // Cut image into horizontal strips and re-draw collated
    if (CUT_X) {
      let x_strips = [];
      for (let i = 0 ; i < num_of_x_strips; i++) {
        let x_offset = i*grid_size + x_origin;
        x_strips.push(get(x_offset, y_origin, grid_size, img_height));
      }

      background(255);

      for (let i = 0; i < x_strips.length; i++) {
        let x_offset = floor(i/2)*grid_size;

        if (i%2 != 0) {
          x_offset += grid_size*(num_of_x_strips/2);
        }

        image(x_strips[i], x_offset, y_origin, grid_size, img_height);
      }
    }

    // Cut image into vertical strips and re-draw collated
    if (CUT_Y) {
      let y_strips = [];
      for (let i = 0 ; i < num_of_y_strips; i++) {
        let y_offset = i*grid_size + y_origin;

        if (y_offset + grid_size < img_height + y_origin) {
          y_strips.push(get(x_origin, y_offset, img_width, grid_size));
        }
      }

      background(255);

      for (let i = 0; i < y_strips.length; i++) {
        let y_offset = floor(i/2)*grid_size;

        if (i%2 != 0) {
          y_offset += grid_size*(num_of_y_strips/2);
        }

        risoLayers[j].image(y_strips[i], x_origin, y_offset, img_width, grid_size);
      }
    }
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
    saveCanvas("FOUR_GRID_DISTORTION", "png");
  }
}
