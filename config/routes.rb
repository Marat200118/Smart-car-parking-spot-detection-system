Rails.application.routes.draw do
  get :map, to: 'map#index'
  resources :measures, only: :create
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
