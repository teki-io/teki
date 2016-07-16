class Notifier
  attr_reader :receiver, :type

  TYPES = {
    USER_HAS_BEEN_ASSIGNED_SHIFT: 'user_has_been_assigned_shift'
  }

  def initialize(receiver, type)
    @receiver = receiver
    @type     = type
  end

  def notify
    message = create_message!
    create_notification!(message)
    broadcast
  end

  private

  def create_message!
    Message.create!(body: 'hi')
  end

  def create_notification!(message)
    Wupee.notify do |n|
      n.attached_object message
      n.notif_type type.to_sym
      n.receivers receiver
      n.deliver :later
    end
  end

  # TODO: Temporary. this should be after Wupee has been delivered/in tasks
  def broadcast
    notification = receiver.notifications.last
    case type
    when TYPES[:USER_HAS_BEEN_ASSIGNED_SHIFT]
      ActionCable.server.broadcast "#{NotificationChannel::CHANNEL_NAME}_#{receiver.id}",
                                   {
                                     type: type,
                                     payload:  NotificationSerializer.new(notification, root: false)
                                   }.to_json
    end
  end
end
