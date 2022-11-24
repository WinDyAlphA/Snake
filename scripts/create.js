import { getRandomInt } from './random.js';

function createMur (nbMur,tabMur,randInt,grid) {
    for (let i = 0; i < nbMur; i++) {
        var x = getRandomInt(0, randInt) * grid;
        var y = getRandomInt(0, randInt) * grid;
        while (x > 130 && x < 300 && y > 100 && y < 210) {
            x = getRandomInt(0, randInt) * grid;
            y = getRandomInt(0, randInt) * grid;
        }
        tabMur[i] = {
            x: x,
            y: y,
        };
    }
};
function createFood(i,tabFood,tabMur,randInt,grid){
    var newfood;
        tabFood[i] = {
            x: getRandomInt(0, randInt) * grid,
            y: getRandomInt(0, randInt) * grid,
        };
        do{
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
                    ){
                        newfood = false;
                        tabFood[i].x = getRandomInt(0, randInt) * grid;
                        tabFood[i].y = getRandomInt(0, randInt) * grid;
                }
            }
            }while(newfood==false)
        }
export { createFood };
export { createMur };