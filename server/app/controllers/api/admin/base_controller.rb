class Api::Admin::BaseController < Api::BaseController
  before_action :authenticate_admin!

  private

  def authenticate_admin!
    return if current_user && current_user.admin?
    render json: { errors: ['Authorized admin only.'] }, status: 401
  end
end
