var page = document.querySelector("#page");

document.querySelector("#play").addEventListener("click", () => {
	page.innerHTML =
		'<canvas id="zone" width="400" height="400" style="background-color:#2c3e50;margin:0 auto; "></canvas>';
	play();
});

const play = () => {
	var zone = document.querySelector("#zone");
	var context = zone.getContext("2d");
	console.log("aaa");
};
