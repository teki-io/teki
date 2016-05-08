class ApplicationController < ActionController::API
  # before_filter :verify_jwt_token

  require 'auth_token'

  protected

  def verify_jwt_token
    head :unauthorized if request.headers['Authorization'].nil? ||
        !AuthToken.valid?(request.headers['Authorization'].split(' ').last)
  end
end
