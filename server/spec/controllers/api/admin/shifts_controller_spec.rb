require 'rails_helper'

RSpec.describe Api::Admin::ShiftsController do
  let(:admin)     { create :user, :admin }
  let(:employee)  { create :user, company: admin.company }
  let!(:shifts)   { create_list :shift, 10, user: employee }
  let(:result)    { JSON.parse(response.body) }
  let(:notifier)  { spy Notifier, notify: true }

  before(:each) do
    allow(controller).to receive(:authenticate).and_return true
    allow(controller).to receive(:authenticate_admin!).and_return true
    allow(controller).to receive(:current_user).and_return admin
    allow(Notifier).to receive(:new).and_return notifier
  end

  describe 'GET index' do
    before { get :index }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'responds with correct shifts count' do
      expect(result.count).to eq 10
    end
  end

  describe 'POST create' do
    let(:template) { create :shift_template, company: admin.company }
    let(:params)  do
      {
        shift: {
          shift_template_id: template.id,
          start_time: '2016-05-09T10:00:00.000Z',
          end_time: '2016-05-09T23:00:00.000Z',
          employee_id: employee.id
        }
      }
    end
    before        { post :create, params: params }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'notifies employee' do
      expect(Notifier).to have_received(:new).with(employee, Notifier::TYPES[:USER_HAS_BEEN_ASSIGNED_SHIFT])
      expect(notifier).to have_received(:notify)
    end

    it 'responds with correct created shift template' do
      expect(result['name']).to eq template.name
      expect(result['startTime']).to eq '2016-05-09T10:00:00.000Z'
      expect(result['endTime']).to eq '2016-05-09T23:00:00.000Z'
      expect(result['employeeName']).to eq employee.first_name
      expect(result['employeeId']).to eq employee.id
    end
  end

  describe 'PUT update' do
    let(:employee2) { create :user, company: admin.company }
    let(:shift)     { shifts.first }
    let(:params)    { { employee_id: employee2.id } }
    before          { put :update, params: { id: shift.id, shift: params } }

    it 'responds with success' do
      expect(response.status).to eq 200
    end

    it 'notifies employee' do
      expect(Notifier).to have_received(:new).with(employee2, Notifier::TYPES[:USER_HAS_BEEN_ASSIGNED_SHIFT])
      expect(notifier).to have_received(:notify)
    end

    it 'responds with correct updated template' do
      expect(result['employeeName']).to eq employee2.first_name
      expect(result['employeeId']).to eq employee2.id
    end
  end
end
