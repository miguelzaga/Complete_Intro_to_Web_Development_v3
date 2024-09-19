const VALIDATE_URL = "https://words.dev-apis.com/validate-word"
const WOD_URL = "https://words.dev-apis.com/word-of-the-day"

const main = document.querySelector('.main')

function handleKeypress(event) {
  if (event.key === 'Enter') {
    let word = getWord(event.target.parentElement)
    if (word.length === 5) {
      submitWord(word)
    }
  } else if (isLetter(event.key) === false) {
    event.preventDefault()
  }
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function handleInput(event) {
  if (event.inputType === "insertText" && event.target.nextElementSibling) {
    event.target.nextElementSibling.focus()
  } else if (event.inputType === "deleteContentBackward" && event.target.previousElementSibling) {
    event.target.previousElementSibling.focus()
  }
}

function getWord(row) {
  const inputs = row.children
  let word = ''
  for (let i = 0; i < inputs.length; i++) {
    word += inputs[i].value
  }
  return word
}

function submitWord(word) {
    getWordOfTheDay().then(function compareWords (wordOfTheDay) {
        console.log('Word of the Day :', wordOfTheDay)
        console.log('Word: ', word)
    } )
}

async function getWordOfTheDay(){
    const promise = await fetch(WOD_URL)
    const processedResponse = await promise.json()
    return processedResponse.word
}

function init() {
  main.addEventListener("keypress", handleKeypress)
  main.addEventListener("input", handleInput)
}

init()