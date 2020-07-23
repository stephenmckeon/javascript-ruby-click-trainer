class HighScoreSerializer
  include FastJsonapi::ObjectSerializer
  attributes :initials, :score, :difficulty, :score_board_id
end
