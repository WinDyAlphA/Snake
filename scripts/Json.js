import {createFood,createMur} from "./create.js";

function fetchNiveaumenu(
  niveau,
  mur,
  typepomme,
  vitesse,
  nbPomme,
  taille,
  difficulte,
  affvitesse,
  affpomme,
  afftaille,
  affdifficulte
) {
  if (niveau != "") {
    var url = "http://127.0.0.1:5500/Projet JS/Snake/Json/" + niveau + ".json";
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json(); // une promesse
        } else {
          throw "Error " + response.status;
        }
      })
      .then(function (data) {
        if (data.bordure == "True") {
          mur.checked = true;
        } else {
          mur.checked = false;
        }
        if (data.typepomme == "True") {
          typepomme.checked = true;
        } else {
          typepomme.checked = false;
        }
        vitesse.value = data.vitesse * 10 - 5;
        affvitesse.innerHTML = data.vitesse;
        nbPomme.value = data.food.length * 10 - 5;
        affpomme.innerHTML = data.food.length;
        taille.value = data.taille * 10 - 5;
        afftaille.innerHTML = data.taille;
        difficulte.value = 0;
        affdifficulte.innerHTML = "Peacefull";
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
function fetchNiveau(niveau, tabFood, nbFruits, tabMur, snake, pixels,typepomme,randInt,grid) {
  var url = "http://127.0.0.1:5500/Projet JS/Snake/Json/" + niveau + ".json";
  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json(); // une promesse
      } else {
        throw "Error " + response.status;
      }
    })
    .then(function (data) {
      nbFruits = data.food.length;
      for (var i = 0; i < data.food.length; i++) {
        createFood(i, tabFood, tabMur, randInt, grid, typepomme);
      }
      for (var i = 0; i < data.walls.length; i++) {
        createMur(i, tabMur, randInt, grid);
      }
      for (var i = 0; i < data.snake.length; i++) {
        if (i == 0) {
          snake.x = data.snake[i][0] * pixels;
          snake.y = data.snake[i][1] * pixels;
        }
        snake.cells[i] = {
          x: data.snake[i][0] * pixels,
          y: data.snake[i][1] * pixels,
        };
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
export { fetchNiveau, fetchNiveaumenu };
