export class Multiplier {
  constructor() {
    this.multiplier = 1
    this.consecutiveClicks = 0
  }

  successfulClick() {
    this.consecutiveClicks++
    console.log(this.consecutiveClicks)
  }

  missedClick() {
    this.consecutiveClicks = 0
  }

  multiplierCheck() {
    const multiplierClass = this

    if (this.consecutiveClicks < 2) {
      multiplierClass.multiplier = 1
    } else if (this.consecutiveClicks >= 2 && this.consecutiveClicks < 5) {
      multiplierClass.multiplier = 2
    } else if (this.consecutiveClicks >= 5 && this.consecutiveClicks < 10) {
      multiplierClass.multiplier = 3
    } else if (this.consecutiveClicks > 10) {
      multiplierClass.multiplier = 4
    }
  }

  updateMultiplierElement() {
    if (this.multiplier === 1) {
      multiplier.innerHTML = "x1"
    } else if (this.multiplier === 2) {
      multiplier.innerHTML = "x2"
    } else if (this.multiplier === 3) {
      multiplier.innerHTML = "x3"
    } else if (this.multiplier === 4) {
      multiplier.innerHTML = "x4"
    }
  }

  static displayMultiplier() {
    multiplier.style.display = "inline-block"
  }

  static hideMultiplier() {
    multiplier.style.display = ""
  }
}