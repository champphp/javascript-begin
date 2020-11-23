const showDayEl = document.getElementById('show__days')

const imageDatabase = {
  rock: document.getElementById('rps_rock').src,
  paper: document.getElementById('rps_paper').src,
  scissors: document.getElementById('rps_scissors').src,
}


// Challenge 1
const AgeInDays = () => {
  const age = prompt("What are you age")
  showDayEl.innerText = ''
  const now = new Date()
  const start = new Date()
  start.setFullYear((now.getFullYear() - age))
  const diff = now - start
  const oneDay = 1000 * 60 * 60 * 24
  const ageInDays = Math.floor(diff / oneDay)
  showDayEl.innerText = `You are ${ageInDays} day old`
}

const AgeInDaysReset = () => {
  showDayEl.innerText = ''
}

//Challenge 2
const generatorDog = () => {
  const img = document.createElement('img')
  const div = document.getElementById('flex-cat-gen')
  img.src = 'https://media.tenor.com/images/d7afbeb5c3b3efc48a86eb2c3450ceb8/tenor.gif'
  div.appendChild(img)
}

// Challenge 3
const rpsGame = (yourChoice) => {
  const choice = yourChoice.getAttribute('data-choice')
  const itemsRPSGame = ['rock', 'paper', 'scissors']
  let botChoice = null
  botChoice = itemsRPSGame[Math.floor(Math.random() * itemsRPSGame.length)];
  const score = decideWinner(choice, botChoice)
  const Yourmessage = finalMessage(score)
  rpsFrontend(choice, botChoice, Yourmessage)

}

const decideWinner = (yourChoice, computerChoice) => {
  const rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  }
  const yourScore = rpsDatabase[yourChoice][computerChoice]
  return yourScore
}

const finalMessage = (yourScore) => {
  switch (yourScore) {
    case 1:
      return { message: 'You win!', color: 'green' }
      break;
    case 0.5:
      return { message: 'You tied!', color: 'yellow' }
      break;
    case 0:
      return { message: 'You lost!', color: 'red' }
      break;
    default:
  }
}

const rpsFrontend = (yourChoice, computerChoice, message) => {

  document.getElementById('rps_rock').remove()
  document.getElementById('rps_paper').remove()
  document.getElementById('rps_scissors').remove()

  const divEl = document.createElement('div')

  const humanEl = document.createElement('img')
  const botEl = document.createElement('img')
  const messageEl = document.createElement('div')

  humanEl.src = imageDatabase[yourChoice]
  humanEl.height = 150
  humanEl.width = 150
  humanEl.alt = yourChoice
  humanEl.style.boxShadow = '0 10px 50px rgba(37, 50, 233, 0.7)'

  messageEl.innerText = message.message
  messageEl.style.color = message.color
  messageEl.style.fontSize = "60px"
  messageEl.style.padding = '30px'

  botEl.src = imageDatabase[computerChoice]
  botEl.height = 150
  botEl.width = 150
  botEl.alt = computerChoice
  botEl.style.boxShadow = '0 10px 50px rgba(237, 50, 61, 0.7)'


  document.getElementById('flew-box-rps').appendChild(humanEl)
  document.getElementById('flew-box-rps').appendChild(messageEl)
  document.getElementById('flew-box-rps').appendChild(botEl)

}

const rpsGameReset = () => {
  const rpsGameEl = document.getElementById('flew-box-rps')

  rpsGameEl.innerHTML = ''

  const rockEl = document.createElement('img')
  const paperEl = document.createElement('img')
  const scissorsEl = document.createElement('img')

  rockEl.src = imageDatabase['rock']
  rockEl.height = 150
  rockEl.width = 150
  rockEl.alt = 'Rock'
  rockEl.onclick = function () {
    rpsGame(this)
  }
  // rockEl.setAttribute('onclick, rpsGame(this)')
  rockEl.dataset.choice = 'rock'
  rockEl.setAttribute("id", "rps_rock")

  paperEl.src = imageDatabase['paper']
  paperEl.height = 150
  paperEl.width = 150
  paperEl.alt = 'Paper'
  paperEl.onclick = function () {
    rpsGame(this)
  }
  // paperEl.setAttribute('onclick, rpsGame(this)')
  paperEl.setAttribute("id", "rps_paper");
  paperEl.dataset.choice = 'paper'


  scissorsEl.src = imageDatabase['scissors']
  scissorsEl.height = 150
  scissorsEl.width = 150
  scissorsEl.alt = 'Scissors'
  scissorsEl.onclick = function () {
    rpsGame(this)
  }
  // scissorsEl.setAttribute('onclick, rpsGame(this)')
  scissorsEl.dataset.choice = 'scissors'
  scissorsEl.setAttribute("id", "rps_scissors");

  document.getElementById('flew-box-rps').appendChild(rockEl)
  document.getElementById('flew-box-rps').appendChild(paperEl)
  document.getElementById('flew-box-rps').appendChild(scissorsEl)
}


// Challenge 4
const buttonChangeEl = document.querySelectorAll('.change-color')

const copeButtonEl = []

for (let i = 0; i < buttonChangeEl.length; i++) {
  copeButtonEl.push({...buttonChangeEl[i].classList})
}

console.log(copeButtonEl)

const butttonColorChange = (changeButton) => {
  console.log(changeButton.value, buttonChangeEl)
  switch (changeButton.value) {
    case 'red':
      buttonRed()
      break;
    case 'green':
      buttonGreen()
      break;
    case 'reset':
      buttonColorReset()
      break;
    case 'random':
      buttonColorRandom()
      break;
    default:
  }
}

const buttonRed = () => {
  for (let i = 0; i < buttonChangeEl.length; i++) {
    buttonChangeEl[i].classList.remove(...buttonChangeEl[i].classList)
    buttonChangeEl[i].classList.add('btn', 'btn-danger', 'change-color')

  }
}

const buttonGreen = () => {
  for (let i = 0; i < buttonChangeEl.length; i++) {
    buttonChangeEl[i].classList.remove(...buttonChangeEl[i].classList)
    buttonChangeEl[i].classList.add('btn', 'btn-success', 'change-color')
  }
}

const buttonColorReset = () => {
  for (let i = 0; i < buttonChangeEl.length; i++) {
    console.log(copeButtonEl[i])
    buttonChangeEl[i].classList.remove(...buttonChangeEl[i].classList)
    buttonChangeEl[i].classList.add(
      copeButtonEl[i][0],
      copeButtonEl[i][1],
      copeButtonEl[i][2])
  }
}

const buttonColorRandom = () => {
  const chioceColorButton = ['btn-primary', 'btn-secondary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark']
  for (let i = 0; i < buttonChangeEl.length; i++) {
    const botColor = chioceColorButton[Math.floor(Math.random() * chioceColorButton.length)]
    buttonChangeEl[i].classList.remove(...buttonChangeEl[i].classList)
    buttonChangeEl[i].classList.add('btn', botColor, 'change-color')

  }
}

