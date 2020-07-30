import {Sound} from "./sound.js"
import {Game} from "./game.js"
import {LeaderBoard} from "./leaderboard.js"
import {Difficulty} from "./difficulty.js"

export class Start {
  static appendStart(soundClass, difficultyClass) {
    let start = document.createElement("div")

    start.id = "start"
    start.classList = "start-pulse"
    start.innerHTML = "START"

    game.appendChild(start)
    this.listenToStart(soundClass, difficultyClass)
  }

  static listenToStart(soundClass, difficultyClass) {
    const startClass = new Start

    startClass.listener = () => startClass.handleStartClick(soundClass, difficultyClass)

    start.addEventListener("click", startClass.listener)
  }

  handleStartClick(soundClass, difficultyClass) {
    start.removeEventListener("click", this.listener)

    Difficulty.hideDifficultyButton()
    LeaderBoard.hideLeaderBoardButton()
    Sound.hideSoundButton()

    start.style.fontSize = "10em"
    start.classList = ""
    start.innerHTML = 3
    soundClass.playCountdownSound()
    Game.countDown(start, soundClass, difficultyClass)
  }

  static hideStartButton() {
    start.style.display = "none"
  }

  static displayStartButton() {
    start.style.display = ""
  }
}
