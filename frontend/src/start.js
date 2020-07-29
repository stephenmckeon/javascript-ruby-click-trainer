import {Sound} from "./sound.js"
import {Game} from "./game.js"

export class Start {
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
