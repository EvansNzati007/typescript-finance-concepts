function parenthesesValides(expression: string): boolean {
    const stack = new Stack<string>();

    const map: Record<string, string> = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (const char of expression) {

        // 1. ouverture → on empile
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
            continue;
        }

        // 2. fermeture → on vérifie
        if (char === ')' || char === ']' || char === '}') {

            if (stack.isEmpty()) {
                return false;
            }

            const top = stack.peek();

            // mismatch immédiat
            if (top !== map[char]) {
                return false;
            }

            stack.pop();
        }
    }

    // 3. à la fin : doit être vide
    return stack.isEmpty();
}


