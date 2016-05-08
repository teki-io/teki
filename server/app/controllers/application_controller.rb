class ApplicationController < ActionController::API
  before_filter :authenticate

  require 'auth_token'

  protected

  def current_user
    @current_user
  end

  def current_company
    current_user.company
  end

  def authenticate
    begin
      token = request.headers['Authorization'].split(' ').last
      payload = AuthToken.valid?(token)
      @current_user = User.find(payload[0]['user_id'])
    rescue
      render json: { error: 'Authorization header not valid'}, status: :unauthorized
    end
  end
end
