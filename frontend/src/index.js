// const BACKEND_URL = "http://localhost:3000";
// fetch(`${BACKEND_URL}/score_boards`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse))
document.addEventListener("DOMContentLoaded", function(e) {
  const game = document.getElementById("game")

  appendStart()
  appendLeaderboard()
})

function appendStart() {
  let start = document.createElement("div")

  start.id = "start"
  start.innerHTML = "START"

  game.appendChild(start)
  start.addEventListener("click", handleStartClick)
}

function appendLeaderboard() {
  let leaderboard = document.createElement("div")

  leaderboard.id = "leaderboard"
  leaderboard.innerHTML = "LEADERBOARD"

  game.appendChild(leaderboard)
}

function handleStartClick() {
  const start = document.getElementById("start")
  start.removeEventListener("click", handleStartClick)

  const leaderboard = document.getElementById("leaderboard")
  leaderboard.remove()

  start.innerHTML = 3
  countDown(start)
}

function countDown(start) {
  let i = 2

  const countdown = setInterval(function() {
    if (i >= 1) {
      start.innerHTML = i
      i--
    } else if (i === 0) {
      playStartSound()
      start.innerHTML = "GO!"
      i --
    } else if (i === -1) {
      clearInterval(countdown)
      start.remove()
      startGame()
    }
  }, 1000)
}

let gameInterval

function startGame() {
  appendScore()
  appendLives()
  gameInterval = setInterval(targetInterval, 1000)
}

function targetInterval() {
  const target = document.getElementById("target")
  let gameStatus = true

  if (target) {
    let deleted
    deleted = decrementLives()

    target.remove()

    if (!deleted) {
      gameStatus = false
      gameOver()
    }
  }

  if (gameStatus) { addTarget() }
}

function decrementLives() {
  heart = document.querySelector(".heart")
  let deleted

  if (heart) {
    heart.remove()
    deleted = true
  } else {
    deleted = false
  }

  return deleted
}

function appendScore() {
  const score = document.createElement("div")
  score.id = "score"
  score.innerHTML = "0000000"

  game.appendChild(score)
}

function appendLives() {
  for (let i = 0; i < 3; i++) {
    const life = document.createElement("div")

    life.classList = "heart"
    document.getElementById("lives-container").appendChild(life)
  }
}

function addTarget() {
  let target = document.createElement("div")
  target.id = "target"

  game.appendChild(target)

  target.style.left = `${getRndInteger(0, 890)}px`
  target.style.bottom = `${getRndInteger(0, 650)}px`

  listenToTarget(target)
}

function listenToTarget(target) {
  target.addEventListener("click", function() {
    playTargetSound()
    incrementScore()
    target.remove()
  })
}

function playTargetSound() {
  let sound = document.getElementById("target-sound")
  sound.pause()
  sound.currentTime = 0
  sound.play()
}

function playStartSound() {
  let sound = document.getElementById("start-sound")
  sound.pause()
  sound.currentTime = 0
  sound.play()
}

function incrementScore() {
  const score = document.getElementById("score")

  let updatedScore = parseInt(score.innerHTML) + 50
  updatedScore = pad_with_zeroes(updatedScore, 7)

  score.innerHTML = updatedScore
}

function gameOver() {
  alert("Game Over!")
  clearInterval(gameInterval)
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

// scoreboard option under start
// if new highscore, add initials to submit to score board
// clicking without missing increases a multiplier (imagine guitar hero)