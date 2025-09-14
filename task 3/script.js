document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');

    let currentInput = '0';
    let operator = null;
    let previousInput = '';
    let resetDisplay = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function handleNumberClick(number) {
        if (resetDisplay) {
            currentInput = number;
            resetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
        updateDisplay();
    }

    function handleOperatorClick(nextOperator) {
        if (operator && !resetDisplay) {
            calculate();
        }
        previousInput = currentInput;
        operator = nextOperator;
        resetDisplay = true;
    }

    function handleEqualsClick() {
        calculate();
        operator = null;
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        updateDisplay();
        resetDisplay = true;
    }

    function handleClearClick() {
        currentInput = '0';
        operator = null;
        previousInput = '';
        resetDisplay = false;
        updateDisplay();
    }

    function handleDeleteClick() {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
        updateDisplay();
    }

    function handleDotClick() {
        if (resetDisplay) {
            currentInput = '0.';
            resetDisplay = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    buttons.addEventListener('click', (event) => {
        if (!event.target.matches('.button')) return;

        const button = event.target;
        const buttonText = button.textContent;

        if (button.classList.contains('number')) {
            handleNumberClick(buttonText);
        } else if (button.classList.contains('operator')) {
            if (buttonText === 'DEL') {
                handleDeleteClick();
            } else {
                handleOperatorClick(buttonText);
            }
        } else if (button.classList.contains('equals')) {
            handleEqualsClick();
        } else if (button.classList.contains('clear')) {
            handleClearClick();
        } else if (button.classList.contains('dot')) {
            handleDotClick();
        }
    });

    updateDisplay();
});
