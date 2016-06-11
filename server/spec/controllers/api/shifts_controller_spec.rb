require 'rails_helper'

RSpec.describe Api::ShiftsController do
  let(:user)    { create :user }
  let!(:shifts) { create_list :shift, 10, user: user }
  let(:result)     { JSON.parse(response.body) }

  before(:each) do
    allow(controller).to receive(:authenticate).and_return true
    allow(controller).to receive(:current_user).and_return user
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
end
