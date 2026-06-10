/**
 * 03 - Design Pattern : FACTORY METHOD
 * Contexte : Génération de documents contractuels bancaires
 *
 * Problème résolu : déléguer la création d'objets à une factory
 * sans exposer la logique d'instanciation au code client.
 */

// ── INTERFACE PRODUIT ─────────────────────────────────────────────────────────

interface DocumentContrat {
  generer(nomClient: string, montant: number): void;
}

// ── PRODUITS CONCRETS ─────────────────────────────────────────────────────────

class ContratPdf implements DocumentContrat {
  generer(nomClient: string, montant: number): void {
    console.log(`[PDF] Contrat généré pour ${nomClient} — Montant : ${montant} FCFA`);
  }
}

class ContratWord implements DocumentContrat {
  generer(nomClient: string, montant: number): void {
    console.log(`[WORD] Contrat généré pour ${nomClient} — Montant : ${montant} FCFA`);
  }
}

class ContratEmail implements DocumentContrat {
  generer(nomClient: string, montant: number): void {
    console.log(`[EMAIL] Contrat envoyé à ${nomClient} — Montant : ${montant} FCFA`);
  }
}

// ── FACTORY ───────────────────────────────────────────────────────────────────

type FormatContrat = 'pdf' | 'word' | 'email';

class GenerateurContratFactory {
  static creer(format: FormatContrat): DocumentContrat {
    switch (format) {
      case 'pdf':   return new ContratPdf();
      case 'word':  return new ContratWord();
      case 'email': return new ContratEmail();
      default:
        throw new Error(`Format "${format}" non supporté`);
    }
  }
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

const formats: FormatContrat[] = ['pdf', 'word', 'email'];

formats.forEach((format) => {
  const contrat = GenerateurContratFactory.creer(format);
  contrat.generer('Evans Nzati', 500000);
});
