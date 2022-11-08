var page = document.querySelector("#page");
page.innerHTML +=
	'<canvas id="zone" width="400" height="400" style="background-color:#2c3e50;margin:0 auto; "></canvas>';
var zone = document.querySelector("#zone");
var context = zone.getContext("2d");
