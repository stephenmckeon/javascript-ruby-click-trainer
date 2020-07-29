import {Sound} from "./sound.js"
import {Score} from "./score.js"
import {Life} from "./life.js"
import {Target} from "./target.js"
import {Game} from "./game.js"
import {Start} from "./start.js"
import {LeaderBoard} from "./leaderboard.js"

document.addEventListener("DOMContentLoaded", function(e) {
  const soundClass = new Sound(document.getElementById("sound-button"))

  Start.appendStart(soundClass)
  LeaderBoard.appendLeaderboard()
  soundClass.listenToSoundButton()
})

// clicking without missing increases a multiplier (imagine guitar hero)
// animate targets after click
// arcade style fonts
// rubocop
// seperate JS files
// fix leaderboard not refreshing when a new score is added after you've already looked at the leaderboard
// if cancel on intials, what happens? don't save score, prompt to play again