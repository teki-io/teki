FactoryGirl.define do
  factory :shift do
    name     { Faker::Name.name }
    nickname { Faker::Name.name }
    start_time { Faker::Time.between(DateTime.now - 1, DateTime.now) }
    end_time { Faker::Time.between(DateTime.now - 1, DateTime.now) }
  end
end
