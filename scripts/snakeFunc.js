

function moveSnakeLeft(snake,grid) {
    snake.dx = -grid;
    snake.dy = 0;
}
function moveSnakeRight(snake,grid) {
    snake.dx = grid;
    snake.dy = 0;
}
function moveSnakeUp(snake,grid) {
    snake.dy = -grid;
    snake.dx = 0;
}
function moveSnakeDown(snake,grid) {
    snake.dy = grid;
    snake.dx = 0;
}
//regarder si la tete du serpent touche le corps
function checksnake(snake,cell,i) {
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) 
    return true;
    else return false;
}
//regarder si la tete du serpent sort du cardre
function checkbordure(snake,canvas,grid) {
    if (snake.y < 0 ||
        snake.x < 0 ||
        (snake.cells[0].x == 0 &&
            snake.cells[0 + 1].x == canvas.width - grid) ||
        (snake.cells[0].x == canvas.width - grid &&
            snake.cells[0 + 1].x == 0) ||
        snake.y >= canvas.height
    ) return true;
    else return false;
}
function isEmpty(x, y,tabMur,snake,canvas) {
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
function snakeIa(tabFood, snake, grid,tabMur,canvas) {
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
    /*context.fillStyle = "red";
    context.fillRect(foodX, foodY, grid - 1, grid - 1);*/

    //trouver le X et Y de la nourriture la plus proche

    var vector = [snake.cells[0].x - foodX, snake.cells[0].y - foodY];
    var down = isEmpty(snake.cells[0].x, snake.cells[0].y + grid,tabMur,snake,canvas);
    var up = isEmpty(snake.cells[0].x, snake.cells[0].y - grid,tabMur,snake,canvas);
    var left = isEmpty(snake.cells[0].x - grid, snake.cells[0].y,tabMur,snake,canvas);
    var right = isEmpty(snake.cells[0].x + grid, snake.cells[0].y,tabMur,snake,canvas);
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

export { moveSnakeLeft, moveSnakeRight, moveSnakeUp, moveSnakeDown, checkbordure,checksnake,snakeIa };