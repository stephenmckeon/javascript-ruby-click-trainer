class Sound {
  constructor(element) {
    this.element = element
    this.gameSound = false
  }

  listenToSoundButton () {
    let soundButton = this.element
    let thisSound = this

    soundButton.addEventListener("click", function() {
      thisSound.gameSound ? thisSound.gameSound = false : thisSound.gameSound = true
      if (thisSound.gameSound) {
        soundButton.src = "img/sound-on.png"
      } else {
        soundButton.src = "img/sound-off.png"
      }
    })
  }

  playTargetSound() {
    this.playSound(document.getElementById("target-sound"))
  }

  playStartSound() {
    this.playSound(document.getElementById("start-sound"))
  }

  playMissSound() {
    this.playSound(document.getElementById("miss-sound"))
  }

  playSound(sound) {
    if (this.gameSound) {
      sound.pause()
      sound.currentTime = 0
      sound.play()
    }
  }

  static hideSoundButton() {
    document.getElementById("sound-button").style.display = "none"
  }

  static showSoundButton() {
    document.getElementById("sound-button").style.display = ""
  }
}

/////////////////////////////////////////////////////////////////

class Score {
  static appendScore() {
    const score = document.createElement("div")
    score.id = "score"
    score.innerHTML = "0000000"

    game.appendChild(score)
  }

  static incrementScoreBy(points) {
    const score = document.getElementById("score")

    let updatedScore = parseInt(score.innerHTML) + points
    updatedScore = Score.pad_with_zeroes(updatedScore, 7)

    score.innerHTML = updatedScore
  }

  static pad_with_zeroes(number, length) {
    let string = "" + number
    while (string.length < length) {
      string = "0" + string
    }
    return string
  }

  static createHighScore(score) {
    const difficulty = "easy" // default until difficulties are added in
    const leaderBoardId = 1 // default until difficulties are added in
    const initials = prompt("New high score, please enter your initials!", "AAA")

    fetch(`http://localhost:3000/score_boards/${leaderBoardId}/high_scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        difficulty: difficulty,
        initials: initials,
        score: score,
        score_board_id: leaderBoardId
      })
    })
  }
}

/////////////////////////////////////////////////////////////////

class Life {
  static decrementLives(soundClass) {
    const heart = document.querySelector(".heart")
    let deleted

    if (heart) {
      soundClass.playMissSound()
      heart.remove()
      deleted = true
    } else {
      deleted = false
    }

    return deleted
  }

  static appendLives() {
    for (let i = 0; i < 3; i++) {
      const life = document.createElement("div")

      life.classList = "heart"
      document.getElementById("lives-container").appendChild(life)
    }
  }
}

/////////////////////////////////////////////////////////////////

class Target {
  static targetInterval(soundClass, gameClass) {
    const target = document.getElementById("target")
    let gameStatus = true

    if (target) {
      let deleted = Life.decrementLives(soundClass)

      target.remove()

      if (!deleted) {
        gameStatus = false
        gameClass.gameOver()
        // before playAgain,submit score to leader boards
        const score = parseInt(document.getElementById("score").innerHTML)
        Score.createHighScore(score)
        gameClass.playAgain()
      }
    }

    if (gameStatus) { Target.addTarget(soundClass) }
  }

  static addTarget(soundClass) {
    let target = document.createElement("div")
    target.id = "target"

    game.appendChild(target)

    target.style.left = `${Target.getRndInteger(0, 890)}px`
    target.style.bottom = `${Target.getRndInteger(0, 650)}px`

    Target.listenToTarget(target, soundClass)
  }

  static listenToTarget(target, soundClass) {
    target.addEventListener("click", function() {
      soundClass.playTargetSound()

      Score.incrementScoreBy(50)
      target.remove()
    })
  }

  static getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
  }
}

/////////////////////////////////////////////////////////////////

class Game {
  constructor(gameInterval) {
    this.gameInterval = gameInterval
  }

  startGame(soundClass, gameClass) {
    Score.appendScore()
    Life.appendLives()
    this.gameInterval = setInterval(function() {
      Target.targetInterval(soundClass, gameClass)
    }, 1000)
  }

  static countDown(start, soundClass) {
    let i = 2

    const countdown = setInterval(function() {
      if (i >= 1) {
        start.innerHTML = i
        i--
      } else if (i === 0) {
        soundClass.playStartSound()
        start.innerHTML = "GO!"
        i --
      } else if (i === -1) {
        clearInterval(countdown)
        start.style.display = "none"

        const gameClass = new Game
        gameClass.startGame(soundClass, gameClass)
      }
    }, 1000)
  }

  gameOver() {
    alert("Game Over!")
    clearInterval(this.gameInterval)
  }

  playAgain() {
    const start = document.getElementById("start")
    start.innerHTML = "PLAY AGAIN"
    start.style.fontSize = "5em"
    start.style.display = ""

    const score = document.getElementById("score")
    score.remove()

    const leaderBoard = document.getElementById("leaderboard")
    leaderBoard.style.display = ""

    Sound.showSoundButton()
  }
}

/////////////////////////////////////////////////////////////////

class Start {
  static appendStart(soundClass) {
    let start = document.createElement("div")

    start.id = "start"
    start.innerHTML = "START"

    game.appendChild(start)
    start.addEventListener("click", function() { Start.handleStartClick(soundClass) })
  }

  static handleStartClick(soundClass) {
    const start = document.getElementById("start")
    start.removeEventListener("click", Start.handleStartClick)

    const leaderboard = document.getElementById("leaderboard")
    leaderboard.style.display = "none"

    Sound.hideSoundButton()

    start.style.fontSize = "10em"
    start.innerHTML = 3
    Game.countDown(start, soundClass)
  }
}

/////////////////////////////////////////////////////////////////

class LeaderBoard {
  static appendLeaderboard() {
    let leaderboard = document.createElement("div")

    leaderboard.id = "leaderboard"
    leaderboard.innerHTML = "LEADERBOARD"

    game.appendChild(leaderboard)
    LeaderBoard.listenToLeaderBoard(leaderboard)
  }

  static listenToLeaderBoard(leaderboard) {
    leaderboard.addEventListener("click", function() {
      const leaderBoard = document.getElementById("leaderboard-container")

      if (leaderBoard.style.display === "none") {
        leaderBoard.style.display = ""
        start.style.display = "none"
        leaderboard.style.display = "none"
      } else {
        LeaderBoard.fetchLeaderBoard()
      }

      LeaderBoard.appendBackButton()
    })
  }

  static appendBackButton() {
    const back = document.createElement("div")
    back.id = "back-button"
    back.innerHTML = "Back"
    game.appendChild(back)

    LeaderBoard.listenToBack(back)
  }

  static listenToBack(back) {
    back.addEventListener("click", this.handleBackClick)
  }

  static handleBackClick() {
    const leaderBoard = document.getElementById("leaderboard-container")
    leaderBoard.style.display = "none"

    const back = document.getElementById("back-button")
    back.remove()

    start.style.display = ""
    leaderboard.style.display = ""
  }

  static fetchLeaderBoard() {
    fetch(`http://localhost:3000/score_boards`)
    .then(response => response.json())
    .then(leaderBoards => LeaderBoard.displayLeaderBoard(leaderBoards.data))
  }

  static displayLeaderBoard(leaderBoards) {
    start.style.display = "none"
    leaderboard.style.display = "none"

    const sortedLeaderBoards = leaderBoards.sort(function(a, b) {
      return a.id - b.id
    })

    for(const leaderBoard of sortedLeaderBoards) {

      LeaderBoard.fetchHighScores(leaderBoard)

      let card = document.createElement("div")
      card.classList = "leaderboard-card"
      card.id = `${leaderBoard.attributes.difficulty.toLowerCase()}-leaderboard`
      card.innerHTML = `<h6>${leaderBoard.attributes.difficulty}<h6>`

      document.getElementById("leaderboard-container").appendChild(card)
    }
  }

  static fetchHighScores(leaderBoard) {
    fetch(`http://localhost:3000/score_boards/${leaderBoard.id}/high_scores`)
    .then(response => response.json())
    .then(scores => LeaderBoard.displayHighScores(leaderBoard, scores.data))
  }

  static displayHighScores(leaderBoard, scores) {
    const leaderBoardId = `${leaderBoard.attributes.difficulty.toLowerCase()}-leaderboard`
    const leaderBoardElem = document.getElementById(leaderBoardId)
    const table = document.createElement("TABLE")

    const headerRow  = document.createElement("TR")

    const rankHeader = document.createElement("TH")
    rankHeader.innerHTML = "RANK"
    headerRow.appendChild(rankHeader)

    const initialsHeader = document.createElement("TH")
    initialsHeader.innerHTML = "NAME"
    headerRow.appendChild(initialsHeader)

    const scoreHeader = document.createElement("TH")
    scoreHeader.innerHTML = "SCORE"
    headerRow.appendChild(scoreHeader)

    table.appendChild(headerRow)

    for (let i = 0; i < scores.length; i++ ) {

      const row  = document.createElement("TR")

      const rank = document.createElement("TD")
      rank.innerHTML = `${i + 1}. `
      row.appendChild(rank)

      const initials = document.createElement("TD")
      initials.innerHTML = `${scores[i].attributes.initials} `
      row.appendChild(initials)

      const score = document.createElement("TD")
      score.innerHTML = `${scores[i].attributes.score}`
      row.appendChild(score)

      table.appendChild(row)
    }

    leaderBoardElem.appendChild(table)
  }
}

/////////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", function(e) {
  const soundClass = new Sound(document.getElementById("sound-button"))

  Start.appendStart(soundClass)
  LeaderBoard.appendLeaderboard()
  soundClass.listenToSoundButton()
})


// if new highscore, add initials to submit to score board
// clicking without missing increases a multiplier (imagine guitar hero)
// enable and disable sound icon on the start menu bottom right, greyed out
// animate targets after click
// arcade style fonts
// rubocop
// seperate JS files