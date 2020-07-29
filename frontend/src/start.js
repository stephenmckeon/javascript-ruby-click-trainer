import {Sound} from "./sound.js"
import {Game} from "./game.js"
import {LeaderBoard} from "./leaderboard.js"

export class Start {

  static appendStart(soundClass) {
    let start = document.createElement("div")

    start.id = "start"
    start.innerHTML = "START"

    game.appendChild(start)

    const startClass = new Start
    start.addEventListener("click", startClass.listener = function() {
      startClass.handleStartClick(soundClass)
    })
  }

  handleStartClick(soundClass) {
    start.removeEventListener("click", this.listener)

    LeaderBoard.hideLeaderBoardButton()

    Sound.hideSoundButton()

    start.style.fontSize = "10em"
    start.innerHTML = 3
    Game.countDown(start, soundClass)
  }

  static hideStartButton() {
    start.style.display = "none"
  }

  static displayStartButton() {
    start.style.display = ""
  }
}
