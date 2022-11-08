var canvas = document.getElementById("zone");
var context = canvas.getContext("2d");

function carre(x, y, w, h) {
	context.beginPath();
	context.rect(0, 0, 800, 600);
	context.fillStyle = "#FFFFFF";
	context.fillStyle = "rgba(225,225,225,0.5)";
	context.fillRect(x, y, w, h);
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = "#000000";
	context.stroke();
	context.closePath();
}
function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	};
}
function isInside(pos, rect) {
	return (
		pos.x > rect.x &&
		pos.x < rect.x + rect.width &&
		pos.y < rect.y + rect.height &&
		pos.y > rect.y
	);
}
var btn1 = {
	x: 20,
	y: 30,
	width: 80,
	height: 40,
};
var btn2 = {
	x: 130,
	y: 30,
	width: 80,
	height: 40,
};
canvas.addEventListener(
	"click",
	function (evt) {
		var mousePos = getMousePos(canvas, evt);

		if (isInside(mousePos, btn1)) {
			console.log("btn1 on");
		} else {
			console.log("btn1 off");
		}
		if (isInside(mousePos, btn2)) {
			console.log("btn2 on");
		} else {
			console.log("btn2 off");
		}
	},
	false
);
function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	carre(20, 30, 80, 40);
	carre(130, 30, 80, 40);
}

draw();
