function sprite(snake,context,indexCopy,image,grid) {
    for (var compteur = indexCopy;compteur < snake.cells.length;compteur++) {
        // Sprite snake cell par cell
        var cell = snake.cells[compteur];
        var segx = cell.x;
        var segy = cell.y;
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
}
function drawfood (tabFood,context,image,grid){
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
}
//dessine les mur tabMur
function drawmur (tabMur,context,image,grid){
    for (var i = 0; i < tabMur.length; i++) {
        context.drawImage(image,0,0,640,640,tabMur[i].x, tabMur[i].y, grid - 1, grid - 1);
    }
}
export { sprite };
export { drawmur };
export { drawfood };