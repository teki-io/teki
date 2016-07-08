class NotificationSerializer < BaseSerializer
  attributes :id,
             :is_read,
             :created_at,
             :body

  delegate :attached_object, :notification_type, to: :object
  delegate :body, to: :attached_object
end
