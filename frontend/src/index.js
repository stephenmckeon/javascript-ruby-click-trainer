import {Sound} from "./sound.js"
import {Start} from "./start.js"
import {LeaderBoard} from "./leaderboard.js"
import {Difficulty} from "./difficulty.js"

document.addEventListener("DOMContentLoaded", function(e) {
  const soundClass = new Sound(document.getElementById("sound-button"))
  const leaderBoard = document.getElementById("leaderboard")
  const difficultyClass = new Difficulty(1)

  Start.appendStart(soundClass, difficultyClass)
  LeaderBoard.listenToLeaderBoard(leaderBoard)
  soundClass.listenToSoundButton()
  difficultyClass.cycleDifficulty()
  difficultyClass.listenToDifficulties()
})

// clicking without missing increases a multiplier (imagine guitar hero)
// animate targets after click
// arcade style fonts
// rubocop
// fix leaderboard styling


// Difficulty change should:
// * change the size of the targets
// * the amount of points for each click: easy is 500, m = 1000, h = 5000