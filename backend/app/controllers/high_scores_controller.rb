class HighScoresController < ApplicationController
  def index
    high_score = HighScore.all
    render json: HighScoreSerializer.new(high_score)
  end
end
