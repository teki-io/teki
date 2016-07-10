class NotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_name
  end

  private

  def stream_name
    'notification_channel'
  end
end
