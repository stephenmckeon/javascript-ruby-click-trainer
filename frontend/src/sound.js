export default class Sound {
  constructor(element) {
    this.element = element
    this.gameSound = false
  }

  listenToSoundButton () {
    let soundButton = this.element
    let thisSound = this

    soundButton.addEventListener("click", function() {
      thisSound.gameSound ? thisSound.gameSound = false : thisSound.gameSound = true
      if (thisSound.gameSound) {
        soundButton.src = "img/sound-on.png"
      } else {
        soundButton.src = "img/sound-off.png"
      }
    })
  }

  playTargetSound() {
    this.playSound(document.getElementById("target-sound"))
  }

  playStartSound() {
    this.playSound(document.getElementById("start-sound"))
  }

  playMissSound() {
    this.playSound(document.getElementById("miss-sound"))
  }

  playSound(sound) {
    if (this.gameSound) {
      sound.pause()
      sound.currentTime = 0
      sound.play()
    }
  }

  static hideSoundButton() {
    document.getElementById("sound-button").style.display = "none"
  }

  static showSoundButton() {
    document.getElementById("sound-button").style.display = ""
  }
}
