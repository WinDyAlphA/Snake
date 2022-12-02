import { getRandomInt } from "./random.js";
function createMur(i, tabMur, randInt, grid) {
    tabMur[i] = {
        x: getRandomInt(0, randInt) * grid,
        y: getRandomInt(0, randInt) * grid,
      };
    while (tabMur[i].x > 130 && tabMur[i].x < 300 && tabMur[i].y > 100 && tabMur[i].y < 210) {
      tabMur[i].x = getRandomInt(0, randInt) * grid;
      tabMur[i].y = getRandomInt(0, randInt) * grid;
    }
    
}
function createPlacedMur(i, tabMur, randInt, grid, x, y) {
  tabMur[i] = {
      x: x*grid,
      y: y*grid,
    };
  
}
function createFood(i, tabFood, tabMur, randInt, grid, typepomme) {
  var newfood;
  tabFood[i] = {
    x: getRandomInt(0, randInt) * grid,
    y: getRandomInt(0, randInt) * grid,
    type: "normal",
  };
  if (typepomme) {
    var rareté = getRandomInt(0, 100);
    if (rareté % 10 == 1) {
      tabFood[i].type = "inverted";
    }
    if (rareté % 25 == 2) {
      tabFood[i].type = "invisible";
    }
    if (rareté % 100 == 0) {
      tabFood[i].type = "teleport";
    }
  }
  do {
    newfood = true;
    for (let j = 0; j < tabMur.length; j++) {
      if (tabFood[i].x == tabMur[j].x && tabFood[i].y == tabMur[j].y) {
        newfood = false;
        tabFood[i].x = getRandomInt(0, randInt) * grid;
        tabFood[i].y = getRandomInt(0, randInt) * grid;
      }
    }
    for (let j = 0; j < tabFood.length; j++) {
      if (
        tabFood[i].x == tabFood[j].x &&
        tabFood[i].y == tabFood[j].y &&
        i != j
      ) {
        newfood = false;
        tabFood[i].x = getRandomInt(0, randInt) * grid;
        tabFood[i].y = getRandomInt(0, randInt) * grid;
      }
    }
  } while (newfood == false);
}
function createPlacedFood(i, tabFood, tabMur, randInt, grid, typepomme,x,y) {
  var newfood;
  tabFood[i] = {
    x: x*grid,
    y: y*grid,
    type: "normal",
  };
  if (typepomme) {
    var rareté = getRandomInt(0, 100);
    if (rareté % 10 == 1) {
      tabFood[i].type = "inverted";
    }
    if (rareté % 25 == 2) {
      tabFood[i].type = "invisible";
    }
    if (rareté % 100 == 0) {
      tabFood[i].type = "teleport";
    }
  }
  
}
export { createFood,createMur,createPlacedFood,createPlacedMur };

