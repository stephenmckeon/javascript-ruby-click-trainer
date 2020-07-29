export default class LeaderBoard {
  static appendLeaderboard() {
    let leaderboard = document.createElement("div")

    leaderboard.id = "leaderboard"
    leaderboard.innerHTML = "LEADERBOARD"

    game.appendChild(leaderboard)
    LeaderBoard.listenToLeaderBoard(leaderboard)
  }

  static listenToLeaderBoard(leaderboard) {
    leaderboard.addEventListener("click", function() {
      const leaderBoard = document.getElementById("leaderboard-container")

      if (leaderBoard.style.display === "none") {
        leaderBoard.style.display = ""
        start.style.display = "none"
        leaderboard.style.display = "none"
      } else {
        LeaderBoard.fetchLeaderBoard()
      }

      LeaderBoard.appendBackButton()
    })
  }

  static appendBackButton() {
    const back = document.createElement("div")
    back.id = "back-button"
    back.innerHTML = "Back"
    game.appendChild(back)

    LeaderBoard.listenToBack(back)
  }

  static listenToBack(back) {
    back.addEventListener("click", this.handleBackClick)
  }

  static handleBackClick() {
    const leaderBoard = document.getElementById("leaderboard-container")
    leaderBoard.style.display = "none"

    const back = document.getElementById("back-button")
    back.remove()

    start.style.display = ""
    leaderboard.style.display = ""
  }

  static fetchLeaderBoard() {
    fetch(`http://localhost:3000/score_boards`)
    .then(response => response.json())
    .then(leaderBoards => LeaderBoard.displayLeaderBoard(leaderBoards.data))
  }

  static displayLeaderBoard(leaderBoards) {
    start.style.display = "none"
    leaderboard.style.display = "none"

    const sortedLeaderBoards = leaderBoards.sort(function(a, b) {
      return a.id - b.id
    })

    for(const leaderBoard of sortedLeaderBoards) {

      LeaderBoard.fetchHighScores(leaderBoard)

      let card = document.createElement("div")
      card.classList = "leaderboard-card"
      card.id = `${leaderBoard.attributes.difficulty.toLowerCase()}-leaderboard`
      card.innerHTML = `<h6>${leaderBoard.attributes.difficulty}<h6>`

      document.getElementById("leaderboard-container").appendChild(card)
    }
  }

  static fetchHighScores(leaderBoard) {
    fetch(`http://localhost:3000/score_boards/${leaderBoard.id}/high_scores`)
    .then(response => response.json())
    .then(scores => LeaderBoard.displayHighScores(leaderBoard, scores.data))
  }

  static displayHighScores(leaderBoard, scores) {
    const leaderBoardId = `${leaderBoard.attributes.difficulty.toLowerCase()}-leaderboard`
    const leaderBoardElem = document.getElementById(leaderBoardId)
    const table = document.createElement("TABLE")

    const headerRow  = document.createElement("TR")

    const rankHeader = document.createElement("TH")
    rankHeader.innerHTML = "RANK"
    headerRow.appendChild(rankHeader)

    const initialsHeader = document.createElement("TH")
    initialsHeader.innerHTML = "NAME"
    headerRow.appendChild(initialsHeader)

    const scoreHeader = document.createElement("TH")
    scoreHeader.innerHTML = "SCORE"
    headerRow.appendChild(scoreHeader)

    table.appendChild(headerRow)

    for (let i = 0; i < scores.length; i++ ) {

      const row  = document.createElement("TR")

      const rank = document.createElement("TD")
      rank.innerHTML = `${i + 1}. `
      row.appendChild(rank)

      const initials = document.createElement("TD")
      initials.innerHTML = `${scores[i].attributes.initials.toUpperCase()} `
      row.appendChild(initials)

      const score = document.createElement("TD")
      score.innerHTML = `${scores[i].attributes.score}`
      row.appendChild(score)

      table.appendChild(row)
    }

    leaderBoardElem.appendChild(table)
  }
}
