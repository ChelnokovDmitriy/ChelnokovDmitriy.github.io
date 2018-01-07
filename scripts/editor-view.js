(function() {

function View() {
  this.isConfigured = false;
  this.allReady     = false;
  this.res          = [];
  this.tile         = [];
  this.background   = null;
}

View.prototype.addRes = function(name, id) {
  var res = document.getElementById(name);
  var ix  = this.res.length;
  this.res.push(res);
  if (id) {
      this.tile[id] = ix;
  } else {
      this.background = res;
  }
}

View.prototype.configure = function() {
  if (!this.isConfigured) {
      this.addRes("background");
      this.addRes("wall", MySnake.WALL);
      this.isConfigured = true;
  }
}

View.prototype.isReady = function() {
  if (this.allReady) return true;
  for (var i = 0; i < this.res.length; i++) {
       var res = this.res[i];
       if (!res.complete || (res.naturalWidth == 0)) return false;
  }
  this.allReady = true;
  return true;
}

View.prototype.drawTile = function(ctx, id, x, y, ttl) {
  var res = this.res[ this.tile[id] ];
  if (!_.isUndefined(res)) {
      ctx.drawImage(res, x * MySnake.TILE_SIZE, y * MySnake.TILE_SIZE);
  }
}

View.prototype.drawAll = function() {
  if (this.isReady()) {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.background, 0, 0);
      var model = MySnake.model;
      model.draw(this, ctx);
  }
}

MySnake.view = new View();
MySnake.view.configure();

})();
