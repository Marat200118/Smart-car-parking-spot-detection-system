class MapController < ApplicationController
  def index
    @measures           = Measure.last(4)
    @device_p1_angle1   = Measure.device_p1_angle1.last
    @device_p1_angle29  = Measure.device_p1_angle29.last
    @device_p1_angle82  = Measure.device_p1_angle82.last
    @device_p1_angle111 = Measure.device_p1_angle111.last
    @device_p2_angle50   = Measure.device_p2_angle50.last
    @device_p2_angle75  = Measure.device_p2_angle75.last
    @device_p2_angle100  = Measure.device_p2_angle100.last
  end
end