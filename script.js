//Constantes dos Botões

const numberButtons = document.querySelectorAll("[data-number]");
const operateButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");

//Constantes dos Resultados

const resultPreviousText = document.querySelector("[data-result-previous]");
const resultCurrentText = document.querySelector("[data-result-current]");

//Classe do Cálculo

class Calculator {
    constructor(resultPreviousText, resultCurrentText) {
        this.resultPreviousText = resultPreviousText;
        this.resultCurrentText = resultCurrentText;
        this.clear();
    }

    calculate(){
        let result; 

        const _resultPrevious = parseFloat(this.resultPrevious);
        const _resultCurrent = parseFloat(this.resultCurrent);

        switch (this.operation) {
            case '+':
                result = _resultPrevious + _resultCurrent;
                break;

            case '-':
                result = _resultPrevious - _resultCurrent;
                break;
            
            case '÷':
                result = _resultPrevious / _resultCurrent;
                break;

            case 'x':
                result = _resultPrevious * _resultCurrent;
                break;

            case '%':
                result = (_resultPrevious * _resultCurrent)/100;
                break;

            default:
                return;
        }

        this.resultCurrent = result;
        this.operation = undefined;
        this.resultPrevious = "";
    }

    chooseOperation(operation) {
        this.operation = operation;
        if (this.resultPrevious != '') {
            this.calculate()
        }

        this.resultPrevious = this.resultCurrent;
        this.resultCurrent = "";
    }

    appendNumber(number) {
        if (this.resultCurrent.includes('.') && number === '.');
        this.resultCurrent = `${this.resultCurrent}${number.toString()}`;
    }

    clear() {
        this.resultCurrent = "";
        this.resultPrevious = "";
        this.operation = undefined;
    }

    delete() {
        this.resultCurrent = this.resultCurrent.toString().slice(0, -1);
    }

    updateDisplay() {
        this.resultPreviousText.innerText = `${this.resultPrevious} ${this.operation || ""}`;
        this.resultCurrentText.innerText = (this.resultCurrent);
    }

};

let calculator = new Calculator (
    resultPreviousText,
    resultCurrentText
);

for (const numberButton of numberButtons) {
    numberButton.addEventListener ("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
};

for (const operateButton of operateButtons) {
    operateButton.addEventListener('click', () => {
        calculator.chooseOperation(operateButton.innerText);
        calculator.updateDisplay();
    })
}

allClearButton.addEventListener ('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalButton.addEventListener('click' , ()=> {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})