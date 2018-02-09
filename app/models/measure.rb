class Measure < ApplicationRecord
  scope :p1, -> { where(angle: 1).where('created_at >= ?', DateTime.current - 2.minutes) }
  scope :p2, -> { where(angle: 45).where('created_at >= ?', DateTime.current - 2.minutes) }
  scope :p3, -> { where(angle: 90).where('created_at >= ?', DateTime.current - 2.minutes) }

  def unavailable?
    !available?
  end
end
