# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      token = request.params['jwt']
      if token && token != 'null'
        payload = AuthToken.valid?(token)
        verified_user = User.find(payload[0]['user_id'])
      end

      if verified_user
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
