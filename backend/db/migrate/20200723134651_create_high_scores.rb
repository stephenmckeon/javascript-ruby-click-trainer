class CreateHighScores < ActiveRecord::Migration[6.0]
  def change
    create_table :high_scores do |t|
      t.string :initials
      t.integer :score
      t.string :difficulty

      t.integer :score_board_id

      t.timestamps
    end
  end
end
