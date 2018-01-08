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

Model.prototype.getSetup = function() {
  var r    = "";
  var type = 0;
  var cnt  = 0;
  for (var y = 0; y < MySnake.SIZE_Y; y++) {
       for (var x = 0; x < MySnake.SIZE_X; x++) {
            var t = 0;
            if (this.getUnit(x, y) !== null) {
                t = 1;
            }
            if (type != t) {
                if ((cnt >= 0) && (cnt <= 9)) {
                    r = r + String.fromCharCode(cnt + "0".charCodeAt(0));
                } else {
                    r = r + String.fromCharCode(cnt - 10 + "A".charCodeAt(0));
                }
                cnt  = 1;
                type = t;
            } else {
                if (cnt >= 30) {
                    r = r + String.fromCharCode(cnt - 10 + "A".charCodeAt(0)) + "0";
                    cnt = 1;
                } else {
                    cnt++;
                }
            }
       }
  }
  if ((cnt > 0) && (type != 0)) {
       if ((cnt >= 0) && (cnt <= 9)) {
            r = r + String.fromCharCode(cnt + "0".charCodeAt(0));
       } else {
            r = r + String.fromCharCode(cnt - 10 + "A".charCodeAt(0));
       }
  }
  return r;
}

Model.prototype.draw = function(view, ctx) {
  for (var i = 0; i < this.units.length; i++) {
       view.drawTile(ctx, this.units[i].type, this.units[i].x, this.units[i].y, this.units[i].ttl);
  }
}

MySnake.model = new Model();

})();
