import {Sound} from "./sound.js"
import {Start} from "./start.js"
import {LeaderBoard} from "./leaderboard.js"
// import {difficulty} from "./difficulty.js"

document.addEventListener("DOMContentLoaded", function(e) {
  const soundClass = new Sound(document.getElementById("sound-button"))
  const leaderBoard = document.getElementById("leaderboard")

  Start.appendStart(soundClass)
  LeaderBoard.listenToLeaderBoard(leaderBoard)
  soundClass.listenToSoundButton()
  // Difficulty.appendDifficulty()
})

// clicking without missing increases a multiplier (imagine guitar hero)
// animate targets after click
// arcade style fonts
// rubocop
// seperate JS files
// fix leaderboard not refreshing when a new score is added after you've already looked at the leaderboard
// if cancel on intials, what happens? don't save score, prompt to play again