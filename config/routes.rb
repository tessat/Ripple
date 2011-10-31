Ripple::Application.routes.draw do
  root :to => "home#index"

  # Authentication
  match "/auth/:provider/callback" => "sessions#create"
  match "/logout" => "sessions#destroy"
  
  # Users
  get "users/checkins"
  get "users/friends"
  
end
