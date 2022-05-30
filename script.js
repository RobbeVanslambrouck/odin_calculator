const buttons = {
    allClear: document.querySelector("#allClear"),
    backspace: document.querySelector("#backspace"),
    solve: document.querySelector("#solve"),
    dot: document.querySelector("#dot"),
    numbers: document.querySelectorAll(".number"),
    operators: {
        "+": document.querySelector("#add"),
        "-": document.querySelector("#subtract"),
        "*": document.querySelector("#multiply"),
        "/": document.querySelector("#divide"),
        "%": document.querySelector("#percent"),
    }
}

const display = {
    stat: document.querySelector("#statusLine"),
    main: document.querySelector("#mainLine"),
    lock: false
}

const numbers = {
    a: NaN,
    b: NaN,
    ans: NaN
}

let operator = "";

document.addEventListener("keydown", e => {
    switch (true) {
        case (e.key >= 0 && e.key <= 9):
            addNumberToMainDisplay(e.key);
            break;
        case e.key === "Backspace":
            backspace();
            break;
        case e.key === ".":
            addDot();
            break;
        case e.key === "Escape":
            allClear();
            break;
        case e.key === "+":
        case e.key === "-":
        case e.key === "*":
        case e.key === "/":
        case e.key === "%":
            operatorClick(e.key);
            break;
        default:
            break;
    }
});

buttons.allClear.addEventListener("click", e => {
    allClear();
});

buttons.backspace.addEventListener("click", backspace);

buttons.dot.addEventListener("click", addDot);

Object.values(buttons.numbers).forEach(btn => {
    btn.addEventListener("click", e => {
        addNumberToMainDisplay(e.target.textContent)
    });
});

for (const [op, btn] of Object.entries(buttons.operators)) {
    btn.addEventListener("click", e => {
        operatorClick(op);
    });
}

function allClear() {
    clearDisplay();
    numbers.a = NaN;
    numbers.b = NaN;
    operator = "";
}

function operatorClick(e) {
    console.log(display.lock);
    if (isNaN(numbers.a)) {
        operator = e;
        numbers.a = parseFloat(display.main.textContent);
        display.lock = true;
        display.stat.textContent = numbers.a + " " + operator;
        return;
    }
    if (!display.lock) {
        numbers.b = parseFloat(display.main.textContent);
        numbers.ans = operate(operator, numbers.a, numbers.b);
        numbers.a = numbers.ans;
        numbers.b = NaN;
        display.main.textContent = numbers.ans;
        display.lock = true;
    }
    operator = e;
    display.stat.textContent = numbers.a + " " + operator;
}

function addDot() {
    text = display.main.textContent;
    if (!text.includes(".")) {
        text += ".";
        display.main.textContent = text;
    }
}

function backspace() {
    let text = display.main.textContent;
    text = text.slice(0, -1);
    display.lock = false;
    if (text === "") {
        display.lock = true;
        text = "0";
    }
    display.main.textContent = text;
}

function addNumberToMainDisplay(number = "") {
    if (display.lock) {
        display.lock = false;
        display.main.textContent = "0";
    }
    let text = display.main.textContent;
    text += number;
    text = text.replace(/^0+(?!\.)/, "");
    if (text === "") {
        display.lock = true;
        text = "0";
    }
    display.main.textContent = text;
}

function clearDisplay() {
    display.main.textContent = 0;
    display.stat.textContent = "";
    display.lock = false;
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