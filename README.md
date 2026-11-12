# E.D.I.T.H.

« Et Dodo : Invente Ton Histoire » — histoires du soir inventées à la demande.

- `index.html` : l'app (choix du héros et du thème, lecture page par page).
- `heros.js` : héros, fiches et thèmes.
- `functions/` : fonctions serveur Firebase. `raconte` écrit l'histoire (consignes dans `consignes.js`), `illustre` dessine une image. Compte famille uniquement.
- `test/` : pages de test (vitesse du texte, comparaison d'images).
- Déploiement des fonctions : `.github/workflows/deploy-functions.yml`, à chaque fusion sur `main` touchant `functions/`.
- Secrets GitHub : `ANTHROPIC_API_KEY`, `FIREBASE_DEPLOY_SA`.
