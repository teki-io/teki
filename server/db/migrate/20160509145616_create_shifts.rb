class CreateShifts < ActiveRecord::Migration[5.0]
  def change
    create_table :shifts do |t|
      t.string :name
      t.string :nickname
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps null: false
    end

    add_reference :shifts, :user, index: true
    add_reference :shifts, :shift_template, index: true
  end
end
