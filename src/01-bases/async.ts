/**
 * 01 - Génériques & Fonctions d'ordre supérieur
 * Contexte : Opérations sur des listes de transactions financières
 */

// ── FONCTIONS D'ORDRE SUPÉRIEUR ───────────────────────────────────────────────

const montants: number[] = [100, -50, 200, -20, 300];

// filter : extraire les crédits uniquement
const credits = montants.filter((m) => m > 0);           // [100, 200, 300]
const debits  = montants.filter((m) => m < 0);           // [-50, -20]

// map : convertir en centimes (bonne pratique finance — évite les floats)
const centimes = montants.map((m) => m * 100);

// reduce : calculer le solde final
const solde = montants.reduce((total, m) => total + m, 0); // 530

console.log('Crédits :', credits);
console.log('Débits :', debits);
console.log('En centimes :', centimes);
console.log('Solde final :', solde);

// ── FONCTIONS TYPÉES ──────────────────────────────────────────────────────────

function estEligibleAuCredit(score: number, revenus: number): boolean {
  return score > 600 && revenus > 1500;
}

const calculerInterets = (montant: number, taux: number): number => {
  return montant * (taux / 100);
};

function appliquerFraisDeTenue(soldes: number[], frais: number): number[] {
  return soldes.map((s) => s - frais);
}

// ── CLASSE GÉNÉRIQUE ──────────────────────────────────────────────────────────

/**
 * File d'attente générique (FIFO)
 * Cas d'usage : file de traitement des virements en attente
 */
class FileAttente<T> {
  private elements: T[] = [];

  ajouter(element: T): void {
    this.elements.push(element);
  }

  recupererProchain(): T | undefined {
    return this.elements.shift(); // FIFO : retire le premier élément
  }

  get taille(): number {
    return this.elements.length;
  }
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

type Compte = {
  readonly id: string;
  solde: number;
  actif: boolean;
};

function filtrerEtSommerComptes(comptes: Compte[]): number {
  return comptes
    .filter((c) => c.actif)
    .reduce((total, c) => total + c.solde, 0);
}

const comptes: Compte[] = [
  { id: 'C001', solde: 1000, actif: true },
  { id: 'C002', solde: 500,  actif: false },
  { id: 'C003', solde: 2000, actif: true },
];

console.log('\nSolde total comptes actifs :', filtrerEtSommerComptes(comptes));
console.log('Éligible au crédit :', estEligibleAuCredit(700, 2000));
console.log('Intérêts sur 10 000 à 5% :', calculerInterets(10000, 5));
console.log('Frais de tenue appliqués :', appliquerFraisDeTenue([1000, 500, 200], 10));

// File d'attente de virements
const fileVirements = new FileAttente<string>();
fileVirements.ajouter('VIR-001');
fileVirements.ajouter('VIR-002');
fileVirements.ajouter('VIR-003');
console.log('\nProchain virement à traiter :', fileVirements.recupererProchain());
console.log('Virements restants :', fileVirements.taille);
