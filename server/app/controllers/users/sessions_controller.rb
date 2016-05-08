class Users::SessionsController < Devise::SessionsController
  require 'auth_token'

  skip_before_action :authenticate

  respond_to :html, :json

  def create
    # https://github.com/plataformatec/devise/blob/master/app/controllers/devise/sessions_controller.rb#L16
    self.resource = warden.authenticate!(auth_options)
    set_flash_message(:notice, :signed_in) if is_flashing_format?
    sign_in(resource_name, resource)
    yield resource if block_given?

    token = AuthToken.issue_token({ user_id: resource.id })
    render json: {user: resource.email, token: token}
  end
end
