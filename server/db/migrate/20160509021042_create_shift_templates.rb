class CreateShiftTemplates < ActiveRecord::Migration[5.0]
  def change
    create_table :shift_templates do |t|
      t.string :name
      t.string :nickname
      t.datetime :start_time
      t.datetime :end_time
      t.integer :duration
      t.string :location
      t.string :color
      t.string :frequency
      t.datetime :deleted_at
      t.integer :sort, default: 0

      t.timestamps null: false
    end

    add_reference :shift_templates, :company, index: true
    add_index :shift_templates, :deleted_at
  end
end
