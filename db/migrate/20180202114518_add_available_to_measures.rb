class AddAvailableToMeasures < ActiveRecord::Migration[5.1]
  def change
    add_column :measures, :available, :bool
  end
end
