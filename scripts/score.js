
//ajouter des animations lorsque que l'on depasse le meilleur score
function setScore() {
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
                    parseInt(highvalue.innerHTML, 10)&&document.querySelector("#high").className != "off"
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
var score = 0;
export { setScore,score };