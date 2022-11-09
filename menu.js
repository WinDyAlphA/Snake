var page = document.querySelector("#page");
window.onload = function () {
	document.querySelector("#play").addEventListener("click", (e) => {
		play();
	});
};

const play = () => {
	page.innerHTML =
		'<div id="score">Score: <span id="scoreNum">0</span></div><div id="high">High Score: <span id="highNum">0</span></div><canvas id="zone" width="400" height="400" style="background-color:#2c3e50;margin:0 auto; "></canvas><button id="pause">pause</button>';
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
	var food = {
		x: 320,
		y: 320,
	};

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	//fais une animation de chargement avec ctx
	function loading() {
		var ctx = document.getElementById("zone").getContext("2d");
	}
	var timestamp = 4;
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
		var border = false;
		// si le serpent sort de l'écran, il réapparait de l'autre côté vertcialement
		if (border == false) {
			if (snake.y < 0) {
				snake.y = canvas.height - grid;
			} else if (snake.y >= canvas.height) {
				snake.y = 0;
			}
		} else if (border == true) {
			console.log(
				snake.y +
					" --- " +
					snake.x +
					" .           ." +
					canvas.height +
					" --- " +
					canvas.width
			);
			if (
				snake.y < 0 ||
				snake.x < 0 ||
				snake.x >= 384 ||
				snake.y >= canvas.height
			) {
				snake.x = 160;
				snake.y = 160;
				snake.cells = [];
				snake.maxCells = 4;
				snake.dx = grid;
				snake.dy = 0;
				score = 0;
				food.x = getRandomInt(0, 25) * grid;
				food.y = getRandomInt(0, 25) * grid;

				document.getElementById("highNum").innerHTML = "&nbsp;" + max;
			}
		}

		// garde en memoire les deplacement du serpent. debut du tableau = tete du serpent
		snake.cells.unshift({ x: snake.x, y: snake.y });
		// remove cells as we move away from them
		if (snake.cells.length > snake.maxCells) {
			snake.cells.pop();
		}
		// Dessine la nourriture
		context.fillStyle = "white";
		context.fillRect(food.x, food.y, grid - 1, grid - 1);
		// Dessine le serpent
		context.fillStyle = "#E43F5A";
		snake.cells.forEach(function (cell, index) {
			// dessine le serpent avec un padding de 1px
			context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
			// le serpent mange la nourriture
			if (cell.x === food.x && cell.y === food.y) {
				snake.maxCells++;
				score += 1;
				document.getElementById("scoreNum").innerHTML = "&nbsp;" + score;
				// 400x400 / 16 = 25 cases
				food.x = getRandomInt(0, 25) * grid;
				food.y = getRandomInt(0, 25) * grid;
			}
			// verifier collision avec le serpent
			for (var i = index + 1; i < snake.cells.length; i++) {
				// si la tete du serpent est sur une autre cellule du serpent, le jeu est perdu
				if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
					if (score > max) {
						max = score;
					}
					snake.x = 160;
					snake.y = 160;
					snake.cells = [];
					snake.maxCells = 4;
					snake.dx = grid;
					snake.dy = 0;
					score = 0;
					food.x = getRandomInt(0, 25) * grid;
					food.y = getRandomInt(0, 25) * grid;
					document.getElementById("highNum").innerHTML = "&nbsp;" + max;
					document.getElementById("scoreNum").innerHTML = "&nbsp;" + 0;
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
			timestamp = 4;
		}
	});

	requestAnimationFrame(loop);
};
