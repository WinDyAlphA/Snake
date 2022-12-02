# Snake

Notre jeu est un serpent qui a pour but d’être le plus grand possible (avoir le meilleur score), le serpent se déplacera dans un monde (canvas en 2d) avec les flèches du clavier 

Cependant il y a plus de difficulté car on peut modifier la vitesse du serpent pour les joueurs plus expérimentés mais aussi modifié le nombre de pomme (de 1 à 10) qui est enregistré dans un tableau avec leur position x et y ainsi que leur type :

-	Pomme naturelle, vous fait grandir.
-	Pomme inverse, vous envoie dans une direction au hasard
-	Pomme arc-en-ciel, vous devenez invisible et pouvez passer à travers les obstacles et vous-même mais vous perdez un point au score et une cellule du Snake
-	Pomme bug, vous téléporte à un endroit aléatoire, attention aux murs !

Pour ajouter plus de challenge on peut mettre une difficulté ( Peaceful, easy, moyenne, hard, expert), les difficultés permettront de faire apparaître de plus en plus de murs en milieu du monde en peaceful aucun mur n’apparaît. Les Mur sont stockés dans un tableau qui contient leur coordonnée x, y

On peut aussi choisir d’activer/désactiver les bordures du monde pour plus au moins de difficultés si elles sont désactivées alors le serpent sera téléporté de l’autre côté du monde

On peut activer/désactiver l'auto-respawn qui fait réapparaître le serpent juste après la mort

Le serpent est défini par un objet Snake qui contient la direction, sa taille dans là quel il va ainsi que la position des différentes cellules de son corps.

Après le chargement de la page on peut voir les règles ainsi que les paramètres modifiables, des paramètres par défaut sont enregistrés puis à chaque fois que le joueur lance une partie les donner des paramètres sont stockés dans les cookies ce qui permet de ne pas modifier les paramètres par défaut à chaque fois.

Un highscore est stocké tant que le joueur ne revient pas sur la page des paramètres ce qui permet de voir son amélioration entre les différentes parties.

Chaque fois que le joueur meurt les pommes et les murs est re réparti aléatoirement sur le monde sachant que les murs ne peuvent pas apparaître autour du lieu de réapparition pour éviter de se prendre un mur dès le début.

Nous avons ajouté de nombreuses images pour que cela soit plus agréable à jouer comme une texture de serpent ainsi qu’un que sur les différents types de pommes et les murs.

Lorsque le joueur veut modifier les paramètres il peut appuyer sur le bouton retour au lieu de recharger la page et appuyer sur le espace pour mettre en pause le jeu
