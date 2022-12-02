import { createMur, createFood } from "./create.js";
import { getRandomInt } from "./random.js";
import { addEvent } from "./event.js";
import {
  moveSnakeLeft,
  moveSnakeRight,
  moveSnakeUp,
  moveSnakeDown,
  checkbordure,
  checksnake,
  snakeIa,
} from "./snakeFunc.js";
import { setScore } from "./score.js";
import { snake } from "./snake.js";
import { sprite,drawmur,drawfood } from "./draw.js";
import { fetchNiveau } from "./Json.js";

const play = (
  nbFruits,
  timingstamp,
  boolMur,
  ia,
  pixels,
  randInt,
  difficulte,
  Autorespawn,
  typepomme,
  niveau
) => {
  var nbCells = document.querySelector("#taille");
  if (timingstamp >= 5) {
    timingstamp = 10 - timingstamp;
  } else {
    timingstamp = Math.pow(2, 7 - timingstamp);
  }
  page.innerHTML =
    '<div id="affichage"><div id="score" class="score">Score :&nbsp<span id="scoreNum">0</span></div><div id="high" class="high">High Score :&nbsp<span id="highNum">0</span></div></div><canvas id="zone" width="400" height="400"></canvas><img id="source" style="display:none;" src="./image/snake-sprite2.png"width="320" height="256"><img id="inverted" style="display:none;" src="./image/snake-sprite2-inverted.png"width="320" height="256"><img id="image-mur" style="display:none;" src="./image/Mur.png"width="320" height="256"><div id="BTN-jouer"><button id="pause">Pause</button><button id="return">Retour</button></div>';
  // prend les élément nécessaire
  var canvas = document.getElementById("zone");
  var context = canvas.getContext("2d");
  var image = document.querySelector("#source");
  var imagemur = document.querySelector("#image-mur");
  var grid = pixels;
  snake.dx = grid;
  var max = 0;
  var nbMur =
    parseInt(nbCells.value / 10 + 1) *
    parseInt(nbCells.value / 10 + 1) *
    difficulte *
    difficulte *
    2;
  var laucnhed = false;
  var score = 0;
  var count = 0;
  var tabFood = [];
  var invisible = false;
  var tabMur = [];
  let invi;
  if (niveau == "") {
    for (let i = 0; i < nbMur; i++) {
      createMur(i, tabMur, randInt, grid);
    }
    for (let i = 0; i < nbFruits; i++) {
      createFood(i, tabFood, tabMur, randInt, grid, typepomme);
    }
  } else {
    fetchNiveau(niveau, tabFood, nbFruits, tabMur, snake, pixels,typepomme,randInt,grid);
    nbFruits = tabFood.length;
  }
  function snakeOver(snake) {
    var myAudio1 = document.createElement("audio");
    myAudio1.src = "./sound/bruitTete.mp3";
    myAudio1.play();
    //remise à zéro du serpent
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    //remet à zéro pour l'invisible
    clearTimeout(invi);
    image = document.getElementById("source");
    invisible = false;
    //clearInterval(t);
    //remet a zéro le css highscore et score
    let high = document.querySelector("#high");
    let score = document.querySelector("#score");
    high.classList.remove("off");
    high.classList.add("high");
    score.classList.remove("meilleur");
    score.classList.add("score");
    // Regénére le niveau ou une map aléatoire
    if (niveau == "") {
      createMur(nbMur, tabMur, randInt, grid);
      for (let i = 0; i < nbFruits; i++) {
        createFood(i, tabFood, tabMur, randInt, grid, typepomme);
      }
    } else {
      fetchNiveau(niveau, tabFood, nbFruits, tabMur, snake, pixels,typepomme,randInt,grid);
    }
    //met en pause si l'autorespawn n'est pas activer
    if (!Autorespawn) {
      paused = true;
      pauseBtn.innerHTML = "Play";
      timestamp = Infinity;
    }
  }
  var timestamp = timingstamp;
  //boucle infinie
  function loop() {
    requestAnimationFrame(loop);
    // ralentir la frequence d'affichage car sinon c'est trop rapide, 60/4 = 15fps
    if (++count < timestamp) {
      return;
    }
    //set snake direction with dx and dy
    function setDirection(dx, dy) {
      if (dy == 0 && dx == grid) {
        snake.direction = "right";
      }
      if (dy == 0 && dx == -grid) {
        snake.direction = "left";
      }
      if (dy == grid && dx == 0) {
        snake.direction = "up";
      }
      if (dy == -grid && dx == 0) {
        snake.direction = "down";
      }
    }
    setDirection(snake.dx, snake.dy);

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    // bouger selon sa rapidité
    snake.x += snake.dx;
    snake.y += snake.dy;
    // si le serpent sort de l'écran, il réapparait de l'autre côté horizontalement
    if (snake.x < 0) {
      snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
      snake.x = 0;
    }

    var border = boolMur;

    //si le serpent sort de l'écran, il réapparait de l'autre côté vertcialement

    // garde en memoire les deplacement du serpent. debut du tableau = tete du serpent
    snake.cells.unshift({ x: snake.x, y: snake.y });
    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
    // Dessine la nourriture
    drawfood(tabFood, context, image, grid);
    drawmur(tabMur, context, imagemur, grid);

    // Dessine le serpent

    

    var indexCopy;
    snake.cells.forEach(function (cell, index) {
      indexCopy = index;
      //creation d'une inteligence artificielle qui joue asnake et veut recuperer le plus de nourriture possible

      // dessine le serpent avec un padding de 1px
      // le serpent mange la nourriture
      for (var i = 0; i < tabFood.length; i++) {
        if (cell.x === tabFood[i].x && cell.y === tabFood[i].y) {
          console.log(tabFood[i].type);
          //defferent comportement selon le type de pomme
          if (tabFood[i].type == "normal") {
            console.log("mange");
          }
          //devient invisible pendant 4 secondes
          if (tabFood[i].type == "invisible") {
            invisible = true;
            image = document.getElementById("inverted");
            invi = setTimeout(() => {
              var i = 0;
              let t = setInterval(() => {
                i++;
                if (i % 2 == 0) image = document.getElementById("inverted");
                else image = document.getElementById("source");
              }, 200);
              setTimeout(() => {
                image = document.getElementById("source");
                invisible = false;
                clearInterval(t);
              }, 1000);
            }, 3000);
            snake.maxCells--;
            score -= 2;
            document.getElementById("scoreNum").innerHTML = score;
          }
          if (tabFood[i].type == "teleport") {
            snake.x = getRandomInt(0, randInt) * grid;
            snake.y = getRandomInt(0, randInt) * grid;
          }
          //change de direction au hasard
          if (tabFood[i].type == "inverted") {
            var choix = Math.floor(Math.random() * 2);
            if (snake.dy == 0) {
              console.log(choix);
              if (choix == 0) {
                snake.dx = 0;
                snake.dy = grid;
              } else {
                snake.dx = 0;
                snake.dy = -grid;
              }
            } else {
              if (choix == 0) {
                snake.dx = grid;
                snake.dy = 0;
              } else {
                snake.dx = -grid;
                snake.dy = 0;
              }
            }
          }
          snake.maxCells++;
          score += 1;
          document.getElementById("scoreNum").innerHTML = score;
          createFood(i, tabFood, tabMur, randInt, grid, typepomme);

          var myAudio = document.createElement("audio");
          myAudio.src = "./sound/bruitMange.mp3";
          myAudio.play();
        }
      }
      for (i = 0; i < tabMur.length; i++) {
        if (cell.x == tabMur[i].x && cell.y == tabMur[i].y && !invisible) {
          if (score > max) {
            max = score;
          }

          snakeOver(snake);
          score = 0;

          document.getElementById("highNum").innerHTML = max;
          document.getElementById("scoreNum").innerHTML = 0;
        }
      }

      // verifier collision avec le serpent
      for (var i = index + 1; i < snake.cells.length; i++) {
        // si la tete du serpent est sur une autre cellule du serpent, le jeu est perdu
        if (border == true) {
          if (
            checkbordure(snake, canvas, grid) == true ||
            (checksnake(snake, cell, i) == true && invisible == false)
          ) {
            console.log("bordure");
            if (score > max) {
              max = score;
            }
            snakeOver(snake);
            score = 0;

            document.getElementById("highNum").innerHTML = max;
            document.getElementById("scoreNum").innerHTML = 0;
          }
        }

        if (border == false) {
          //gestion des bordures, il reaparait de l'autre cote
          if (snake.y < -0) {
            console.log("negatif");
            snake.y = canvas.height - grid;
          } else if (snake.y >= canvas.height) {
            console.log("postifi");
            snake.y = 0;
          }
          //si la tete du serpent est sur une autre cellule du serpent, le jeu est perdu
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            if (score > max) {
              max = score;
            }
            snakeOver(snake);
            score = 0;
            //noter le score
            document.getElementById("highNum").innerHTML = max;
            document.getElementById("scoreNum").innerHTML = 0;
          }
        }
      }
      sprite(snake, context, indexCopy, image, grid);
    });
    function gameToArray() {
      //creer un tableau de 2 dimensions de taille canvas.width/grid
      var tab = new Array(canvas.width / grid);
      for (var i = 0; i < tab.length; i++) {
        tab[i] = new Array(canvas.height / grid);
      }
      //fill le tableau avec des 0
      for (var i = 0; i < tab.length; i++) {
        for (var j = 0; j < tab[i].length; j++) {
          tab[i][j] = "EMPTY";
        }
      }

      //remplir le tableau avec la postion des murs represente par "MUR"
      for (var i = 0; i < tabMur.length; i++) {
        tab[tabMur[i].x / grid][tabMur[i].y / grid] = "MUR";
      }
      //remplir le tableau avec la postion des pommes represente par "POMME"
      for (var i = 0; i < tabFood.length; i++) {
        tab[tabFood[i].x / grid][tabFood[i].y / grid] = "POMME";
      }
      //remplir le tableau avec la postion du serpent represente par "SERPENT"
      for (var i = 0; i < snake.cells.length; i++) {
        tab[snake.cells[i].x / grid][snake.cells[i].y / grid] = "SERPENT";
      }
      return tab;
    }
    //uncomment pour voir le tableau 2d
    //console.log(gameToArray());
    
    if (ia == true) {
      var result = snakeIa(tabFood, snake, grid,tabMur,canvas);
      if (result == "up") {
        moveSnakeUp(snake, grid);
      }
      if (result == "down") {
        moveSnakeDown(snake, grid);
      }
      if (result == "left") {
        moveSnakeLeft(snake, grid);
      }
      if (result == "right") {
        moveSnakeRight(snake, grid);
      }
    }
    //si le score dépasse le highscore alors le highscore disparait
    setScore();
  }

  //event listener
  addEvent(snake, grid);

  // let loader = document.querySelector("#loader");
  let pauseBtn = document.querySelector("#pause");
  var paused = false;
  document.addEventListener("keydown", function (e) {
    // left arrow key
    if (e.key == "Enter" || e.key == " ") {
      if (!paused) {
        paused = true;
        pauseBtn.innerHTML = "Play";
        timestamp = Infinity;
      } else {
        paused = false;
        pauseBtn.innerHTML = "Pause";
        timestamp = timingstamp;
      }
    }
  });
  pauseBtn.addEventListener("click", () => {
    if (!paused) {
      paused = true;
      pauseBtn.innerHTML = "Play";
      timestamp = Infinity;
    } else {
      paused = false;
      pauseBtn.innerHTML = "Pause";
      timestamp = timingstamp;
    }
  });

  let returnBTN = document.querySelector("#return");
  returnBTN.addEventListener("click", () => {
    console.log(window.location);
    window.location = window.location;
  });
  requestAnimationFrame(loop);
};

export { play };
