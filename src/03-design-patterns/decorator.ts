/**
 * 03 - Design Pattern : DECORATOR
 * Contexte : Options d'un compte bancaire avec frais mensuels
 *
 * Problème résolu : ajouter des fonctionnalités à un objet dynamiquement
 * sans modifier la classe de base ni créer une explosion de sous-classes.
 */

// ── INTERFACE DE BASE ─────────────────────────────────────────────────────────

interface CompteBancaire {
  calculerFraisMensuels(): number;
  getDescription(): string;
}

// ── COMPOSANT DE BASE ─────────────────────────────────────────────────────────

class CompteStandard implements CompteBancaire {
  public calculerFraisMensuels(): number {
    return 500; // 500 FCFA de base
  }

  public getDescription(): string {
    return 'Compte Standard';
  }
}

// ── DÉCORATEUR ABSTRAIT ───────────────────────────────────────────────────────

abstract class DecorateurOptionCompte implements CompteBancaire {
  constructor(protected compteWrapped: CompteBancaire) {}

  public calculerFraisMensuels(): number {
    return this.compteWrapped.calculerFraisMensuels();
  }

  public getDescription(): string {
    return this.compteWrapped.getDescription();
  }
}

// ── DÉCORATEURS CONCRETS ──────────────────────────────────────────────────────

class OptionAlerteSms extends DecorateurOptionCompte {
  public calculerFraisMensuels(): number {
    return super.calculerFraisMensuels() + 200;
  }

  public getDescription(): string {
    return super.getDescription() + ' + Alertes SMS';
  }
}

class OptionAssurance extends DecorateurOptionCompte {
  public calculerFraisMensuels(): number {
    return super.calculerFraisMensuels() + 1000;
  }

  public getDescription(): string {
    return super.getDescription() + ' + Assurance';
  }
}

class OptionDecouvertAutorise extends DecorateurOptionCompte {
  public calculerFraisMensuels(): number {
    return super.calculerFraisMensuels() + 300;
  }

  public getDescription(): string {
    return super.getDescription() + ' + Découvert autorisé';
  }
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

// Compte simple
let compte: CompteBancaire = new CompteStandard();
console.log(`${compte.getDescription()} → ${compte.calculerFraisMensuels()} FCFA/mois`);

// Ajout dynamique d'options
compte = new OptionAlerteSms(compte);
console.log(`${compte.getDescription()} → ${compte.calculerFraisMensuels()} FCFA/mois`);

compte = new OptionAssurance(compte);
console.log(`${compte.getDescription()} → ${compte.calculerFraisMensuels()} FCFA/mois`);

compte = new OptionDecouvertAutorise(compte);
console.log(`${compte.getDescription()} → ${compte.calculerFraisMensuels()} FCFA/mois`);
