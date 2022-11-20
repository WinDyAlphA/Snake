var page = document.querySelector("#page");
const nbCells = document.querySelector("#taille");

window.onload = function () {
	var nbPomme = document.querySelector("#nbPomme");
	var vitesse = document.querySelector("#vitesse");
	var color = document.querySelector("#color");
	var mur = document.querySelector("#mur");
	var ia = document.querySelector("#ia");
	var Autorespawn = document.querySelector("#Autorespawn");
	var difficulte = document.querySelector("#difficulte");
	var boolMur = false;
	var pixels = 0;
	var randInt = 0;
	let compteur = 0;
	var affvitesse = document.getElementById("affvitesse");
	vitesse.oninput = function () {
		affvitesse.innerHTML = parseInt(this.value / 10 + 1);
	};
	var affpomme = document.getElementById("affpomme");
	nbPomme.oninput = function () {
		affpomme.innerHTML = parseInt(this.value / 10 + 1);
	};
	var afftaille = document.getElementById("afftaille");
	nbCells.oninput = function () {
		afftaille.innerHTML = parseInt(this.value / 10 + 1);
	};
	var affdifficulte = document.getElementById("affdifficulte");
	difficulte.oninput = function () {
		if (parseInt(this.value / 10) == 0) {
			affdifficulte.innerHTML = "Peacefull";
		}
		if (parseInt(this.value / 10) == 1) {
			affdifficulte.innerHTML = "Easy";
		}
		if (parseInt(this.value / 10) == 2) {
			affdifficulte.innerHTML = "Medium";
		}
		if (parseInt(this.value / 10) == 3) {
			affdifficulte.innerHTML = "Hard";
		}
		if (parseInt(this.value / 10) == 4) {
			affdifficulte.innerHTML = "Expert";
		}
	};

	//enregistrer les parametres dans un plusieur cookies
	function save(
		mur,
		pommes,
		vitesse,
		couleur,
		ia,
		Autorespawn,
		difficulte,
		taille
	) {
		document.cookie = "mur=" + mur + ";";
		document.cookie = "pommes=" + pommes + ";";
		document.cookie = "vitesse=" + vitesse + ";";
		document.cookie = "couleur=" + couleur + ";";
		document.cookie = "ia=" + ia + ";";
		document.cookie = "Autorespawn=" + Autorespawn + ";";
		document.cookie = "difficulte=" + difficulte + ";";
		document.cookie = "taille=" + taille + ";";
		console.log(document.cookie);
	}
	//recuperer les parametres dans les cookies
	function getCookies() {
		//recuperer le cookie qui s'apelle "mur"
		console.log(
			document.cookie
				.split("; ")
				.find((row) => row.includes("mur="))
				?.split("=")[1]
		);

		var cookies = document.cookie.split(";");
		var cookie_mur = cookies.find((row) => row.includes("mur="))?.split("=")[1];
		var cookie_pommes = cookies
			.find((row) => row.includes("pommes="))
			?.split("=")[1];
		var cookie_vitesse = cookies
			.find((row) => row.includes("vitesse="))
			?.split("=")[1];
		var cookie_couleur = cookies
			.find((row) => row.includes("couleur="))
			?.split("=")[1];
		var cookie_ia = cookies.find((row) => row.includes("ia="))?.split("=")[1];
		var cookie_Autorespawn = cookies
			.find((row) => row.includes("Autorespawn="))
			?.split("=")[1];
		var cookie_difficulte = cookies
			.find((row) => row.includes("difficulte="))
			?.split("=")[1];
		var cookie_taille = cookies
			.find((row) => row.includes("taille="))
			?.split("=")[1];

		//retrun object
		return {
			mur: cookie_mur,
			pommes: cookie_pommes,
			vitesse: cookie_vitesse,
			couleur: cookie_couleur,
			ia: cookie_ia,
			Autorespawn: cookie_Autorespawn,
			difficulte: cookie_difficulte,
			taille: cookie_taille,
		};
	}
	console.log(document.cookie);
	//modifier le html en fonction des cookies
	function setCookies() {
		var cookies = getCookies();
		console.log(cookies);
		console.log(cookies.mur);
		if (cookies.mur == "true") {
			mur.checked = true;
		}
		nbPomme.value = cookies.pommes;
		vitesse.value = cookies.vitesse;
		color.value = cookies.couleur;
		if (cookies.ia == "true") {
			ia.checked = true;
		}
		if (cookies.Autorespawn == "true") {
			Autorespawn.checked = true;
		}
		difficulte.value = cookies.difficulte;
		taille.value = cookies.taille;
		affvitesse.innerHTML = parseInt(vitesse.value / 10 + 1);
		affpomme.innerHTML = parseInt(nbPomme.value / 10 + 1);
		afftaille.innerHTML = parseInt(taille.value / 10 + 1);
		if (parseInt(difficulte.value / 10) == 0) {
			affdifficulte.innerHTML = "Peacefull";
		}
		if (parseInt(difficulte.value / 10) == 1) {
			affdifficulte.innerHTML = "Easy";
		}
		if (parseInt(difficulte.value / 10) == 2) {
			affdifficulte.innerHTML = "Medium";
		}
		if (parseInt(difficulte.value / 10) == 3) {
			affdifficulte.innerHTML = "Hard";
		}
		if (parseInt(difficulte.value / 10) == 4) {
			affdifficulte.innerHTML = "Expert";
		}
	}
	setCookies();
	document.querySelector("#play").addEventListener("click", (e) => {
		save(
			mur.checked,
			nbPomme.value,
			vitesse.value,
			color.value,
			ia.checked,
			Autorespawn.checked,
			difficulte.value,
			taille.value
		);
		console.log(nbPomme.value);
		if (Autorespawn.checked) {
			Autorespawn = true;
		} else {
			Autorespawn = false;
		}
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

		if (parseInt(nbCells.value / 10 + 1) == 1) {
			pixels = 40;
			randInt = 10;
		}
		if (parseInt(nbCells.value / 10 + 1) == 2) {
			pixels = 16;
			randInt = 25;
		}
		if (parseInt(nbCells.value / 10 + 1) == 3) {
			pixels = 8;
			randInt = 50;
		}
		if (parseInt(nbCells.value / 10 + 1) == 4) {
			pixels = 4;
			randInt = 100;
		}

		play(
			parseInt(nbPomme.value / 10 + 1),
			parseInt(vitesse.value / 10 + 1),
			color.value,
			boolMur,
			ia,
			pixels,
			randInt,
			parseInt(difficulte.value / 10 + 1),
			Autorespawn
		);

		//creer une fonction js, si le fihcier param.js existe pas on lecreer avec les parametres, sinon on recupere les parametres

		//si le fichier param.js existe on recupere les parametres
	});
};

const play = (
	nbFruits,
	timingstamp,
	color,
	boolMur,
	ia,
	pixels,
	randInt,
	difficulte,
	Autorespawn
) => {
	timingstamp = 10 - timingstamp;
	console.log(pixels);
	page.innerHTML =
		'<div id="affichage"><div id="score" class="score">Score :&nbsp<span id="scoreNum">0</span></div><div id="high" class="high">High Score :&nbsp<span id="highNum">0</span></div></div><div id="canvas"><canvas id="zone" width="400" height="400"></canvas></div><img id="source" style="display:none;" src="https://rembound.com/files/creating-a-snake-game-tutorial-with-html5/snake-graphics.png"width="320" height="256"><div id="BTN-jouer"><button id="pause">Pause</button><button id="return">Retour</button></div>';
	var canvas = document.getElementById("zone");
	var context = canvas.getContext("2d");
	var image = document.getElementById("source");
	var grid = pixels;
	var count = 0;
	var score = 0;
	var max = 0;
	var nbMur =
		parseInt(nbCells.value / 10 + 1) *
		parseInt(nbCells.value / 10 + 1) *
		difficulte *
		difficulte *
		2;
	var laucnhed = false;
	var snake = {
		x: 160,
		y: 160,

		// vitesse du serpent. 1 frame = une case parcourue
		dx: grid,
		dy: 0,
		direction: "right",
		// les cellules du serpent sont stockées dans ce tableau
		cells: [],

		//taille du serpent.
		maxCells: 4,
	};
	var tabFood = [];
	var tabMur = [];
	const createMur = () => {
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
	createMur();

	function createFood() {
		//création de la nourriture selon nbFruits, si il y a deja une pomme ou un mur on recommence
		for (let i = 0; i < nbFruits; i++) {
			tabFood[i] = {
				x: getRandomInt(0, randInt) * grid,
				y: getRandomInt(0, randInt) * grid,
			};
			for (let j = 0; j < tabMur.length; j++) {
				if (tabFood[i].x == tabMur[j].x && tabFood[i].y == tabMur[j].y) {
					createFood();
				}
			}
			for (let j = 0; j < tabFood.length; j++) {
				if (
					tabFood[i].x == tabFood[j].x &&
					tabFood[i].y == tabFood[j].y &&
					i != j
				) {
					createFood();
				}
			}
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
		let high = document.querySelector("#high");
		let score = document.querySelector("#score");
		high.classList.remove("off");
		high.classList.add("high");
		score.classList.remove("meilleur");
		score.classList.add("score");
		createMur();
		if (!Autorespawn) {
			console.log("respawn");
			paused = true;
			pauseBtn.innerHTML = "Play";
			timestamp = Infinity;
		}
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

		for (var i = 0; i < tabFood.length; i++) {
			context.drawImage(
				image,
				0 * 64,
				3 * 64,
				64,
				64,
				tabFood[i].x,
				tabFood[i].y,
				grid,
				grid
			);
		}
		//dessine les mur tabMur
		context.fillStyle = "black";
		for (var i = 0; i < tabMur.length; i++) {
			context.fillRect(tabMur[i].x, tabMur[i].y, grid - 1, grid - 1);
		}
		// Dessine le serpent
		context.fillStyle = color;
		function moveSnakeLeft() {
			snake.dx = -grid;
			snake.dy = 0;
		}
		function moveSnakeRight() {
			snake.dx = grid;
			snake.dy = 0;
		}
		function moveSnakeUp() {
			snake.dy = -grid;
			snake.dx = 0;
		}
		function moveSnakeDown() {
			snake.dy = grid;
			snake.dx = 0;
		}
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
					tabFood[i].x = getRandomInt(0, randInt) * grid;
					tabFood[i].y = getRandomInt(0, randInt) * grid;
				}
			}
			for (i = 0; i < tabMur.length; i++) {
				if (cell.x == tabMur[i].x && cell.y == tabMur[i].y) {
					if (score > max) {
						max = score;
					}
					snakeOver(snake);
					score = 0;
					for (var i = 0; i < tabFood.length; i++) {
						tabFood[i].x = getRandomInt(0, randInt) * grid;
						tabFood[i].y = getRandomInt(0, randInt) * grid;
					}

					document.getElementById("highNum").innerHTML = max;
					document.getElementById("scoreNum").innerHTML = 0;
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
						(snake.cells[0].x == 0 &&
							snake.cells[0 + 1].x == canvas.width - grid) ||
						(snake.cells[0].x == canvas.width - grid &&
							snake.cells[0 + 1].x == 0) ||
						snake.y >= canvas.height
					) {
						console.log("mur");
						if (score > max) {
							max = score;
						}
						snakeOver(snake);
						score = 0;
						for (var i = 0; i < tabFood.length; i++) {
							tabFood[i].x = getRandomInt(0, randInt) * grid;
							tabFood[i].y = getRandomInt(0, randInt) * grid;
						}

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
						for (var i = 0; i < tabFood.length; i++) {
							tabFood[i].x = getRandomInt(0, randInt) * grid;
							tabFood[i].y = getRandomInt(0, randInt) * grid;
						}
						//noter le score
						document.getElementById("highNum").innerHTML = max;
						document.getElementById("scoreNum").innerHTML = 0;
					}
				}
			}
			for (
				var compteur = indexCopy;
				compteur < snake.cells.length;
				compteur++
			) {
				// Loop over every snake segment
				/*console.log(
					"index : ",
					index,
					"x: ",
					snake.cells[compteur].x / grid,
					"y: ",
					snake.cells[compteur].y / grid,
					"foodX :",
					tabFood[0].x / grid,
					"foodY :",
					tabFood[0].y / grid
				);*/
				var cell = snake.cells[compteur];
				var segx = cell.x;
				var segy = cell.y;
				var tilex = segx * grid;
				var tiley = segy * grid;
				// Sprite column and row that gets calculated
				var tx = 0;
				var ty = 0;
				if (compteur == 0) {
					// Head; Determine the correct image
					if (snake.direction == "down") {
						// Up
						tx = 3;
						ty = 0;
					} else if (snake.direction == "right") {
						// Right
						tx = 4;
						ty = 0;
					} else if (snake.direction == "up") {
						// Down
						tx = 4;
						ty = 1;
					} else if (snake.direction == "left") {
						// Left
						tx = 3;
						ty = 1;
					}
				} else if (compteur == snake.cells.length - 1) {
					// Tail; Determine the correct image
					var presseg = snake.cells[compteur - 1]; // Prev segment
					if (presseg.y < segy) {
						// Up
						tx = 3;
						ty = 2;
					} else if (presseg.x > segx) {
						// Right
						tx = 4;
						ty = 2;
					} else if (presseg.y > segy) {
						// Down
						tx = 4;
						ty = 3;
					} else if (presseg.x < segx) {
						// Left
						tx = 3;
						ty = 3;
					}
				} else {
					// Body; Determine the correct image
					var presseg = snake.cells[compteur - 1]; // Previous segment
					var nextseg = snake.cells[compteur + 1]; // Next segmentconte
					if (
						(presseg.x < segx && nextseg.x > segx) ||
						(nextseg.x < segx && presseg.x > segx)
					) {
						// Horizontal Left-Right
						tx = 1;
						ty = 0;
					} else if (
						(presseg.x < segx && nextseg.y > segy) ||
						(nextseg.x < segx && presseg.y > segy)
					) {
						// Angle Left-Down
						tx = 2;
						ty = 0;
					} else if (
						(presseg.y < segy && nextseg.y > segy) ||
						(nextseg.y < segy && presseg.y > segy)
					) {
						// Vertical Up-Down
						tx = 2;
						ty = 1;
					} else if (
						(presseg.y < segy && nextseg.x < segx) ||
						(nextseg.y < segy && presseg.x < segx)
					) {
						// Angle Top-Left
						tx = 2;
						ty = 2;
					} else if (
						(presseg.x > segx && nextseg.y < segy) ||
						(nextseg.x > segx && presseg.y < segy)
					) {
						// Angle Right-Up
						tx = 0;
						ty = 1;
					} else if (
						(presseg.y > segy && nextseg.x > segx) ||
						(nextseg.y > segy && presseg.x > segx)
					) {
						// Angle Down-Right
						tx = 0;
						ty = 0;
					}
				}

				// Draw the image of the snake part
				context.drawImage(
					image,
					tx * 64,
					ty * 64,
					64,
					64,
					snake.cells[compteur].x,
					snake.cells[compteur].y,
					grid,
					grid
				);
			}
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
			context.fillStyle = color;

			//trouver le X et Y de la nourriture la plus proche

			var vector = [snake.cells[0].x - foodX, snake.cells[0].y - foodY];
			var down = isEmpty(snake.cells[0].x, snake.cells[0].y + grid);
			var up = isEmpty(snake.cells[0].x, snake.cells[0].y - grid);
			var left = isEmpty(snake.cells[0].x - grid, snake.cells[0].y);
			var right = isEmpty(snake.cells[0].x + grid, snake.cells[0].y);
			console.log(
				"uppppp: " +
					up +
					" down: " +
					down +
					" left: " +
					left +
					" right: " +
					right
			);
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
			console.log(direction);
			return direction;
		}
		if (ia == true) {
			var result = snakeIa();
			if (result == "up") {
				moveSnakeUp();
			}
			if (result == "down") {
				moveSnakeDown();
			}
			if (result == "left") {
				moveSnakeLeft();
			}
			if (result == "right") {
				moveSnakeRight();
			}
		}
		//si le score dépasse le highscore alors le highscore disparait
		if (document.querySelector("#high").className != "off") {
			let highvalue = document.querySelector("#highNum");
			let scorevalue = document.querySelector("#scoreNum");
			if (
				parseInt(scorevalue.innerHTML, 10) > parseInt(highvalue.innerHTML, 10)
			) {
				let high = document.querySelector("#high");
				let score = document.querySelector("#score");
				high.classList.add("transition");
				setTimeout(() => {
					if (
						parseInt(scorevalue.innerHTML, 10) >
						parseInt(highvalue.innerHTML, 10)
					) {
						high.classList.add("visibility");
						score.classList.add("transition2");
					}
					high.classList.remove("transition");
					setTimeout(() => {
						if (
							parseInt(scorevalue.innerHTML, 10) >
							parseInt(highvalue.innerHTML, 10)
						) {
							high.classList.remove("high");
							score.classList.add("meilleur");
							score.classList.remove("score");
							high.classList.add("off");
						}
						score.classList.remove("transition2");
						high.classList.remove("visibility");
					}, "2000");
				}, "2000");
			}
		}
	}

	function addEvent() {
		document.addEventListener("keydown", function (e) {
			// left arrow key
			if (
				(e.key == "Enter" || e.key == " " || e.key.includes("Arrow")) &&
				paused
			) {
				console.log("play");
				timestamp = timingstamp;
				paused = false;
				pauseBtn.innerHTML = "Pause";
			}
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
