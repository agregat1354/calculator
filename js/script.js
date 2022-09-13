const buttons = document.querySelectorAll('.btn');
const numbers = document.querySelectorAll('.number');
const ops = document.querySelectorAll('.op');
const displayRef = document.querySelector('.display');
const equalitySign = document.querySelector('.eq');
const clear = document.querySelector('.ac');
const back = document.querySelector('.back');
const dot = document.querySelector('.dot');
let currentNumber = '';
const exprObj = {num1: null, operator: null, num2: null};

let errorFlag = "all good";

function displayMessageOnDisplay(msg) {
    displayRef.textContent = msg;
}

back.addEventListener('click', () => {
    if (currentNumber.length > 0) {
        currentNumber = currentNumber.substring(0,currentNumber.length-1);
        display();
    }
})

dot.addEventListener('click', ()=> {
    if (checkIfThereIsDotAlready()) return;
    else currentNumber += '.';
    display();
})

function deleteMultipleZerosFromEnd() {
    let nonZeroIndex = 2;
    for (let i = currentNumber.length - 1; i > 2; i--) {
        if (currentNumber.charAt(i) !== '0') {
            nonZeroIndex = i;
            break;
        }
    }
    currentNumber = currentNumber.slice(0, nonZeroIndex + 1);
}

function checkIfThereIsDotAlready() {
    let present = false;
    for (let char in currentNumber) {
        if (char === '.') {
            present = true;
        }
    }
    return present;
}



clear.addEventListener('click', ()=> {
    currentNumber = '';
    exprObj.num1 = null;
    exprObj.operator = null;
    exprObj.num2 = null;
    errorFlag = 'all good';
    display();
})

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (errorFlag === "error") return;
        if (currentNumber.length < 11) {
            // let n = retriveNumber(number.classList).toString();
            // if (!(n === '0' && currentNumber.length === 0)) {
            //     currentNumber += n;
            //     display();
            // }
            currentNumber += retriveNumber(number.classList).toString();
            display();
        }
    })
})

ops.forEach(op=> {
    op.addEventListener('click', () => {
        if (errorFlag === "error") return;
        if (exprObj.num1 === null && currentNumber.length > 0) {
            exprObj.num1 = currentNumber;
            currentNumber = '';
        }
        if (exprObj.num1 === null) return;
        let oper = retriveOperator(op);
        console.log("clicked operator:", oper);
        if (exprObj.num1 !== null && exprObj.operator !== null &&
            exprObj.num2 === null && currentNumber.length > 0) {
                exprObj.num2 = currentNumber;
            }
        if (readyToEvaluate()) {
            evaluateExpression();
            exprObj.operator = oper;
        } else if (exprObj.operator === null) {
            console.log("number but no operator");
            exprObj.operator = oper;
            currentNumber = '';
        } 
    })
})

equalitySign.addEventListener('click', ()=> {
    if (errorFlag === "error") return;
    if (exprObj.num1 !== null && exprObj.operator !== null &&
         exprObj.num2 === null && currentNumber.length > 0) {
            exprObj.num2 = currentNumber;
    } 
    if(readyToEvaluate()) {
        evaluateExpression();
    } 
});

function checkIfFloat(num) {
    let epsilon = 0.001;
    if (Math.abs(num - Math.floor(num)) < epsilon) {
        return false;
    } else {
        return true;
    }

}

function evaluateExpression() {
    let operand1;
    let operand2;
    if (checkIfFloat(parseFloat(exprObj.num1))) {
        operand1 = parseFloat(exprObj.num1);
    } else {
        operand1 = parseInt(exprObj.num1);
    }
    if (checkIfFloat(parseFloat(exprObj.num2))) {
        operand2 = parseFloat(exprObj.num2);
    } else {
        operand2 = parseInt(exprObj.num2);
    }
    
    
    let operator = exprObj.operator;

    if (operand2 === 0 && operator === '/') {
        console.log("Hello");
        displayMessageOnDisplay('err: div by 0');
        errorFlag = "error";
        return;
    }

    let result = operate(operand1, operand2, operator);
    if (result.toString().length > 11) {
        console.log("too long");
        currentNumber = result.toString().substring(0,11);
    } else {
        currentNumber = result.toString();
    }
    exprObj.operator = null;
    exprObj.num2 = null;
    exprObj.num1 = null;
    display();
}

function readyToEvaluate() {
    let readyToEval = true;

    for (elem in exprObj) {
        if (exprObj[elem] === null) {
            readyToEval = false;
        }
    }

    return readyToEval;
}

function retriveOperator(op) {
    let ret = '';
    op.classList.forEach(cls => {
        if (cls === 'div') {
            ret = '/'
        }
        else if (cls === 'mul') {
            ret = '*'
        } 
        else if (cls === 'sub') {
            ret = '-';
        } 
        else if (cls === 'add') {
            ret = '+';
        } 
        else if (cls === 'eq') {
            ret = '=';
        } 
    })
    return ret;
}

function retriveNumber(classList) {
    let ret = '';
    classList.forEach(cls => {
        if (cls.match(/\d|^zero$/) !== null) {
            if (cls === 'zero') {
                ret = 0;
            } else {
                ret = cls;
            }
        }
    });
    return ret;
}

function display() {
    deleteMultipleZerosFromEnd()
    displayRef.textContent = currentNumber;
}

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
