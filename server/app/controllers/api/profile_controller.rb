class Api::ProfileController < Api::BaseController
  def index
    render json: current_user,
           root: false,
           serializer: ::ProfileSerializer
  end
end
