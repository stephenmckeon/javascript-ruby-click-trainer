import {Life} from "./life.js"
import {Score} from "./score.js"
import { Multiplier } from "./multiplier.js"

export class Target {
  static targetInterval(soundClass, gameClass, difficultyClass, multiplierClass) {
    const target = document.getElementById("target")
    let gameStatus = true


    if (target) {
      multiplierClass.missedClick()
      multiplierClass.multiplierCheck()
      multiplierClass.updateMultiplierElement()

      let deleted = Life.decrementLives(soundClass)

      target.remove()

      if (!deleted) {
        gameStatus = false
        gameClass.gameOver(soundClass)

        const score = parseInt(document.getElementById("score").innerHTML)
        Score.createHighScore(score, difficultyClass)

        Multiplier.hideMultiplier()

        gameClass.playAgain(soundClass, difficultyClass)
      }
    }

    if (gameStatus) { Target.addTarget(soundClass, difficultyClass, multiplierClass) }
  }

  static addTarget(soundClass, difficultyClass, multiplierClass) {
    let target = document.createElement("div")
    target.id = "target"
    target.classList = `${difficultyClass.difficulty}-target`

    game.appendChild(target)

    target.style.left = `${Target.getRndInteger(0, 810)}px`
    target.style.bottom = `${Target.getRndInteger(0, 570)}px`

    Target.listenToTarget(target, soundClass, difficultyClass, multiplierClass)
  }

  static listenToTarget(target, soundClass, difficultyClass, multiplierClass) {
    target.addEventListener("click", function() {
      soundClass.playTargetSound()

      multiplierClass.successfulClick()
      multiplierClass.multiplierCheck()
      multiplierClass.updateMultiplierElement()

      const clickScore = difficultyClass.score * multiplierClass.multiplier

      Score.incrementScoreBy(clickScore)
      target.remove()
    })
  }

  static getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
  }
}
