const VALIDATE_URL = "https://words.dev-apis.com/validate-word"
const WOD_URL = "https://words.dev-apis.com/word-of-the-day"

const main = document.querySelector('.main')

function handleKeydown(event) {
    if (event.key === 'Enter') {
        handleEnter(event)
    } else if (event.key === 'Backspace') {
        handleBackspace(event)
    } else if (!isLetter(event.key)) {
        event.preventDefault()
    }
}

function handleEnter(event) {
    const row = event.target.parentElement
    let word = getWordFromRow(row)
    if (word.length === 5) {
        submitWord(word)
        disableRow(row)
        goToNextRow(row)
    }
}

function handleBackspace(event) {
    if (!event.target.value && event.target.previousElementSibling) { // if not in the last input with a letter
        event.target.previousElementSibling.focus()
    }
}

function goToNextRow(row) {
    nextRow = row.nextElementSibling
    if (nextRow) {
        nextRow.classList.add('current-row')
        nextRow.querySelector('.input').focus()
    }
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function goToNextInput(event) {
    if (event.inputType === "insertText" && event.target.nextElementSibling) {
        event.target.nextElementSibling.focus()
    }
}

function getWordFromRow(row) {
    const inputs = row.children
    let word = ''
    for (let i = 0; i < inputs.length; i++) {
        word += inputs[i].value
    }
    return word
}

function disableRow(row) {
    row.classList.add('submitted')
    row.classList.remove('current-row')
    row.querySelectorAll('.input').forEach(function disableInput(inputElement) {
        inputElement.setAttribute('disabled', '')
    } )
}

function submitWord(word) {
    console.log('submitted: ', word)
    // getWordOfTheDay().then(function compareWords (wordOfTheDay) {
    //     console.log('Word of the Day :', wordOfTheDay)
    //     console.log('Word: ', word)
    // } )
}

function handleClick(event) {
    event.preventDefault()
}

async function getWordOfTheDay() {
    const promise = await fetch(WOD_URL)
    const processedResponse = await promise.json()
    return processedResponse.word
}

function init() {
    main.addEventListener("keydown", handleKeydown)
    main.addEventListener("input", goToNextInput)
    main.addEventListener("click", handleClick)

    main.querySelector('.input').focus()
}

init()