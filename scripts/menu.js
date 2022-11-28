import { save, emptyCookies, setCookies } from "./cookies.js";
import { play } from "./play.js";
var page = document.querySelector("#page");

window.onload = function () {
  var canvas2 = document.querySelector("#load");
  var context2 = canvas2.getContext("2d");
  var sprite = document.querySelector("#sprite");
  var affloader = document.querySelector("#affloader");
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function createMotion(i) {
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.drawImage(sprite, 4 * 64, 2 * 64, 64, 64, 0, 0, 40, 40);
    affloader.innerHTML = i * 5 + 10 + "&nbsp%";
    if (i != 18) {
      context2.drawImage(sprite, 0 * 64, 3 * 64, 64, 64, 760, 0, 40, 40);
    }
    var j = 0;
    for (j = 1; j < i + 1; j++) {
      context2.drawImage(sprite, 1 * 64, 0 * 64, 64, 64, j * 40, 0, 40, 40);
    }
    context2.drawImage(sprite, 4 * 64, 0 * 64, 64, 64, j * 40, 0, 40, 40);
  }
  async function test() {
    for (var i = 1; i < 19; i++) {
      createMotion(i);
      await sleep(Math.floor(Math.random() * (150 - 0)) + 0);
    }
  }
  test();
  setTimeout(() => {
    page.innerHTML =
      '<div id="parametre"><div><Label>Activer Bordure</Label><input id="mur" type="checkbox"><div><Label>Activer Pommes Spécial</Label><input id="typepomme" type="checkbox"></div><div><Label>Auto-respawn</Label><input id="Autorespawn" type="checkbox"></div><div><Label>Activer IA</Label><input id="ia" type="checkbox"></div><div><Label>Choisi la vitesse :&nbsp<span id="affvitesse">4</span></Label><input id="vitesse" type="range" min="1" max="99" step="1" value="1" class="slider"></div><div><Label>Choisi le nombre de pomme :&nbsp<span id="affpomme">1</span></Label><input id="nbPomme" type="range" min="1" max="99" step="1" value="1" class="slider"></div><div><Label>Choisi la taille :&nbsp<span id="afftaille">2</span></Label><input id="taille" type="range" min="1" max="39" step="1" value="15" class="slider"></div><div><Label>Choisi la difficulté :&nbsp<span id="affdifficulte">Medium</span></Label><input id="difficulte" type="range" min="0" max="49" step="1" value="25" class="slider"></div></div><div id="play">PLAY</div></div>';
    var nbCells = document.querySelector("#taille");
    var nbPomme = document.querySelector("#nbPomme");
    var typepomme = document.querySelector("#typepomme");
    var vitesse = document.querySelector("#vitesse");
    var mur = document.querySelector("#mur");
    var ia = document.querySelector("#ia");
    var Autorespawn = document.querySelector("#Autorespawn");
    var difficulte = document.querySelector("#difficulte");
    var boolMur = false;
    var pixels = 0;
    var randInt = 0;
    let compteur = 0;
    var affvitesse = document.getElementById("affvitesse");
    vitesse.oninput = function () {
      affvitesse.innerHTML = parseInt(this.value / 10 + 1);
    };
    var affpomme = document.getElementById("affpomme");
    nbPomme.oninput = function () {
      affpomme.innerHTML = parseInt(this.value / 10 + 1);
    };
    var afftaille = document.getElementById("afftaille");
    nbCells.oninput = function () {
      afftaille.innerHTML = parseInt(this.value / 10 + 1);
    };
    var affdifficulte = document.getElementById("affdifficulte");
    difficulte.oninput = function () {
      if (parseInt(this.value / 10) == 0) {
        affdifficulte.innerHTML = "Peacefull";
      }
      if (parseInt(this.value / 10) == 1) {
        affdifficulte.innerHTML = "Easy";
      }
      if (parseInt(this.value / 10) == 2) {
        affdifficulte.innerHTML = "Medium";
      }
      if (parseInt(this.value / 10) == 3) {
        affdifficulte.innerHTML = "Hard";
      }
      if (parseInt(this.value / 10) == 4) {
        affdifficulte.innerHTML = "Expert";
      }
    };

    //enregistrer les parametres dans un plusieur cookies

    //recuperer les parametres dans les cookies
    //si les cookies sont vides

    console.log(document.cookie);
    //modifier le html en fonction des cookies

    emptyCookies();
    setCookies();
    document.querySelector("#play").addEventListener("click", (e) => {
      save(
        mur.checked,
        nbPomme.value,
        vitesse.value,
        ia.checked,
        Autorespawn.checked,
        difficulte.value,
        taille.value,
        typepomme.checked
      );
      console.log(nbPomme.value);
      if (Autorespawn.checked) {
        Autorespawn = true;
      } else {
        Autorespawn = false;
      }
      if (mur.checked) {
        boolMur = true;
      } else {
        boolMur = false;
      }
      if (ia.checked) {
        ia = true;
      } else {
        ia = false;
      }
      if (typepomme.checked) {
        typepomme = true;
      } else {
        typepomme = false;
      }

      if (parseInt(nbCells.value / 10 + 1) == 1) {
        pixels = 40;
        randInt = 10;
      }
      if (parseInt(nbCells.value / 10 + 1) == 2) {
        pixels = 16;
        randInt = 25;
      }
      if (parseInt(nbCells.value / 10 + 1) == 3) {
        pixels = 8;
        randInt = 50;
      }
      if (parseInt(nbCells.value / 10 + 1) == 4) {
        pixels = 4;
        randInt = 100;
      }

      play(
        parseInt(nbPomme.value / 10 + 1),
        parseInt(vitesse.value / 10 + 1),
        boolMur,
        ia,
        pixels,
        randInt,
        parseInt(difficulte.value / 10),
        Autorespawn,
        typepomme
      );

      //creer une fonction js, si le fihcier param.js existe pas on lecreer avec les parametres, sinon on recupere les parametres

      //si le fichier param.js existe on recupere les parametres
    });
    var body = document.querySelector("#body");
    body.classList.remove("loader");
    body.classList.add("test");
  }, 1600);
};
