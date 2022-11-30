function save(
  mur,
  pommes,
  vitesse,
  ia,
  Autorespawn,
  difficulte,
  taille,
  typepomme,
  niveau
) {
  document.cookie = "mur=" + mur + ";";
  document.cookie = "pommes=" + pommes + ";";
  document.cookie = "vitesse=" + vitesse + ";";
  document.cookie = "ia=" + ia + ";";
  document.cookie = "Autorespawn=" + Autorespawn + ";";
  document.cookie = "difficulte=" + difficulte + ";";
  document.cookie = "taille=" + taille + ";";
  document.cookie = "typepomme=" + typepomme + ";";
  document.cookie = "niveau=" + niveau + ";";
}
function getCookies() {
  var cookies = document.cookie.split(";");
  var cookie_mur = cookies.find((row) => row.includes("mur="))?.split("=")[1];
  var cookie_pommes = cookies
    .find((row) => row.includes("pommes="))
    ?.split("=")[1];
  var cookie_vitesse = cookies
    .find((row) => row.includes("vitesse="))
    ?.split("=")[1];
  var cookie_ia = cookies.find((row) => row.includes("ia="))?.split("=")[1];
  var cookie_Autorespawn = cookies
    .find((row) => row.includes("Autorespawn="))
    ?.split("=")[1];
  var cookie_difficulte = cookies
    .find((row) => row.includes("difficulte="))
    ?.split("=")[1];
  var cookie_taille = cookies
    .find((row) => row.includes("taille="))
    ?.split("=")[1];
  var cookie_typepomme = cookies
    .find((row) => row.includes("typepomme="))
    ?.split("=")[1];
  var cookie_niveau = cookies
    .find((row) => row.includes("niveau="))
    ?.split("=")[1];
  //retrun object
  return {
    mur: cookie_mur,
    pommes: cookie_pommes,
    vitesse: cookie_vitesse,
    ia: cookie_ia,
    Autorespawn: cookie_Autorespawn,
    difficulte: cookie_difficulte,
    taille: cookie_taille,
    typepomme: cookie_typepomme,
    niveau: cookie_niveau,
  };
}
function setCookies(niveau) {
  var cookies = getCookies();
  if (cookies.mur == "true") {
    mur.checked = true;
  }
  nbPomme.value = cookies.pommes;
  vitesse.value = cookies.vitesse;
  if (cookies.ia == "true") {
    ia.checked = true;
  }
  if (cookies.Autorespawn == "true") {
    Autorespawn.checked = true;
  }
  if (cookies.typepomme == "true") {
    typepomme.checked = true;
  }
  niveau.value = cookies.niveau;
  difficulte.value = cookies.difficulte;
  taille.value = cookies.taille;
  affvitesse.innerHTML = parseInt(vitesse.value / 10 + 1);
  affpomme.innerHTML = parseInt(nbPomme.value / 10 + 1);
  afftaille.innerHTML = parseInt(taille.value / 10 + 1);
  if (parseInt(difficulte.value / 10) == 0) {
    affdifficulte.innerHTML = "Peacefull";
  }
  if (parseInt(difficulte.value / 10) == 1) {
    affdifficulte.innerHTML = "Easy";
  }
  if (parseInt(difficulte.value / 10) == 2) {
    affdifficulte.innerHTML = "Medium";
  }
  if (parseInt(difficulte.value / 10) == 3) {
    affdifficulte.innerHTML = "Hard";
  }
  if (parseInt(difficulte.value / 10) == 4) {
    affdifficulte.innerHTML = "Expert";
  }
}
function emptyCookies() {
  if (document.cookie.length < 3) {
    //on met les valeurs par defaut
    save("true", 22, 49, "false", "true", 9, 10, "true", "");
    setCookies(niveau);
  }
}

export { save, emptyCookies, setCookies };
