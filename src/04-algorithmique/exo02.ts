class Queue<T> {
    private elements: T[] = [];

    // Ajouter à la fin de la file
    enqueue(element: T): void {
        // à toi
        this.elements[this.elements.length] = element;
    }

    // Retirer et retourner le premier élément
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const first = this.elements[0];
        this.elements = this.elements.slice(1);
        return first;
    }


    // Voir le premier sans retirer
    front(): T | undefined {

        return  this.elements[0];
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    get size(): number {
        return this.elements.length;
    }

    afficher(): void {
        for (const element of this.elements) {
            console.log(element);
        }
    }
}

const queue = new Queue<string>();

queue.enqueue('A');
queue.enqueue('B');
queue.enqueue('C');
queue.dequeue()
queue.afficher()


