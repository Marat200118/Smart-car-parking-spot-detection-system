class MeasuresChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'measures'
  end
end