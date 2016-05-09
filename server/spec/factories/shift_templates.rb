FactoryGirl.define do
  factory :shift_template do
    name "MyString"
    nickname "MyString"
    duration 8
    location "MyString"
    color "MyString"
    frequency "MyString"
    start_time { Faker::Time.between(DateTime.now - 1, DateTime.now) }
    end_time { Faker::Time.between(DateTime.now - 1, DateTime.now) }
  end
end
