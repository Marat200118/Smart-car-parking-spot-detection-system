class CreateMeasures < ActiveRecord::Migration[5.1]
  def change
    create_table :measures do |t|
      t.string :device
      t.integer :angle
      t.integer :distance

      t.timestamps
    end
  end
end
