require 'rails_helper'

RSpec.describe Api::Admin::EmployeesController do
  let(:admin)      { create :user, :admin }
  let!(:employees) { create_list :user, 10, company: admin.company }
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

    it 'responds with correct employee count' do
      expect(result.count).to eq 10
    end
  end

  describe 'POST create' do
    let(:params)  do
      {
        employee: {
          first_name: 'FIRST_NAME',
          last_name: 'LAST_NAME',
          phone_number: '123',
          email: 'TEST@EMAIL.COM'
        }
      }
    end
    before        { post :create, params: params }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'responds with correct created employee' do
      expect(result['firstName']).to eq 'FIRST_NAME'
      expect(result['lastName']).to eq 'LAST_NAME'
      expect(result['phoneNumber']).to eq '123'
    end
  end

  describe 'PUT update' do
    let(:employee) { employees.first }
    let(:params)   { { first_name: 'NEW_FIRST_NAME' } }
    before         { put :update, params: { id: employee.id, employee: params } }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'responds with correct updated employee' do
      expect(result['firstName']).to eq 'NEW_FIRST_NAME'
    end
  end

  describe 'DELETE destroy' do
    let(:employee) { employees.first }
    before         { delete :destroy, params: { id: employee.id } }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'responds with correct deleted employee' do
      expect(result['firstName']).to eq employee.first_name
    end
  end
end
