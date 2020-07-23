class ScoreBoardsController < ApplicationController
  def index
    score_boards = ScoreBoard.all
    render json: ScoreBoardSerializer.new(score_boards)
  end

  def show
    score_board = ScoreBoard.find(params[:id])
    render json: ScoreBoardSerializer.new(score_board)
  end
end
