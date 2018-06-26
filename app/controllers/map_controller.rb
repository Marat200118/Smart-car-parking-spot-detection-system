class MapController < ApplicationController
  def index
    @measures           = Measure.last(4)
    @device_p1_angle1   = Measure.device_p1_angle1.last
    @device_p1_angle29  = Measure.device_p1_angle29.last
    @device_p1_angle82  = Measure.device_p1_angle82.last
    @device_p1_angle111 = Measure.device_p1_angle111.last
    @device_p2_angle1   = Measure.device_p2_angle1.last
    @device_p2_angle26  = Measure.device_p2_angle26.last
    @device_p2_angle51  = Measure.device_p2_angle51.last
  end
end