class ShiftSerializer < BaseSerializer
  attributes :id,
             :name,
             :start_time,
             :end_time,
             :employee_name,
             :employee_id,
             :shift_template_id

  delegate :user,
           to: :object

  def start_time
    object.start_time
  end

  def end_time
    object.end_time
  end

  def employee_name
    user.first_name
  end

  def employee_id
    user.id
  end
end
