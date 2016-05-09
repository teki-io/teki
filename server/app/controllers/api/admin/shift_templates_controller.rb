class Api::Admin::ShiftTemplatesController < Api::Admin::BaseController
  def index
    render json: shift_templates,
           root: false,
           each_serializer: ::ShiftTemplateSerializer
  end

  def update
    shift_template.update!(shift_template_params)
    render json: shift_template,
           root: false,
           serializer: ::ShiftTemplateSerializer
  end

  def create
    shift_template = ShiftTemplate.create!(shift_template_params.merge(company: current_company))
    render json: shift_template,
           root: false,
           serializer: ::ShiftTemplateSerializer
  end

  def destroy
    shift_template.destroy!
    render json: shift_template,
           root: false,
           serializer: ::ShiftTemplateSerializer
  end

  private

  def shift_template_params
    params.require(:shift_template).permit(
      :name,
      :start_time,
      :end_time
    )
  end

  def shift_templates
    @shift_templates ||= current_company.shift_templates
  end

  def shift_template
    @shift_template ||= shift_templates.find(shift_template_id)
  end

  def shift_template_id
    params[:id]
  end
end
