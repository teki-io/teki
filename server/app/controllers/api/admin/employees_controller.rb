class Api::Admin::EmployeesController < Api::Admin::BaseController
  def index
    render json: employees,
           root: false,
           each_serializer: ::EmployeeSerializer
  end

  def create
    generated_password = Devise.friendly_token.first(8)
    employee = employees.create!(employee_params.merge(password: generated_password))
    render json: employee,
           root: false,
           serializer: ::EmployeeSerializer
  end

  def update
    employee.update!(employee_params)
    render json: employee,
           root: false,
           serializer: ::EmployeeSerializer
  end

  def destroy
    employee.destroy!
    render json: employee,
           root: false,
           serializer: ::EmployeeSerializer
  end

  private

  def employee
    @employee ||= employees.find(employee_id)
  end

  def employees
    @employees ||= current_company.users.where.not(id: current_user.id)
  end

  def employee_id
    params[:id]
  end

  def employee_params
    params.require(:employee).permit(
        :first_name,
        :last_name,
        :phone_number,
        :email
    )
  end
end
