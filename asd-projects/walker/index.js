/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const WALKER_WIDTH = $("#walker").width();
  const WALKER_HEIGHT = $("#walker").height();
  
  // Game Item Objects
  var KEY = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,

    W: 87,
    S: 83,
    A: 65,
    D: 68,
  };
  var walker = {
    xPos: 0,
    yPos: 0,
    xSpeed: 0,
    ySpeed: 0,
  };
  var walker2 = {
    xPos: BOARD_WIDTH - WALKER_WIDTH,
    yPos: BOARD_HEIGHT - WALKER_HEIGHT,
    xSpeed: 0,
    ySpeed: 0,
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle
  $("#board").click(changeColor);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      walker.ySpeed = -5;
    }
    if (event.which === KEY.DOWN) {
      walker.ySpeed = 5;
    }
    if (event.which === KEY.LEFT) {
      walker.xSpeed = -5;
    }
    if (event.which === KEY.RIGHT) {
      walker.xSpeed = 5;
    }
    if (event.which === KEY.W) {
      walker2.ySpeed = -5;
    }
    if (event.which === KEY.S) {
      walker2.ySpeed = 5;
    }
    if (event.which === KEY.A) {
      walker2.xSpeed = -5;
    }
    if (event.which === KEY.D) {
      walker2.xSpeed = 5;
    }
  }
  
  function handleKeyUp(event) {
    if (event.which === KEY.UP) {
      walker.ySpeed = 0;
    }
    if (event.which === KEY.DOWN) {
      walker.ySpeed = 0;
    }
    if (event.which === KEY.LEFT) {
      walker.xSpeed = 0;
    }
    if (event.which === KEY.RIGHT) {
      walker.xSpeed = 0;
    }
    if (event.which === KEY.W) {
      walker2.ySpeed = 0;
    }
    if (event.which === KEY.S) {
      walker2.ySpeed = 0;
    }
    if (event.which === KEY.A) {
      walker2.xSpeed = 0;
    }
    if (event.which === KEY.D) {
      walker2.xSpeed = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.xPos += walker.xSpeed;
    walker.yPos += walker.ySpeed;
    walker2.xPos += walker2.xSpeed;
    walker2.yPos += walker2.ySpeed;
  }
  
  function redrawGameItem() {
    $("#walker").css("left", walker.xPos);
    $("#walker").css("top", walker.yPos);
    $("#walker2").css("left", walker2.xPos);
    $("#walker2").css("top", walker2.yPos);
  }
  
  function wallCollision(){
    if(walker.xPos > BOARD_WIDTH - WALKER_WIDTH || walker.xPos < 0) {
      walker.xPos -= walker.xSpeed;
    }
    if(walker.yPos > BOARD_HEIGHT - WALKER_HEIGHT || walker.yPos < 0) {
      walker.yPos -= walker.ySpeed;
    }
    if(walker2.xPos > BOARD_WIDTH - WALKER_WIDTH || walker2.xPos < 0) {
      walker2.xPos -= walker2.xSpeed;
    }
    if(walker2.yPos > BOARD_HEIGHT - WALKER_HEIGHT || walker2.yPos < 0) {
      walker2.yPos -= walker2.ySpeed;
    }
  }
  function changeColor() {
    var walkerColor = $("#walker").css("background-color");
    var walker2Color = $("#walker2").css("background-color");
    $("#walker").css("background-color", walker2Color);
    $("#walker2").css("background-color", walkerColor);
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

