class Api::Admin::ShiftsController < Api::Admin::BaseController
  def index
    render json: shifts,
           root: false,
           each_serializer: ::ShiftSerializer
  end

  def create
    shift = Shift.create!(after_shift_params.merge(user: employee, shift_template: shift_template))
    # TODO: move into another service. This is POC for now
    ActionCable.server.broadcast "notification_channel_#{employee.id}", { body: 'you are assigned to a new shift'}
    render json: shift,
           root: false,
           serializer: ::ShiftSerializer
  end

  def update
    shift.update!(user: employee)
    render json: shift,
           root: false,
           serializer: ::ShiftSerializer
  end

  private

  def employees
    @employees ||= current_company.users.where.not(id: current_user.id)
  end

  def employee
    @employee ||= employees.find(shift_params['employee_id'])
  end

  def shift_templates
    @shift_templates ||= current_company.shift_templates
  end

  def shift_template
    @shift_template ||= shift_templates.find(shift_params['shift_template_id'])
  end

  def shifts
    @shifts ||= ::Company::ShiftsQuery.query(current_company, query_params)
  end

  def shift
    @shift ||= shifts.find(shift_id)
  end

  def shift_id
    params[:id]
  end

  def query_params
    params.permit(:from, :to)
  end

  # TODO: use form instead
  def shift_params
    params.require(:shift).permit(
      :employee_id,
      :shift_template_id,
      :start_time,
      :end_time
    )
  end

  def after_shift_params
    {
      name: shift_template.name,
      nickname: shift_template.nickname,
      start_time: shift_params['start_time'],
      end_time: shift_params['end_time']
    }
  end
end
