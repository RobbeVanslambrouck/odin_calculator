const numberBtns = document.querySelectorAll(".number");
const btnBackspace = document.querySelector("#backspace");
const txtCurrentLine = document.querySelector("#currentLine");

class ScreenLine {
    #domElement = document;
    #text
    constructor(domElement, textContent="") {
        this.#domElement = domElement;
        this.#text = textContent;
    }
    update() {
        this.#domElement.textContent = this.#text;
    }
    addChar(char) {
        this.#text += char;
    }
    removeLastChar() {
        this.#text = this.#text.slice(0, -1);
    }
    set text(string) {
        this.#text = string;
    }

    get text() {
        return this.#text;
    }
}

class Screen {
    lines = [];
    constructor(lines) {
        this.lines = lines;
    }
    update() {
        Object.values(this.lines).forEach(line => {
            line.update();
        });
    }

    clear() {
        Object.values(this.lines).forEach(line => {
            line.text = "";
        });
    }
}

class Operation {
    a;
    b;
    operator;
    solution = 0;
    constructor(a = NaN, b = NaN, operator = "") {
        this.a = a;
        this.b = b;
        this.operator = operator;
    }



    set operator(operator) {
        this.operator = operator;
    }

    isSolvable() {
        return  !isNaN(this.a) && !isNaN(this.b) && this.operator != "";
    }

    solved() {
        if(this.isSolvable()) {
            this.solution = operate(this.operator, this.a, this.b);
            return true;
        }
        return false;
    }

    addNumber(number) {
        if (isNaN(this.a)) {
            this.a = number;
            return;
        }
        this.b = number;
    }

    toString() {
        if (isNaN(this.a)) {
            return "Error"
        }
        if (isNaN(this.b)) {
            return this.a + " " + this.operator;
        }

        return this.a + " " + this.operator + " " + this.b + " =";
    }

}

const screenLines = {
    current: new ScreenLine(document.querySelector("#currentLine")), 
    history: new ScreenLine(document.querySelector("#historyLine"))
};

const screen = new Screen(screenLines);

let operation = new Operation();

const input = {
    allClear: document.querySelector("#allClear"),
    backspace: document.querySelector("#backspace"),
    solve: document.querySelector("#solve"),
    numbers: {
        zero: document.querySelector("#zero"),
        one: document.querySelector("#one"),
        two: document.querySelector("#two"),
        three: document.querySelector("#three"),
        four: document.querySelector("#four"),
        five: document.querySelector("#five"),
        six: document.querySelector("#six"),
        seven: document.querySelector("#seven"),
        eight: document.querySelector("#eight"),
        nine: document.querySelector("#nine"),
    },
    operators: {
        "+": document.querySelector("#add"),
        "-": document.querySelector("#subtract"),
        "*": document.querySelector("#multiply"),
        "/": document.querySelector("#divide"),
        "%": document.querySelector("#percent"),
    }
}

input.allClear.addEventListener("click", e => {
    screen.clear();
    screen.update();
});

input.backspace.addEventListener("click", e => {
    screen.lines.current.removeLastChar();
    screen.update();
});
 
Object.values(input.numbers).forEach(number => {
    number.addEventListener("click", e => {
        screen.lines.current.addChar(e.target.textContent);
        screen.update();
    });
});

for (const [op, domElement] of Object.entries(input.operators)) {
    domElement.addEventListener("click", e => {
        executeOperation(op);
    });
}

input.solve.addEventListener("click", e => {
    let currNum = parseInt(screen.lines.current.text);
    if (isNaN(currNum)) {
        return;
    }
    operation.addNumber(currNum);
    if (operation.solved()) {
        let answer = operation.solution
        screen.lines.history.text = operation.toString();
        screen.lines.current.text = answer;
        screen.update();
        operation = new Operation();
    }
});



function executeOperation(op) {
    operation.operator = op;
    let currNum = parseInt(screen.lines.current.text);
    if (isNaN(currNum)) {
        screen.lines.history.text = operation.toString();
        screen.lines.history.update();
        return;
    }
    operation.addNumber(currNum);
    if (operation.solved()) {
        let answer = operation.solution;
        operation = new Operation();
        operation.a = answer;
        operation.operator = op;
        screen.lines.current.text = answer;
    }
    screen.lines.history.text = operation.toString();
    screen.update();
    screen.lines.current.text = "";
}

function init() {
    screen.update();
}

function add(a, b=0) {
    return a + b; 
}

function subtract(a, b=0) {
    return a - b;
}

function multiply(a, b=1) {
    return a * b;
}

function divide(a, b=1) {
    return a / b;
}

function percent(a, b=1) {
    return (a / 100) * b;
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "%":
            return percent(a, b);
    }
}

init();