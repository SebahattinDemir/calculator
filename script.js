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
    if (!element.matches("button")) return;

    if (element.classList.contains("operator")) {
        handleOperator(element.value);
        return;}
    if (element.classList.contains("decimal")) {
        inputDecimal();
        updateDisplay();
        return;}
    if (element.classList.contains("clear")) {
        clear(); 
        updateDisplay(); 
        return;}

    inputNumber(element.value);
    updateDisplay();

});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    if(firstValue === null){
        firstValue = value;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
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
}

