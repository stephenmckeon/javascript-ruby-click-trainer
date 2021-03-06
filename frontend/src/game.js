import { Score } from "./score.js"
import { Life } from "./life.js"
import { Target } from "./target.js"
import { Sound } from "./sound.js"
import { LeaderBoard } from "./leaderboard.js"
import { Difficulty } from "./difficulty.js"
import { Start } from "./start.js"
import { Multiplier } from "./multiplier.js"

export class Game {
  constructor(gameInterval) {
    this.gameInterval = gameInterval
  }

  static countDown(start, soundClass, difficultyClass) {
    let i = 2

    const countdown = setInterval(() => {
      if (i >= 1) {
        soundClass.playCountdownSound()
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
    Multiplier.displayMultiplier()

    const multiplierClass = new Multiplier

    this.gameInterval = setInterval(event => {
      Target.targetInterval(soundClass, gameClass, difficultyClass, multiplierClass)
    }, difficultyClass.interval)
  }

  gameOver(soundClass) {
    soundClass.playGameOverSound()
    alert("Game Over!")
    clearInterval(this.gameInterval)
  }

  playAgain(soundClass, difficultyClass) {
    const start = document.getElementById("start")
    start.innerHTML = "PLAY AGAIN"
    start.classList = "play-again-pulse"
    start.style.fontSize = "4em"
    start.style.display = ""
    Start.listenToStart(soundClass, difficultyClass)

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
