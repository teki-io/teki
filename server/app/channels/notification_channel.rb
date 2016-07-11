class NotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_name
  end

  private

  def stream_name
    "notification_channel_#{current_user.id}"
  end

  def broadcast(data)
    ActionCable.server.broadcast "notification_channel_#{current_user.id}", data
  end
end
