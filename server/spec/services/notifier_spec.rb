require 'rails_helper'

RSpec.describe Notifier do
  let(:type)         { Notifier::TYPES[:USER_HAS_BEEN_ASSIGNED_SHIFT] }
  let(:seed_notification_type) { create :notification_type, name: type }
  let(:receiver)     { create :user }
  let(:service)      { described_class.new(receiver, type) }
  let(:server)       { object_double ActionCable::Server::Base.new, broadcast: true }
  let(:channel)      { "#{NotificationChannel::CHANNEL_NAME}_#{receiver.id}" }
  let(:notification) { Wupee::Notification.last }
  let(:payload)      { NotificationSerializer.new(notification, root: false) }

  before             do
    allow(ActionCable).to receive(:server).and_return(server)
    seed_notification_type
  end

  subject(:notify) { service.notify }

  it 'creates a message' do
    expect{ notify }.to change { Message.count }.by(1)
  end

  it 'creates a notification' do
    expect{ notify }.to change { Wupee::Notification.count }.by(1)
  end

  it 'creates a notification message with body' do
    notify
    expect(notification.attached_object.body).to eq 'hi'
  end

  it 'broadcasts the notification' do
    notify
    expect(server).to have_received(:broadcast).
      with(channel, { type: type, payload: payload }.to_json )
  end
end
