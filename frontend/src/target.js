import {Life} from "./life.js"
import {Score} from "./score.js"

export class Target {
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
