class ShiftTemplateSerializer < BaseSerializer
  attributes :id,
             :name,
             :start_time,
             :end_time,
             :sort

  def start_time
    object.start_time.strftime('%H:%M')
  end

  def end_time
    object.end_time.strftime('%H:%M')
  end
end
