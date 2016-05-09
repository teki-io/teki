class Company < ApplicationRecord
  has_many :users
  has_many :shift_templates
  has_many :shifts, through: :users
end
