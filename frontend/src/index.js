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

function countDown() {
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
  addTarget()
}

function addTarget() {
  let target = document.createElement("div")
  target.classList = "target"

  game.appendChild(target)
  listenToTarget(target)
}

function listenToTarget(target) {
  target.addEventListener("click", function() {
    target.remove()
  })
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}