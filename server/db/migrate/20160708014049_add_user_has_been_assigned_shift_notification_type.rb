class AddUserHasBeenAssignedShiftNotificationType < ActiveRecord::Migration[5.0]
  def up
    Wupee::NotificationType.create(name: 'user_has_been_assigned_shift')
  end
end
