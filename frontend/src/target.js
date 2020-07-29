import {Life} from "./life.js"
import {Score} from "./score.js"

export class Target {
  static targetInterval(soundClass, gameClass, difficultyClass) {
    const target = document.getElementById("target")
    let gameStatus = true

    if (target) {
      let deleted = Life.decrementLives(soundClass)

      target.remove()

      if (!deleted) {
        gameStatus = false
        gameClass.gameOver()

        const score = parseInt(document.getElementById("score").innerHTML)
        Score.createHighScore(score, difficultyClass)

        gameClass.playAgain(soundClass, difficultyClass)
      }
    }

    if (gameStatus) { Target.addTarget(soundClass, difficultyClass) }
  }

  static addTarget(soundClass, difficultyClass) {
    let target = document.createElement("div")
    target.id = "target"
    target.classList = `${difficultyClass.difficulty}-target`

    game.appendChild(target)

    target.style.left = `${Target.getRndInteger(0, 810)}px`
    target.style.bottom = `${Target.getRndInteger(0, 570)}px`

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
