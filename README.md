# 💰 TypeScript Finance Concepts

Concepts TypeScript appliqués au domaine financier — exemples concrets issus
de la réalité du développement de plateformes fintech en Afrique de l'Ouest.

> Chaque module est autonome, commenté et directement exécutable.

---

## 📚 Contenu

### 01 — Bases TypeScript

| Fichier | Concepts |
|---------|----------|
| [types-interfaces.ts](./src/01-bases/types-interfaces.ts) | Types, Interfaces, Union Types, Readonly, Generics, Utility Types (Omit, Partial), Type Guards |
| [generiques.ts](./src/01-bases/generiques.ts) | Filter, Map, Reduce, Fonctions typées, Classe générique (FileAttente\<T\>) |
| [async.ts](./src/01-bases/async.ts) | Async/Await, Promise.all, traitement parallèle vs séquentiel |

### 02 — POO (Programmation Orientée Objet)

| Fichier | Concepts |
|---------|----------|
| [portefeuille.ts](./src/02-poo/portefeuille.ts) | Encapsulation, Getters, Méthodes statiques, Interface + Implements |
| [notifications.ts](./src/02-poo/notifications.ts) | Classe abstraite, Héritage, Polymorphisme |

### 03 — Design Patterns

| Fichier | Pattern | Contexte |
|---------|---------|----------|
| [strategy.ts](./src/03-design-patterns/strategy.ts) | **Strategy** | Processeur de paiement multi-canaux (Mobile Money, Virement, Carte) |
| [decorator.ts](./src/03-design-patterns/decorator.ts) | **Decorator** | Options d'un compte bancaire avec frais mensuels cumulables |
| [adapter.ts](./src/03-design-patterns/adapter.ts) | **Adapter** | Intégration d'une API SMS externe avec interface incompatible |
| [singleton.ts](./src/03-design-patterns/singleton.ts) | **Singleton** | Configuration globale de l'application |
| [factory.ts](./src/03-design-patterns/factory.ts) | **Factory** | Génération de documents contractuels (PDF, Word, Email) |
| [observer.ts](./src/03-design-patterns/observer.ts) | **Observer** | Alertes automatiques sur découvert ou solde faible |

### 04 — Algorithmique

| Fichier | Concepts |
|---------|----------|
| [complexite.ts](./src/04-algorithmique/complexite.ts) | O(1), O(n), O(n²), optimisation avec Set, cas concrets finance |

---

## 🔗 Lien avec mes projets en production

Ces patterns ne sont pas que théoriques — je les utilise en production :

- **Strategy** → routage SMS entre opérateurs (Orange CI, MTN CI) chez AWDPAY
- **Adapter** → abstraction des APIs de paiement (PayDunya, Mobile Money)
- **Observer** → système d'alertes et webhooks clients sur la plateforme SMS AWD
- **Singleton** → gestion de la configuration et des connexions DB

---

## 🚀 Lancer un fichier

**Prérequis :** Node.js 20+ et npm

```bash
# Installer les dépendances
npm install

# Exécuter un fichier directement
npx ts-node src/03-design-patterns/strategy.ts
npx ts-node src/02-poo/notifications.ts
npx ts-node src/04-algorithmique/complexite.ts

# Compiler tout le projet
npm run build
```

---

## 👨🏾‍💻 Auteur

**Evans Nzati** — [linkedin.com/in/evansnzati](https://linkedin.com/in/evansnzati)  
Développeur Backend · AWDPAY (Fintech)  
Étudiant en Master 2 Génie Logiciel · ESGIS Gabon
