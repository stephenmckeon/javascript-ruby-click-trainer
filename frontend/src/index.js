// const BACKEND_URL = 'http://localhost:3000';
// fetch(`${BACKEND_URL}/score_boards`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse))
document.addEventListener("DOMContentLoaded", function(e) {
  const game = document.getElementById("game")

  appendStart()
})

function appendStart() {
  let div = document.createElement("div")

  div.id = "start"
  div.innerHTML = "START"
  listenToStart(div)

  game.appendChild(div)
}

function listenToStart(div) {
  div.addEventListener("click", function() {
    let start = document.getElementById("start")
    start.innerHTML = 3
    countDown(start)
  })
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
  score.innerHTML = 0

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
  score.innerHTML = parseInt(score.innerHTML) + 50
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

// makes score format 0000150