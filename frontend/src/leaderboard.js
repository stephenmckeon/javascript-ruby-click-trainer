import {Game} from "./game.js"

export class LeaderBoard {
  static listenToLeaderBoard(leaderboard) {
    leaderboard.addEventListener("click", this.handleLeaderBoardClick)
  }

  static handleLeaderBoardClick() {
    Game.hideButtons()
    LeaderBoard.fetchLeaderBoard()
    LeaderBoard.appendBackButton()
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
    const leaderBoardCards = document.querySelectorAll(".leaderboard-card")
    leaderBoardCards.forEach(card => card.remove())

    const back = document.getElementById("back-button")
    back.remove()

    Game.displayButtons()
  }

  static fetchLeaderBoard() {
    fetch(`http://localhost:3000/score_boards`)
    .then(response => response.json())
    .then(leaderBoards => LeaderBoard.displayLeaderBoard(leaderBoards.data))
  }

  static displayLeaderBoard(leaderBoards) {
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
