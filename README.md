# E.D.I.T.H.

« Et Dodo : Invente Ton Histoire » — histoires du soir inventées à la demande.

- `index.html` : l'app (choix du héros et du thème, lecture page par page).
- `heros.js` : héros, fiches et thèmes.
- `functions/` : fonctions serveur Firebase. `raconte` écrit l'histoire (consignes dans `consignes.js`), `illustre` dessine une image. Compte famille uniquement.
- Données (Firestore, compte famille) : `edith_histoires` (préférées et leurs images), `edith_journal` (une ligne par histoire racontée), `edith_reglages/listes` (héros, fiches et thèmes de la famille).
- Déploiement des fonctions : `.github/workflows/deploy-functions.yml`, à chaque fusion sur `main` touchant `functions/`.
- Secrets GitHub : `ANTHROPIC_API_KEY`, `FIREBASE_DEPLOY_SA`.
