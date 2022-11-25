function addEvent(snakeParam,grid) {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return (
            evt.touches || // browser API
            evt.originalEvent.touches
        ); // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
                snakeParam.dx = -grid;
                snakeParam.dy = 0;
            } else {
                snakeParam.dx = grid;
                snakeParam.dy = 0;
            }
        } else {
            if (yDiff > 0) {
                snakeParam.dy = -grid;
                snakeParam.dx = 0;
            } else {
                snakeParam.dy = grid;
                snakeParam.dx = 0;
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }
    let pauseBtn = document.querySelector("#pause");
	var paused = false;
    document.addEventListener("keydown", function (e) {
        // left arrow key
        if (e.key == "ArrowLeft" && snakeParam.dx === 0) {
            snakeParam.dx = -grid;
            snakeParam.dy = 0;
        }
        // up arrow key
        else if (e.key == "ArrowUp" && snakeParam.dy === 0) {
            snakeParam.dy = -grid;
            snakeParam.dx = 0;
        }
        // right arrow key
        else if (e.key == "ArrowRight" && snakeParam.dx === 0) {
            snakeParam.dx = grid;
            snakeParam.dy = 0;
        }
        // down arrow key
        else if (e.key == "ArrowDown" && snakeParam.dy === 0) {
            snakeParam.dy = grid;
            snakeParam.dx = 0;
        }
    });
}

export { addEvent };