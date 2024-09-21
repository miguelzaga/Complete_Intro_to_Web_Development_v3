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
        submitWord(word, row)
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
    })
}

function submitWord(word, row) {
    validateWord(word)
        .then(function (isValid) {
            if (isValid) {
                getWordOfTheDay()
                    .then(function compareWordOfTheDay(wordOfTheDay) {
                        const results = compareWords(word, wordOfTheDay)
                        addColorsToInput(row, results.matches)
                        disableRow(row)
                        if (results.winner) {
                            window.alert('You win!')
                        } else {
                            goToNextRow(row)
                        }
                    })
            } else {
                window.alert('Word is not valid')
            }
        })
}

    function addColorsToInput(row, matches) {
    matchToColor = {
        "yes": "green",
        "in-the-word": "yellow",
        "no": "red"
    }
    inputs = row.querySelectorAll('.input').forEach(function addColorClass(inputElement, i) {
        inputElement.classList.add(matchToColor[matches[i]])
    })
}

function compareWords(word1, secretWord) {
    const secretArray = secretWord.split('')
    const matches = []
    for (let i = 0; i < word1.length; i++) {
        let letter = word1[i]
        if (letter === secretWord[i]) {
            matches.push('yes')
        } else if (secretArray.includes(letter)) {
            let indexLetter = secretArray.indexOf(letter)
            secretArray[indexLetter] = null
            matches.push('in-the-word')
        } else {
            matches.push('no')
        }
    }

    const isSolution = matches.every((match) => match === 'yes')
    return {
        winner: isSolution,
        matches: matches
    }
}

async function getWordOfTheDay() {
    const promise = await fetch(WOD_URL)
    const processedResponse = await promise.json()
    return processedResponse.word
}

async function validateWord(word) {
    const promise = await fetch(VALIDATE_URL, {
        method: "POST",
        body: JSON.stringify({ "word": word })
    })
    const processedResponse = await promise.json()
    return processedResponse.validWord
}

function init() {
    main.addEventListener("keydown", handleKeydown)
    main.addEventListener("input", goToNextInput)
    main.querySelector('.input').focus()
}

init()