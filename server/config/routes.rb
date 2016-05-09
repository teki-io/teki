Rails.application.routes.draw do
  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  namespace :api do
    resource :companies, only: [:update]
    resources :employees, only: [:index]
    scope '/admin', as: 'admin', module: 'admin' do
      resources :employees, only: [:index, :create, :update, :destroy]
      resources :shift_templates, only: [:index, :create, :update, :destroy]
      resources :shifts, only: [:index, :create, :update]
    end
  end
end
