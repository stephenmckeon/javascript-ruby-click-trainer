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

  hideSoundButton() {
    this.element.style.display = "none"
  }

  showSoundButton() {
    this.element.style.display = ""
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

  gameOver() {
    alert("Game Over!")
    clearInterval(this.gameInterval)
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
        start.remove()

        const gameClass = new Game
        gameClass.startGame(soundClass, gameClass)
      }
    }, 1000)
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

    soundClass.hideSoundButton()

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
  }
}

/////////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", function(e) {
  const soundClass = new Sound(document.getElementById("sound-button"))

  Start.appendStart(soundClass)
  LeaderBoard.appendLeaderboard()
  soundClass.listenToSoundButton()
})

// play again button
// display leaderboard
// if new highscore, add initials to submit to score board
// clicking without missing increases a multiplier (imagine guitar hero)
// enable and disable sound icon on the start menu bottom right, greyed out
// animate targets after click

// const BACKEND_URL = "http://localhost:3000";
// fetch(`${BACKEND_URL}/score_boards`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse))