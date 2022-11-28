import { createMur,createFood } from './create.js';
import { getRandomInt } from './random.js';
import { addEvent } from './event.js';
import { moveSnakeLeft, moveSnakeRight, moveSnakeUp, moveSnakeDown, checkCollision } from './snakeFunc.js';
import { setScore } from './score.js';
import { snake } from './snake.js';
import { sprite } from './draw.js';
import { drawmur }from './draw.js';
import { drawfood }from './draw.js';

const play = (
	nbFruits,
	timingstamp,
	boolMur,
	ia,
	pixels,
	randInt,
	difficulte,
	Autorespawn
) => {
	var nbCells = document.querySelector("#taille");
	timingstamp = 10 - timingstamp;
	console.log(pixels);
	page.innerHTML =
	'<div id="affichage"><div id="score" class="score">Score :&nbsp<span id="scoreNum">0</span></div><div id="high" class="high">High Score :&nbsp<span id="highNum">0</span></div></div><canvas id="zone" width="400" height="400"></canvas><img id="source" style="display:none;" src="./image/snake-graphics.png"width="320" height="256"><img id="image-mur" style="display:none;" src="./image/Mur.png"width="320" height="256"><div id="BTN-jouer"><button id="pause">Pause</button><button id="return">Retour</button></div>';
	var canvas = document.getElementById("zone");
	var context = canvas.getContext("2d");
	var image = document.getElementById("source");
    var imagemur = document.querySelector("#image-mur");
	var grid = pixels;
	snake.dx = grid;
	var max = 0;
	var nbMur =parseInt(nbCells.value / 10 + 1) *parseInt(nbCells.value / 10 + 1) *difficulte *difficulte *2;
	var laucnhed = false;
	var score = 0;
	var count = 0;
	var tabFood = [];
	var tabMur = [];
	createMur(nbMur,tabMur,randInt,grid);
	for (let i = 0; i < nbFruits; i++) {
	createFood(i,tabFood,tabMur,randInt,grid);
	}
	function snakeOver(snake) {
		var myAudio1 = document.createElement("audio");
		myAudio1.src = "./sound/bruitTete.mp3";
		myAudio1.play();
		var myAudio2 = document.createElement("audio");
		myAudio2.src = "./sound/musiqueOver.mp3";
		myAudio2.play();
		//remise à zéro du serpent
		snake.x = 160;
		snake.y = 160;
		snake.cells = [];
		snake.maxCells = 4;
		snake.dx = grid;
		snake.dy = 0;
		//remet a zéro le css highscore et score
		let high = document.querySelector("#high");
		let score = document.querySelector("#score");
		high.classList.remove("off");
		high.classList.add("high");
		score.classList.remove("meilleur");
		score.classList.add("score");
		createMur(nbMur,tabMur,randInt,grid);
		for (let i = 0; i < nbFruits; i++) {
			createFood(i,tabFood,tabMur,randInt,grid);
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
		drawfood(tabFood,context,image,grid);
		drawmur(tabMur,context,imagemur, grid);
		
		// Dessine le serpent
		
		function isEmpty(x, y) {
			var result = true;
			for (var i = 0; i < tabMur.length; i++) {
				if (x == tabMur[i].x && y == tabMur[i].y) {
					result = false;
				}
			}
			//pour chaque cellule du serpent, on verifie si il y a une cellule du serpent qui est sur la meme case
			for (var i = 1; i < snake.cells.length; i++) {
				if (x == snake.cells[i].x && y == snake.cells[i].y) {
					result = false;
				}
			}
			if (x >= canvas.width || x < 0) {
				return false;
			}
			if (y >= canvas.height || y < 0) {
				return false;
			}
			return result;
		}

		var indexCopy;
		snake.cells.forEach(function (cell, index) {
			indexCopy = index;
			//creation d'une inteligence artificielle qui joue asnake et veut recuperer le plus de nourriture possible

			// dessine le serpent avec un padding de 1px
			// le serpent mange la nourriture
			for (var i = 0; i < tabFood.length; i++) {
				if (cell.x === tabFood[i].x && cell.y === tabFood[i].y) {
					snake.maxCells++;
					score += 1;
					document.getElementById("scoreNum").innerHTML = score;
					// 400x400 / 16 = 25 cases
					createFood(i,tabFood,tabMur,randInt,grid);
					
					var myAudio = document.createElement("audio");
					myAudio.src = "./sound/bruitMange.mp3";
					myAudio.play();
				}
			}
			for (i = 0; i < tabMur.length; i++) {
				if (cell.x == tabMur[i].x && cell.y == tabMur[i].y) {
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
					if (checkCollision(snake,canvas,grid,cell,i) == true) {
						console.log("mur");
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
			sprite(snake,context,indexCopy,image,grid);
		});
		function snakeIa() {
			var foodX = tabFood[0].x;
			var foodY = tabFood[0].y;
			var distance = 100000;
			for (let i = 0; i < tabFood.length; i++) {
				var distanceX = Math.abs(snake.x - tabFood[i].x);
				var distanceY = Math.abs(snake.y - tabFood[i].y);

				var distanceTotale = distanceX + distanceY;
				if (distanceTotale < distance) {
					distance = distanceTotale;
					foodX = tabFood[i].x;
					foodY = tabFood[i].y;
				}
			}
			//colorer la case de la nourriture
			context.fillStyle = "red";
			context.fillRect(foodX, foodY, grid - 1, grid - 1);

			//trouver le X et Y de la nourriture la plus proche

			var vector = [snake.cells[0].x - foodX, snake.cells[0].y - foodY];
			var down = isEmpty(snake.cells[0].x, snake.cells[0].y + grid);
			var up = isEmpty(snake.cells[0].x, snake.cells[0].y - grid);
			var left = isEmpty(snake.cells[0].x - grid, snake.cells[0].y);
			var right = isEmpty(snake.cells[0].x + grid, snake.cells[0].y);
			var oldDirection = snake.direction;
			// Get the direction to go
			var direction = "";
			if (vector[0] < 0 && right && oldDirection != "left") {
				direction = "right";
			} else if (vector[0] > 0 && left && oldDirection != "right") {
				direction = "left";
			} else if (vector[1] < 0 && down && oldDirection != "up") {
				direction = "down";
			} else if (vector[1] > 0 && up && oldDirection != "down") {
				direction = "up";
			}
			if (direction == "" && down) {
				direction = "down";
			} else if (direction == "" && up) {
				direction = "up";
			} else if (direction == "" && left) {
				direction = "left";
			} else if (direction == "" && right) {
				direction = "right";
			}
			//console.log(direction);
			return direction;
		}
		if (ia == true) {
			var result = snakeIa();
			if (result == "up") {
				moveSnakeUp(snake,grid);
			}
			if (result == "down") {
				moveSnakeDown(snake,grid);
			}
			if (result == "left") {
				moveSnakeLeft(snake,grid);
			}
			if (result == "right") {
				moveSnakeRight(snake,grid);
			}
		}
		//si le score dépasse le highscore alors le highscore disparait
		setScore();
	}

	
	//event listener
	addEvent(snake,grid);
	// start the game

	// let loader = document.querySelector("#loader");
	let pauseBtn = document.querySelector("#pause");
	var paused = false;
	document.addEventListener("keydown", function (e) {
        // left arrow key
        if (e.key == "Enter"||e.key == " "){
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