# Jeu du serpent

## Les règles :

Notre jeu est un serpent qui a pour but d’être le plus grand possible (avoir le meilleur score), le serpent se déplacera dans un monde (**canvas** en 2d) avec les flèches du clavier ou le touché si on est sur mobile.

Cependant il y a plus de difficulté car on peut modifier la vitesse du serpent pour les joueurs plus expérimentés mais aussi modifié le nombre de pomme (de 1 à 10) qui est enregistré dans un tableau avec leur position x et y ainsi que leur type :

- Pomme naturelle, vous fait grandir.
- Pomme inverse, vous envoie dans une direction au hasard
- Pomme arc-en-ciel, vous devenez invisible et pouvez passer à travers les obstacles et vous-même mais vous perdez un point au score et une cellule du Snake
- Pomme bug, vous téléporte à un endroit aléatoire, attention aux murs !

Pour ajouter plus de challenge on peut mettre une difficulté ( Peaceful, easy, moyenne, hard, expert), les difficultés permettront de faire apparaître de plus en plus de murs en milieu du monde en peaceful aucun mur n’apparaît. Les Mur sont stockés dans un tableau qui contient leur coordonnée x, y

---

## Le fonctionnement du jeu :

Le jeu se passe sur une page unique sur laquelle nous avons d’abord mis un menu avec les règles puis avons chargé le jeu sur la même page.

Le jeu est représenté sous la forme d’un tableau 2D “EMPTY”,”MUR”,”POMME” et “SERPENT”, ce tableau est généré dans la fonction `gameToArray()` qui est console.log afin de visualiser ce tableau.

---

On peut aussi choisir d’activer/désactiver les bordures du monde pour plus au moins de difficultés si elles sont désactivées alors le serpent sera téléporté de l’autre côté du monde.

On peut activer/désactiver l'auto-respawn qui fait réapparaître le serpent juste après la mort.

Le serpent est défini par un objet Snake comme suit : 

```jsx
var snake = {
  x: 160,
  y: 160,
  
  dx: 0,             // vitesse du serpent. 1 frame = une case parcourue
  dy: 0,
  direction: "right",

  cells: [],      // les cellules du serpent sont stockées dans ce tableau

  maxCells: 4,       //taille du serpent.
};
```

Les paramètres sont stockés dans les cookies ce qui permet de garder les même paramètres même après un rechargement de page. 
Si le document cookie est vide, alors des paramètres par défauts sont sauvegardés

Un highscore est stocké tant que le joueur ne revient pas sur la page des paramètres ce qui permet de voir son amélioration entre les différentes parties.

---

Chaque fois que le joueur meurt  `snakeOver()` est appelé et les attributs de l’objet `snake` sont remises a zéro. Les pommes et les murs sont répartis aléatoirement sur le monde, en sachant que les murs ne peuvent pas apparaître autour du lieu de réapparition pour éviter de se prendre un mur dès le début.

Nous avons ajouté de nombreuses images pour que cela soit plus agréable à jouer comme une texture de serpent (sprite) ainsi que sur les différents types de pommes et les murs.

Lorsque le joueur veut modifier les paramètres il peut appuyer sur le bouton retour au lieu de recharger la page et appuyer sur le espace pour mettre en pause le jeu.

## Niveaux :

On peut aussi choisir un niveau lors du lancement du jeu, les paramètres du niveaux seront stocker dans un fichier .json dans cette forme :
```json 
"taille":1,          		//taille du monde
    "typepomme":"True",	      //Pomme spéciale activer/désactiver
    "bordure":"True",                    //Activer/désactiver la bordure
    "vitesse":3,                               //Modifier la vitesse 
    "walls": [
        [0,0], [0,7], [1,2], [1,5], [2,9], [3,4],[3,7], [4,1], [5,6], [5,8], [5,9], [6,0],[6,3], [8,8], [8,5], [9,2]
    ],                                                //Coordonnées des murs dans le monde
    "food": [
        [0,3], [1,7], [9,1]
    ],                                                 //Coordonnées des pommes dans le monde
    "snake": [
        [4,4],
        [4,5],
        [4,6]
    ],			            //Coordonnées du serpent au début
		"direction":"right"                  //premiere direction du serpent
```
