var page = document.querySelector("#page");

window.onload = function () {
	var nbPomme = document.querySelector("#nbPomme");
	var vitesse = document.querySelector("#vitesse");
	var color = document.querySelector("#color");
	var mur = document.querySelector("#mur");
	var ia = document.querySelector("#ia");
	var boolMur = false;

	let compteur = 0;
	document.querySelector("#play").addEventListener("click", (e) => {
		if (mur.checked) {
			boolMur = true;
		} else {
			boolMur = false;
		}
		if (ia.checked) {
			ia = true;
		} else {
			ia = false;
		}
		play(nbPomme.value, vitesse.value, color.value, boolMur, ia);
	});
};

const play = (nbFruits, timingstamp, color, boolMur, ia) => {
	console.log(nbFruits, timingstamp, boolMur, ia);
	timingstamp = 10 - timingstamp;
	page.innerHTML =
		'<div id="score">Score :<span id="scoreNum">0</span></div><div id="high">High Score :<span id="highNum">0</span></div><canvas id="zone" width="400" height="400" style="background-color:#2c3e50;margin:0 auto; "></canvas><div id="BTN-jouer"><button id="pause">Pause</button><button id="return">Retour</button></div>';
	var canvas = document.getElementById("zone");
	var context = canvas.getContext("2d");

	var grid = 16;
	var count = 0;
	var score = 0;
	var max = 0;
	var laucnhed = false;
	var snake = {
		x: 160,
		y: 160,

		// vitesse du serpent. 1 frame = une case parcourue
		dx: grid,
		dy: 0,

		// les cellules du serpent sont stockées dans ce tableau
		cells: [],

		//taille du serpent.
		maxCells: 4,
	};
	var tabFood = [];

	function createFood() {
		//création de la nourriture selon nbFruits
		for (let i = 0; i < nbFruits; i++) {
			tabFood[i] = {
				x: getRandomInt(0, 25) * grid,
				y: getRandomInt(0, 25) * grid,
			};
		}
	}
	createFood();

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function snakeOver(snake) {
		//remise à zéro du serpent
		snake.x = 160;
		snake.y = 160;
		snake.cells = [];
		snake.maxCells = 4;
		snake.dx = grid;
		snake.dy = 0;
	}
	//fais une animation de chargement avec ctx
	function loading() {
		var ctx = document.getElementById("zone").getContext("2d");
	}
	var timestamp = timingstamp;
	//boucle infinie
	function loop() {
		requestAnimationFrame(loop);
		// ralentir la frequence d'affichage car sinon c'est trop rapide, 60/4 = 15fps
		if (++count < timestamp) {
			return;
		}
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
		context.fillStyle = "white";
		for (var i = 0; i < tabFood.length; i++) {
			context.fillRect(tabFood[i].x, tabFood[i].y, grid - 1, grid - 1);
		}
		// Dessine le serpent
		context.fillStyle = color;
		function moveSnakeLeft() {
			snake.dx = -grid;
			snake.dy = 0;
			console.log("LEFT");
		}
		function moveSnakeRight() {
			snake.dx = grid;
			snake.dy = 0;
			console.log("RIGHT");
		}
		function moveSnakeUp() {
			snake.dy = -grid;
			snake.dx = 0;
			console.log("UP");
		}
		function moveSnakeDown() {
			snake.dy = grid;
			snake.dx = 0;
			console.log("DOWN");
		}
		snake.cells.forEach(function (cell, index) {
			//creation d'une inteligence artificielle qui joue asnake et veut recuperer le plus de nourriture possible

			function snakeIa() {
				//calculer la nourriture la plus proche
				var foodX = tabFood[0].x;
				var foodY = tabFood[0].y;
				var distance = 1000;
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
				//calculer la prochaine case
				var nextX = snake.x + snake.dx;
				var nextY = snake.y + snake.dy;
				//faire un tableau des cases occupé par le serpent
				var tabSnake = [];
				for (let i = 0; i < snake.cells.length; i++) {
					tabSnake[i] = snake.cells[i].x + snake.cells[i].y;
				}
				//le serpent ne peut aller dans la directrion opposé
				if (snake.dx == -grid) {
					if (foodX > nextX) {
						moveSnakeRight();
					} else if (foodX < nextX) {
						moveSnakeLeft();
					} else if (foodY > nextY) {
						moveSnakeDown();
					} else if (foodY < nextY) {
						moveSnakeUp();
					}
				} else if (snake.dx == grid) {
					if (foodX > nextX) {
						moveSnakeRight();
					} else if (foodX < nextX) {
						moveSnakeLeft();
					} else if (foodY > nextY) {
						moveSnakeDown();
					} else if (foodY < nextY) {
						moveSnakeUp();
					}
				} else if (snake.dy == -grid) {
					if (foodX > nextX) {
						moveSnakeRight();
					} else if (foodX < nextX) {
						moveSnakeLeft();
					} else if (foodY > nextY) {
						moveSnakeDown();
					} else if (foodY < nextY) {
						moveSnakeUp();
					}
				} else if (snake.dy == grid) {
					if (foodX > nextX) {
						moveSnakeRight();
					} else if (foodX < nextX) {
						moveSnakeLeft();
					} else if (foodY > nextY) {
						moveSnakeDown();
					} else if (foodY < nextY) {
						moveSnakeUp();
					}
				}

				//si la prochaine case est occupé par le serpent, on change de direction
				if (tabSnake.includes(nextX + nextY)) {
					if (snake.dx == 0) {
						if (snake.y > foodY) {
							moveSnakeUp();
						} else {
							moveSnakeDown();
						}
					} else {
						if (snake.x > foodX) {
							moveSnakeLeft();
						} else {
							moveSnakeRight();
						}
					}
				} else {
					//si la prochaine case est la nourriture, on mange
					if (snake.x > foodX) {
						moveSnakeLeft();
					} else if (snake.x < foodX) {
						moveSnakeRight();
					} else if (snake.y > foodY) {
						moveSnakeUp();
					} else if (snake.y < foodY) {
						moveSnakeDown();
					}
				}
				//si la noutriture est sur la meme ligne que le serpent, on va vers la nourriture
				if (snake.x == foodX) {
					if (snake.y > foodY) {
						moveSnakeUp();
					} else {
						moveSnakeDown();
					}
				} else if (snake.y == foodY) {
					if (snake.x > foodX) {
						moveSnakeLeft();
					} else {
						moveSnakeRight();
					}
				}

				//le serpent ne dois pas se manger la queue, si il va dans la direction de la queue, il tourne a droite

				//il va a la nouriture la plus proche
				// if (snake.x < foodX) {
				// 	moveSnakeRight();
				// 	console.log("r");
				// } else if (snake.x > foodX) {
				// 	moveSnakeLeft();
				// 	console.log("l");
				// } else if (snake.y < foodY) {
				// 	moveSnakeDown();
				// 	console.log("d");
				// } else if (snake.y > foodY) {
				// 	moveSnakeUp();
				// 	console.log("u");
				// }
			}
			if (ia == true) {
				snakeIa();
			}

			// dessine le serpent avec un padding de 1px
			context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
			// le serpent mange la nourriture
			for (var i = 0; i < tabFood.length; i++) {
				if (cell.x === tabFood[i].x && cell.y === tabFood[i].y) {
					snake.maxCells++;
					score += 1;
					document.getElementById("scoreNum").innerHTML = "&nbsp;" + score;
					// 400x400 / 16 = 25 cases
					tabFood[i].x = getRandomInt(0, 25) * grid;
					tabFood[i].y = getRandomInt(0, 25) * grid;
				}
			}

			// verifier collision avec le serpent
			for (var i = index + 1; i < snake.cells.length; i++) {
				// si la tete du serpent est sur une autre cellule du serpent, le jeu est perdu
				if (border == true) {
					if (
						//condition pour que le bords de l'ecran soit solide +lui meme
						(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) ||
						snake.y < 0 ||
						snake.x < 0 ||
						(snake.cells[0].x == 0 && snake.cells[0 + 1].x == 384) ||
						(snake.cells[0].x == 384 && snake.cells[0 + 1].x == 0) ||
						snake.y >= canvas.height
					) {
						if (score > max) {
							max = score;
						}
						snakeOver(snake);
						score = 0;
						for (var i = 0; i < tabFood.length; i++) {
							tabFood[i].x = getRandomInt(0, 25) * grid;
							tabFood[i].y = getRandomInt(0, 25) * grid;
						}

						document.getElementById("highNum").innerHTML = "&nbsp;" + max;
						document.getElementById("scoreNum").innerHTML = "&nbsp;" + 0;
					}
				}

				if (border == false) {
					//gestion des bordures, il reaparait de l'autre cote
					if (snake.y < 0) {
						snake.y = canvas.height - grid;
					} else if (snake.y >= canvas.height) {
						snake.y = 0;
					}
					//si la tete du serpent est sur une autre cellule du serpent, le jeu est perdu
					if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
						if (score > max) {
							max = score;
						}
						snakeOver(snake);
						score = 0;
						for (var i = 0; i < tabFood.length; i++) {
							tabFood[i].x = getRandomInt(0, 25) * grid;
							tabFood[i].y = getRandomInt(0, 25) * grid;
						}
						//noter le score
						document.getElementById("highNum").innerHTML = "&nbsp;" + max;
						document.getElementById("scoreNum").innerHTML = "&nbsp;" + 0;
					}
				}
			}
		});
	}

	function addEvent() {
		document.addEventListener("keydown", function (e) {
			// left arrow key

			if (e.key == "ArrowLeft" && snake.dx === 0) {
				snake.dx = -grid;
				snake.dy = 0;
			}
			// up arrow key
			else if (e.key == "ArrowUp" && snake.dy === 0) {
				snake.dy = -grid;
				snake.dx = 0;
			}
			// right arrow key
			else if (e.key == "ArrowRight" && snake.dx === 0) {
				snake.dx = grid;
				snake.dy = 0;
			}
			// down arrow key
			else if (e.key == "ArrowDown" && snake.dy === 0) {
				snake.dy = grid;
				snake.dx = 0;
			}
		});
	}
	//event listener
	addEvent();
	// start the game

	// let loader = document.querySelector("#loader");
	let pauseBtn = document.querySelector("#pause");

	var paused = false;
	pauseBtn.addEventListener("click", () => {
		if (!paused) {
			paused = true;
			pauseBtn.innerHTML = "Play";
			timestamp = 10000;
		} else {
			paused = false;
			pauseBtn.innerHTML = "Pause";
			timestamp = timingstamp;
		}
	});

	let returnBTN = document.querySelector("#return");
	returnBTN.addEventListener("click",()=>{
		console.log(window.location);
		window.location = window.location;

	});

	requestAnimationFrame(loop);

	//deplacer le serpent vers la droite
};
