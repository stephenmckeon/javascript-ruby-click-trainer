class ScoreBoardsController < ApplicationController
  def index
    score_boards = ScoreBoard.all
    render json: ScoreBoardSerializer.new(score_boards)
  end
end
