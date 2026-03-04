/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    W: 87,
    D: 68,
    S: 83
  };
  var walker = {
    x: 195,
    y: 195,
    speedX: 0,
    speedY: 0
  }
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                          

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    redrawGameItem()
    wallCollision()
  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT || event.which === KEY.A) {
      walker.speedX = -5
      console.log("left pressed");
    } else if (event.which === KEY.UP || event.which === KEY.W) {
      walker.speedY = -5
      console.log("up pressed")
    } else if (event.which === KEY.RIGHT || event.which === KEY.D) {
      walker.speedX = 5
      console.log("right pressed")
    } else if (event.which === KEY.DOWN || event.which === KEY.S) {
      walker.speedY = 5
      console.log("down pressed")
    }
  }

  function handleKeyUp(event){
    if ((event.which === KEY.LEFT || event.which === KEY.RIGHT) || (event.which === KEY.A || event.which === KEY.D)) {
      walker.speedX = 0
  }
    if ((event.which === KEY.UP || event.which === KEY.DOWN) || (event.which === KEY.W || event.which === KEY.S)) {
      walker.speedY = 0
  }
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    walker.x = walker.x + walker.speedX
    walker.y = walker.y + walker.speedY
  }
  function redrawGameItem(){
    $("#walker").css("left", walker.x + "px")
    $("#walker").css("top", walker.y + "px")
  }

  function wallCollision(){
    var boardWidth = $("#board").width()
    var boardHeight = $("#board").height()
    var walkerWidth = $("#walker").width()
    var walkerHeight = $("#walker").height()

    if (walker.x < 0) {
      walker.x -= walker.speedX
    }
    if (walker.x > boardWidth - walkerWidth) {
      walker.x -= walker.speedX
    } 
    if (walker.y < 0) {
      walker.y -= walker.speedY
    } 
    if (walker.y > boardHeight - walkerHeight) {
      walker.y -= walker.speedY
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
