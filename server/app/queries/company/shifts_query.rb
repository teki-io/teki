class Company::ShiftsQuery < QueryBase
  def initialize(scope = current_company, params)
    super
  end

  def from
    Date.parse(params[:from])
  end

  def to
    Date.parse(params[:to])
  end

  def query
    result = scope.shifts
    result = result.where(start_time: from..to) if with_params
    result
  end
end
