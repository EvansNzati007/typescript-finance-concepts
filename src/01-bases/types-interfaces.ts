/**
 * 01 - Types, Interfaces & Utility Types
 * Contexte : Gestion de transactions et utilisateurs bancaires
 */

// ── TYPES DE BASE ─────────────────────────────────────────────────────────────

// Union Types : limiter les valeurs possibles
type StatutTransaction = 'PENDING' | 'APPROVED' | 'REJECTED';
type StatutPret = 'ACCORDE' | 'EN_ATTENTE' | 'SOLDE';

// Interface métier : Transaction
interface Transaction {
  readonly id: string;       // readonly : immuable après création
  montant: number;
  statut: StatutTransaction;
  description?: string;      // optionnel
}

// Interface métier : Prêt
interface Pret {
  readonly id: string;
  montant: number;
  taux: number;
  statut: StatutPret;
}

// Interface générique : encapsuler toutes les réponses API
interface ReponseAPI<T> {
  donnees: T;
  statutHttp: number;
  horodatage: Date;
}

// ── UTILITY TYPES ─────────────────────────────────────────────────────────────

interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  dateInscription: Date;
}

// Omit : exclure des champs (ex: création sans id ni date)
type DTOCreationUtilisateur = Omit<Utilisateur, 'id' | 'dateInscription'>;

// Partial : tous les champs deviennent optionnels (ex: mise à jour partielle)
type UpdateUser = Partial<Utilisateur>;

// ── TYPE GUARDS ───────────────────────────────────────────────────────────────

interface PaiementCarte {
  type: 'carte';
  numeroMasque: string;
}

interface PaiementVirement {
  type: 'virement';
  ibanSource: string;
}

// Type Guard : affiner le type à l'exécution
function estPaiementCarte(
  paiement: PaiementCarte | PaiementVirement
): paiement is PaiementCarte {
  return paiement.type === 'carte';
}

function traiterNotification(paiement: PaiementCarte | PaiementVirement): void {
  if (estPaiementCarte(paiement)) {
    console.log('Paiement par carte :', paiement.numeroMasque);
  } else {
    console.log('Paiement par virement, IBAN :', paiement.ibanSource);
  }
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

const virement: Transaction = {
  id: 'tx_9901',
  montant: 5000,
  statut: 'PENDING',
};

const reponseVirement: ReponseAPI<Transaction> = {
  donnees: virement,
  statutHttp: 201,
  horodatage: new Date(),
};

const nouveauUser: DTOCreationUtilisateur = {
  nom: 'Evans',
  email: 'evans@mail.com',
  telephone: '077441260',
};

console.log('Transaction :', virement);
console.log('Réponse API :', reponseVirement);
console.log('Nouveau utilisateur :', nouveauUser);

traiterNotification({ type: 'carte', numeroMasque: '**** **** **** 1234' });
traiterNotification({ type: 'virement', ibanSource: 'GA00 0000 0000 0000' });
