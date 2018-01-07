(function() {

function Model() {
  this.units    = [];
}

Model.prototype.clear = function() {
  this.units    = [];
}

Model.prototype.getUnit = function(x, y) {
  for (var i = 0; i < this.units.length; i++) {
       if ((this.units[i].x == x) && (this.units[i].y == y)) {
           return this.units[i];
       }
  }
  return null;
}

Model.prototype.addUnit = function(x, y, type, ttl) {
   if (this.getUnit(x, y) !== null) return false;
   this.units.push({
       type: type,
       x:    x,
       y:    y,
       ttl:  ttl
   });
   return true;
}

Model.prototype.delUnit = function(x, y) {
  this.units = _.filter(this.units, function(unit) {
      return (x != unit.x) || (y != unit.y);
  });
}

Model.prototype.draw = function(view, ctx) {
  for (var i = 0; i < this.units.length; i++) {
       view.drawTile(ctx, this.units[i].type, this.units[i].x, this.units[i].y, this.units[i].ttl);
  }
}

MySnake.model = new Model();

})();
