// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(invertFilter)
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (let row = 0; row < image.length; row++) {
    for (let column = 0; column < image[row].length; column++) {
      var pixel = image[row][column];

      var pixelArray = rgbStringToArray(pixel);
      filterFunction(pixelArray);


      var updatedPixel = rgbArrayToString(pixelArray);

      image[row][column] = updatedPixel;
    }
  }
}

// TODO 9 Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  var backgroundColor = image[0][0];

  for (let row = 0; row < image.length; row++) {
    for (let column = 0; column < image[row].length; column++){
      
      if (image[row][column] !== backgroundColor){

        var pixel = image[row][column];
        
        var pixelArray = rgbStringToArray(pixel);
        
        filterFunction(pixelArray);
        
        var updatedPixel = rgbArrayToString(pixelArray);
        
        image[row][column] = updatedPixel;
      }
    }
  }
}

// TODO 6: Create the keepInBounds function
function keepInBounds(num) {
  return num < 0 ? 0  : (num > 255 ? 255 : num);
}


// TODO 4: Create reddify filter function
function reddify(pixelArray){
  pixelArray[RED] = 200

  return pixelArray
}

// TODO 7 & 8: Create more filter functions
function decreaseBlue(pixelArray){
  pixelArray[BLUE] = keepInBounds(pixelArray[BLUE] - 50);
}

function increaseGreenByBlue(pixelArray){
  pixelArray[GREEN] = keepInBounds(pixelArray[GREEN] + pixelArray[BLUE]);
}

// CHALLENGE code goes below here
function tintPurple(pixelArray){
  pixelArray[RED] = keepInBounds(pixelArray[RED] + 100);
  pixelArray[BLUE] = keepInBounds(pixelArray[BLUE] + 100)
}


function invertFilter(pixelArray){
  pixelArray[RED] = 255 - pixelArray[RED];
  pixelArray[GREEN] = 255 - pixelArray[GREEN];
  pixelArray[BLUE] = 255 - pixelArray[BLUE];
}
