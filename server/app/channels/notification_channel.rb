class NotificationChannel < ApplicationCable::Channel
  CHANNEL_NAME = 'notification_channel'

  def subscribed
    stream_from stream_name
  end

  private

  def stream_name
    "notification_channel_#{current_user.id}"
  end

  def broadcast(data)
    ActionCable.server.broadcast "#{CHANNEL_NAME}_#{current_user.id}", data
  end
end
