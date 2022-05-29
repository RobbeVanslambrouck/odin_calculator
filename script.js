const buttons = {
    allClear: document.querySelector("#allClear"),
    backspace: document.querySelector("#backspace"),
    solve: document.querySelector("#solve"),
    dot: document.querySelector("#dot"),
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
        sub: document.querySelector("#subtract"),
        mul: document.querySelector("#multiply"),
        div: document.querySelector("#divide"),
        percent: document.querySelector("#percent"),
    }
}

const display = {
    stat: document.querySelector("#statusLine"),
    main: document.querySelector("#mainLine")
}

const numbers = {
    a: NaN,
    b: NaN
}

let operator = "";


buttons.allClear.addEventListener("click", e => {
    clearDisplay();
    numbers.a = NaN;
    numbers.b = NaN;
    operator = "";
});

buttons.backspace.addEventListener("click", e => {
    let text = display.main.textContent;
    text = text.slice(0, -1);
    if (text === "") {
        text = "0";
    }
    display.main.textContent = text;
});

buttons.dot.addEventListener("click", e => {
    text = display.main.textContent;
    if (!text.includes(".")) {
        text += ".";
        display.main.textContent = text;
    }
});

Object.values(buttons.numbers).forEach(btn => {
    btn.addEventListener("click", e => {
        let text = display.main.textContent;
        text += e.target.textContent;
        text = text.replace(/^0+(?!\.)/, "");
        if (text === "") {
            text = "0";
        }
        display.main.textContent = text;
    });
});

function clearDisplay() {
    display.main.textContent = 0;
    display.stat.textContent = "";
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

clearDisplay();