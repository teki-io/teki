class Company < ApplicationRecord
  has_many :users
  has_many :shift_templates
end
