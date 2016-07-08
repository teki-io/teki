# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160708014049) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string   "name"
    t.string   "domain"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.string   "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shift_templates", force: :cascade do |t|
    t.string   "name"
    t.string   "nickname"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer  "duration"
    t.string   "location"
    t.string   "color"
    t.string   "frequency"
    t.datetime "deleted_at"
    t.integer  "sort",       default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "company_id"
    t.index ["company_id"], name: "index_shift_templates_on_company_id", using: :btree
    t.index ["deleted_at"], name: "index_shift_templates_on_deleted_at", using: :btree
  end

  create_table "shifts", force: :cascade do |t|
    t.string   "name"
    t.string   "nickname"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "user_id"
    t.integer  "shift_template_id"
    t.index ["shift_template_id"], name: "index_shifts_on_shift_template_id", using: :btree
    t.index ["user_id"], name: "index_shifts_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "nickname"
    t.string   "first_name",                             null: false
    t.string   "last_name",                              null: false
    t.string   "address"
    t.string   "address2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "phone_number"
    t.boolean  "admin",                  default: false, null: false
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "company_id"
    t.datetime "deleted_at"
    t.index ["company_id"], name: "index_users_on_company_id", using: :btree
    t.index ["deleted_at"], name: "index_users_on_deleted_at", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "wupee_notification_type_configurations", force: :cascade do |t|
    t.integer  "notification_type_id"
    t.string   "receiver_type"
    t.integer  "receiver_id"
    t.integer  "value",                default: 0
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.index ["notification_type_id"], name: "idx_wupee_notif_type_config_on_notification_type_id", using: :btree
    t.index ["receiver_type", "receiver_id"], name: "idx_wupee_notif_typ_config_on_receiver_type_and_receiver_id", using: :btree
  end

  create_table "wupee_notification_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_wupee_notification_types_on_name", unique: true, using: :btree
  end

  create_table "wupee_notifications", force: :cascade do |t|
    t.string   "receiver_type"
    t.integer  "receiver_id"
    t.string   "attached_object_type"
    t.integer  "attached_object_id"
    t.integer  "notification_type_id"
    t.boolean  "is_read",              default: false
    t.boolean  "is_sent",              default: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

  add_foreign_key "wupee_notification_type_configurations", "wupee_notification_types", column: "notification_type_id"
  add_foreign_key "wupee_notifications", "wupee_notification_types", column: "notification_type_id"
end
