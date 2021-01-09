const playButton = document.querySelector('.play')
const timeLeft = document.querySelector('.timer')
const scoreBoard = document.querySelector('.score')
const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
const duration = 10 // seconds
let score = 0
let lastHole
let lastMole
let isPlaying = false

function randomTime(min, max) {
  const time = Math.floor(Math.random() * (max - min + 1) + min)
  return time
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if (lastHole === hole) {
    return randomHole(holes)
  }
  lastHole = holes[idx]
  return holes[idx]
}

function peep() {
  const time = randomTime(400, 1200)
  const hole = randomHole(holes)

  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if (isPlaying) peep()
  }, time)
}

function bonk(e) {
  if (e.isTrusted && lastMole !== e.target) {
    e.currentTarget.classList.remove('up')
    score++
    scoreBoard.textContent = score
    lastMole = e.currentTarget
  }
}

let lastTimeout
let countdown
function startGame() {
  displayTimeLeft(duration)
  if (isPlaying) {
    isPlaying = false
    clearTimeout(lastTimeout)
    clearInterval(countdown)
    playButton.textContent = 'Start!'
  } else {
    score = 0
    scoreBoard.textContent = score
    playButton.textContent = 'Stop'
    isPlaying = true
    timer()
    peep()
    lastTimeout = setTimeout(() => {
      isPlaying = false
      playButton.textContent = 'Start!'
    }, 10000)
  }
}

moles.forEach(mole => mole.addEventListener('click', bonk))
playButton.addEventListener('click', startGame)

function timer(seconds = duration) {
  clearInterval(countdown)
  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(secondsLeft) {
  const display = `00:${pad(secondsLeft)}`
  timeLeft.textContent = display
}

function pad(number) {
  if (number < 10) {
    return `0${number}`
  }
  return number.toString()
}
