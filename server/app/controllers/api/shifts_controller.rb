class Api::ShiftsController < Api::BaseController
  def index
    render json: shifts,
           root: false,
           each_serializer: ::ShiftSerializer
  end

  private

  def query_params
    params.permit(:from, :to)
  end

  def shifts
    @shifts ||= ::ShiftsQuery.query(current_user, query_params) || []
  end
end
