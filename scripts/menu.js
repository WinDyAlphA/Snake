import { save, emptyCookies, setCookies } from "./cookies.js";
import { play } from "./play.js";
import { fetchNiveaumenu } from "./Json.js";
var page = document.querySelector("#page");

window.onload = function () {
  var canvas2 = document.querySelector("#load");
  var context2 = canvas2.getContext("2d");
  var sprite = document.querySelector("#sprite");
  var affloader = document.querySelector("#affloader");
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //function d'animation du loader il augmente 5% entre 0 et 150ms
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
      '<div id="rules"> <div class="ruleExplain"> <img src="image/apple.png" alt="apple" width="50px" height="50px"> <p>Pomme naturelle, vous fait grandir.</p> </div> <div class="ruleExplain"> <img src="image/apple_inverted.png" alt="apple" width="50px" height="50px"> <p>Pomme inverse, vous envoie dans une direction au hasard, ne vous fait pas grandir</p> </div> <div class="ruleExplain"> <img src="image/apple_aec.png" alt="apple" width="50px" height="50px"> <p>Pomme arc-en-ciel, vous devenez invisble et pouvez passer a travers les obstacles et vous-même</p> </div> <div class="ruleExplain"> <img src="image/apple_glitch.png" alt="apple" width="50px" height="50px"> <p>Pomme bug, vous téléporte a un endroit alétoire, attention au murs!</p> </div> </div><div id="parametre"><div><label for="niveau-select">Choisie un niveau:</label><select name="pets" id="niveau-select"><option value="">Aucun</option><option value="Niveau1">Niveau 1</option><option value="Niveau2">Niveau 2</option><option value="Niveau3">Niveau 3</option><option value="Niveau4">Niveau 4</option><option value="Niveau5">Niveau 5</option></select></div><div><Label>Activer Bordure</Label><input id="mur" type="checkbox"></div><div><Label>Activer Pommes Spécial</Label><input id="typepomme" type="checkbox"></div><div><Label>Auto-respawn</Label><input id="Autorespawn" type="checkbox"></div><div><Label>Activer IA</Label><input id="ia" type="checkbox"></div><div><Label>Choisi la vitesse :&nbsp<span id="affvitesse">4</span></Label><input id="vitesse" type="range" min="1" max="99" step="1" value="1" class="slider"></div><div><Label>Choisi le nombre de pomme :&nbsp<span id="affpomme">1</span></Label><input id="nbPomme" type="range" min="1" max="99" step="1" value="1" class="slider"></div><div><Label>Choisi la taille :&nbsp<span id="afftaille">2</span></Label><input id="taille" type="range" min="1" max="39" step="1" value="15" class="slider"></div><div><Label>Choisi la difficulté :&nbsp<span id="affdifficulte">Medium</span></Label><input id="difficulte" type="range" min="0" max="49" step="1" value="25" class="slider"></div></div><div id="play">PLAY</div></div>';
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
    var niveau = document.getElementById("niveau-select");
    niveau.oninput = function () {
      fetchNiveaumenu(
        niveau.value,
        mur,
        typepomme,
        vitesse,
        nbPomme,
        taille,
        difficulte,
        affvitesse,
        affpomme,
        afftaille,
        affdifficulte
      );
    };
    //affichage des valeurs des sliders
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

    //console.log(document.cookie);
    //modifier le html en fonction des cookies

    emptyCookies(niveau);
    setCookies(niveau);
    document.querySelector("#play").addEventListener("click", (e) => {
      save(
        mur.checked,
        nbPomme.value,
        vitesse.value,
        ia.checked,
        Autorespawn.checked,
        difficulte.value,
        taille.value,
        typepomme.checked,
        niveau.value
      );
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
        typepomme,
        niveau.value
      );

      //creer une fonction js, si le fihcier param.js existe pas on lecreer avec les parametres, sinon on recupere les parametres

      //si le fichier param.js existe on recupere les parametres
    });
    var body = document.querySelector("#body");
    body.classList.remove("loader");
    body.classList.add("test");
  }, 1600);
};
