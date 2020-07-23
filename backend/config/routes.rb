Rails.application.routes.draw do
  resources :score_boards do
    resources :high_scores
  end
end
