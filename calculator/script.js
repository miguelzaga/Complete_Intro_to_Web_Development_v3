const calculator = document.querySelector('.calculator')
const display = document.querySelector('.display')

calculator.addEventListener('click', clickHandler)

let savedVal
let savedOperation

function clickHandler(event) {
    if (event.target.tagName === 'BUTTON') {
        let key = event.target.innerText
        let currVal = display.innerText
        if (isOperation(key)) {
            switch (key) {
                case "C":
                    if (savedVal && display.innerText === "0") {
                        savedVal = undefined
                        savedOperation = undefined
                    }
                    display.innerText = "0";
                    break
                case "←":
                    display.innerText = removeNumber(display.innerText)
                    break
                case "=":
                    if (savedOperation){
                        display.innerText = applyOperation(savedVal, currVal, savedOperation)
                        savedVal = undefined
                        savedOperation = undefined
                    }
                    break
                default:
                    savedVal = currVal
                    savedOperation = key
                    display.innerText = "0"
            }
        } else {
            display.innerText = addNumber(display.innerText, key)
        }
    }

}

function isOperation(text) {
    return isNaN(parseInt(text))
}

function applyOperation(str1, str2, operation) {
    const val1 = parseInt(str1)
    const val2 = parseInt(str2)
    switch (operation) {
        case "÷":
            return Math.floor(val1 / val2)
        case "✕":
            return val1 * val2
        case "-":
            return val1 - val2
        case "+":
            return val1 + val2
    }
}

function addNumber(calculatorText, keyText) {
    if (calculatorText === "0") {
        return keyText
    } else {
        return calculatorText + keyText
    }
}

function removeNumber(calculatorText) {
    if (calculatorText.length === 1) {
        return 0
    } else {
        return calculatorText.slice(0, -1)
    }
}

