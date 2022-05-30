const buttons = {
    allClear: document.querySelector("#allClear"),
    backspace: document.querySelector("#backspace"),
    solve: document.querySelector("#solve"),
    dot: document.querySelector("#dot"),
    plusMinus: document.querySelector("#plusMinus"),
    numbers: document.querySelectorAll(".number"),
    operators: {
        "+": document.querySelector("#add"),
        "-": document.querySelector("#subtract"),
        "x": document.querySelector("#multiply"),
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

const divByZeroMsg = "UNDEFINED!\n" 
+ "The reason that the result of a division by zero is undefined is the fact that any attempt at a definition leads to a contradiction.\n"
+ "To begin with, how do we define division? The ratio r of two numbers a and b:\n"
+ "r=a/b\n" 
+ "is that number r that satisfies\n" 
+ "a=r*b. Well, if b=0, i.e., we are trying to divide by zero, we have to find a number r such that\n" 
+ "r*0=a.(1)\n" 
+ "But\n" 
+ "r*0=0\n" 
+ "for all numbers r, and so unless a=0 there is no solution of equation (1).\n" 
+ "Now you could say that r=infinity satisfies (1). That's a common way of putting things, but what's infinity? It is not a number! Why not? Because if we treated it like a number we'd run into contradictions. Ask for example what we obtain when adding a number to infinity. The common perception is that infinity plus any number is still infinity. If that's so, then\n" 
+ "infinity = infinity+1 = infinity + 2\n" 
+ "which would imply that 1 equals 2 if infinity was a number. That in turn would imply that all integers are equal, for example, and our whole number system would collapse.";

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
        case e.key === "=":
        case e.key === "Enter":
            e.preventDefault();
            solve();
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

buttons.solve.addEventListener("click", solve);

buttons.plusMinus.addEventListener("click", plusMinus)

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

function plusMinus() {
    if (display.lock) {
        display.lock =false;
    }
    let text = display.main.textContent;
    text = text.startsWith("-") ? text.slice(1) : "-" + text;
    display.main.textContent = text;
}

function solve() {
    if (isNaN(numbers.a)) {
        return;
    }
    if (display.lock) {
        return;
    }
    numbers.b = parseFloat(display.main.textContent);
    if (isDivByZero()) {
        return;
    }
    display.stat.textContent = numbers.a + " " + operator + " " + numbers.b + " =";
    setAnswer(operate(operator, numbers.a, numbers.b));
}

function allClear() {
    clearDisplay();
    numbers.a = NaN;
    numbers.b = NaN;
    numbers.ans = NaN;
    operator = "";
}

function operatorClick(e) {
    let updateStat = () =>  {
        operator = e;
        display.stat.textContent = numbers.a + " " + operator;
    }
    if (isNaN(numbers.a)) {
        numbers.a = parseFloat(display.main.textContent);
        display.lock = true;
        updateStat();
        return;
    }
    if (display.lock) {
        updateStat();
        return;
    }
    numbers.b = parseFloat(display.main.textContent);
    if (isDivByZero())
        return;

    setAnswer(operate(operator, numbers.a, numbers.b));
    updateStat();
}

function setAnswer(answer) {
    numbers.ans = answer;
    numbers.a = numbers.ans;
    numbers.b = NaN;
    display.main.textContent = numbers.ans;
    display.lock = true;
}

function isDivByZero() {
    if (numbers.b === 0 && operator === "/") {
        alert(divByZeroMsg);
        numbers.b = NaN;
        return true;
    }
    return false;
}

function addDot() {
    text = display.main.textContent;
    if (!text.includes(".")) {
        text += ".";
        display.main.textContent = text;
        display.lock = false;
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
        text = "0";
    }
    display.main.textContent = text;
    if (!isNaN(numbers.ans)) {
        display.stat.textContent = numbers.ans + " " + operator;
        numbers.ans = NaN;
    }
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
    if (b === 0 ) {
        return a;
    }
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
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "%":
            return percent(a, b);
    }
}

clearDisplay();