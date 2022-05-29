const numberBtns = document.querySelectorAll(".number");
const btnBackspace = document.querySelector("#backspace");
const txtCurrentLine = document.querySelector("#currentLine");

class ScreenLine {
    #domElement = document;
    #text
    constructor(domElement, textContent="") {
        this.#domElement = domElement;
        this.#text = textContent;
        this.removeLastChar = function () {
            this.#text = this.#text.slice(0, -1);
        };
        this.clear = function () {
            this.#text = "";
        };
    }
    update() {
        this.#domElement.textContent = this.#text;
    }
    addChar(char) {
        this.#text += char;
    }
    removeLastChar() {
        this.#text = this.text.slice(0, -1);
    }
    setText(string) {
        this.#text = string;
    }
}

class Screen {
    screenLines = [];
    constructor(screenLines) {
        this.screenLines = screenLines;
    }
    update() {
        Object.values(this.screenLines).forEach(screenLine => {
            screenLine.update();
        });
    }
}

const screenLines = {
    currentLine: new ScreenLine(document.querySelector("#currentLine")), 
    historyLine: new ScreenLine(document.querySelector("#historyLine"))
};

const screen = new Screen(screenLines);

const input = {
    allClear: document.querySelector("#allClear"),
    backspace: document.querySelector("#backspace"),
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
        add: document.querySelector("#add"),
        subtract: document.querySelector("#subtract"),
        multiply: document.querySelector("#multiply"),
        divide: document.querySelector("#divide"),
        percent: document.querySelector("#percent"),
    }
}

input.allClear.addEventListener("click", e => {
    screen.screenLines.currentLine.clear();
    screen.update();
});

input.backspace.addEventListener("click", e => {
    screen.screenLines.currentLine.removeLastChar();
    screen.update();
});
 
Object.values(input.numbers).forEach(number => {
    number.addEventListener("click", e => {
        screen.screenLines.currentLine.addChar(e.target.textContent);
        screen.update();
    });
});

input.operators.add.addEventListener("click", e => {

});

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