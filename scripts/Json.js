var dataQ;

function fetchNiveaumenu(niveau, mur, typepomme, vitesse, nbPomme, taille, difficulte) {
    if (niveau != ""){
        console.log(niveau);
    var url = "http://127.0.0.1:5500/Projet JS/Snake/Json/" + niveau + ".json";
    console.log(url);
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json(); // une promesse
            } else {
                throw ("Error " + response.status);
            }
        })
        .then(function (data) {
            dataQ = data;
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
            console.log(vitesse);
            vitesse.value = data.vitesse * 10 - 5;
            nbPomme.value = data.food.length * 10 - 5;
            taille.value = data.taille * 10 - 5;
            difficulte.value = 0;
        })
        .catch(function (err) {
            console.log(err);
        }
        );
    }
}
function fetchNiveau(id, tabFood, nbFruits, tabMur, snake) {

    nbFruits = dataQ.food.length;
    for (var i = 0; i < dataQ.food.length; i++) {
        tabFood[i] = {
            x: dataQ.food[i][0] * 40,
            y: dataQ.food[i][1] * 40
        };
    }
    for (var i = 0; i < dataQ.walls.length; i++) {
        tabMur[i] = {
            x: dataQ.walls[i][0] * 40,
            y: dataQ.walls[i][1] * 40
        };
    }
    for (var i = 0; i < dataQ.snake.length; i++) {
        snake.cells[i] = {
            x: dataQ.snake[i][0] * 40,
            y: dataQ.snake[i][1] * 40
        };
    }
}
export { fetchNiveau, fetchNiveaumenu };