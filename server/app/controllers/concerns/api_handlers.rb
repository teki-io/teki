module Concerns::ApiHandlers
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found_error
    rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_record_error
  end

  protected

  def handle_not_found_error
    render json: { errors: ['Not found'] }, status: 404
  end

  def handle_invalid_record_error(e)
    render json: e.record.errors.full_messages, status: 422
  end
end
