class HighScoresController < ApplicationController
  def index
    high_scores = HighScore.where("score_board_id = ?", params[:score_board_id])
    render json: HighScoreSerializer.new(high_scores)
  end

  def create
    high_score = HighScore.create(
      difficulty: params[:difficulty],
      initials: params[:initials],
      score: params[:score],
      score_board_id: params[:score_board_id]
      )
  end
end
