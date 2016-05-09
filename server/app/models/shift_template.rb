class ShiftTemplate < ApplicationRecord
  acts_as_paranoid

  belongs_to :company
end
