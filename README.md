# E.D.I.T.H.

« Et Dodo : Invente Ton Histoire » — histoires du soir inventées à la demande.

- `functions/` : fonction serveur Firebase (`raconte`), seule à détenir la clé Claude ; n'accepte que le compte famille.
- `test/` : page de test de vitesse (étape 3).
- Déploiement : `.github/workflows/deploy-functions.yml`, à chaque fusion sur `main` touchant `functions/`.
- Secrets GitHub : `ANTHROPIC_API_KEY`, `FIREBASE_DEPLOY_SA`.
