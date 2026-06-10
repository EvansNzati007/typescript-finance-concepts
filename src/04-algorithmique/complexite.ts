/**
 * 04 - Algorithmique : Complexité & Structures de données
 * Contexte : Opérations sur des données financières
 */

// ── O(1) — TEMPS CONSTANT ────────────────────────────────────────────────────
// L'opération prend toujours le même temps, peu importe la taille des données

function obtenirPremierClient(clients: string[]): string {
  return clients[0]; // Accès direct par index → O(1)
}

// ── O(n) — TEMPS LINÉAIRE ────────────────────────────────────────────────────
// Le temps croît proportionnellement à la taille des données

function calculerSoldeTotal(montants: number[]): number {
  let total = 0;
  for (const montant of montants) { // Parcours une fois → O(n)
    total += montant;
  }
  return total;
}

// ── O(n²) — TEMPS QUADRATIQUE ────────────────────────────────────────────────
// À éviter en production sur de grandes listes

function trouverDoublonsNaif(ids: string[]): string[] {
  const doublons: string[] = [];
  for (let i = 0; i < ids.length; i++) {       // O(n)
    for (let j = i + 1; j < ids.length; j++) { // O(n) → total O(n²)
      if (ids[i] === ids[j] && !doublons.includes(ids[i])) {
        doublons.push(ids[i]);
      }
    }
  }
  return doublons;
}

// ── O(n) avec Set — VERSION OPTIMISÉE ────────────────────────────────────────
// Set.has() est O(1) → la boucle reste O(n) au total

function aDesDoublons(elements: number[]): boolean {
  const vus = new Set<number>();
  for (const element of elements) {
    if (vus.has(element)) return true; // O(1)
    vus.add(element);
  }
  return false;
}

// ── OPTIMISATION AVEC SET ─────────────────────────────────────────────────────

// ❌ O(n²) : filter + includes sur un tableau
function trouverCommunesNaif(listeA: string[], listeB: string[]): string[] {
  return listeA.filter((id) => listeB.includes(id)); // includes = O(n) dans une boucle O(n)
}

// ✅ O(n) : convertir listeB en Set d'abord
function trouverTransactionsCommunes(listeInterne: string[], listeBanque: string[]): string[] {
  const setBanque = new Set(listeBanque);             // O(n) une seule fois
  return listeInterne.filter((id) => setBanque.has(id)); // has() = O(1)
}

// ── RÉCAPITULATIF DES COMPLEXITÉS ────────────────────────────────────────────
/*
  O(1)        Accès tableau par index, Set.has(), Map.get()
  O(log n)    Recherche binaire, arbres équilibrés
  O(n)        Parcours simple, filter, map, reduce
  O(n log n)  Tri efficace (quicksort, mergesort)
  O(n²)       Boucles imbriquées — à éviter sur grandes listes
*/

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

const clients = ['Evans', 'Yann', 'Marie', 'Paul'];
console.log('Premier client O(1) :', obtenirPremierClient(clients));

const montants = [1000, 2000, 500, 3000, 1500];
console.log('Solde total O(n) :', calculerSoldeTotal(montants), 'FCFA');

console.log('A des doublons ?', aDesDoublons([1, 2, 3, 4, 4])); // true
console.log('A des doublons ?', aDesDoublons([1, 2, 3, 4, 5])); // false

const interne = ['TX-001', 'TX-002', 'TX-003', 'TX-005'];
const banque  = ['TX-002', 'TX-003', 'TX-004'];
console.log('Transactions communes :', trouverTransactionsCommunes(interne, banque));
