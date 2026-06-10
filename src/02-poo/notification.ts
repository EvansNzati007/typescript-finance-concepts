/**
 * 02 - POO : Classe abstraite & Polymorphisme
 * Contexte : Service de notifications bancaires (SMS, Email, Push)
 */

// ── CLASSE ABSTRAITE ──────────────────────────────────────────────────────────

/**
 * Classe abstraite : définit le contrat sans implémenter
 * Impossible d'instancier directement — on doit créer des sous-classes
 */
abstract class NotificationService {
  // Méthode abstraite : chaque sous-classe DOIT l'implémenter
  abstract envoyer(message: string, destinataire: string): void;

  // Méthode concrète partagée par toutes les sous-classes
  protected formaterMessage(message: string): string {
    return `[${new Date().toISOString()}] ${message}`;
  }
}

// ── IMPLÉMENTATIONS CONCRÈTES ─────────────────────────────────────────────────

class SmsService extends NotificationService {
  public envoyer(message: string, destinataire: string): void {
    console.log(`[SMS → ${destinataire}] ${this.formaterMessage(message)}`);
  }
}

class EmailService extends NotificationService {
  public envoyer(message: string, destinataire: string): void {
    console.log(`[EMAIL → ${destinataire}] ${this.formaterMessage(message)}`);
  }
}

class PushNotificationService extends NotificationService {
  public envoyer(message: string, destinataire: string): void {
    console.log(`[PUSH → ${destinataire}] ${this.formaterMessage(message)}`);
  }
}

// ── POLYMORPHISME ─────────────────────────────────────────────────────────────

/**
 * Polymorphisme : la fonction ne sait pas quel service elle utilise
 * Elle appelle juste envoyer() — chaque service fait sa propre implémentation
 */
function diffuserAlerte(services: NotificationService[], message: string, destinataire: string): void {
  services.forEach((service) => service.envoyer(message, destinataire));
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

const services: NotificationService[] = [
  new SmsService(),
  new EmailService(),
  new PushNotificationService(),
];

diffuserAlerte(
  services,
  'Votre virement de 50 000 FCFA a été effectué avec succès.',
  'Evans Nzati'
);

console.log('\nAlerte découvert :');
diffuserAlerte(
  [new SmsService(), new EmailService()],
  'ALERTE : Votre compte est en découvert.',
  'Client-007'
);
