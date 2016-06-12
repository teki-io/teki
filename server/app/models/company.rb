class Company < ApplicationRecord
  has_many :users
  has_many :shift_templates
  has_many :shifts, through: :users

  accepts_nested_attributes_for :shift_templates, allow_destroy: true
end
