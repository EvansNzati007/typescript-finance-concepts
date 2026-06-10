/**
 * 03 - Design Pattern : SINGLETON
 * Contexte : Configuration globale de l'application bancaire
 *
 * Problème résolu : garantir qu'une classe n'a qu'une seule instance
 * partagée dans toute l'application.
 *
 * Cas réel : connexion à la base de données, configuration d'environnement,
 * logger global — on ne veut pas recréer ces objets à chaque fois.
 */

// ── SINGLETON ─────────────────────────────────────────────────────────────────

class ConfigurationApplication {
  private static instance: ConfigurationApplication;

  private config: Map<string, string> = new Map([
    ['APP_NAME',     'FinanceApp'],
    ['API_VERSION',  'v1'],
    ['MAX_RETRIES',  '3'],
    ['TIMEOUT_MS',   '5000'],
  ]);

  // Constructeur privé : personne ne peut faire "new Configuration()"
  private constructor() {
    console.log('[Singleton] Instance de configuration créée');
  }

  // Point d'accès unique
  static getInstance(): ConfigurationApplication {
    if (!ConfigurationApplication.instance) {
      ConfigurationApplication.instance = new ConfigurationApplication();
    }
    return ConfigurationApplication.instance;
  }

  getOption(cle: string): string {
    return this.config.get(cle) ?? `Clé "${cle}" introuvable`;
  }

  setOption(cle: string, valeur: string): void {
    this.config.set(cle, valeur);
  }
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

const config1 = ConfigurationApplication.getInstance();
const config2 = ConfigurationApplication.getInstance();

// Vérification : c'est bien la même instance
console.log('Même instance ?', config1 === config2); // true

console.log('App :', config1.getOption('APP_NAME'));
console.log('Timeout :', config1.getOption('TIMEOUT_MS'), 'ms');

// Modification via config1 visible dans config2
config1.setOption('TIMEOUT_MS', '8000');
console.log('Timeout mis à jour via config2 :', config2.getOption('TIMEOUT_MS'), 'ms');
