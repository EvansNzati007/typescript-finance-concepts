/**
 * 01 - Async / Await & Promise
 * Contexte : Vérification de transactions en parallèle
 */

// ── SIMULATION D'APPEL API ────────────────────────────────────────────────────

// Simule un appel externe (ex: vérification statut transaction chez un opérateur)
function verifierStatut(id: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Transaction ${id} : APPROVED`);
    }, 100);
  });
}

// ── TRAITEMENT SÉQUENTIEL vs PARALLÈLE ───────────────────────────────────────

// ❌ Séquentiel : attend chaque vérification une par une → lent
async function verifierSequentiel(ids: string[]): Promise<string[]> {
  const resultats: string[] = [];
  for (const id of ids) {
    const statut = await verifierStatut(id);
    resultats.push(statut);
  }
  return resultats;
}

// ✅ Parallèle : lance toutes les vérifications en même temps → rapide
async function verifierPlusieursTransactions(ids: string[]): Promise<string[]> {
  const promesses = ids.map((id) => verifierStatut(id));
  return await Promise.all(promesses);
}

// ── GESTION D'ERREURS ASYNC ───────────────────────────────────────────────────

async function verifierAvecGestionErreur(ids: string[]): Promise<void> {
  try {
    const resultats = await verifierPlusieursTransactions(ids);
    resultats.forEach((r) => console.log(r));
  } catch (error) {
    console.error('Erreur lors de la vérification :', error);
  }
}

// ── EXÉCUTION ─────────────────────────────────────────────────────────────────

const idsTransactions = ['TX-001', 'TX-002', 'TX-003', 'TX-004'];

console.log('Vérification en parallèle...');
verifierAvecGestionErreur(idsTransactions);