export class Score {
  static appendScore() {
    const score = document.createElement("div")
    score.id = "score"
    score.innerHTML = "0000000"

    game.appendChild(score)
  }

  static incrementScoreBy(points) {
    const score = document.getElementById("score")

    let updatedScore = parseInt(score.innerHTML) + points
    updatedScore = Score.pad_with_zeroes(updatedScore, 7)

    score.innerHTML = updatedScore
  }

  static pad_with_zeroes(number, length) {
    let string = "" + number
    while (string.length < length) {
      string = "0" + string
    }
    return string
  }

  static createHighScore(score, difficultyClass) {
    console.log(difficultyClass)
    const difficulty = "easy" // default until difficulties are added in
    const leaderBoardId = 1 // default until difficulties are added in
    const initials = Score.getValidInitials()

    if (initials !== undefined) {
      fetch(`http://localhost:3000/score_boards/${leaderBoardId}/high_scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          difficulty: difficulty,
          initials: initials,
          score: score,
          score_board_id: leaderBoardId
        })
      })
    }
  }

  static getValidInitials() {
    let initials = prompt("Enter your initials to save your score:", "AAA")

    if (initials !== null) {
      while (initials.length < 1 || initials.length > 3) {
        initials = prompt("Enter your initials to save your score:", "AAA")
      }
    }

    return initials
  }
}
