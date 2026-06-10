/**
 * 03 - Design Pattern : OBSERVER
 * Contexte : Surveillance d'un compte courant — alertes en cas de découvert
 *
 * Problème résolu : notifier automatiquement plusieurs services
 * quand l'état d'un objet change, sans couplage direct.
 */

// ── INTERFACE OBSERVER ────────────────────────────────────────────────────────

interface ObservateurCompte {
  notifier(compteId: string, solde: number, evenement: string): void;
}

// ── OBSERVERS CONCRETS ────────────────────────────────────────────────────────

class ServiceAlerteSMS implements ObservateurCompte {
  notifier(compteId: string, solde: number, evenement: string): void {
    console.log(`[SMS] Compte ${compteId} — ${evenement} — Solde : ${solde} FCFA`);
  }
}

class ServiceAuditRisque implements ObservateurCompte {
  notifier(compteId: string, solde: number, evenement: string): void {
    console.log(`[AUDIT] Activité sur compte ${compteId} — ${evenement} — Solde : ${solde} FCFA`);
  }
}

class ServiceJournalisation implements ObservateurCompte {
  notifier(compteId: string, solde: number, evenement: string): void {
    console.log(`[LOG ${new Date().toISOString()}] ${compteId} — ${evenement} — ${solde} FCFA`);
  }
}

// ── SUJET (OBSERVABLE) ────────────────────────────────────────────────────────

class CompteCourant {
  private observers: ObservateurCompte[] = [];
  private _solde: number;
  private _id: string;

  constructor(id: string, soldeInitial: number) {
    this._id = id;
    this._solde = soldeInitial;
  }

  abonner(observer: ObservateurCompte): void {
    this.observers.push(observer);
  }

  desabonner(observer: ObservateurCompte): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  private notifierTous(evenement: string): void {
    this.observers.forEach((obs) => obs.notifier(this._id, this._solde, evenement));
  }

  modifierSolde(nouveauSolde: number): void {
    this._solde = nouveauSolde;

    if (this._solde < 0) {
      this.notifierTous('DÉCOUVERT DÉTECTÉ');
    } else if (this._solde < 5000) {
      this.notifierTous('SOLDE FAIBLE');
    }
  }

  get solde(): number { return this._solde; }
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

const compte = new CompteCourant('ACC-007', 10000);

const sms   = new ServiceAlerteSMS();
const audit = new ServiceAuditRisque();
const log   = new ServiceJournalisation();

compte.abonner(sms);
compte.abonner(audit);
compte.abonner(log);

console.log('--- Solde faible ---');
compte.modifierSolde(3000);

console.log('\n--- Découvert ---');
compte.modifierSolde(-5000);

// Désabonnement
compte.desabonner(audit);
console.log('\n--- Après désabonnement audit ---');
compte.modifierSolde(-1000);
