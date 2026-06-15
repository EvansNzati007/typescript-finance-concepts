class Stack<T> {
    // stocke les éléments dans un tableau privé
    private elements: T[] = [];

    // ajouter un élément au sommet
    push(element: T): void {

        this.elements[this.elements.length] = element;


    }

    // retirer et retourner l'élément du sommet
    // retourne undefined si vide
    pop(): T | undefined {

        // dt= 5 2,3
        let top = this.elements[this.elements.length - 1];

        this.elements.length = this.elements.length - 1;
        return top;

    }

    // lire le sommet sans retirer
    peek(): T | undefined {
        return this.elements[this.elements.length - 1];
    }

    // vérifier si la stack est vide
    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    // nombre d'éléments
    get size(): number {
        return this.elements.length;
    }

    aficher() {

        for (const element of this.elements) {
            console.log(element);
        }

        console.log('->');
    }
}

// exemples :
// "(montant + frais) * taux"     → valide ✅
// "(montant + (frais * taux)"    → invalide ❌
// "((solde - retrait))"          → valide ✅

function parenthesesValides(expression: string): boolean {

    const stack = new Stack<string>();
// bonne expression : ({[]})
    for (const char of expression) {
        if(char === '(' || char === '[' || char === '{'){
            stack.push(char);//
        }

        if(char === ')' || char === ']' || char === '}'){
            if(stack.isEmpty()){
                return false;
            }
            //❓ “Est-ce que cette fermeture correspond à la dernière ouverture ?”
            if(char === ')' && stack.peek() === '(' || char === ']' && stack.peek() === '[' || char === '}' && stack.peek() === '{' ){
                stack.pop();
            }else{
                return false;
            }




        }
    }

    return  stack.isEmpty();

}
function firstParenthesisError(expression: string): number {

    const stack = new Stack<{ char: string, index: number }>();

    const map: Record<string, string> = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (let i = 0; i < expression.length; i++) {

        const char = expression[i];

        if (char === '(' || char === '[' || char === '{') {
            stack.push({ char, index: i });
            continue;
        }

        if (char === ')' || char === ']' || char === '}') {

            if (stack.isEmpty()) {
                return i;
            }

            const top = stack.peek();

            if (top?.char !== map[char]) {
                console.log(`${top?.char} Mismatch à l'index ${i} : attendu ${map[char]}, trouvé ${char}`);
                return i;
            }

            stack.pop();
        }
    }

    // reste des ouvertures non fermées
    if (!stack.isEmpty()) {
        return stack.peek().index;
    }

    return -1;
}


console.log(firstParenthesisError('([))'));
//console.log( "Vrai ou Faux ? ",parenthesesValides('([)]') );


const stack2 = new Stack<string>();

stack2.push("chat");
stack2.push("chien");
stack2.push("lapin");
//stack2.aficher();
//console.log('Sommet :', stack2.peek());
stack2.pop();
//stack2.aficher();
//console.log('Est vide ?', stack2.isEmpty());
stack2.pop();
stack2.pop();
//console.log('Est vide ?', stack2.isEmpty());

// DÉMARCHE :
// 1. Chaque page visitée → on la push dans la stack
// 2. Quand on appuie "Retour" → on pop la page actuelle
// 3. peek() nous donne la page précédente

const historique = new Stack<string>();

// L'utilisateur navigue
historique.push("Accueil");
historique.push("Mes comptes");
historique.push("Virement");
historique.push("Confirmation");

// Etat de la stack :
// [ Confirmation ] ← sommet (page actuelle)
// [ Virement     ]
// [ Mes comptes  ]
// [ Accueil      ]

//console.log("Page actuelle :", historique.peek());
// → Confirmation

// L'utilisateur appuie sur "Retour"
historique.pop(); // on quitte Confirmation
//console.log("Page actuelle :", historique.peek());
// → Virement

historique.pop(); // on quitte Virement
//console.log("Page actuelle :", historique.peek());
// → Mes comptes

const actionsUtilisateur = new Stack<string>();

// 1. Simule les 3 actions avec push()
// 2. Affiche l'état actuel avec peek()
// 3. Simule 2 fois Undo avec pop()
// 4. Affiche ce qui reste dans la stack
actionsUtilisateur.push("Saidir le Montant : 5000");
actionsUtilisateur.push("Modifier le Montant : 5000");
actionsUtilisateur.push("AJouter un Beneficiaire : EVANS");

actionsUtilisateur.pop()
actionsUtilisateur.pop()
//console.log("Stack  actuelle :", actionsUtilisateur.peek());


const  transactions = new Stack<string>();
transactions.push("TX-001 : Virement 50 000 FCFA") ;
transactions.push("TX-002 : Retrait 10 000 FCFA  ") ;
transactions.push("TX-003 : Dépôt 25 000 FCFA ") ;
transactions.push("TX-004 : Virement 100 000 FCFA ") ;

//console.log("Transaction en Attente :", transactions.size);

while (!transactions.isEmpty()) {
    console.log(`Traitement de  -> `, transactions.pop());
}
//console.log('toutes les transactions sont traites : ', transactions.peek());

const saisiePin = new Stack<number>();

// 1. L'utilisateur tape : 1, 4, 8, 3
// 2. Il appuie sur "Effacer" une fois → retire le dernier chiffre
// 3. Il tape : 7
// 4. Affiche le PIN final en vidant la stack
//    (reconstruit le PIN dans l'ordre correct — réfléchis bien ici 🤔)
// 5. Affiche : "PIN saisi : 1487"
saisiePin.push(1);
saisiePin.push(4);
saisiePin.push(8);
saisiePin.push(3);

saisiePin.pop();
// 148
saisiePin.push(7);
//1487
//7841
let pinFinal = '';
// pin = 7
// pin =
while (!saisiePin.isEmpty()) {

    pinFinal = saisiePin.pop() + pinFinal;

}

//console.log(`PIN saisi : ${pinFinal}`);