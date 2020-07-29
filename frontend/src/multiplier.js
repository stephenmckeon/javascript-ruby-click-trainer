export class Multiplier {
  constructor() {
    this.multiplier = 1
    this.consecutiveClicks = 0
  }

  successfulClick() {
    this.consecutiveClicks++
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

  static displayMultiplier() {
    multiplier.style.display = "inline-block"
  }

  static hideMultiplier() {
    multiplier.style.display = "inline-"
  }
}