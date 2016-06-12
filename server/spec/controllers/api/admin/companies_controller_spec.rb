require 'rails_helper'

RSpec.describe Api::Admin::CompaniesController do
  let(:admin)    { create :user, :admin }
  let(:template) { create :shift_template, company: admin.company, sort: 0 }
  let(:result)   { JSON.parse(response.body) }

  before(:each) do
    allow(controller).to receive(:authenticate).and_return true
    allow(controller).to receive(:authenticate_admin!).and_return true
    allow(controller).to receive(:current_user).and_return admin
  end

  describe 'PUT update' do
    let(:params) { { company: { shift_templates_attributes: [ id: template.id, sort: 1 ] } } }
    before       { put :update, params: params }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'updated shift template sort' do
      expect(template.reload.sort).to eq 1
    end
  end
end
