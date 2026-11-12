// Héros, fiches et thèmes d'E.D.I.T.H.
// Les fiches guident l'écriture : caractère, amis, lieux, situations comiques.
// Première version rédigée par Claude, à relire par Emeric et Léa.

const HEROS = [
  // ——— Les copains des dessins animés ———
  { groupe: 'Les copains', nom: 'Les 7 ours', fiche:
`Sept petits ours frères, maladroits et attachants, qui vivent ensemble dans une petite maison dans la forêt. Ils n'ont pas de prénoms : on dit « le premier ours », « le plus grand », « le plus petit ».
Ils font bêtise sur bêtise, comprennent tout de travers et sont un peu stupides, sauf parfois le plus petit. Leur obsession : les patates. Ils en cherchent partout et en voient partout.
Ils s'invitent volontiers dans les contes de fées (Blanche-Neige, Cendrillon, le Petit Chaperon rouge, Raiponce) et y mettent un joyeux désordre.
Ils font tout à sept : sept bols, sept lits, sept idées catastrophiques.` },

  { groupe: 'Les copains', nom: 'Bluey', fiche:
`Bluey, petite chienne bleue de six ans, débordante d'imagination ; Bingo, sa petite sœur de quatre ans ; Papa (Bandit) et Maman (Chilli).
Tout devient un jeu avec des règles inventées sur le moment, que tout le monde doit respecter très sérieusement. Papa joue le jeu à fond, en fait trop et finit épuisé ou ridicule ; Maman a toujours un temps d'avance.
Le comique vient des règles du jeu poussées jusqu'au bout et des parents qui voudraient bien se reposer.` },

  { groupe: 'Les copains', nom: 'La Pat\' Patrouille', fiche:
`Ryder, dix ans, et ses chiots sauveteurs, dans la ville de la Grande Vallée. Chase (policier, sérieux, « Chase est sur le coup ! »), Marcus (pompier, très maladroit, trébuche et dégringole puis assure que tout va bien), Stella (aviatrice en hélicoptère), Ruben (chantier, gourmand), Rocky (recyclage, déteste l'eau), Zuma (sauvetage en mer), Everest (montagne).
Madame le Maire et sa poule Galinetta, qui se sauve partout ; le Capitaine Turbot.
Chaque mission est un petit problème rigolo, jamais dangereux. Le comique vient de Marcus, de Galinetta et de Rocky qui évite l'eau.` },

  { groupe: 'Les copains', nom: 'Les Schtroumpfs', fiche:
`Petits lutins bleus hauts comme trois pommes, bonnet blanc, village de maisons-champignons dans la forêt. Le Grand Schtroumpf (barbe blanche, bonnet rouge, sage), la Schtroumpfette, le Schtroumpf à lunettes (donne des leçons que personne n'écoute), le Schtroumpf farceur (ses cadeaux font « pouf ! »), le Schtroumpf grognon (« Moi, j'aime pas… »), le Schtroumpf gourmand, le Schtroumpf maladroit, le Schtroumpf costaud, le Schtroumpf paresseux.
Ils remplacent des mots par « schtroumpf » et « schtroumpfer ». Ils adorent la salsepareille.
Le sorcier Gargamel et son chat Azraël veulent les attraper et ratent toujours, de façon ridicule.` },

  { groupe: 'Les copains', nom: 'Les Monsieur Madame', fiche:
`Chaque personnage est un trait de caractère poussé à l'extrême, et c'est de là que vient le comique : Monsieur Chatouille (bras très longs), Monsieur Maladroit, Madame Bavarde, Monsieur Glouton, Monsieur Costaud, Madame Catastrophe, Monsieur Grincheux, Monsieur Étourdi, Monsieur Rigolo, Madame Bonheur, Monsieur Peureux, Madame Chipie.
Choisis-en deux à quatre dont les caractères se heurtent au thème, et laisse chacun faire exactement ce que son nom annonce.` },

  { groupe: 'Les copains', nom: 'Barbie', fiche:
`Barbie est joyeuse, curieuse et persuadée qu'on peut tout devenir : elle a déjà fait mille métiers et en change en un clin d'œil, avec la tenue qui va avec. Ses petites sœurs Skipper, Stacie et Chelsea (la plus petite), ses chiots, et Ken, gentil, enthousiaste et un peu à côté de la plaque.
Sa maison de rêve est pleine de gadgets, tout y est rose.
Le comique vient des changements de métier express, des gadgets qui s'emballent et de Ken.` },

  { groupe: 'Les copains', nom: 'Peppa Pig', fiche:
`Peppa, petite cochonne un peu commandante ; George, son petit frère, qui ne lâche pas son dinosaure (« Dinosaure ! Grrr ! ») ; Papa Pig, gros ventre, se croit expert en tout et se trompe, perd ses lunettes ; Maman Pig. Papy Pig et Mamie Pig, Suzy la brebis.
Tout le monde adore sauter dans les flaques de boue, et les histoires finissent souvent tous par terre à rire.
Le comique vient de Papa Pig et de George.` },

  { groupe: 'Les copains', nom: 'T\'choupi', fiche:
`T'choupi, petit garçon curieux et plein d'entrain, avec Doudou, son ours en peluche qui ne le quitte pas. Papa, Maman, sa petite sœur Fanni, ses amis Pilou et Lalou.
Histoires du quotidien : il veut faire tout seul, ça ne se passe pas comme prévu, et ça finit bien.
Comique doux : les petites bêtises et les « c'est moi qui fais ! ».` },

  { groupe: 'Les copains', nom: 'Petit Ours Brun', fiche:
`Petit Ours Brun, petit ours du quotidien, avec Papa Ours et Maman Ours. Il veut faire comme les grands et tout seul, fait de petites bêtises, de petites colères vite passées, et de gros câlins.
Comique doux, à hauteur de tout-petit.` },

  { groupe: 'Les copains', nom: 'Trotro', fiche:
`Trotro, petit âne gris joyeux et espiègle, à la crinière blanche. Son papa, sa maman, sa petite sœur Zaza, son amie Lili, son ami Boubou.
Il a des idées bien à lui pour tout faire, et ça tourne à la bêtise rigolote.` },

  { groupe: 'Les copains', nom: 'Oui-Oui', fiche:
`Oui-Oui, petit pantin de bois au bonnet bleu dont le grelot tinte quand il hoche la tête. Il conduit son taxi jaune et rouge dans Miniville, le pays des jouets. Son ami Potiron le nain, le gendarme, Mirou l'oursonne, le chien Zim, et les deux lutins farceurs Sournois et Finaud, dont les mauvais tours ratent.
Comique : le grelot, le taxi qui a ses humeurs, les lutins attrapés à leur propre piège.` },

  { groupe: 'Les copains', nom: 'Simon', fiche:
`Simon, petit lapin blanc qui n'a peur de rien, enfin presque : il se déguise en Superlapin (masque et cape), fanfaronne (« Même pas peur ! », « Ça va pas, non ! ») puis file chercher un câlin. Son petit frère Gaspard l'imite en tout. Son ami Ferdinand. Papa et Maman.
Comique : le décalage entre ses grandes déclarations et la réalité, et Gaspard qui répète tout.` },

  { groupe: 'Les copains', nom: 'Masha et Michka', fiche:
`Masha, toute petite fille en foulard, pleine d'énergie, qui pose mille questions et touche à tout. Michka, gros ours, ancien artiste de cirque, qui rêve de calme : pêcher, jardiner, boire son thé. Il ne parle pas : il soupire, grogne, lève les yeux au ciel, et il adore Masha.
Elle met tout sens dessus dessous avec la meilleure volonté ; il répare, et recommence.
Comique : les catastrophes en chaîne de Masha et la patience de Michka.` },

  { groupe: 'Les copains', nom: 'Gabby et la maison magique', fiche:
`Gabby rapetisse pour entrer dans sa maison de poupée magique, avec Pandy Pattes, son chat-panda en peluche qui devient vivant et adore les câlins-surprises. Dans chaque pièce vit un chat rigolo ; P'tichou, le petit chat-gâteau, tient la cuisine.
Bricolages, recettes, chansons. Quand quelque chose rate, c'est « un raté fantastique » : on rit et on recommence.` },

  { groupe: 'Les copains', nom: 'Les Pyjamasques', fiche:
`Le jour, trois enfants ; la nuit, en pyjama, trois héros : Yoyo (chat, rapide et agile), Bibou (hibou, vole et voit très loin), Gluglu (gecko, très fort, grimpe aux murs).
Les « méchants de la nuit » sont des enfants farceurs, jamais effrayants : Roméo et ses inventions qui se détraquent, Sorceline et ses papillons de nuit.
Comique : les héros qui se précipitent sans s'écouter, les machines de Roméo qui se retournent contre lui.` },

  { groupe: 'Les copains', nom: 'Mickey et Minnie', fiche:
`Mickey, joyeux et débrouillard ; Minnie, son nœud à pois ; Donald, canard qui se met en colère pour un rien et qu'on comprend mal ; Daisy ; Dingo, immense maladroit au grand cœur ; Pluto, le chien.
Comique : les colères de Donald, les catastrophes de Dingo, Pluto qui court après tout.` },

  { groupe: 'Les copains', nom: 'Winnie l\'ourson', fiche:
`Winnie, ourson gourmand « à la toute petite cervelle », ne pense qu'au miel. Dans la Forêt des Rêves Bleus : Porcinet (tout petit, peureux, courageux quand même), Tigrou (bondit sur tout le monde), Bourriquet (âne mélancolique qui perd sa queue), Coco Lapin (maniaque de son potager), Maître Hibou (parle trop), Petit Gourou, et Jean-Christophe.
Comique : Winnie et les pots de miel, coincé pour avoir trop mangé, les bonds de Tigrou, les plans compliqués de Coco Lapin.` },

  { groupe: 'Les copains', nom: 'Stitch', fiche:
`Stitch, petit extraterrestre bleu aux grandes oreilles, très fort, très curieux, fait des bêtises énormes sans penser à mal. Adopté par Lilo, petite fille d'Hawaï, et sa grande sœur Nani : « Ohana », c'est la famille. Jumba et Pikly, deux extraterrestres maladroits déguisés en touristes.
Stitch parle peu, mange n'importe quoi, adore la musique.
Comique : le chaos qu'il sème, puis sa façon de tout réparer et de réclamer un câlin.` },

  // ——— Princesses et héroïnes ———
  { groupe: 'Princesses et héroïnes', nom: 'Blanche-Neige', fiche:
`Douce et gaie, elle chante, les animaux de la forêt l'aident. Elle vit dans la chaumière des sept nains : Prof (s'emmêle dans ses mots), Grincheux (ronchonne), Joyeux, Dormeur (s'endort partout), Atchoum (éternuements énormes), Timide, Simplet (ne parle pas, maladroit).
Comique : les nains, surtout Atchoum, Dormeur, Simplet et Grincheux.` },

  { groupe: 'Princesses et héroïnes', nom: 'Cendrillon', fiche:
`Gentille et patiente. Ses amies les souris, dont Jaq (malin) et Gus (gourmand et maladroit), le chat Lucifer qui les guette et rate toujours. Sa marraine la fée, étourdie, qui cherche sa baguette et ses formules. La citrouille, la pantoufle de verre, les douze coups de minuit.
Comique : Gus, Lucifer bredouille, la magie de la marraine qui ne tombe pas tout à fait juste.` },

  { groupe: 'Princesses et héroïnes', nom: 'Aurore', fiche:
`La Belle au bois dormant : douce et rêveuse, elle chante dans la forêt avec les animaux. Ses trois bonnes fées, Flora, Pâquerette et Pimprenelle, se chamaillent sans cesse (la robe sera rose ! non, bleue !) et sont catastrophiques dès qu'elles font quelque chose sans magie (gâteau qui s'effondre, ménage).
Comique : les fées, et Aurore qui a toujours un peu sommeil.` },

  { groupe: 'Princesses et héroïnes', nom: 'Ariel', fiche:
`Petite sirène curieuse, collectionne les objets des humains sans savoir à quoi ils servent. Polochon, poisson jaune et bleu, peureux et fidèle ; Sébastien, crabe rouge, chef d'orchestre inquiet ; Eurêka, goéland qui explique tout de travers avec assurance (on se coiffe avec une fourchette).
Comique : les explications d'Eurêka, les objets mal utilisés, Sébastien débordé.` },

  { groupe: 'Princesses et héroïnes', nom: 'Belle', fiche:
`Belle adore les livres, elle est curieuse et courageuse. Au château enchanté : Lumière (chandelier charmeur), Big Ben (pendule très à cheval sur le règlement), Madame Samovar (théière maternelle) et son fils Zip (petite tasse ébréchée), la Bête, bourrue au grand cœur, maladroite à table. Son père Maurice, inventeur dont les machines pétaradent.
Comique : Lumière contre Big Ben, les objets qui s'en mêlent, les efforts de la Bête pour être élégante.` },

  { groupe: 'Princesses et héroïnes', nom: 'Jasmine', fiche:
`Princesse d'Agrabah, décidée et indépendante. Son tigre Rajah, doux comme un gros chat. Aladdin, le singe Abu (chapardeur), le tapis volant (joueur, sans paroles) et le Génie de la lampe, blagueur, qui se transforme en n'importe quoi et exauce les vœux un peu trop au pied de la lettre.
Comique : le Génie, Abu et ses chapardages, le tapis.` },

  { groupe: 'Princesses et héroïnes', nom: 'Pocahontas', fiche:
`Elle aime la nature, court, plonge, descend la rivière en canoë, écoute le vent. Meiko, raton laveur gourmand et chapardeur ; Flit, colibri sérieux qui le surveille ; Grand-Mère Feuillage, vieux saule plein de sagesse et de malice.
Comique : Meiko et la nourriture, Flit exaspéré.` },

  { groupe: 'Princesses et héroïnes', nom: 'Mulan', fiche:
`Courageuse et astucieuse, un peu maladroite quand il faut être sage et élégante. Mushu, tout petit dragon rouge, vantard, qui se prend pour un dragon immense ; Cri-Kee, criquet porte-bonheur ; son cheval Khan ; sa grand-mère, pleine d'humour.
Comique : Mushu et ses grands airs, les idées de Mulan qui marchent autrement que prévu.` },

  { groupe: 'Princesses et héroïnes', nom: 'Tiana', fiche:
`Travailleuse, excellente cuisinière (ses beignets sont célèbres), elle rêve de son restaurant à La Nouvelle-Orléans. Le prince Naveen, charmant et paresseux, incapable d'éplucher un légume ; Louis, alligator trompettiste, énorme et peureux ; Ray, luciole amoureuse d'une étoile. Dans le bayou, Tiana et Naveen ont été changés en grenouilles.
Comique : Naveen en cuisine, Louis qui a peur de tout, la vie de grenouille.` },

  { groupe: 'Princesses et héroïnes', nom: 'Raiponce', fiche:
`Vingt mètres de cheveux blonds, pieds nus, elle peint partout et se défend avec une poêle à frire. Pascal, son caméléon, change de couleur selon son humeur ; Maximus, cheval de la garde, se comporte comme un chien policier ; Flynn (Eugène), aventurier vantard très fier de son sourire.
Comique : les cheveux qui s'emmêlent partout, la poêle (« bong ! »), Maximus, Flynn.` },

  { groupe: 'Princesses et héroïnes', nom: 'Mérida', fiche:
`Princesse d'Écosse aux boucles rousses indomptables, championne de tir à l'arc, galope sur son cheval Angus. Ses trois petits frères, des triplés farceurs et muets qui volent les gâteaux et disparaissent ; la reine Elinor, qui voudrait une princesse sage ; le roi Fergus, grand, bruyant et rieur.
Comique : les triplés, les leçons de bonne tenue qui tournent court.` },

  { groupe: 'Princesses et héroïnes', nom: 'Vaiana', fiche:
`Fille de chef sur une île du Pacifique, navigatrice ; l'océan est son ami et joue avec elle. Hei Hei, coq complètement idiot (picore les cailloux, marche droit vers l'eau) ; Pua, petit cochon câlin ; Maui, demi-dieu vantard dont l'hameçon magique le transforme en animaux, pas toujours le bon.
Comique : Hei Hei, les transformations ratées de Maui, l'océan taquin.` },

  { groupe: 'Princesses et héroïnes', nom: 'Elsa', fiche:
`Reine des neiges d'Arendelle : elle crée glace et neige d'un geste. Sérieuse, protectrice, tendre avec sa sœur Anna. Olaf, bonhomme de neige qui adore les câlins et l'été, perd ses morceaux et les remet de travers ; Kristoff et son renne Sven.
Quand Elsa éternue ou s'émeut, sa magie part toute seule.
Comique : Olaf, la magie qui déborde (toboggans, flocons, mini-bonshommes de neige).` },

  { groupe: 'Princesses et héroïnes', nom: 'Anna', fiche:
`Princesse d'Arendelle, sœur d'Elsa : enthousiaste, bavarde, maladroite, courageuse, gourmande de chocolat. Elle fonce d'abord et réfléchit après. Olaf le bonhomme de neige, Kristoff et son renne Sven, Elsa et sa magie de glace.
Comique : Anna qui se lance tête la première, sa coiffure au réveil, Olaf.` },

  { groupe: 'Princesses et héroïnes', nom: 'Raya', fiche:
`Guerrière du pays de Kumandra, courageuse et méfiante. Tuk Tuk, sa monture, moitié tatou moitié cloporte, qui se roule en boule et qu'un rien distrait ; Sisu, dragonne d'eau, drôle et naïve, fait confiance à tout le monde et veut toujours offrir un cadeau.
Comique : Sisu et ses idées, Tuk Tuk gourmand et distrait.` },

  { groupe: 'Princesses et héroïnes', nom: 'Mirabel', fiche:
`Dans les montagnes de Colombie, la famille Madrigal vit dans la casita, maison magique vivante qui bouge ses tuiles, ses escaliers et ses tiroirs pour aider ou taquiner. Chacun a un don : Luisa (très forte), Isabela (fait pousser les fleurs), Camilo (prend l'apparence des autres), Antonio (parle aux animaux), Dolores (entend tout). Mirabel, lunettes vertes, n'a pas de don, mais des idées et du cœur.
Comique : la casita, les transformations de Camilo, les animaux d'Antonio.` },
];

const THEMES = [
  { groupe: 'Aventures', noms: ['Les pirates', 'Une chasse au trésor', 'Un labyrinthe', 'Les dinosaures', 'L\'espace', 'La jungle', 'Le fond de l\'océan', 'Un château'] },
  { groupe: 'Dehors', noms: ['La plage', 'La montagne', 'La neige', 'Le camping', 'La ferme', 'Le potager', 'Le zoo', 'Un jour de pluie et de flaques'] },
  { groupe: 'Fêtes et sorties', noms: ['Halloween', 'Noël', 'Un anniversaire', 'Le cirque', 'La fête foraine', 'Un voyage en train', 'Un gâteau géant', 'L\'école'] },
];
