
//objet serpent
var snake = {
  x: 160,
  y: 160,

  // vitesse du serpent. 1 frame = une case parcourue
  dx: 0,
  dy: 0,
  direction: "right",
  // les cellules du serpent sont stockées dans ce tableau
  cells: [],

  //taille du serpent.
  maxCells: 4,
};

export { snake };
