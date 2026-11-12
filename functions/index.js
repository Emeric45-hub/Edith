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

// ---------------------------------------------------------------------------
// Étape 4 : essai comparatif d'images (Google Imagen 4 Fast / Gemini Flash Image)
// La fonction s'authentifie auprès de Google avec son propre compte de service
// (serveur de métadonnées) : aucune clé à stocker.

const PROJET = 'diversif-bebe';

// Les deux modèles comparés. Identifiants Vertex AI à confirmer au premier essai.
const MODELES_IMAGE = {
  imagen: { id: 'imagen-4.0-fast-generate-001', lieu: 'europe-west4' },
  gemini: { id: 'gemini-3.1-flash-image', lieu: 'global' },
};

const STYLES = {
  aquarelle: 'Soft watercolor children\'s picture book illustration, gentle washes, visible paper texture, warm pastel palette',
  papier: 'Cut-paper collage children\'s picture book illustration, layered textured paper shapes, bold simple forms, cheerful colors',
  crayons: 'Colored pencil children\'s picture book illustration, hand-drawn strokes, cozy and whimsical',
  gouache: 'Gouache children\'s picture book illustration, flat opaque colors, rounded shapes, mid-century storybook feel',
};

// Scènes de l'histoire d'essai « Les 7 ours et le trésor de patates » :
// décor et indices seulement, jamais les personnages.
const SCENES = [
  'The doormat of a tiny cozy wooden cottage in a forest at morning, an old yellowed treasure map with a big red cross sticking out from under the doormat',
  'A winding forest path seen from above, an old treasure map lying upside down on the ground, seven rows of small bear paw prints walking in a big circle back to the same little cottage',
  'A sunny river with a small wooden footbridge just beside, big splashes and ripples in the water, a round pebble with a tiny bite mark on the riverbank',
  'A forest clearing with a spiky pine cone and a hedgehog sleeping curled in a ball, opening onto a wide field with a big red cross on the ground',
  'A dug-up field with an old open wooden treasure chest holding a single striped sock with a hole, heaps of earth around it full of round golden potatoes',
  'Night: a little cottage with glowing windows under a big gentle moon, a potato with a small candle on the windowsill, a quiet potato field in the moonlight',
];

const CONSIGNE_IMAGE = 'No characters, no people, no faces, no text, no letters, no logos. Landscape composition, calm and joyful, suitable for a 4-year-old at bedtime.';

async function jetonGoogle() {
  const r = await fetch('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token', {
    headers: { 'Metadata-Flavor': 'Google' },
  });
  if (!r.ok) throw new Error('jeton Google ' + r.status);
  return (await r.json()).access_token;
}

async function verifieFamille(req) {
  const jeton = (req.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const decode = await getAuth().verifyIdToken(jeton);
  if (decode.uid !== UID_FAMILLE) throw new Error('compte non autorisé');
}

async function genereImagen(modele, consigne, jeton) {
  const url = `https://${modele.lieu}-aiplatform.googleapis.com/v1/projects/${PROJET}/locations/${modele.lieu}/publishers/google/models/${modele.id}:predict`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + jeton, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt: consigne }],
      parameters: { sampleCount: 1, aspectRatio: '4:3', personGeneration: 'dont_allow' },
    }),
  });
  const texte = await r.text();
  if (!r.ok) throw new Error(`Imagen ${r.status} : ${texte.slice(0, 300)}`);
  const p = JSON.parse(texte).predictions?.[0];
  if (!p?.bytesBase64Encoded) throw new Error('Imagen : aucune image (filtre de sécurité ?) ' + texte.slice(0, 300));
  return { mime: p.mimeType || 'image/png', donnees: p.bytesBase64Encoded };
}

async function genereGemini(modele, consigne, jeton) {
  const hote = modele.lieu === 'global' ? 'aiplatform.googleapis.com' : `${modele.lieu}-aiplatform.googleapis.com`;
  const url = `https://${hote}/v1/projects/${PROJET}/locations/${modele.lieu}/publishers/google/models/${modele.id}:generateContent`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + jeton, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: consigne }] }],
      generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '4:3' } },
    }),
  });
  const texte = await r.text();
  if (!r.ok) throw new Error(`Gemini ${r.status} : ${texte.slice(0, 300)}`);
  const parts = JSON.parse(texte).candidates?.[0]?.content?.parts || [];
  const img = parts.find((x) => x.inlineData?.data);
  if (!img) throw new Error('Gemini : aucune image ' + texte.slice(0, 300));
  return { mime: img.inlineData.mimeType || 'image/png', donnees: img.inlineData.data };
}

export const illustre = onRequest(
  {
    region: 'europe-west1',
    timeoutSeconds: 120,
    memory: '512MiB',
    cpu: 1,
    concurrency: 8,
    maxInstances: 2,
    invoker: 'public', // la vérification du compte famille est faite ci-dessous
  },
  async (req, res) => {
    entetesCors(req, res);
    if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
    if (req.method !== 'POST') { res.status(405).send('Méthode non autorisée'); return; }
    try { await verifieFamille(req); } catch { res.status(401).send('Non autorisé'); return; }

    const cleModele = req.body?.modele;
    const modele = MODELES_IMAGE[cleModele];
    const style = STYLES[req.body?.style] || STYLES.aquarelle;
    const n = Number(req.body?.scene);
    if (!modele || !(n >= 0 && n < SCENES.length)) { res.status(400).send('Modèle ou scène inconnus'); return; }

    const consigne = `${style}. ${SCENES[n]}. ${CONSIGNE_IMAGE}`;
    const debut = Date.now();
    try {
      const jeton = await jetonGoogle();
      const image = cleModele === 'imagen'
        ? await genereImagen(modele, consigne, jeton)
        : await genereGemini(modele, consigne, jeton);
      const ms = Date.now() - debut;
      console.log(JSON.stringify({ mesure: 'illustre', modele: modele.id, scene: n, ms, ko: Math.round(image.donnees.length * 0.75 / 1024) }));
      res.json({ ms, mime: image.mime, donnees: image.donnees });
    } catch (e) {
      console.error('illustre', modele.id, e.message);
      res.status(502).json({ erreur: e.message, ms: Date.now() - debut });
    }
  }
);
