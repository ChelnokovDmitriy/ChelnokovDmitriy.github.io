(function() {

var DELAY_INTERVAL = 100;

var mouseX         = 0;
var mouseY         = 0;
var mousePressed   = false;

var lastX          = null;
var lastY          = null;

function Controller() {

}

var mouseUpdate = function(event) {
  mouseX = (event.clientX + document.body.scrollLeft) - (Table.offsetLeft + CanvasCell.offsetLeft + canvas.offsetLeft);
  mouseY = (event.clientY + document.body.scrollTop) - (Table.offsetTop + CanvasCell.offsetTop + canvas.offsetTop);
}

var draw = function() {
  var view = MySnake.view;
  view.drawAll();
}

var changeUnit = function(x, y) {
  var model = MySnake.model;
  var unit  = model.getUnit(x, y);
  if (unit !== null) {
      model.delUnit(x, y);
  } else {
      model.addUnit(x, y, MySnake.WALL, 0);
  }
}

var checkXY = function(x, y) {
  if ((lastX === null) || (lastX != x) ||
      (lastY === null) || (lastY != y)) {
      lastX = x;
      lastY = y;
      return true;
  } else {
      return false;
  }
}

window.onkeyup = function(event) {
  var model = MySnake.model;
  if ((event.key == "Enter") || (event.keyIdentifier == "Enter")) {
      window.location = "snake.html?setup=" + model.getSetup();
  }
}

canvas.onmouseup = function() { 
  mousePressed = false;
}

canvas.onmousedown = function(event) { 
  mouseUpdate(event);
  mousePressed = true;
  var x = (mouseX / MySnake.TILE_SIZE) | 0;
  var y = (mouseY / MySnake.TILE_SIZE) | 0;
  lastX = x;
  lastY = y;
  changeUnit(x, y);
  draw();
}

canvas.onmousemove = function(event) { 
  mouseUpdate(event);
  var x = (mouseX / MySnake.TILE_SIZE) | 0;
  var y = (mouseY / MySnake.TILE_SIZE) | 0;
  if (mousePressed && checkXY(x, y)) {
      changeUnit(x, y);
      draw();
  }
}

Controller.prototype.run = function() {
  var view  = MySnake.view;
  if (view.isReady()) {
      draw();
  } else {
      _.delay(function() {
         MySnake.controller.run();
      }, DELAY_INTERVAL);
  }
}

MySnake.controller = new Controller();
MySnake.controller.run();

})();
