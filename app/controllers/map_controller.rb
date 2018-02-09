class MapController < ApplicationController
  def index
    @measures = Measure.last(5)

    @p1       = Measure.last_p1
    @p2       = Measure.last_p2
    @p3       = Measure.last_p3
  end
end
