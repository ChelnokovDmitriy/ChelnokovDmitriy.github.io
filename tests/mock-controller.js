(function() {

function Controller() {
  this.players = [];
}

Controller.prototype.die = function(player) {
  this.players[player] = 1;
}

MySnake.controller = new Controller();

})();
