class Measure < ApplicationRecord
  # BAD_READING = 1015

  after_create :broadcast_to_measures_channel

  DEVICE_CODES = {
    'Infra' => 'p1',
    'Ultra' => 'p2'
  }

  #infared device
  scope :device_p1_angle1, -> { where(angle: 1, device: 'Infra').where('created_at >= ?', DateTime.current - 2.minutes)}
  scope :device_p1_angle29, -> { where(angle: 29, device: 'Infra').where('created_at >= ?', DateTime.current - 2.minutes)}
  scope :device_p1_angle82, -> { where(angle: 82, device: 'Infra').where('created_at >= ?', DateTime.current - 2.minutes)}
  scope :device_p1_angle111, -> { where(angle: 111, device: 'Infra').where('created_at >= ?', DateTime.current - 2.minutes)}

  #ultrasonic device
  scope :device_p2_angle50, -> { where(angle: 50, device: 'Ultra').where('created_at >= ?', DateTime.current - 2.minutes)}
  scope :device_p2_angle75, -> { where(angle: 75, device: 'Ultra').where('created_at >= ?', DateTime.current - 2.minutes)} 
  scope :device_p2_angle100, -> { where(angle: 100, device: 'Ultra').where('created_at >= ?', DateTime.current - 2.minutes)} 

  def available?
    case device_identificator
    when 'p2_angle50', 'p2_angle100', 'p1_angle82', 'p1_angle29'
      distance >= 28
    when 'p2_angle75'
      distance >= 24
    when 'p1_angle111', 'p1_angle1' 
      distance >= 30
    end
  end

  def broadcast_to_measures_channel
    ActionCable.server.broadcast 'measures', { is_available: available?, device: device_identificator }
  end

  def device_identificator
    "#{DEVICE_CODES[device]}_angle#{angle}"
  end
end
