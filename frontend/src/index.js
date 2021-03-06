import { Sound } from "./sound.js"
import { Start } from "./start.js"
import { LeaderBoard } from "./leaderboard.js"
import { Difficulty } from "./difficulty.js"

document.addEventListener("DOMContentLoaded", () => {
  const soundClass = new Sound(document.getElementById("sound-button"))
  const leaderBoard = document.getElementById("leaderboard")
  const difficultyClass = new Difficulty(1)

  Start.appendStart(soundClass, difficultyClass)
  LeaderBoard.listenToLeaderBoard(leaderBoard)
  soundClass.listenToSoundButton()
  difficultyClass.listenToDifficulties()
})
