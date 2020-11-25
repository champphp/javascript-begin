let blackjackGame = {
  you: {
    scoreSpan: '#you-blackjack-result',
    div: '#your-box',
    score: 0
  },
  dealer: {
    scoreSpan: '#dealer-blackjack-result',
    div: '#dealer-box',
    score: 0
  },
  card: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
  cardsMap: {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'K': 10,
    'J': 10,
    'Q': 10,
    'A': [1, 11]
  },
  win: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
}

const you = blackjackGame['you']
const dealer = blackjackGame['dealer']

const hitSound = new Audio('blackjack_assets/sounds/swish.m4a')
const winSound = new Audio('blackjack_assets/sounds/cash.mp3')
const lossSound = new Audio('blackjack_assets/sounds/aww.mp3')

const cardItem = blackjackGame['card']

const showCard = (card, activePlayer) => {
  if (activePlayer['score'] <= 21) {
    const cardImage = document.createElement('img')
    cardImage.src = `blackjack_assets/images/${card}.png`
    document.querySelector(activePlayer['div']).appendChild(cardImage)
    hitSound.play()
  }
}

const blackjackHit = () => {
  if (blackjackGame['isStand'] === false) {
    const youCardRandom = randomCard()
    showCard(youCardRandom, you)
    updateScore(youCardRandom, you)
    showScore(you)
  }
}

const blackjackDeal = () => {
  if (blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false

    let yourImage = document.querySelector(you['div']).querySelectorAll('img')
    let dealerImage = document.querySelector(dealer['div']).querySelectorAll('img')
    for (let i = 0; i < yourImage.length; i++) {
      yourImage[i].remove()
    }

    for (let i = 0; i < dealerImage.length; i++) {
      dealerImage[i].remove()
    }

    you['score'] = 0
    dealer['score'] = 0

    document.querySelector(you['scoreSpan']).textContent = 0
    document.querySelector(dealer['scoreSpan']).textContent = 0
    document.querySelector(you['scoreSpan']).style.color = 'white'
    document.querySelector(dealer['scoreSpan']).style.color = 'white'

    document.querySelector('#blackjack-result').textContent = `Let' play`
    document.querySelector('#blackjack-result').style.color = 'black'

    blackjackGame['turnsOver'] = true
  }

}

const randomCard = () => {
  const item = cardItem[Math.floor(Math.random() * cardItem.length)];
  return item
}

const updateScore = (card, activePlayer) => {

  if (card === 'A') {
    if ((activePlayer['score'] + blackjackGame['cardsMap'][card][1]) <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1]
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0]
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card]
  }

}

const showScore = (activePlayer) => {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST'
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer.score
  }
}

const sleep = (ms) => {
  return new Promise(resovle => setTimeout(resovle, ms))
}

const dealerLogic = async () => {
  blackjackGame['isStand'] = true

  while (dealer.score < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard()
    showCard(card, dealer)
    updateScore(card, dealer)
    showScore(dealer)
    await sleep(1000)
  }
  blackjackGame['turnsOver'] = true
  let winner = computeWinner()
  showResult(winner)

}

const computeWinner = () => {
  let winner
  if (you.score <= 21) {
    if (you.score > dealer.score || dealer.score > 21) {
      blackjackGame['win']++
      winner = you
    } else if (you.score < dealer.score) {
      blackjackGame['losses']++
      winner = dealer
    } else if (you.score === dealer.score) {
      blackjackGame['draws']++
    }
  } else if (you.score > 21 && dealer.score <= 21) {
    blackjackGame['losses']++
    winner = dealer
  } else if (you.score > 21 && dealer.score > 21) {
    blackjackGame['draws']++
  }

  console.log('Winner is', winner)
  console.log(blackjackGame)
  return winner

}

const showResult = (winner) => {
  let message, messageColor

  if (blackjackGame['turnsOver'] === true) {


    if (winner === you) {
      document.querySelector('#wins').textContent = blackjackGame['win']
      message = 'You win!'
      messageColor = 'green'
      winSound.play()
    } else if (winner === dealer) {
      document.querySelector('#losses').textContent = blackjackGame['losses']
      message = 'You lost!'
      messageColor = 'red'
      lossSound.play()
    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws']
      message = 'You Draws!'
      messageColor = 'black'
    }

    document.querySelector('#blackjack-result').textContent = message
    document.querySelector('#blackjack-result').style.color = messageColor
  }

}

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)
