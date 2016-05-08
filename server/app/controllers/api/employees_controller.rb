class Api::EmployeesController < Api::BaseController
  def index
    render json: employees,
           root: false,
           each_serializer: ::EmployeeSerializer
  end

  private

  def employees
    @employees ||= current_company.users
  end
end
