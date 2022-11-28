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

function checksnake(snake,canvas,grid,cell,i) {
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) 
    return true;
    else return false;
}
function checkbordure(snake,canvas,grid,cell,i) {
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