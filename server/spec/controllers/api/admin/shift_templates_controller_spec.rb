require 'rails_helper'

RSpec.describe Api::Admin::ShiftTemplatesController do
  let(:admin)      { create :user, :admin }
  let!(:templates) { create_list :shift_template, 10, company: admin.company }
  let(:result)     { JSON.parse(response.body) }

  before(:each) do
    allow(controller).to receive(:authenticate).and_return true
    allow(controller).to receive(:authenticate_admin!).and_return true
    allow(controller).to receive(:current_user).and_return admin
  end

  describe 'GET index' do
    before { get :index }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'responds with correct shift templates count' do
      expect(result.count).to eq 10
    end
  end

  describe 'POST create' do
    let(:params)  do
      {
        shift_template: {
          name: 'TEMPLATE_NAME',
          start_time: '10:00',
          end_time: '23:00'
        }
      }
    end
    before        { post :create, params: params }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'responds with correct created shift template' do
      expect(result['name']).to eq 'TEMPLATE_NAME'
      expect(result['startTime']).to eq '10:00'
      expect(result['endTime']).to eq '23:00'
    end
  end

  describe 'PUT update' do
    let(:template) { templates.first }
    let(:params)   { { name: 'NEW_NAME' } }
    before         { put :update, params: { id: template.id, shift_template: params } }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'responds with correct updated template' do
      expect(result['name']).to eq 'NEW_NAME'
    end
  end

  describe 'DELETE destroy' do
    let(:template) { templates.first }
    before         { delete :destroy, params: { id: template.id } }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'responds with correct deleted template' do
      expect(result['name']).to eq template.name
    end
  end
end
