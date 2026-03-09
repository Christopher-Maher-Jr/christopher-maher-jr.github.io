/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var canTag = true
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
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0
  }

  var walker2 = {
    x: 390,
    y: 390,
    speedX: 0,
    speedY: 0
  }

  var itPlayer = 1; // 1 = walker is "it", 2 = walker2 is "it"
  
  var score1 = 0
  var score2 = 0

  var baseSpeed = 5
  var runnerBoost = 1

  updateColors()
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
    wallCollision(walker, "#walker")
    wallCollision(walker2, "#walker2")
    playerCollision(walker, walker2, "#walker", "#walker2")
  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event) {
    //walker 1, WASD
    var speed1 = getSpeed(1)

    if (event.which === KEY.A) {
      walker.speedX = -speed1;
    } else if (event.which === KEY.W) {
      walker.speedY = -speed1
    } else if (event.which === KEY.D) {
      walker.speedX = speed1
    } else if (event.which === KEY.S) {
      walker.speedY = speed1
    }
    
    
    //walker 2, arrow keys
    var speed2 = getSpeed(2)

    if (event.which === KEY.LEFT) {
      walker2.speedX = -speed2
    } else if (event.which === KEY.UP) {
      walker2.speedY = -speed2
    } else if (event.which === KEY.RIGHT) {
      walker2.speedX = speed2
    } else if (event.which === KEY.DOWN) {
      walker2.speedY = speed2
    }
    
    if (event.which === KEY.ENTER){
      resetGame()
}

  }

  function handleKeyUp(event){
  // walker 1
  if (event.which === KEY.A || event.which === KEY.D) {
      walker.speedX = 0
  }
    if (event.which === KEY.W || event.which === KEY.S) {
      walker.speedY = 0
  }

  // walker 2
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker2.speedX = 0
  }
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker2.speedY = 0
  }
}



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    walker.x = walker.x + walker.speedX
    walker.y = walker.y + walker.speedY

    walker2.x = walker2.x + walker2.speedX
    walker2.y = walker2.y + walker2.speedY
  }
  function redrawGameItem(){
    $("#walker").css("left", walker.x + "px")
    $("#walker").css("top", walker.y + "px")

    $("#walker2").css("left", walker2.x + "px")
    $("#walker2").css("top", walker2.y + "px")
  }

  function getSpeed(playerNumber){
    if (itPlayer === playerNumber){
      return baseSpeed
    } else {
      return baseSpeed + runnerBoost
    }
  }

  function updateColors(){
  if (itPlayer === 1){
    $("#walker").css("background-color", "magenta")
    $("#walker2").css("background-color", "cyan")
  } else {
    $("#walker2").css("background-color", "magenta")
    $("#walker").css("background-color", "cyan")
  }
}

  function wallCollision(player, selector){
    var boardWidth = $("#board").width()
    var boardHeight = $("#board").height()
    var playerWidth = $(selector).width()
    var playerHeight = $(selector).height()

    if (player.x < 0) {
      player.x -= player.speedX
    }
    if (player.x > boardWidth - playerWidth) {
      player.x -= player.speedX
    } 
    if (player.y < 0) {
      player.y -= player.speedY
    } 
    if (player.y > boardHeight - playerHeight) {
      player.y -= player.speedY
    }
  }

  function playerCollision(player1, player2, selector1, selector2){
  var p1Width = $(selector1).width()
  var p1Height = $(selector1).height()
  var p2Width = $(selector2).width()
  var p2Height = $(selector2).height()
  
  if (
    player1.x < player2.x + p2Width && 
    player1.x + p1Width > player2.x &&
    player1.y < player2.y + p2Height &&
    player1.y + p1Height > player2.y
  ) {

    if (canTag === true){

      if (itPlayer === 1){
        score1 ++
        itPlayer = 2
      } else {
        score2 ++
        itPlayer = 1
      }

      $("#score1").text(score1)
      $("#score2").text(score2)

      updateColors()

      canTag = false

      setTimeout(function(){
        canTag = true
      }, 1000)
    }

  }
}

function resetGame(){
  walker.x = 0
  walker.y = 0

  walker2.x = 390
  walker2.y = 390

  walker.speedX = 0
  walker.speedY = 0

  walker2.speedX = 0
  walker2.speedY = 0

  itPlayer = 1

  score1 = 0
  score2 = 0
  
  $("#score1").text(score1)
  $("#score2").text(score2)

  updateColors()
}

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
