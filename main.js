const textArea = document.getElementById("text-area");
const charCountText = document.querySelector(".char-count-value")
const charCountTextNoSpaces = document.querySelector(".char-count-nospace-value")
const countParagraphsText = document.querySelector(".count-paragraphs-value")
const clearTextButton = document.querySelector(".clear-btn")
const countWordsText = document.querySelector(".count-words-value")
const keywordsList = document.getElementById('keywords-list');
const charLimitInput = document.getElementById('character-limit')
const characterLimitWarning = document.querySelector('.character-limit-warning')


const words = textArea.value.split(/\s+/);


let charCount = 0;
let charCountNoSpaces = 0;
let wordsCount = 0
let paragraphsCount = 0


function checkCharacterLimit(text){
    const charLimit = parseInt(charLimitInput.value)

    if (!charLimit) {
        characterLimitWarning.style.display = 'none';
        textArea.style.borderColor = '#61636E';
        return false;
    }

    if (text.length >= charLimit) {
        characterLimitWarning.style.display = 'flex';
        textArea.style.borderColor = '#FFC9DA';
        return true;
    } else {
        characterLimitWarning.style.display = 'none';
        textArea.style.borderColor = '#61636E';
        return false;
    }
}


// function that count total characters
function countChar(text){
    charCount = text.length;
    charCountText.innerText = charCount
}

// function that count characters with no spaces
function countCharNoSpaces(text){
    let noWhiteSpaceText = text.replace(/\s/g, "")
    charCountNoSpaces = noWhiteSpaceText.length
    charCountTextNoSpaces.innerText = charCountNoSpaces;
}

// function that count words
function countWords(text){
    const word = text.trim()
    if (word === ""){
        countWordsText.innerText = 0;
        return wordsCount = 0;
    }
    wordsCount = word.split(/\s+/).length
    countWordsText.innerText = wordsCount
}

// function that count paragraphs
function countParagraphs(text){
    const lines = text.split(/\n+/)
    const noEmptyLines = lines.filter(line => line.trim() !=="");
    paragraphsCount = noEmptyLines.length;
    countParagraphsText.innerText = paragraphsCount;
}

function findKeywords(text){
    // 1. Clean and split text into words
    const words = text
    .toLowerCase()
    .replace(/[^\w\s']/g, ' ') // Remove special chars except apostrophes
    .split(/\s+/)
    .filter(word => word !== '');

    // 2. Count word frequencies
    const wordCounts = {};
    words.forEach(word => {
    const cleanWord = word.replace(/^'+|'+$/g, ''); // Trim apostrophes
    if (cleanWord.length > 0) {
      wordCounts[cleanWord] = (wordCounts[cleanWord] || 0) + 1;
    }
  });

  // 3. Sort and get top 5 words
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

    // 4. Calculate percentages
  const totalWords = wordsCount || 1; // Prevent division by zero
  keywordsList.innerHTML = ''; // Clear previous results

  // 5. Create DOM elements
  sortedWords.forEach(([word, count]) => {
    const percentage = ((count / totalWords) * 100).toFixed(1);
    
    const row = document.createElement('div');
    row.className = 'keyword-row';
    row.innerHTML = `
      <span class="word">${word}</span>
      <span class="count">${count}</span>
      <span class="percent">${percentage}%</span>
    `;
    
    keywordsList.appendChild(row);
  });
}


function clearText(){
    charCountText.innerText = 0;
    charCountTextNoSpaces.innerText = 0
    countWordsText.innerText = 0
    countParagraphsText.innerText = 0
    textArea.value = "";
    characterLimitWarning.style.display = 'none';
    textArea.style.borderColor = '#61636E';
    charLimitInput.value = '';

    const keywordsList = document.getElementById('keywords-list');
    keywordsList.innerHTML = '<div class="keyword-row"><span class="word"></span><span class="count"></span><span class="percent"></span></div>';
}

textArea.addEventListener('input', () => {
    const hasExceeded = checkCharacterLimit(textArea.value);
    if (hasExceeded){
        textArea.value = textArea.value.slice(0, parseInt(charLimitInput.value));
    }

    countChar(textArea.value);
    countCharNoSpaces(textArea.value);
    countWords(textArea.value);
    countParagraphs(textArea.value);
    findKeywords(textArea.value);
  });

clearTextButton.addEventListener('click', clearText)
