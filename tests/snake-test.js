QUnit.test( "Navigate", function( assert ) {
  var model = MySnake.model;
  model.clear();
  assert.equal( MySnake.SIZE_X, 42, "SIZE_X == 42");
  var p = model.navigate(0, 0, 0, 1);
  assert.equal( p.x, 0, "x == 0");
  assert.equal( p.y, 1, "x == 1");
  p = model.navigate(p.x, p.y, -1, 0);
  assert.equal( p.x, MySnake.SIZE_X - 1, "x == MySnake.SIZE_X - 1");
  assert.equal( p.y, 1, "x == 1");
  p = model.navigate(p.x, p.y, 0, -2);
  assert.equal( p.x, MySnake.SIZE_X - 1, "x == MySnake.SIZE_X - 1");
  assert.equal( p.y, MySnake.SIZE_Y - 1, "y == MySnake.SIZE_Y - 1");
  p = model.navigate(p.x, p.y, 2, 0);
  assert.equal( p.x, 1, "x == 1");
  assert.equal( p.y, MySnake.SIZE_Y - 1, "y == MySnake.SIZE_Y - 1");
  p = model.navigate(p.x, p.y, 0, 2);
  assert.equal( p.x, 1, "x == 1");
  assert.equal( p.y, 1, "y == 1");
});

QUnit.test( "Directions", function( assert ) {
  var model = MySnake.model;
  model.clear();
  assert.equal( model.getDirection(0, 1), 2, "down");
  assert.equal( model.getDirection(0, -1), 0, "up");
  assert.equal( model.getDirection(1, 0), 1, "right");
  assert.equal( model.getDirection(-1, 0), 3, "left");
});

QUnit.test( "Units", function( assert ) {
  var model = MySnake.model;
  model.clear();
  assert.equal( model.getUnit(0, 0), null, "(0,0) is empty");
  assert.equal( model.getUnit(1, 1), null, "(1,1) is empty too");
  assert.equal( model.addUnit(0, 0, MySnake.WALL, 0), true, "add wall");
  assert.equal( model.getUnit(0, 0).type, MySnake.WALL, "(0,0) is wall");
  assert.equal( model.getUnit(1, 1), null, "(1,1) is empty");
  assert.equal( model.addUnit(0, 0, MySnake.CHERRY, 3), false, "add cherry failed");
  assert.equal( model.addUnit(1, 1, MySnake.CHERRY, 3), true, "add cherry");
  assert.equal( model.getUnit(0, 0).type, MySnake.WALL, "(0,0) is wall");
  assert.equal( model.getUnit(1, 1).type, MySnake.CHERRY, "(1,1) is cherry");
  assert.equal( model.getUnit(1, 1).ttl, 3, "... with ttl == 3");
  model.tick();
  assert.equal( model.getUnit(0, 0).type, MySnake.WALL, "(0,0) is wall");
  assert.equal( model.getUnit(1, 1).type, MySnake.CHERRY, "(1,1) is cherry");
  assert.equal( model.getUnit(1, 1).ttl, 2, "... with ttl == 2");
  model.tick();
  assert.equal( model.getUnit(1, 1).type, MySnake.CHERRY, "(1,1) is cherry");
  assert.equal( model.getUnit(1, 1).ttl, 1, "... with ttl == 1");
  model.tick();
  assert.equal( model.getUnit(1, 1), null, "(1,1) is empty");
  assert.equal( model.getUnit(0, 0).type, MySnake.WALL, "(0,0) is wall");
});

QUnit.test( "Snake", function( assert ) {
  var controller = MySnake.controller;
  var model = MySnake.model;  
  model.clear();
  assert.equal( model.addSnake(0, 3, 3, 1, 0), true, "add Snake");
  assert.equal( model.getUnit(3, 3).type, MySnake.HEAD_1_W_E, "(3,3) is head");
  assert.equal( model.getUnit(3, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(2, 3).type, MySnake.BODY_W_E, "(2,3) is body");
  assert.equal( model.getUnit(2, 3).ttl, 2, "... with ttl == 2");
  assert.equal( model.getUnit(1, 3).type, MySnake.TAIL_1_W_E, "(1,3) is tail");
  assert.equal( model.getUnit(1, 3).ttl, 1, "... with ttl == 1");
  model.tick(controller);
  assert.equal( model.getUnit(3, 3).type, MySnake.HEAD_2_W_E, "(3,3) is head");
  assert.equal( model.getUnit(3, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(2, 3).type, MySnake.BODY_W_E, "(2,3) is body");
  assert.equal( model.getUnit(2, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(1, 3).type, MySnake.TAIL_2_W_E, "(1,3) is tail");
  assert.equal( model.getUnit(1, 3).ttl, 1, "... with ttl == 1");
  model.tick(controller);
  assert.equal( model.getUnit(4, 3).type, MySnake.HEAD_1_W_E, "(4,3) is head");
  assert.equal( model.getUnit(4, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(3, 3).type, MySnake.BODY_W_E, "(3,3) is body");
  assert.equal( model.getUnit(3, 3).ttl, 2, "... with ttl == 2");
  assert.equal( model.getUnit(2, 3).type, MySnake.TAIL_1_W_E, "(2,3) is tail");
  assert.equal( model.getUnit(2, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(1, 3), null, "(1,3) is empty");
  model.send(0, 0, 1);
  model.send(1, 1, 0);
  model.send(0, 0, -1);
  model.send(0, 1, 0);
  model.tick(controller);
  assert.equal( model.getUnit(4, 3).type, MySnake.HEAD_2_W_E, "(4,3) is head");
  assert.equal( model.getUnit(4, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(3, 3).type, MySnake.BODY_W_E, "(3,3) is body");
  assert.equal( model.getUnit(3, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(2, 3).type, MySnake.TAIL_2_W_E, "(2,3) is tail");
  assert.equal( model.getUnit(2, 3).ttl, 1, "... with ttl == 1");
  model.tick(controller);
  assert.equal( model.getUnit(4, 4).type, MySnake.HEAD_1_N_S, "(4,4) is head");
  assert.equal( model.getUnit(4, 4).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 3).type, MySnake.BODY_W_S, "(4,3) is body");
  assert.equal( model.getUnit(4, 3).ttl, 2, "... with ttl == 2");
  assert.equal( model.getUnit(3, 3).type, MySnake.TAIL_1_W_E, "(3,3) is tail");
  assert.equal( model.getUnit(3, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(2, 3), null, "(2,3) is empty");
  model.tick(controller);
  assert.equal( model.getUnit(4, 4).type, MySnake.HEAD_2_N_S, "(4,4) is head");
  assert.equal( model.getUnit(4, 4).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 3).type, MySnake.BODY_W_S, "(4,3) is body");
  assert.equal( model.getUnit(4, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(3, 3).type, MySnake.TAIL_2_W_E, "(3,3) is tail");
  assert.equal( model.getUnit(3, 3).ttl, 1, "... with ttl == 1");
  model.tick(controller);
  assert.equal( model.getUnit(4, 5).type, MySnake.HEAD_1_N_S, "(4,5) is head");
  assert.equal( model.getUnit(4, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 4).type, MySnake.BODY_N_S, "(4,4) is body");
  assert.equal( model.getUnit(4, 4).ttl, 2, "... with ttl == 2");
  assert.equal( model.getUnit(4, 3).type, MySnake.TAIL_1_N_S, "(4,3) is tail");
  assert.equal( model.getUnit(4, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(3, 3), null, "(3,3) is empty");
  model.tick(controller);
  assert.equal( model.getUnit(4, 5).type, MySnake.HEAD_2_N_S, "(4,5) is head");
  assert.equal( model.getUnit(4, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 4).type, MySnake.BODY_N_S, "(4,4) is body");
  assert.equal( model.getUnit(4, 4).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 3).type, MySnake.TAIL_2_N_S, "(4,3) is tail");
  assert.equal( model.getUnit(4, 3).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(3, 3), null, "(3,3) is empty");
  model.tick(controller);
  assert.equal( model.getUnit(5, 5).type, MySnake.HEAD_1_W_E, "(5,5) is head");
  assert.equal( model.getUnit(5, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 5).type, MySnake.BODY_N_E, "(4,5) is body");
  assert.equal( model.getUnit(4, 5).ttl, 2, "... with ttl == 2");
  assert.equal( model.getUnit(4, 4).type, MySnake.TAIL_1_N_S, "(4,4) is tail");
  assert.equal( model.getUnit(4, 4).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 3), null, "(4,3) is empty");
  assert.equal( model.addUnit(6, 5, MySnake.CHERRY, 3), true, "add cherry");
  model.tick(controller);
  assert.equal( model.getUnit(5, 5).type, MySnake.HEAD_2_W_E, "(5,5) is head");
  assert.equal( model.getUnit(5, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 5).type, MySnake.BODY_N_E, "(4,5) is body");
  assert.equal( model.getUnit(4, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 4).type, MySnake.TAIL_2_N_S, "(4,4) is tail");
  assert.equal( model.getUnit(4, 4).ttl, 1, "... with ttl == 1");
  model.tick(controller);
  assert.equal( model.getUnit(6, 5).type, MySnake.HEAD_1_W_E, "(6,5) is head");
  assert.equal( model.getUnit(6, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(5, 5).type, MySnake.BODY_W_E, "(5,5) is body");
  assert.equal( model.getUnit(5, 5).ttl, 4, "... with ttl == 4");
  assert.equal( model.getUnit(4, 5).type, MySnake.BODY_N_E, "(4,5) is body");
  assert.equal( model.getUnit(4, 5).ttl, 2, "... with ttl == 2");
  assert.equal( model.getUnit(4, 4).type, MySnake.TAIL_2_N_S, "(4,4) is tail");
  assert.equal( model.getUnit(4, 4).ttl, 2, "... with ttl == 2");
  model.tick(controller);
  assert.equal( model.getUnit(6, 5).type, MySnake.HEAD_2_W_E, "(6,5) is head");
  assert.equal( model.getUnit(6, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(5, 5).type, MySnake.BODY_W_E, "(5,5) is body");
  assert.equal( model.getUnit(5, 5).ttl, 3, "... with ttl == 3");
  assert.equal( model.getUnit(4, 5).type, MySnake.BODY_N_E, "(4,5) is body");
  assert.equal( model.getUnit(4, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 4).type, MySnake.TAIL_2_N_S, "(4,4) is tail");
  assert.equal( model.getUnit(4, 4).ttl, 1, "... with ttl == 1");
  model.tick(controller);
  assert.equal( model.getUnit(7, 5).type, MySnake.HEAD_1_W_E, "(1,5) is head");
  assert.equal( model.getUnit(7, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(6, 5).type, MySnake.BODY_W_E, "(6,5) is body");
  assert.equal( model.getUnit(6, 5).ttl, 4, "... with ttl == 4");
  assert.equal( model.getUnit(5, 5).type, MySnake.BODY_W_E, "(5,5) is body");
  assert.equal( model.getUnit(5, 5).ttl, 2, "... with ttl == 2");
  assert.equal( model.getUnit(4, 5).type, MySnake.TAIL_1_W_E, "(4,5) is tail");
  assert.equal( model.getUnit(4, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 4), null, "(4,4) is empty");
  assert.equal( model.addUnit(8, 5, MySnake.WALL, 0), true, "add wall");
  model.tick(controller);
  assert.equal( model.getUnit(7, 5).type, MySnake.HEAD_2_W_E, "(1,5) is head");
  assert.equal( model.getUnit(7, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(6, 5).type, MySnake.BODY_W_E, "(6,5) is body");
  assert.equal( model.getUnit(6, 5).ttl, 3, "... with ttl == 3");
  assert.equal( model.getUnit(5, 5).type, MySnake.BODY_W_E, "(5,5) is body");
  assert.equal( model.getUnit(5, 5).ttl, 1, "... with ttl == 1");
  assert.equal( model.getUnit(4, 5).type, MySnake.TAIL_2_W_E, "(4,5) is tail");
  assert.equal( model.getUnit(4, 5).ttl, 1, "... with ttl == 1");
  assert.equal( controller.players.length, 0, "no signal on controller");
  model.tick(controller);
  assert.equal( model.getUnit(8, 5).type, MySnake.WALL, "(8,5) is wall");
  assert.equal( model.getUnit(7, 5), null, "(7,5) is empty");
  assert.equal( model.getUnit(6, 5), null, "(6,5) is empty");
  assert.equal( model.getUnit(5, 5), null, "(5,5) is empty");
  assert.equal( model.getUnit(4, 5), null, "(4,5) is empty");
  assert.equal( model.snakes.length, 0, "no snakes");
  assert.equal( controller.players.length, 1, "signal found");
  assert.equal( controller.players[0], 1, "... is done.");
});

QUnit.test( "Head Bug", function( assert ) {
  var controller = MySnake.controller;
  var model = MySnake.model;  
  model.clear();
  assert.equal( model.addSnake(0, 3, 3, 1, 0), true, "add Snake");
  assert.equal( model.addUnit(3, 4, MySnake.CHERRY, 3), true, "add cherry");
  assert.equal( model.getUnit(3, 3).type, MySnake.HEAD_1_W_E, "(3,3) is head");
  assert.equal( model.getUnit(2, 3).type, MySnake.BODY_W_E, "(2,3) is body");
  assert.equal( model.getUnit(1, 3).type, MySnake.TAIL_1_W_E, "(1,3) is tail");
  assert.equal( model.getUnit(3, 4).type, MySnake.CHERRY, "(3,4) is head");
  model.send(0, 0, 1);
  model.tick(controller);
  assert.equal( model.getUnit(3, 3).type, MySnake.HEAD_2_W_E, "(3,3) is head");
  assert.equal( model.getUnit(2, 3).type, MySnake.BODY_W_E, "(2,3) is body");
  assert.equal( model.getUnit(1, 3).type, MySnake.TAIL_2_W_E, "(1,3) is tail");
  assert.equal( model.getUnit(3, 4).type, MySnake.CHERRY, "(3,4) is head");
  model.tick(controller);
  assert.equal( model.getUnit(3, 3).type, MySnake.BODY_W_S, "(3,3) is body");
  assert.equal( model.getUnit(2, 3).type, MySnake.BODY_W_E, "(2,3) is body");
  assert.equal( model.getUnit(3, 4).type, MySnake.HEAD_1_N_S, "(3,4) is head");
});
