function add(x,y) {
    return x + y;
}

function subtract(x,y) {
    return x - y;
}

function multiply(x,y) {
    return x * y;
}

function divide(x,y) {
    return x / y;
}

function operate(num1, num2, op) {
    if (op === '+') return add(num1, num2);
    else if (op === '-') return subtract(num1,num2);
    else if (op === '*') return multiply(num1,num2);
    else if (op === '/') return divide(num1, num2);
}
