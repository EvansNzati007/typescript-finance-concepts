/**
 * 02 - POO : Encapsulation, Classes, Méthodes statiques
 * Contexte : Portefeuille client et Agence bancaire
 */

// ── ENCAPSULATION ─────────────────────────────────────────────────────────────

class PortefeuilleClient {
  private _idClient: string;
  private _solde: number;

  constructor(id: string, solde: number) {
    this._idClient = id;
    this._solde = solde;
  }

  // Getters : accès en lecture seule depuis l'extérieur
  public getIdClient(): string {
    return this._idClient;
  }

  public getSolde(): number {
    return this._solde;
  }

  public retirerArgent(montant: number): void {
    if (montant <= 0) {
      throw new Error('Le montant doit être positif');
    }
    if (this._solde < montant) {
      throw new Error(`Solde insuffisant. Solde actuel : ${this._solde}`);
    }
    this._solde -= montant;
    console.log(`Retrait de ${montant} FCFA confirmé. Nouveau solde : ${this._solde}`);
  }

  public deposerArgent(montant: number): void {
    if (montant <= 0) throw new Error('Montant invalide');
    this._solde += montant;
    console.log(`Dépôt de ${montant} FCFA. Nouveau solde : ${this._solde}`);
  }
}

// ── INTERFACE + CLASSE + MÉTHODE STATIQUE ─────────────────────────────────────

interface ICompteMetier {
  reference: string;
  titulaire: string;
  estBloque: boolean;
}

class CompteMetier implements ICompteMetier {
  reference: string;
  titulaire: string;
  estBloque: boolean;

  constructor(ref: string, titulaire: string, estBloque: boolean) {
    this.reference = ref;
    this.titulaire = titulaire;
    this.estBloque = estBloque;
  }

  afficher(): void {
    console.log(`Compte ${this.reference} — Titulaire : ${this.titulaire} — Bloqué : ${this.estBloque}`);
  }

  // Méthode statique : factory interne, pas besoin d'instancier
  public static creerNouveauCompte(nom: string): CompteMetier {
    const reference = `REF-${Date.now()}`;
    return new CompteMetier(reference, nom, false);
  }
}

// ── AGRÉGATION DE CLASSES ─────────────────────────────────────────────────────

class AgenceBancaire {
  private _portefeuilles: PortefeuilleClient[];

  constructor(portefeuilles: PortefeuilleClient[] = []) {
    this._portefeuilles = portefeuilles;
  }

  public ajouterPortefeuille(portefeuille: PortefeuilleClient): void {
    this._portefeuilles.push(portefeuille);
  }

  // Calcule les liquidités totales de l'agence
  public calculerLiquiditesTotales(): number {
    return this._portefeuilles.reduce((somme, p) => somme + p.getSolde(), 0);
  }
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

const p1 = new PortefeuilleClient('CLI-001', 50000);
const p2 = new PortefeuilleClient('CLI-002', 30000);
const p3 = new PortefeuilleClient('CLI-003', 75000);

p1.deposerArgent(10000);
p1.retirerArgent(5000);

const agence = new AgenceBancaire([p1, p2, p3]);
console.log('\nLiquidités totales agence :', agence.calculerLiquiditesTotales(), 'FCFA');

const nouveauCompte = CompteMetier.creerNouveauCompte('Evans Nzati');
nouveauCompte.afficher();
