class User < ApplicationRecord
  include Wupee::Receiver
  acts_as_paranoid

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :company
  has_many :shifts, dependent: :destroy

  def full_name
    first_name + ' ' + last_name
  end
end
