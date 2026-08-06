class Calculator {
    constructor() {
        this.currentDisplay = document.getElementById('currentDisplay');
        this.previousDisplay = document.getElementById('previousDisplay');
        this.clear();
        this.bindEvents();
    }

    bindEvents() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.number);
                this.updateDisplay();
            });
        });

        // Operator buttons
        document.querySelectorAll('[data-operator]').forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.dataset.operator);
                this.updateDisplay();
            });
        });

        // Action buttons
        document.querySelector('[data-action="clear"]').addEventListener('click', () => {
            this.clear();
            this.updateDisplay();
        });

        document.querySelector('[data-action="delete"]').addEventListener('click', () => {
            this.delete();
            this.updateDisplay();
        });

        document.querySelector('[data-action="percent"]').addEventListener('click', () => {
            this.percent();
            this.updateDisplay();
        });

        document.querySelector('[data-action="equals"]').addEventListener('click', () => {
            this.compute();
            this.updateDisplay();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') this.appendNumber(e.key);
            if (e.key === '.') this.appendNumber(e.key);
            if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') this.chooseOperation(e.key);
            if (e.key === 'Enter' || e.key === '=') this.compute();
            if (e.key === 'Escape') this.clear();
            if (e.key === 'Backspace') this.delete();
            if (e.key === '%') this.percent();
            this.updateDisplay();
        });
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        if (this.shouldResetScreen) return;
        if (this.currentOperand === '0') return;
        
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '' || this.currentOperand === '-') {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }

        // Prevent multiple decimals
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Handle initial zero
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.showError('Cannot divide by zero');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = this.roundResult(computation).toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    percent() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        this.currentOperand = (current / 100).toString();
    }

    roundResult(number) {
        // Round to 10 decimal places to avoid floating point errors
        return Math.round(number * 10000000000) / 10000000000;
    }

    showError(message) {
        this.currentDisplay.textContent = message;
        setTimeout(() => {
            this.clear();
            this.updateDisplay();
        }, 2000);
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentDisplay.textContent = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            const operatorSymbol = {
                '+': '+',
                '-': '−',
                '*': '×',
                '/': '÷'
            }[this.operation];
            
            this.previousDisplay.textContent = 
                `${this.getDisplayNumber(this.previousOperand)} ${operatorSymbol}`;
        } else {
            this.previousDisplay.textContent = '';
        }

        // Add animation on update
        this.currentDisplay.style.animation = 'none';
        setTimeout(() => {
            this.currentDisplay.style.animation = '';
        }, 10);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
