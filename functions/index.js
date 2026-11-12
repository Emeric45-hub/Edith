// E.D.I.T.H. — fonction serveur (étape 3 : test de faisabilité)
// Rôle : n'accepter que le compte famille, appeler Claude, renvoyer le texte
// au fil de l'eau (affichage progressif) pour mesurer le délai des premiers mots.

import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp();

const CLE_CLAUDE = defineSecret('ANTHROPIC_API_KEY');

// Seul compte autorisé : le compte famille (même UID que dans les règles Firestore).
const UID_FAMILLE = 'vEOrJXLWnLcpXX8ctL6X7pwqSWi1';

// Seules pages autorisées à appeler la fonction depuis un navigateur.
const ORIGINES = ['https://emeric45-hub.github.io'];

const MODELE = 'claude-fable-5-2';

const CONSIGNES = `Tu inventes une histoire du soir pour une petite fille de 4 ans et demi, lue à voix haute par un parent.
- 6 pages, 800 à 900 mots en tout, en français.
- Le héros reste fidèle à son caractère dans ses propres histoires ou séries.
- Drôle, joyeux, un gag qui revient au moins trois fois ; jamais de vraie peur ni de méchanceté.
- Dernière page calme (retour à la maison, dodo du héros), qui se termine par « Bonne nuit, … ».
Format : le titre sur la première ligne, puis chaque page précédée de « Page N » seule sur sa ligne.`;

function entetesCors(req, res) {
  const origine = req.get('origin') || '';
  if (ORIGINES.includes(origine)) {
    res.set('Access-Control-Allow-Origin', origine);
    res.set('Vary', 'Origin');
  }
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.set('Access-Control-Max-Age', '3600');
}

export const raconte = onRequest(
  {
    region: 'europe-west1',
    secrets: [CLE_CLAUDE],
    timeoutSeconds: 180,
    memory: '256MiB',
    maxInstances: 2,
    invoker: 'public', // la vérification du compte famille est faite ci-dessous
  },
  async (req, res) => {
    entetesCors(req, res);
    if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
    if (req.method !== 'POST') { res.status(405).send('Méthode non autorisée'); return; }

    // 1. Compte famille uniquement
    const jeton = (req.get('authorization') || '').replace(/^Bearer\s+/i, '');
    try {
      const decode = await getAuth().verifyIdToken(jeton);
      if (decode.uid !== UID_FAMILLE) throw new Error('compte non autorisé');
    } catch (e) {
      res.status(401).send('Non autorisé');
      return;
    }

    // 2. Demande
    const EFFORTS = ['low', 'medium', 'high'];
    const effort = EFFORTS.includes(req.body?.effort) ? req.body.effort : 'low'; // choix d'Emeric (12/11)
    const heros = String(req.body?.heros || '').slice(0, 80).trim();
    const theme = String(req.body?.theme || '').slice(0, 80).trim();
    if (!heros || !theme) { res.status(400).send('Héros et thème obligatoires'); return; }

    // 3. Appel à Claude en mode flux
    const debut = Date.now();
    const reponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': CLE_CLAUDE.value(),
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: 16000, // la réflexion de Fable compte dans cette limite
        stream: true,
        output_config: { effort },
        system: CONSIGNES,
        messages: [{ role: 'user', content: `Héros : ${heros}\nThème : ${theme}` }],
      }),
    });

    if (!reponse.ok || !reponse.body) {
      const detail = await reponse.text().catch(() => '');
      console.error('Erreur Claude', reponse.status, detail.slice(0, 500));
      res.status(502).send(`Erreur Claude ${reponse.status}`);
      return;
    }

    // 4. Renvoi du texte au fil de l'eau
    res.status(200);
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.set('Cache-Control', 'no-cache');
    res.set('X-Accel-Buffering', 'no');
    if (typeof res.flushHeaders === 'function') res.flushHeaders();

    const lecteur = reponse.body.getReader();
    const decodeur = new TextDecoder();
    let tampon = '';
    let premier = 0;
    let jetonsSortie = 0;
    let premiereReflexion = 0;
    let finRaison = '';
    let erreur = '';

    try {
      for (;;) {
        const { value, done } = await lecteur.read();
        if (done) break;
        tampon += decodeur.decode(value, { stream: true });
        const lignes = tampon.split('\n');
        tampon = lignes.pop();
        for (const ligne of lignes) {
          if (!ligne.startsWith('data:')) continue;
          let evt;
          try { evt = JSON.parse(ligne.slice(5).trim()); } catch { continue; }
          if (evt.type === 'content_block_start' && evt.content_block?.type === 'thinking') {
            if (!premiereReflexion) premiereReflexion = Date.now() - debut;
          } else if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
            if (!premier) premier = Date.now() - debut;
            res.write(evt.delta.text);
          } else if (evt.type === 'message_delta') {
            if (evt.usage) jetonsSortie = evt.usage.output_tokens || jetonsSortie;
            if (evt.delta?.stop_reason) finRaison = evt.delta.stop_reason;
          } else if (evt.type === 'error') {
            erreur = evt.error?.type || 'erreur';
            console.error('Erreur Claude en flux', JSON.stringify(evt).slice(0, 500));
          }
        }
      }
    } finally {
      // Diagnostic lisible sur la page de test, séparé du texte par un marqueur
      res.write('\n\n[[DIAG]]' + JSON.stringify({
        effort,
        reflexionDebutMs: premiereReflexion,
        premiersMotsMs: premier,
        totalMs: Date.now() - debut,
        jetonsSortie,
        finRaison,
        erreur,
      }));
      console.log(JSON.stringify({
        mesure: 'raconte',
        modele: MODELE,
        effort,
        finRaison,
        premiersMotsMs: premier,
        totalMs: Date.now() - debut,
        jetonsSortie,
      }));
      res.end();
    }
  }
);
