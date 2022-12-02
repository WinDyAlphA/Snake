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

export { moveSnakeLeft, moveSnakeRight, moveSnakeUp, moveSnakeDown, checkbordure,checksnake };