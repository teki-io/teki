Rails.application.routes.draw do
  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  namespace :api do
    resources :employees, only: [:index]
    resources :shifts, only: [:index]
    resources :profile, only: [:index]
    scope '/admin', as: 'admin', module: 'admin' do
      resources :employees, only: [:index, :create, :update, :destroy]
      resources :shift_templates, only: [:index, :create, :update, :destroy]
      resources :shifts, only: [:index, :create, :update]
      resource :companies, only: [:update]
    end
  end
end
