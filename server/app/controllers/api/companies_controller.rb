class Api::CompaniesController < Api::BaseController
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

  def company_params
    params.require(:company)
  end
end
