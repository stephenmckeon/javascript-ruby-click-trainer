export class Life {
  static decrementLives(soundClass) {
    const heart = document.querySelector(".heart")
    let deleted

    if (heart) {
      soundClass.playMissSound()
      heart.remove()
      deleted = true
    } else {
      deleted = false
    }

    return deleted
  }

  static appendLives() {
    for (let i = 0; i < 3; i++) {
      const life = document.createElement("div")

      life.classList = "heart"
      document.getElementById("lives-container").appendChild(life)
    }
  }
}
