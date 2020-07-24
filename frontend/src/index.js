// const BACKEND_URL = "http://localhost:3000";
// fetch(`${BACKEND_URL}/score_boards`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse))
document.addEventListener("DOMContentLoaded", function(e) {
  const game = document.getElementById("game")

  appendStart()
})

function appendStart() {
  let start = document.createElement("div")

  start.id = "start"
  start.innerHTML = "START"

  game.appendChild(start)
  start.addEventListener("click", handleStartClick)
}

function handleStartClick() {
  const start = document.getElementById("start")
  start.removeEventListener("click", handleStartClick)

  start.innerHTML = 3
  countDown(start)
}

function countDown(start) {
  let i = 2

  const countdown = setInterval(function(){
    if (i >= 1) {
      start.innerHTML = i
      i--
    } else if (i === 0) {
      start.innerHTML = "GO!"
      i --
    } else if (i === -1) {
      clearInterval(countdown)
      start.remove()
      startGame()
    }
  }, 1000)
}

function startGame() {
  appendScore()
  appendLives()
  addTarget()
}

function appendScore() {
  const score = document.createElement("div")
  score.id = "score"
  score.innerHTML = "0000000"

  game.appendChild(score)
}

function appendLives() {
  const lives = document.createElement("div")
  lives.id = "lives"
  lives.innerHTML = 3

  game.appendChild(lives)
}

function addTarget() {
  let target = document.createElement("div")
  target.classList = "target"

  game.appendChild(target)

  target.style.left = `${getRndInteger(0, 890)}px`
  target.style.bottom = `${getRndInteger(0, 650)}px`

  listenToTarget(target)
}

function listenToTarget(target) {
  target.addEventListener("click", function() {
    incrementScore()
    target.remove()
    addTarget()
  })
}

function incrementScore() {
  const score = document.getElementById("score")

  let updatedScore = parseInt(score.innerHTML) + 50
  updatedScore = pad_with_zeroes(updatedScore, 7)

  score.innerHTML = updatedScore
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function pad_with_zeroes(number, length) {
  let string = "" + number
  while (string.length < length) {
      string = "0" + string
  }

  return string
}

// lives should be 3 images or objects that decrease when lost
// scoreboard option under start
// if new highscore, add initials to submit to score board
// each target has a time limit, maybe 2 seconds, before disappearing and losing a life
// clicking without missing increases a multiplier (imagine guitar hero)