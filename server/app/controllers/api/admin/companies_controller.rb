class Api::Admin::CompaniesController < Api::Admin::BaseController
  before_action :pre_process_company_params, only: [:update]

  def update
    company.update!(company_params)
    render json: company,
           root: false,
           serializer: ::CompanySerializer
  end

  private

  def company
    @company ||= current_company
  end

  def pre_process_company_params
    params[:company].tap do |d|
      d[:shift_templates_attributes] ||= []
    end
  end

  def company_params
    params.require(:company).permit(
      shift_templates_attributes: [ :id, :sort ]
    )
  end
end
