/**
 * 03 - Design Pattern : STRATEGY
 * Contexte : Processeur de paiement multi-canaux
 *
 * Problème résolu : changer l'algorithme de traitement du paiement
 * à l'exécution sans modifier le code du processeur.
 *
 * Cas réel : chez AWDPAY, chaque opérateur SMS (Orange, MTN) est une stratégie
 * interchangeable — le routeur choisit la bonne à l'exécution.
 */

// ── INTERFACE STRATEGY ────────────────────────────────────────────────────────

interface StrategiePaiement {
  traiterPaiement(montant: number): void;
}

// ── STRATÉGIES CONCRÈTES ──────────────────────────────────────────────────────

class PaiementMobileMoney implements StrategiePaiement {
  constructor(private operateur: string) {}

  public traiterPaiement(montant: number): void {
    console.log(`[${this.operateur}] Paiement Mobile Money de ${montant} FCFA traité`);
  }
}

class PaiementVirementBancaire implements StrategiePaiement {
  public traiterPaiement(montant: number): void {
    console.log(`[Virement] Paiement bancaire de ${montant} FCFA traité`);
  }
}

class PaiementCarte implements StrategiePaiement {
  public traiterPaiement(montant: number): void {
    console.log(`[Carte] Paiement par carte de ${montant} FCFA traité`);
  }
}

// ── CONTEXTE ──────────────────────────────────────────────────────────────────

class ProcesseurPaiement {
  private _strategie: StrategiePaiement;

  constructor(strategie: StrategiePaiement) {
    this._strategie = strategie;
  }

  // Permet de changer la stratégie à l'exécution
  public setStrategie(nouvelleStrategie: StrategiePaiement): void {
    this._strategie = nouvelleStrategie;
  }

  public effectuerPaiement(montant: number): void {
    this._strategie.traiterPaiement(montant);
  }
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

const processeur = new ProcesseurPaiement(new PaiementMobileMoney('Orange Money'));
processeur.effectuerPaiement(5000);

processeur.setStrategie(new PaiementMobileMoney('MTN Mobile Money'));
processeur.effectuerPaiement(10000);

processeur.setStrategie(new PaiementVirementBancaire());
processeur.effectuerPaiement(150000);

processeur.setStrategie(new PaiementCarte());
processeur.effectuerPaiement(25000);
