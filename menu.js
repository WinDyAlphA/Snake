var play = document.querySelector("#play");
var page = document.querySelector("#page");
var play = false;

play.addEventListener("click", () => {
	page.innerHTML +=
		'<canvas id="zone" width="400" height="400" style="background-color:#2c3e50;margin:0 auto; "></canvas>';
	play = true;
});

if (play) {
	var zone = document.querySelector("#zone");
	var context = zone.getContext("2d");
}
