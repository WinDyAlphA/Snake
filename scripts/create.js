import { getRandomInt } from './random.js';

function createMur (nbMurParam,tabMurParam,randInt,grid) {
    for (let i = 0; i < nbMurParam; i++) {
        var x = getRandomInt(0, randInt) * grid;
        var y = getRandomInt(0, randInt) * grid;
        while (x > 130 && x < 300 && y > 100 && y < 210) {
            x = getRandomInt(0, randInt) * grid;
            y = getRandomInt(0, randInt) * grid;
        }
        tabMurParam[i] = {
            x: x,
            y: y,
        };
    }
    return tabMurParam;
};
function createFood(index,tabFood,randInt,grid,tabMur) {
    var newfood = true;
    console.log(tabFood[0],index);
    tabFood[index] = {
        x: getRandomInt(0, randInt) * grid,
        y: getRandomInt(0, randInt) * grid,
    };
    do{
        newfood = true;
        for (let j = 0; j < tabMur.length; j++) {
            if (tabFood[index].x == tabMur[j].x && tabFood[index].y == tabMur[j].y) {
                newfood = false;
                tabFood[index].x = getRandomInt(0, randInt) * grid;
                tabFood[index].y = getRandomInt(0, randInt) * grid;
            }
        }
        for (let j = 0; j < tabFood.length; j++) {
            if (
                tabFood[index].x == tabFood[j].x &&
                tabFood[index].y == tabFood[j].y &&
                index != j
                ) {
                    newfood = false;
                    tabFood[index].x = getRandomInt(0, randInt) * grid;
                    tabFood[index].y = getRandomInt(0, randInt) * grid;
                }
            }
        }while(newfood==false)
    }
export { createMur };