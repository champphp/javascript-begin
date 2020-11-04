const pwEl = document.getElementById('pw')
const copyBtn = document.getElementById('copy')
const lenEl = document.getElementById('len')
const upperEl = document.getElementById('upper')
const lowerEl = document.getElementById('lower')
const numberEl = document.getElementById('number')
const symbolEl = document.getElementById('symbol')
const generatorBtn = document.getElementById('generator')


const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

const getLowerLetters = () => {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)]
}

const getUpperLetters = () => {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)]
}

const getNumbers = () => {
  return numbers[Math.floor(Math.random() * numbers.length)]
}

const getSymbols = () => {
  return symbols[Math.floor(Math.random() * symbols.length)]
}

const generateX = () => {
  const xs = []
  if (upperEl.checked) {
    xs.push(getUpperLetters())
  }
  if (lowerEl.checked) {
    xs.push(getLowerLetters())
  }
  if (numberEl.checked) {
    xs.push(getNumbers())
  }
  if (symbolEl.checked) {
    xs.push(getSymbols())
  }

  if(xs.length === 0) return ''

  return xs[Math.floor(Math.random() * xs.length)]
}

const generatorPassword = () => {
  const len = lenEl.value
  let password = ''

  if (upperEl.checked) {
    password += getUpperLetters();
}

if (lowerEl.checked) {
    password += getLowerLetters();
}

if (numberEl.checked) {
    password += getNumbers();
}

if (symbolEl.checked) {
    password += getSymbols();
}

  for (let i = password.length; i < len; i++) {
    const x = generateX()
    password += x
  }

  pwEl.innerText = password
}

generatorBtn.addEventListener('click', generatorPassword)

copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = pwEl.innerText;

  if (!password) {
      return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});