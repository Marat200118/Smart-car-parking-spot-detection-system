class MapController < ApplicationController
  def index
    @measures = Measure.last(5)

    @p1       = Measure.p1.last
    @p2       = Measure.p2.last
    @p3       = Measure.p3.last
  end
end
