class Measure < ApplicationRecord
  scope :last_p1, -> { where(angle: 1).last }
  scope :last_p2, -> { where(angle: 45).last }
  scope :last_p3, -> { where(angle: 90).last }

  def unavailable?
    !available?
  end
end
