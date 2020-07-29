import { Score } from "./score.js"
import { Life } from "./life.js"
import { Target } from "./target.js"
import { Sound } from "./sound.js"
import { LeaderBoard } from "./leaderboard.js"
import { Difficulty } from "./difficulty.js"

export class Game {
  constructor(gameInterval) {
    this.gameInterval = gameInterval
  }

  static countDown(start, soundClass, difficultyClass) {
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
        gameClass.startGame(soundClass, gameClass, difficultyClass)
      }
    }, 1000)
  }

  startGame(soundClass, gameClass, difficultyClass) {
    Score.appendScore()
    Life.appendLives()
    this.gameInterval = setInterval(function() {
      Target.targetInterval(soundClass, gameClass, difficultyClass)
    }, difficultyClass.interval)
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

    Difficulty.displayDifficultyButton()
    LeaderBoard.displayLeaderBoardButton()
    Sound.showSoundButton()
  }

  static hideButtons() {
    difficulty.style.display = "none"
  }

  static displayButtons() {
    start.style.display = ""
  }

}
