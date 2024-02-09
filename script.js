const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener("click", function (event) {
    const element = event.target;
    const value = element.value;
    if (!element.matches("button")) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);            
    }
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if(firstValue === null){
        firstValue = value;
    } else if(operator){
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(firstValue, secondValue, operator) {
    if (operator === "+") {
        return firstValue + secondValue;
    } else if (operator === "-") {
        return firstValue - secondValue;
    } else if (operator === "*") {
        return firstValue * secondValue;
    } else if (operator === "/") {
        return firstValue / secondValue;
    }
}

function inputNumber(number) {
    if (waitingForSecondValue) {
        displayValue = number;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === "0" ? number : displayValue + number;
    }
}

function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += ".";
    }
}   

function clear() {
    displayValue = "0";
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

