/**
 * 03 - Design Pattern : ADAPTER
 * Contexte : Intégration d'une API SMS externe avec une interface incompatible
 *
 * Problème résolu : faire communiquer deux interfaces incompatibles
 * sans modifier le code existant.
 *
 * Cas réel : chez AWDPAY, chaque opérateur SMS a sa propre API —
 * l'Adapter uniformise les appels derrière une interface commune.
 */

// ── INTERFACE CIBLE ───────────────────────────────────────────────────────────

interface EnvoyeurSms {
  envoyerMessage(telephone: string, texte: string): void;
}

// ── SYSTÈME EXTERNE (API incompatible) ───────────────────────────────────────

class GlobalSmsPapi {
  public sendRawPayload(payload: { phone: number; body: string }): void {
    console.log(`[API Externe] SMS envoyé au +${payload.phone} : ${payload.body}`);
  }
}

// ── ADAPTER ───────────────────────────────────────────────────────────────────

class GlobalSmsAdapter implements EnvoyeurSms {
  constructor(private globalSmsApi: GlobalSmsPapi) {}

  public envoyerMessage(telephone: string, texte: string): void {
    // Conversion : string → number pour correspondre à l'API externe
    const phone = parseInt(telephone, 10);
    this.globalSmsApi.sendRawPayload({ phone, body: texte });
  }
}

// ── EXEMPLES D'UTILISATION ────────────────────────────────────────────────────

const smsService: EnvoyeurSms = new GlobalSmsAdapter(new GlobalSmsPapi());
smsService.envoyerMessage('077441260', 'Votre code OTP est : 4821');
smsService.envoyerMessage('066123456', 'Votre virement a été effectué.');
