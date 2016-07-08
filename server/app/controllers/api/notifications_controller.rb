class Api::NotificationsController < Api::BaseController
  def index
    render json: notifications,
           root: false,
           each_serializer: ::NotificationSerializer
  end

  def show
    render json: notification,
           root: false,
           serializer: ::NotificationSerializer
  end

  def update
    notification.mark_as_read
    render status: 200
  end

  def update_all
    notifications.where(is_read: false).find_each do |n|
      n.mark_as_read
    end
    render status: 200
  end

  private

  def is_read
    params[:is_read] && params[:is_read] == 'true'
  end

  def notification
    @notification ||= notifications.find(params[:id])
  end

  def notifications
    @notifications ||= current_user.notifications.preload([:attached_object, :notification_type])
  end
end
