class ShiftsQuery < QueryBase
  def initialize(scope = current_user, params)
    super
  end

  def from
    Date.parse(params[:from])
  end

  def to
    Date.parse(params[:to])
  end

  def query
    scope.shifts.where(start_time: from..to) if with_params
  end
end
