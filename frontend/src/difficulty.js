export class Difficulty {
  constructor(difficulty_id) {
    this.difficulty_id = difficulty_id
  }

  cycleDifficulty() {
    const existingSpan = document.querySelector("span")
    if (existingSpan) existingSpan.remove()

    let span = document.createElement("SPAN")

    if (this.difficulty_id === 1) {
      span.innerHTML = "EASY"
    } else if (this.difficulty_id === 2) {
      span.innerHTML = "MEDIUM"
    } else if (this.difficulty_id === 3) {
      span.innerHTML = "HARD"
    } else {
      this.difficulty_id = 1
      span.innerHTML = "EASY"
    }

    difficulty.appendChild(span)
    this.setDifficultyAttrs()
  }

  listenToDifficulties() {
    const difficultyClass = this
    difficulty.addEventListener("click", () => {
      difficultyClass.difficulty_id++
      difficultyClass.cycleDifficulty()
    })
  }

  setDifficultyAttrs() {
    const difficultyClass = this
    if (this.difficulty_id === 1) {

      difficultyClass.difficulty = "easy"
      difficultyClass.interval = 1500
      difficultyClass.score = 50

    } else if (this.difficulty_id === 2) {

      difficultyClass.difficulty = "medium"
      difficultyClass.interval = 1000
      difficultyClass.score = 500

    } else if (this.difficulty_id === 3) {

      difficultyClass.difficulty = "hard"
      difficultyClass.interval = 800
      difficultyClass.score = 5000

    }
  }

  static hideDifficultyButton() {
    difficulty.style.display = "none"
  }

  static displayDifficultyButton() {
    difficulty.style.display = ""
  }
}