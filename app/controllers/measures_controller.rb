class MeasuresController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def create
    Measure.create!(
      device:   params[:device],
      angle:    params[:angle].to_i,
      distance: params[:distance].to_i,
      # Add in migration before lol - noob?
      #temperature: params[:temperature].to_i,
      #humidity: params[:humidity].to_i, 
      available: ActiveModel::Type::Boolean.new.cast(params[:available])
    )

    head :no_content
  end
end
